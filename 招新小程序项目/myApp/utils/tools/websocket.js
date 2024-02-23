import PopUp from '../../utils/tools/PopUp'
/**
 * @description 
 * @param {*} onMessageCallback 
 */
const connectWebSocket = function (onMessageCallback) {
  let socketOpen = false; // ws的开启状态
  let socketTask = null; // ws的连接实例
  let callbackMap = new Map(); // 用于存储每个请求对应的回调函数
  let heartbeatInterval = null; // 心跳定时器

  /**
   *@description 发送心跳包
   */
  function sendHeartbeat() {
    socketTask.send({
      data: 'ping',
      success: function (res) {
        if (res.errMsg === 'sendSocketMessage:ok') {
          console.log('心跳包发送成功');
          // 连接活跃，继续保持连接
        } else {
          console.log('发送心跳包失败');
          reconnect(); // 执行重新连接操作
        }
      }
    });
  }

  /**
   * @description 开始定时发送心跳包
   */
  function startHeartbeatInterval() {
    heartbeatInterval = setInterval(() => {
      sendHeartbeat();
    }, 30000); // 每30秒发送一次心跳包
  }

  /**
   *@description  清除心跳包定时器
   */
  function clearHeartbeatInterval() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  }

  /**
   * @description ws建立连接 --> 调用connect函数即默认本地存储存在token记录
   */
  function connect() {
    // 创建ws连接任务
    socketTask = wx.connectSocket({
      url: 'wss://qgailab.com/newer/interview',
      header: {
        'content-type': 'application/json',
        'platformToken': wx.getStorageSync("platformToken")
      },
      //网络状态
      success: function (res) {
        console.log('WebSocket连接打开成功', res);
      },
      fail: function (res) {
        console.log('WebSocket连接打开失败', res);
        wx.setStorageSync('platformToken', '')
      }
    });

    // 建立连接后立即发送第一个心跳包
    if (socketOpen) {
      sendHeartbeat();
    } else {
      console.log('WebSocket连接未打开,无法发送心跳包');
    }


    /**
     * @description 连接开启
     */
    socketTask.onOpen(function (res) {
      console.log('WebSocket连接已打开', res);
      socketOpen = true;
      // 建立连接后开始定时发送心跳包
      startHeartbeatInterval();
    });

    /**
     * @description 连接异常
     */
    socketTask.onError(function (res) {
      console.log('WebSocket连接出错', res);
    });

    /**
     * @description 连接关闭
     */
    socketTask.onClose(function (res) {
      PopUp.Toast('请重新登录', 2, 2000);
      console.log('WebSocket连接已关闭', res);
      socketOpen = false;
      clearHeartbeatInterval()
      try {
        wx.removeStorageSync('platformToken');
        console.log('数据清除成功')
      } catch (e) {
        PopUp.Toast('未开放本地数据权限', 2, 2000);
        console.log('数据清除失败', e)
      };
      // 无论是否成功都进行跳转
        setTimeout(() => {
          wx.reLaunch({
            url: '/pages/index/index',
          })
        }, 1000)
    });

    /**
     * @description 连接数据
     */
    socketTask.onMessage(function (res) {
      console.log('收到的信息', res.data);
      if (res.data === 'ping') {
        console.log('连接活跃，继续保持连接')
      } else if (res.data === '') {
        console.log('连接断开')
        reconnect(); // 执行重新连接操作
      } else {
        // 数据处理
        const result = res.data.split('|');
        const type = result[0];
        const data = result[1];
        console.log('data', data)
        const response = JSON.parse(data);
        // 执行外部传入的消息处理回调函数
        if (onMessageCallback) {
          onMessageCallback(response);
        }
        const app = getApp()
        // 数据注入全局
        app.globalData.wssInitInfo = {
          code: response.code,
          message: response.message
        }
        // 根据消息类型找到对应的回调函数
        const callback = callbackMap.get(type);
        if (callback) {
          // 调用回调函数处理返回的信息
          callback(data);
          // 处理完毕后，需要将回调函数从 Map 中删除，以便下次使用
          callbackMap.delete(type);
        }
      }
    });
  }

  /**
   *@description ws发送消息
   */
  function send(msg, type) {
    if (socketOpen) {
      socketTask.send({
        data: msg
      });
    } else {
      console.log('WebSocket连接未打开');
    }
  }

  /**
   *@description 发送请求并处理返回的信息
   */
  function request(msg, type, callback) {
    // 将回调函数存储到 Map 中
    callbackMap.set(type, callback);
    send(msg, type);
  }

  /**
   * @description 关闭连接
   */
  function close() {
    socketTask.close();
    clearHeartbeatInterval(); // 清除心跳包定时器
  }

  /**
   *@description 重新连接
   */
  function reconnect() {
    close(); // 关闭当前连接
    // 延迟一定时间后再次发起连接
    setTimeout(() => {
      connect(); // 重新发起连接
    }, 3000); // 例如延迟3秒后再次发起连接
  }

  // 函数返回方法集
  return {
    connect: connect,
    request: request,
    close: close,
    reconnect: reconnect,
    registerOnMessageCallback: function (callback) {
      onMessageCallback = callback;
    }
  };
}

// 对外暴露函数返回值
const socket = connectWebSocket();
module.exports = socket;
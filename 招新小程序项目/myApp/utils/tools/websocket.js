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
  let currentPage = ''; // 当前页面
  let conText = null; // 保存上下文
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
    if (heartbeatInterval === null) {
      heartbeatInterval = setInterval(() => {
        sendHeartbeat();
      }, 30000); // 每30秒发送一次心跳包
    }
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
  function connect(context) {
    conText = context
    if (wx.getStorageSync('platformToken') === '') // 没登录过
    {
      context['hastoken'] = false;
      redirect()
      return
    }
    context['hastoken'] = true;
    // 保持ws的唯一性
    if (socketTask === null) {
      // 尚未存在可用ws实例，创建ws连接任务
      socketTask = wx.connectSocket({
        url: 'wss://qgailab.com/newer/interview',
        header: {
          'content-type': 'application/json',
          'platformToken': wx.getStorageSync('platformToken')
        },
        //网络状态
        success: function (res) {
          console.log('WebSocket创建成功', res);
        },
        fail: function (res) {
          console.log('WebSocket创建失败', res);
        }
      });
    } else {
      return
    }
    /**
     * @description 连接开启
     */
    socketTask.onOpen(function (res) {
      console.log('WebSocket已连接', res);
      socketOpen = true;
      context['validtoken'] = true;
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
      console.log('WebSocket连接已关闭', res);
      if (res.code === 1000 && res.reason === '') {
        console.log('主动断开成功');
        return
      } else if (res.reason !== "abnormal closure" || res.code != 1006) {
        // 非token过期，进行关闭重连
        close()
        reconnect();
        console.log('重新连接中');
      } else {
        /* 可能为token过期，经典报错为：
        {
          reason:"abnormal closure",
          code:1006
        }*/
        PopUp.Toast('请重新登录', 2, 2000);
        close();
        context['validtoken'] = false // token过期
        try {
          wx.removeStorageSync('platformToken');
          console.log('数据清除成功')
        } catch (e) {
          PopUp.Toast('未开放本地数据权限', 2, 2000);
          console.log('数据清除失败', e)
        };
        // 过期重定向获取新token
        redirect()
      }

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
      console.log('WebSocket连接未打开,连接后再自动发送消息');
      reconnect()
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
   * @description 主动关闭连接
   */
  function close() {
    console.log('触发close函数');
    clearHeartbeatInterval(); // 清除心跳包定时器
    socketOpen = false;
    socketTask.close();
    socketTask = null;
  }

  /**
   *@description 重新连接
   */
  function reconnect() {
    // 延迟一定时间后再次发起连接
    setTimeout(() => {
      connect(conText); // 重新发起连接
    }, 3000); // 例如延迟3秒后再次发起连接
  }

  /**
   * @description 重定向index函数
   */
  function redirect() {
    setTimeout(() => {
      if (getCurrentPages().length === 0) {
        redirect()
      } else {
        currentPage = getCurrentPages()[getCurrentPages().length - 1].route
        if (currentPage === 'pages/index/index') {
          return
        }
        //进行跳转
        wx.reLaunch({
          url: '/pages/index/index',
        })
      }
    }, 100)
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
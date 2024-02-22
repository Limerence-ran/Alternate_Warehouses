import PopUp from '../../utils/tools/PopUp'
const connectWebSocket = function (onMessageCallback) {
  let socketOpen = false;
  let socketTask = null;
  let callbackMap = new Map(); // 用于存储每个请求对应的回调函数
  let heartbeatInterval = null;
  // 发送心跳包
  function sendHeartbeat() {
    if (socketOpen) {
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
    } else {
      console.log('WebSocket连接未打开');
    }
  }

  // 开始定时发送心跳包
  function startHeartbeatInterval() {
    heartbeatInterval = setInterval(() => {
      sendHeartbeat();
    }, 30000); // 每30秒发送一次心跳包
  }

  // 清除心跳包定时器
  function clearHeartbeatInterval() {
    if (heartbeatInterval) {
      clearInterval(heartbeatInterval);
      heartbeatInterval = null;
    }
  }

  /**
   * @description ws建立连接
   */ 
  function connect() {
    socketTask = wx.connectSocket({
      url: 'wss://qgailab.com/newer/interview',
      header: {
        'content-type': 'application/json',
        'platformToken': wx.getStorageSync("platformToken")
      },
      success: function (res) {
        console.log('WebSocket连接打开成功', res);
      },
      fail: function (res) {
        console.log('WebSocket连接打开失败', res);
        wx.setStorageSync('platformToken', '')
      }
    });
    // 建立连接后立即发送第一个心跳包
    sendHeartbeat();
    socketTask.onOpen(function (res) {
      console.log('WebSocket连接已打开', res);
      socketOpen = true;
      // 建立连接后开始定时发送心跳包
      startHeartbeatInterval();
    });

    socketTask.onError(function (res) {
      console.log('WebSocket连接出错', res);
    });

    socketTask.onClose(function (res) {
      console.log('WebSocket连接已关闭', res);
      socketOpen = false;
      clearHeartbeatInterval()
      try {
        if (wx.getStorageSync('platformToken')) {
          wx.removeStorageSync({
            key: 'platformToken',
            success: function (res) {
              PopUp.Toast('登录失效，请重新登录！', 2, 2000);
              setTimeout(() => {
                wx.redirectTo({
                  url: '/pages/index/index',
                })
              }, 2000)
              console.log('数据清除成功')
            },
            fail: function (res) {
              setTimeout(() => {
                wx.navigateTo({
                  url: '/pages/index/index',
                })
              }, 1000)
              console.log('数据清除失败')
            }
          })
        } else {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      } catch {
        console.log('缓存清除失败！')
      }
    });

    socketTask.onMessage(function (res) {
      console.log('收到的信息', res.data);
      if (res.data === 'ping') {
        console.log('连接活跃，继续保持连接')
      } else if (res.data === '') {
        console.log('连接断开')
        reconnect(); // 执行重新连接操作
      } else {

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

  // 发送消息
  function send(msg, type) {
    if (socketOpen) {
      socketTask.send({
        data: msg
      });
    } else {
      console.log('WebSocket连接未打开');
    }
  }

  // 发送请求并处理返回的信息
  function request(msg, type, callback) {
    // 将回调函数存储到 Map 中
    callbackMap.set(type, callback);
    send(msg, type);
  }


  function close() {
    socketTask.close();
    clearHeartbeatInterval(); // 清除心跳包定时器
  }
  // 重新连接
  function reconnect() {
    close(); // 关闭当前连接
    // 延迟一定时间后再次发起连接
    setTimeout(() => {
      connect(); // 重新发起连接
    }, 3000); // 例如延迟3秒后再次发起连接
  }
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

const socket = connectWebSocket();

module.exports = socket;
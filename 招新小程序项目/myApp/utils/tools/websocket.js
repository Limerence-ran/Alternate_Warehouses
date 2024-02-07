const app = getApp();
const connectWebSocket = function () {
  let socketOpen = false;
  let socketTask = null;
  let callbackMap = new Map(); // 用于存储每个请求对应的回调函数

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
      }
    });

    socketTask.onOpen(function (res) {
      console.log('WebSocket连接已打开', res);
      socketOpen = true;
    });

    socketTask.onError(function (res) {
      console.log('WebSocket连接出错', res);
    });

    socketTask.onClose(function (res) {
      console.log('WebSocket连接已关闭', res);
      socketOpen = false;
    });

    socketTask.onMessage(function (res) {
      console.log('收到的信息', res.data);
      const result = res.data.split('|');
      const type = result[0];
      const data = result[1];
      // console.log('data',data)
    
      // 根据消息类型找到对应的回调函数
      const callback = callbackMap.get(type);
      if (callback) {
        // 调用回调函数处理返回的信息
        callback(data);
        // 处理完毕后，需要将回调函数从 Map 中删除，以便下次使用
        callbackMap.delete(type);
      }
    });
  }

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
  }

  return {
    connect: connect,
    request: request,
    close: close
  };
}

const socket = connectWebSocket();

module.exports = socket;
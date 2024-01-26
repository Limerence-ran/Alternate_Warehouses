const app = getApp();
const connectWebSocket = function(header, onMessageCallback) {
  let socketOpen = false;
  let socketMsgQueue = [];
  let socketTask = null;

  // 建立WebSocket连接
  function connect() {
    socketTask = wx.connectSocket({
      url: 'ws://39.98.41.126:31129/interview',
      header: header,
      success: function (res) {
        console.log('WebSocket连接打开成功', res);
      },
      fail: function (res) {
        console.log('WebSocket连接打开失败', res);
      }
    });

    // 监听WebSocket连接打开事件
    socketTask.onOpen(function (res) {
      console.log('WebSocket连接已打开', res);
      socketOpen = true;
      for (let i = 0; i < socketMsgQueue.length; i++) {
        send(socketMsgQueue[i]);
      }
      socketMsgQueue = [];
    })

    // 监听WebSocket连接错误事件
    socketTask.onError(function (res) {
      console.log('WebSocket连接出错', res);
    })

    // 监听WebSocket连接关闭事件
    socketTask.onClose(function (res) {
      console.log('WebSocket连接已关闭', res);
      socketOpen = false;
    })

    // 监听WebSocket接收到服务器的消息事件
    socketTask.onMessage(onMessageCallback);
  }

  // 发送消息
  function send(msg) {
    if (socketOpen) {
      socketTask.send({
        data: msg
      });
    } else {
      socketMsgQueue.push(msg);
    }
  }

  // 关闭WebSocket连接
  function close() {
    socketTask.close();
  }

  return {
    connect: connect,
    send: send,
    close: close
  };
}
const header = {
  'content-type': 'application/json',
  'platformToken': wx.getStorageSync("platformToken")
};
const handleMessage = function(res){
  console.log('收到的信息', res.data);
  const result = res.data.split('|');
  const part1 = result[0];
  const part2 = result[1];
  console.log('part1', part1);
  console.log('part2', part2);
  app.globalData.message = {
    type: part1,
    response: part2
  };
}
const socket = connectWebSocket(header, function (res) {
  handleMessage(res);
});
module.exports = socket;
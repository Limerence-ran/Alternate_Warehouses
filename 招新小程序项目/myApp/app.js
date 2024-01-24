// app.js
import socket from './utils/tools/websocket'
App({
  globalData: {
    message: '',
    userInfo: null
  },
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })

    // const header = {
    //   'content-type': 'application/json',
    //   'platformToken': wx.getStorageSync("platformToken")
    // };
    // const that = this;
    // const socket = connectWebSocket(header, function (res) {
    //   // handleMessage(res);
    //   console.log('收到的信息', res.data);
    //   const result = res.data.split('|');
    //   const part1 = result[0];
    //   const part2 = result[1];
    //   console.log('part1', part1);
    //   console.log('part2', part2);
    //   that.globalData.message = {
    //     type: part1,
    //     response: part2
    //   };
    // });
    console.log(socket)
    socket.connect();
    socket.send('init');
    // this.globalData.socket = socket;
  
  },
 
})
// function handleMessage(res) {
//   console.log('收到的信息', res.data);
//   const result = res.data.split('|');
//   const part1 = result[0];
//   const part2 = result[1];
//   console.log('part1', part1);
//   console.log('part2', part2);
  
//   const app = getApp();
//   app.globalData.message = {
//     type: part1,
//     response: part2
//   };
// }

// app.js 
// import connectWebSocket from './utils/tools/websocket'
import socket from './utils/tools/websocket'
App({
  globalData: {
    message: '',
    userInfo: null,
    activeIndex: 0//底部导航栏索引
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
    const that = this;
    socket.connect();
    
  },
})

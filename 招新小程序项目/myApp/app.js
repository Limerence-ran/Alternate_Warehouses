// app.js 
import socket from './utils/tools/websocket'
App({
  globalData: {
    message: '',
    userInfo: null,
    avatarUrl: wx.getStorageSync('avatarUrl') || '', //头像
    nickName: wx.getStorageSync('nickName') || '', //昵称
    platformToken: '', //token占位符(在index页面中进行注入)
    activeIndex: 0, //底部导航栏索引
    systemInfo: null, //系统信息
    menuButtonBoundingClientRect: null, //胶囊位置信息
    identity: wx.getStorageSync('identity') || '', //用户身份User已报名,Tourist未报名,Admin管理员
    freshmanInfo: null,
    wssInitInfo: null
  },

  onLaunch() {
    //获取机型和胶囊信息
    this.getSystemInfomation()
  },

  /**
   * 获取机型相关信息
   */
  getSystemInfomation() {
    // 获取系统信息
    this.globalData.systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    this.globalData.menuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏高度 + 44
  }
})
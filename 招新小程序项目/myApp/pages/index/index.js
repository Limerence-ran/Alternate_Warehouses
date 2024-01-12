// index.js
// 获取应用实例
const app = getApp()
Page({
  data: {
    avatarUrl: '',
  },
  onChooseAvatar(e) {
    const { avatarUrl } = e.detail 
    this.setData({
      avatarUrl,
    })
  }
})
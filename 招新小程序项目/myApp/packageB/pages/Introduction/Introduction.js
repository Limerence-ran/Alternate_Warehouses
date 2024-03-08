// packageB/pages/Introduction/Introduction.js
import PopUp from '../../../utils/tools/PopUp'
let timer //防抖标识
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * @description 跳转小组
   * @param {*} options 
   */
  gotoGroups: function (e) {
    if (timer) {
      clearTimeout(timer)
    }
    let id = e.target.dataset.id ?? e.currentTarget.dataset.id
    timer = setTimeout(() => {
      wx.navigateTo({
        url: '../../../packageC/pages/groups/groups?id=' + id,
      })
    }, 500)
  },

  /**
   * @description 跳转导师
   */
  gotoTutor: function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      wx.navigateTo({
        url: '../../../packageC/pages/tutor/tutor',
      })
    }, 500)
  },

  /**
   * @description 跳转特色
   */
  gotoFeatures: function () {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      wx.navigateTo({
        url: '../../../packageC/pages/features/features',
      })
    }, 500)
  },

  /**
   * @description 模块待开发
   * @param {*} options 
   */
  isClosing: function () {
    PopUp.Toast("该模块尚未开放", 3, 2500)
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {},

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  }
})
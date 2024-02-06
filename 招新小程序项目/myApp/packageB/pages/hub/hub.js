// packageB/pages/hub/hub.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

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
  },

    /**
   * @description 团队介绍页跳转
   */
  goToHome() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../home/home',
      })
    }, 500)
  },
    /**
   * @description 简历信息页跳转
   */
  goToC_resume() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../C_resume/C_resume',
      })
    }, 500)
  },
    /**
   * @description 面试预约页跳转
   */
  goToC_bookInterview() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../C_bookInterview/C_bookInterview',
      })
    }, 500)
  },
    /**
   * @description 面试签到页跳转
   */
  goToC_signIn() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../C_signIn/C_signIn',
      })
    }, 500)
  },
    /**
   * @description 面试队列页跳转
   */
  goToC_queue() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../C_queue/C_queue',
      })
    }, 500)
  },  
  /**
  * @description 面试结果页跳转
  */
 goToC_score() {
   setTimeout(() => {
     wx.navigateTo({
       url: '../C_score/C_score',
     })
   }, 500)
 },
   /**
  * @description 数据可视化页跳转
  */
 goToVisualization() {
  setTimeout(() => {
    wx.navigateTo({
      url: '../Visualization/Visualization',
    })
  }, 500)
},
 


})
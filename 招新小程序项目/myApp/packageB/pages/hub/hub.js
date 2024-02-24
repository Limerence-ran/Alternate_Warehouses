// packageB/pages/hub/hub.js
import socket from '../../../utils/tools/websocket'
import PopUp from '../../../utils/tools/PopUp'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    wssInitInfo: app.globalData.wssInitInfo || ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    try {
      socket.request('init', 'init', (res) => {
        console.log('收到init的信息', res)
        const response = JSON.parse(res);
        console.log(response.code)
        const app = getApp()
        app.globalData.wssInitInfo = {
          code: response.code,
          message: response.message
        }
        console.log(app.globalData.wssInitInfo)
      });
    } catch (error) {
      // 处理请求失败的情况
      PopUp.Toast('请求失败', 3, 2000);
    }



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
  goToIntroduction() {
    setTimeout(() => {
      wx.navigateTo({
        url: '../Introduction/Introduction',
      })
    }, 500)
  },
  /**
 * @description 简历信息页跳转
 */
  goToC_resume: async function () {
    const { code, message } = this.data.wssInitInfo
    app.globalData.activeIndex = 2;

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
    const { code, message } = app.globalData.wssInitInfo
    console.log(code)
    if (code == 103) {//未预约
      app.globalData.activeIndex = 0;
      setTimeout(() => {
        wx.navigateTo({
          url: '../C_bookInterview/C_bookInterview',
        })
      }, 500)
    } else {
      PopUp.Toast('你已经约过了！', 2, 1500)
    }

  },
  /**
 * @description 面试签到页跳转
 */
  goToC_signIn() {
    const { code, message } = app.globalData.wssInitInfo
    if (code == 104) { //未签到
      app.globalData.activeIndex = 0;
      setTimeout(() => {
        wx.navigateTo({
          url: '../C_signIn/C_signIn',
        })
      }, 500)
    } else {
      PopUp.Toast(message, 2, 1500)
    }

  },
  /**
 * @description 面试队列页跳转
 */
  goToC_queue() {
    const { code, message } = app.globalData.wssInitInfo
    console.log(code)
    if (code == 105 || code == 102 || code == 103 || code == 104) {
      PopUp.Toast(message, 2, 1500)
    } else {
      app.globalData.activeIndex = 0;
      setTimeout(() => {
        wx.navigateTo({
          url: '../C_queue/C_queue',
        })
      }, 500)
    }

  },
  /**
  * @description 面试结果页跳转
  */
  goToC_score() {
    app.globalData.activeIndex = 1;
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
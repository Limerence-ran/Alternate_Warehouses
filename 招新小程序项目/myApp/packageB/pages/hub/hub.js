// packageB/pages/hub/hub.js
import socket from '../../../utils/tools/websocket'
import PopUp from '../../../utils/tools/PopUp'
import processModule from '../../../utils/tools/hubNavigate'
const app = getApp()
//函数防抖
let timer = null
Page({
  /**
   * 页面的初始数据
   */
  data: {
    identity: app.globalData.identity,
    hashTip: {
      101: '尚未报名',
      102: '未通过上轮面试',
      103: '尚未预约',
      104: '尚未签到',
      105: '队列结束',
      113: '未通过笔试',
      200: '正在排队',
      506: '正在面试',
      507: '状态异常',
      508: '面试结束',
    }, // 状态映射表
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    if (wx.getStorageSync('identity') !== "Admin") {
      try {
        socket.request('init', 'init', (res) => {
          console.log(res);
          const response = JSON.parse(res);
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
  onShareAppMessage() {},

  /**
   * @description 团队介绍页跳转
   */
  goToIntroduction() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      wx.navigateTo({
        url: '../Introduction/Introduction',
      })
    }, 500)
  },
  /**
   * @description 简历信息页跳转
   */
  goToC_register: function () {
    app.globalData.activeIndex = 2;
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      wx.navigateTo({
        url: '../C_register/C_register',
      })
    }, 500)
  },


  /**
   * @description 面试预约页跳转
   */
  goToC_bookInterview() {
    app.globalData.activeIndex = 0;
    processModule(app.globalData.wssInitInfo.code, 'bookInterview', this.data.hashTip)
  },
  /**
   * @description 面试签到页跳转
   */
  goToC_signIn() {
    app.globalData.activeIndex = 0;
    processModule(app.globalData.wssInitInfo.code, 'signIn', this.data.hashTip)
  },
  /**
   * @description 面试队列页跳转
   */
  goToC_queue() {
    app.globalData.activeIndex = 0;
    processModule(app.globalData.wssInitInfo.code, 'queue', this.data.hashTip)
  },


  /**
   * @description 面试结果页跳转
   */
  goToC_score() {
    app.globalData.activeIndex = 1;
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      wx.navigateTo({
        url: '../C_score/C_score',
      })
    }, 500)
  },



  /*管理端*/
  /**
   * @description 面试创建页跳转
   */
  goToB_createInterview() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      wx.navigateTo({
        url: '../../../packageA/pages/B_createInterview/B_createInterview',
      })
    }, 500)
  },

  /**
   * @description 数据可视化页跳转
   */
  goToVisualization() {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(() => {
      wx.navigateTo({
        url: '../Visualization/Visualization',
      })
    }, 500)
  },
})
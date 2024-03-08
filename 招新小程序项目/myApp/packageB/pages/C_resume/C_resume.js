// pages/B_resume/B_resume.js
import {
  NewerInterview
} from '../../../utils/request/api'
import PopUp from '../../../utils/tools/PopUp'
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shakeAnimation: {},
    avatarUrl: app.globalData.avatarUrl,
    userInfo: null,
    isHide: false, //智慧权限
  },
  initInfo: async function () {
    try {
      const response = await NewerInterview.getResume();
      let data = response.data;
      if (response.code === 200 && data) {
        this.setData({
          userInfo: data
        });
      } else if (response.code === 401) {
        PopUp.Toast(response.message, 2, 1000)
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 1500)
      } else {
        PopUp.Toast(response.message, 2, 1000)
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      wx.showToast({
        title: '简历请求失败',
        icon: 'none'
      });
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    // 智慧接口
    try {
      const response = await NewerInterview.fool();
      console.log('response', response);
      let data = response.data;
      this.setData({
        isHide: data
      });
      // 每次审核前记得通知后台并设置为!data
      if (!data) {
        return
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      PopUp.Toast('权限关闭', 2, 1000)
    }
    this.initInfo();
    const animation = wx.createAnimation({
      duration: 100,
      timingFunction: 'ease',
    });
    // 定义一个抖动动画序列
    function shake() {
      animation.rotateZ(-10).step();
      animation.rotateZ(10).step();
      animation.rotateZ(-10).step();
      animation.rotateZ(10).step();
      animation.rotateZ(0).step();
      this.setData({
        shakeAnimation: animation.export(),
      });
    };
    setTimeout(() => {
      shake.call(this); // 调用 shake 函数开始执行抖动动画
    }, 1000);
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

  }
})
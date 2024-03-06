// packageA/pages/B_viewQueue/B_viewQueue.js
import PopUp from '../../../utils/tools/PopUp'
import {
  Interview
} from '../../../utils/request/api_interview'
import socket from '../../../utils/tools/websocket'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    periodid: null, //场次id
    newerInterviewQueueStatuses: [], //面试队列数组
    total: null, //面试人数
  },

  /**
   * @description ws实时查看队列
   */
  websocketViewQueue() {
    try {
      socket.request(this.data.periodid, this.data.periodid, (res) => {
        const response = JSON.parse(res);
        if (response.code === 200) {
          this.setData({
            newerInterviewQueueStatuses: response.data.newerInterviewQueueStatuses,
            total: response.data.total,
          })
        } else {
          PopUp.Toast(response.message, 2, 2000);
        }
      });
    } catch (error) {
      // 处理请求失败的情况
      PopUp.Toast('请求失败', 3, 2000);
    }
  },


  /**
   * @description 进行叫号
   * @param {*} options 
   */
  async nextOne() {
    let option = {
      id: parseInt(this.data.periodid)
    }
    try {
      const response = await Interview.interviewNext(option);
      if (response.code === 200) {
        PopUp.Toast(response.message, 1, 1500);
        //刷新数据
        this.websocketViewQueue()
      } else if (response.code == 401) {
        //登录失效
        wx.removeStorageSync('platformToken')
        setTimeout(() => {
          PopUp.Toast(response.message, 2, 1500);
        }, 500);
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index'
          })
        }, 2000);
      } else {
        PopUp.Toast(response.message, 2, 2000);
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      PopUp.Toast('请求失败', 3, 2000);
    }
  },

  /**
   * @description 设置异常
   * @param {*} options 
   */
  async isStrange(e) {
    let option = {
      status: -1,
      wid: parseInt(e.target.dataset.wid)
    }
    try {
      const response = await Interview.interviewSetInterviewStatus(option);
      if (response.code === 200) {
        PopUp.Toast(response.message, 1, 1500);
        //刷新数据
        this.websocketViewQueue()
      } else if (response.code == 401) {
        //登录失效
        wx.removeStorageSync('platformToken')
        setTimeout(() => {
          PopUp.Toast(response.message, 2, 1500);
        }, 500);
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index'
          })
        }, 2000);
      } else {
        PopUp.Toast(response.message, 2, 2000);
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      PopUp.Toast('请求失败', 3, 2000);
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //接收参数
    this.setData({
      periodid: options.periodid
    })
    //发送ws
    this.websocketViewQueue()
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
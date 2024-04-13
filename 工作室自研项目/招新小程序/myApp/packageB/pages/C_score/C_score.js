// pages/C_score/C_score.js
import {
  NewerInterview
} from '../../../utils/request/api'
import PopUp from '../../../utils/tools/PopUp'
Page({
  /* 页面的初始数据*/
  data: {
    name_value: '获取中...',
    direction_value: '获取中...',
    arrayTurn: ['一轮面试', '二轮面试', '笔试'],
    turnsResult: [],
    indexTurn: null,
    isThrough: false
  },
  // 公共函数，用于更改选择器的值
  changePickerValue(value, key) {
    const data = {};
    data[key] = value;
    data.showPickerPop = false;
    this.setData(data);
  },

  bindPickerChange: function (e) {
    this.changePickerValue(e.detail.value, 'indexTurn');
    this.data.turnsResult.forEach((element, index) => {
      if (index == this.data.indexTurn) {
        if (element == '通过') {
          this.setData({
            isThrough: true
          })
        } else if (element == '未通过') {
          this.setData({
            isThrough: false
          })
        } else {
          this.setData({
            isThrough: null
          })
        }
      }
    });
    console.log(this.data.indexTurn)
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    try {
      const response = await NewerInterview.getScore();
      console.log('response', response)
      const {
        code,
        data,
        message
      } = response;
      if (code === 200 && data) {
        const {
          scoreVos
        } = data;
        const turns = scoreVos.map(item => item.stage);
        const turnsResult = scoreVos.map(item => item.result);
        console.log(turnsResult)
        this.setData({
          name_value: data.name,
          direction_value: data.groupName,
          arrayTurn: turns,
          turnsResult: turnsResult
        });
        console.log(message)
      } else if (code === 401) {
        PopUp.Toast(message, 3, 500)
        wx.removeStorageSync('platformToken')
        setTimeout(() => {
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }, 1000)
      } else {
        PopUp.Toast('成绩获取失败', 2, 500)
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      PopUp.Toast('成绩请求失败', 2, 500)
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

  }
})
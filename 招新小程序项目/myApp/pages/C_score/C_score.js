// pages/C_score/C_score.js
Page({
  /* 页面的初始数据*/
  data: {
    name_value: '获取失败',
    direction_value: '获取失败',
    arrayTurn: ['一轮面试', '二轮面试','笔试'],
    indexTurn:null,
    isThrough:false
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

  }
})
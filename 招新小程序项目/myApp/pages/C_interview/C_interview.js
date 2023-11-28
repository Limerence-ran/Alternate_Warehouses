// pages/C_interview/C_interview.js


Page({

  /**
   * 页面的初始数据
   */
  data: {
    latitude: 0,
    longitude: 0
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
// const a;
    let obj ={
      a:1,
      b:2,
      c:3
    };
    let {a} =obj;
  
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
    let that = this;
    wx.getLocation({
      type: "gcj02",
      success(res) {
        that.setData({latitude: res.latitude,
          longitude: res.longitude});
      }
    });

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
});
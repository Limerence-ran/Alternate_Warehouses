// pages/manage/manage.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dateRangeInfo: {
      list: [
        { dateStr: '2023-01-01 9:00-10:00', isDisabled: false, checked: false },
        { dateStr: '2023-01-02 10:30-11:30', isDisabled: false, checked: false },
        
      ]
    }
  },

  _checkedDateClick(e) {
    const { idx } = e.currentTarget.dataset;
    const { dateRangeInfo } = this.data;

    // 更新选中状态
    dateRangeInfo.list.forEach((item, index) => {
      item.checked = index === idx;
    });

    // 更新数据
    this.setData({
      dateRangeInfo: dateRangeInfo
    });

    // 处理点击事件
    // TODO: 根据实际需求进行处理
    console.log('点击了日期:', dateRangeInfo.list[idx].dateStr);
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
// pages/C_bookInterview/C_bookInterview.js
import Dialog from '@vant/weapp/dialog/dialog';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    isStart:false,
    active: 0,
    timeArr: {
      day0: [
        "9:00-10:00",
        "10:30-11:30",
        "12:00-13:00",
        "13:00-14:00",
        "14:30-15:30",
        "16:00-17:00"
      ],
      day1: [
        "13:00-14:00",
        "14:30-15:30",
        "16:00-17:00"
      ],
      day2: [
        "19:00-20:00",
        "20:30-21:30",
        "22:00-23:00"
      ]
    },
    day:'2024-3-10',
    selected: -1  // 初始化为-1，表示无选中项
  },
  onChange(event) {
  
    this.setData({
      active: event.detail.index,
      day:event.detail.title
    });
    // wx.showToast({
    //   title: `切换到 ${event.detail.title}`,
    //   icon: 'none',
    // });
  },
  Select(event){
    const index = event.currentTarget.dataset.index;
    const active = this.data.active;
    const day = this.data.timeArr[`day${active}`];
    const time = day[index];
    console.log("选择的日期：", this.data.day);
    console.log("选择的时间段：", time);
    // this.setData({
    //   selected:index
    // });
    Dialog.confirm({
      title: '确认选择该预约时间?',
      message: this.data.day + ' ' + time,
    })
      .then(() => {
        // on confirm
      })
      .catch(() => {
        // on cancel
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    wx.setNavigationBarTitle({
      title: '预约面试',
    });
    console.log(this.data.isStart);
    if(this.data.isStart){
      Dialog.confirm({
        message: '一轮面试还未开始',
      })
        .then(() => {
          // on confirm
        })
        .catch(() => {
          // on cancel
        });
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
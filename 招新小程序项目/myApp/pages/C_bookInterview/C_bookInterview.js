// pages/C_bookInterview/C_bookInterview.js
import Dialog from '@vant/weapp/dialog/dialog';
import PopUp from '../../utils/tools/PopUp'
import { NewerInterview } from '../../utils/request/api'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isStart: false,
    active: 0,
    timeArr: [
      { id: 0, day: '2024-12-05', time: "9:00-10:00" },
      { id: 1, day: '2024-12-06', time: "10:30-11:30" },
      { id: 2, day: '2024-12-07', time: "12:00-13:00" },
      { id: 3, day: '2024-12-05', time: "13:00-14:00" },
      { id: 4, day: '2024-12-04', time: "9:00-10:00" },
      { id: 5, day: '2024-12-05', time: "9:00-10:00" },
      { id: 6, day: '2024-12-01', time: "9:00-10:00" },
      { id: 7, day: '2024-12-05', time: "9:00-10:00" },
      { id: 8, day: '2024-12-04', time: "9:00-10:00" },
      { id: 9, day: '2024-12-03', time: "9:00-10:00" }
    ],
    selected: -1  // 初始化为-1，表示无选中项
  },
  onChange(event) {

    this.setData({
      active: event.detail.index,
      day: event.detail.title
    });
    // wx.showToast({
    //   title: `切换到 ${event.detail.title}`,
    //   icon: 'none',
    // });
  },
  Select: async function (event) {
    console.log('event', event)
    const index = event.currentTarget.dataset.index;
    const active = this.data.active;
    // console.log(this.data.timeArr[index].id)
    // console.log(this.data.timeArr[index].day + ' ' + this.data.timeArr[index].time);
    const id = this.data.timeArr[index].id;
    const time = this.data.timeArr[index].day + ' ' + this.data.timeArr[index].time;
    Dialog.confirm({
      title: '确认预约场次' + id + '?',
      message: time,
    })
      .then(async () => {
        // on confirm
        try {
          const response = await NewerInterview.bookTime(id);
          console.log('response', response);
          if (response.code == 200) {
            setTimeout(() => {
              PopUp.Toast('预约成功！', 1, 3000);
            }, 1000);
            setTimeout(() => {
              wx.redirectTo({
                url: '../C_loginIn/C_loginIn'
              })
            }, 6000);
          }
        } catch {
          PopUp.Toast('预约失败！', 2, 2000);
        }
      })
      .catch(() => {
        // on cancel
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    wx.setNavigationBarTitle({
      title: '预约面试',
    });
    try {
      const response = await NewerInterview.getInterviewInfo();
      console.log('response', response);
      if (response.code === 200) {
        console.log('渲染预约场次成功')

      } else {
        PopUp.Toast('渲染预约场次失败', 2, 2000);
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      PopUp.Toast('请求失败', 3, 2000);
    }
    // if (this.data.isStart) {
    //   Dialog.confirm({
    //     message: '一轮面试还未开始',
    //   })
    //     .then(() => {
    //       // on confirm
    //     })
    //     .catch(() => {
    //       // on cancel
    //     });
    // }
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
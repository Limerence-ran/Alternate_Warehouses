// pages/C_bookInterview/C_bookInterview.js
import Dialog from '@vant/weapp/dialog/dialog';
import PopUp from '../../../utils/tools/PopUp'
import {
  NewerInterview
} from '../../../utils/request/api'
import formatTimestamp from '../../../utils/tools/time'
import socket from '../../../utils/tools/websocket'
const app = getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isStart: false,
    active: 0,
    name: '',
    groupName: '',
    place: '',
    total: '', //当前场次预约面试的上限人数
    booked: '', //当前场次已经预约面试的人数
    timeArr: [],
    selected: -1, // 初始化为-1，表示无选中项
    avatarUrl: app.globalData.avatarUrl
  },


  onChange(event) {
    console.log(event)
    this.setData({
      active: event.detail.index,
    });
  },
  onOpen: async function (event) {

  },

  onClose() {},
  Select: async function (event) {
    const {
      index
    } = event.currentTarget.dataset;
    const id = this.data.timeArr[index].id;
    const time = this.data.timeArr[index].start + ' 到 ' + this.data.timeArr[index].end;
    const place = this.data.timeArr[index].place;
    const total = this.data.timeArr[index].total;
    const booked = this.data.timeArr[index].booked;
    const msg = '时间：\n' + time + '\n地点：' + place + '\n最大面试的人数：' + total + '\n已预约面试的人数：' + booked;
    console.log(time)
    Dialog.confirm({
        title: '确认预约场次'  + '?',
        message: msg,
        messageAlign: 'left',
      })
      .then(async () => {
        // on confirm
        try {
          const response = await NewerInterview.bookTime(id, false);
          console.log('response', response);
          //成功
          if (response.code == 200) {
            setTimeout(() => {
              PopUp.Toast(response.data, 1, 1500);
            }, 500);
            setTimeout(() => {
              wx.redirectTo({
                url: '../C_signIn/C_signIn'
              })
            }, 2000);
          } else if (response.code == 205) {
            //面试人数已满
            setTimeout(() => {
              PopUp.Toast(response.message, 2, 1500);
            }, 500);
          } else if (response.code == 107) {
            //面试时间段已过
            setTimeout(() => {
              PopUp.Toast(response.message, 3, 1500);
            }, 500);
          } else if (response.code == 108) {
            //重复预约
            setTimeout(() => {
              PopUp.Toast(response.message, 2, 1500);
            }, 500);
            setTimeout(() => {
              wx.redirectTo({
                url: '../C_signIn/C_signIn'
              })
            }, 2000);
          } else if (response.code == 401) {
            //登录失效
            setTimeout(() => {
              PopUp.Toast(response.message, 3, 500);
            }, 500);
            wx.removeStorageSync('platformToken')
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/index/index'
              })
            }, 1000);
          } else {
            PopUp.Toast(response.message, 2, 1500);
          }
        } catch {
          PopUp.Toast('预约失败', 2, 1500);
        }
      })
      .catch(() => {
        // on cancel
        PopUp.Toast('取消操作成功', 1, 1500);
      });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: async function (options) {
    try {
      const response = await NewerInterview.getInterviewInfo();
      if (response.code === 200) {
        const {
          data,
          message
        } = response;
        const {
          name,
          groupName,
          interviewPeriodVos
        } = data;
        const Array = interviewPeriodVos.map(item => {
          const startTime = formatTimestamp(item.start);
          const endTime = formatTimestamp(item.end);
          return {
            id: item.id,
            start: startTime,
            end: endTime,
            total: item.total,
            place: item.place,
            booked: item.booked
          }
        });
        this.setData({
          name: name,
          groupName: groupName,
          timeArr: Array
        })
        console.log(Array)
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
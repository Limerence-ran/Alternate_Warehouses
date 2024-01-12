import PopUp from '../../utils/tools/PopUp'
import {
  NewerInterview
} from "../../utils/request/api";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    steps: [{
        text: '定位成功  2023-03-11 12：30',
        desc: '广东工业大学工学一号馆',

      },
      {
        text: '签到成功 2023-03-11 12：30',
        desc: '',

      },

    ],
  },
  currentTime: function () {
    var now = new Date();
    var year = now.getFullYear();
    var month = now.getMonth() + 1;
    var date = now.getDate();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    var seconds = now.getSeconds();
    month = month < 10 ? '0' + month : month;
    date = date < 10 ? '0' + date : date;
    hours = hours < 10 ? '0' + hours : hours;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    // 组装成时间字符串
    var timeString = year + '-' + month + '-' + date + ' ' + hours + ':' + minutes;
    return timeString;
    console.log(timeString);

  },
  location: function () {
    PopUp.Loading(true, '定位中');
    setTimeout(() => {
      PopUp.LoadingOff();
    }, 2000);
    let time = this.currentTime();
    this.setData({
      steps: [
        ...this.data.steps,
        {
          text: '签到成功 ' + time,
          desc: ''
        }
      ]
    });
  },
  signUp: async function () {
    try {
      const response = await NewerInterview.signUp(data);
      console.log('response', response);
      if (response.code === 200) {
        PopUp.Toast(response.message, 1, 2000);
        let time = this.currentTime();
        this.setData({
          steps: [
            ...this.data.steps,
            {
              text: '定位成功 ' + time,
              desc: '广东工业大学工学一号馆'
            }
          ]
        });
      } else {
        PopUp.Toast('签到失败', 2, 2000);
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
    wx.setNavigationBarTitle({
      title: 'QG面试',
    })
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
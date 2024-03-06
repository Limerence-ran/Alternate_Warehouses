// packageA/pages/B_createInterview/B_createInterview.js
import PopUp from '../../../utils/tools/PopUp'
import {
  TuTorInterview
} from '../../../utils/request/api_admin'
import formatTimestamp from '../../../utils/tools/time'
let Timer = null //定时器
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0, //tab切换
    isStart: false, //是否存在场次
    timeArr: [],
    show: false,
    //时间选择器
    minDate: new Date().getTime(),
    maxDate: new Date(2024, 5, 1).getTime(),
    currentstartDate: new Date(2024, 3, 1).getTime(),
    currentendDate: new Date(2024, 3, 1).getTime(),
    //折叠
    activeName: '1',
    //人数
    total: 0,
    //地点
    place: '',
  },

  //弹出框
  onpopChange(event) {
    this.setData({
      activeName: event.detail,
    });
  },

  //时间选择框
  onstartInput(value) {
    this.setData({
      currentstartDate: value.detail,
    });
  },
  onendInput(value) {
    console.log(value);
    this.setData({
      currentendDate: value.detail,
    });
  },

  onstartconfirm(value) {
    console.log(value);
    this.setData({
      currentstartDate: value.detail,
      activeName: '2',
    });
  },
  onendconfirm(value) {
    console.log(value);
    this.setData({
      currentendDate: value.detail,
      activeName: '1',
    });
  },


  //人数
  onTotalChange(value) {
    this.setData({
      total: value.detail,
    });
  },
  //地点
  onPlaceChange(value) {
    this.setData({
      place: value.detail,
    });
  },

  /**
   * @description 时间戳格式转换
   * @param {*} event 
   */

  timeStampHandle(timestamp) {
    // 创建一个 Date 对象并传入时间戳
    const date = new Date(timestamp);
    // 获取年、月、日、小时和分钟
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0'); // 月份从 0 开始，需要加 1
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    console.log(date, year, month, day, hours, minutes);
    // 构建最终的日期时间字符串
    const formattedDateTime = `${year}-${month}-${day}T${hours}:${minutes}:00`;
    return formattedDateTime; // 输出: 2024-02-26T16:00:00
  },

  /**
   * @description 标签切换
   * @param {*} options 
   */
  onChange(event) {
    let intention = parseInt(event.detail.index) + 1
    //发送请求
    this.requestGroup(intention)
    wx.showToast({
      title: `切换至${event.detail.title}组`,
      icon: 'none',
    });
  },

  //冒泡框
  showPopup() {
    this.setData({
      show: true
    });
  },
  onClose() {
    this.setData({
      show: false
    });
  },

  /**
   * @description 表单提交
   * @param {*} groupid 
   */
  async onFormSubmmit() {
    let start = this.timeStampHandle(this.data.currentstartDate);
    let end = this.timeStampHandle(this.data.currentendDate);
    let option = {
      start: start,
      end: end,
      //人数
      total: parseInt(this.data.total),
      //地点
      place: this.data.place,
    };

    // 检查每个字段是否为空
    if (!option.start) {
      console.log(option);
      // 处理当前开始日期为空的情况
      PopUp.Toast("开始日期不能空", 2, 1000);
      return;
    }
    if (!option.end) {
      // 处理当前结束日期为空的情况
      PopUp.Toast("结束日期不能空", 2, 1000);
      return;
    }
    if (!option.total) {
      // 处理人数为空的情况
      PopUp.Toast("人数不能为空", 2, 1000);
      return;
    }
    if (!option.place) {
      // 处理地点为空的情况
      PopUp.Toast("地点不能为空", 2, 1000);
      return;
    }
    try {
      const response = await TuTorInterview.createInterview(option);
      if (response.code === 200) {
        this.setData({
          show: false
        });
        PopUp.Toast(response.message, 1, 1500);
        this.requestGroup(this.data.active + 1)
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
   * @description 更改队列状态
   * @param {*} groupid 
   */
  async changeStatus(e) {
    console.log(e)
    let option = {
      periodId: parseInt(e.target.dataset.periodid),
      status: parseInt(e.target.dataset.status)
    }
    try {
      const response = await TuTorInterview.changeInterview(option);
      if (response.code === 200) {
        PopUp.Toast(response.message, 1, 1500);
        this.onLoad()
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
   * @description 场次查询请求
   * @param {*} options 
   */
  async requestGroup(groupid) {
    try {
      const response = await TuTorInterview.lookInterview(parseInt(groupid));
      if (response.code === 200) {
        const {
          data,
          message
        } = response;
        if (data.length === 0) {
          this.setData({
            timeArr: [],
            isStart: false
          })
          return
        }
        const Array = data.map(item => {
          const startTime = formatTimestamp(item.start);
          const endTime = formatTimestamp(item.end);
          return {
            id: item.id,
            start: startTime,
            round: item.round,
            end: endTime,
            total: item.total,
            place: item.place,
            booked: item.booked,
            status: item.status
          }
        });
        this.setData({
          timeArr: Array,
          isStart: true
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
   * @description 详情跳转
   */
  viewInfo(e) {
    if (Timer) {
      clearTimeout(Timer)
    }
    let periodid = e.target.dataset.periodid
    // 页面跳转 
    Timer = wx.navigateTo({
      url: '../B_viewQueue/B_viewQueue?periodid=' + periodid,
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad() {
    //查看面试队列请求
    this.requestGroup(1)
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
// pages/C_bookInterview/C_bookInterview.js
import Dialog from '@vant/weapp/dialog/dialog';
import PopUp from '../../../utils/tools/PopUp'
import { NewerInterview } from '../../../utils/request/api'
import formatTimestamp from '../../../utils/tools/time'
const app =getApp()
Page({
  /**
   * 页面的初始数据
   */
  data: {
    isStart: false,
    active: 0,
    name:'',
    groupName:'',
    place:'',
    total:'',//当前场次预约面试的人数
    timeArr: [
    ],
    selected: -1,  // 初始化为-1，表示无选中项
    avatarUrl:app.globalData.avatarUrl
  },
  onChange(event) {
    console.log(event)
    this.setData({
      active: event.detail.index,
    });
    // wx.showToast({
    //   title: `切换到 ${event.detail.title}`,
    //   icon: 'none',
    // });
  },
  onOpen:async function(event) {

  },
  
  onClose() {
  },
  Select: async function (event) {
    console.log('event', event)
    const { index } = event.currentTarget.dataset;
  const id = this.data.timeArr[index].id;
  const time = this.data.timeArr[index].start + ' 到 ' + this.data.timeArr[index].end;
  const place = this.data.timeArr[index].place;
  const total = this.data.timeArr[index].total;
  const msg = '时间：' + time + '\n地点：' + place + '\n已预约面试的人数：' + total;
    console.log(time)
    Dialog.confirm({
      title: '确认预约场次' + id + '?',
      message: msg,
      messageAlign: 'left',
    })
      .then(async () => {
        // on confirm
        try {
          const response = await NewerInterview.bookTime(id,false);
          console.log('response', response);
          if (response.code == 200) {
            setTimeout(() => {
              PopUp.Toast('预约成功！', 1, 2000);
            }, 1000);
            setTimeout(() => {
              wx.redirectTo({
                url: '/packageB/pages/C_loginIn/C_loginIn?param1=' + this.data.place + '&param2=' + this.data.groupName+'&param3=' + this.data.name
              })
            }, 4000);
          }else if(response.code == 205){
            setTimeout(() => {
              PopUp.Toast(response.message, 2, 2000);
            }, 1000);
            setTimeout(() => {
              wx.redirectTo({
                url: '/packageB/pages/C_loginIn/C_loginIn?param1=' + this.data.place + '&param2=' + this.data.groupName
                +'&param3=' + this.data.name
              })
            }, 4000);
          }else if(response.code == 107){
            setTimeout(() => {
              PopUp.Toast(response.message, 3, 2000);
            }, 1000);
          }else{
              PopUp.Toast(response.message, 2, 2000);
          }
        } catch {
          PopUp.Toast('预约失败！', 2, 2000);
        }
      })
      .catch(() => {
        // on cancel
        PopUp.Toast('取消操作成功！', 1, 2000);
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
      if (response.code === 200) {
        const {data,message} = response;
        const {name,groupName,interviewPeriodVos} = data;
        const Array = interviewPeriodVos.map(item => {
          const startTime = formatTimestamp(item.start);
          // console.log('startTime',startTime)
          const endDay = formatTimestamp(item.end);
          const endTime = endDay.slice(5);
          return { id: item.id,start:startTime,end:endTime,total:item.total,place:item.place}
        });
        this.setData({
          name:name,
          groupName:groupName,
          timeArr:Array
        })
        // console.log(Array)
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

// pages/C_queue/C_queue.js
import PopUp from '../../../utils/tools/PopUp'
import NewerInterview from '../../../utils/request/api'
import socket from '../../../utils/tools/websocket'

const app = getApp();
Page({

  /* 页面的初始数据*/
  data: {
    socket: null,
    type: '', //init初始化，flush刷新人数，signIn 签到 
    response: {}
  },

  /*生命周期函数--监听页面加载*/
  onLoad: async function (options) {
    wx.setNavigationBarTitle({
      title: 'QG面试',
    });
   
  
    // const header = {
    //   'content-type': 'application/json',
    //   'platformToken': wx.getStorageSync("platformToken")
    // };
    // const that = this; // 保存页面对象的引用
    // const socket = connectWebSocket(header, function (res) {
    //   // 处理接收到的消息
    //   console.log('收到的信息', res.data);
    //   const result = res.data.split('|');
    //   const part1 = result[0];
    //   const part2 = result[1];
    //   console.log('part1', part1);
    //   console.log('part2', part2);
    //  that.setData({
    //     type: part1,
    //     response: part2
    //   })
    // });
    // this.setData({
    //   socket: socket
    // });
    // this.data.socket.connect(); // 建立WebSocket连接
    // this.data.socket.send('init'); // 发送消息
  },

  reflesh: async function () {
    // console.log(555)
    try{
      // const socket = await connectWebSocket(function (res) {
      //   // console.log(111)
      //   console.log('收到更新的信息', res.data);
      //   // const result = res.data.split('|');
      //   // const part1 = result[0];
      //   // const part2 = result[1];
      //   // console.log('part1', part1);
      //   // console.log('part2', part2);
      //   // that.globalData.message = {
      //   //   type: part1,
      //   //   response: part2
      //   // };
      // });
      // socket.send('flush');
      socket.request('flush', 'flush', (res)=>{
        console.log('收到更新的信息', JSON.parse(res).data);
            });
    }catch{
   console.log('无法更新')
    }

  },
  cancelSignIn: async function () {
    const result = await PopUp.Confirm('是否确认取消签到？');
    console.log(result)
    if (result) {
      console.log('取消签到？', result);
      try {
        socket.request('cancelSignIn', 'cancelSignIn', (res)=>{
          console.log('收到更新的信息', res)
          const response = JSON.parse(res);
          if (response.code === 200) {
            PopUp.Toast(response.message, 1, 2000);
          }else if(response.code === 205){
            PopUp.Toast(response.message, 2, 2000);
          }else {
            PopUp.Toast('取消签到失败', 2, 2000);
          }
        });
      } catch (error) {
        // 处理请求失败的情况
        PopUp.Toast('请求失败', 3, 2000);
      }
    } else {
      PopUp.Toast('操作取消', 3, 2000);
    }
  },

  /* 生命周期函数--监听页面初次渲染完成 */
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
   
    // if (socket) {
    //   socket.close()
    // }
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

  /* 用户点击右上角分享 */
  onShareAppMessage() {

  }
})
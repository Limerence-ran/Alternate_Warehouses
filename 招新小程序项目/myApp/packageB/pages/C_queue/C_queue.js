// pages/C_queue/C_queue.js
import PopUp from '../../../utils/tools/PopUp'
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
  },

  reflesh: async function () {
    try {
      socket.request('flush', 'flush', (res) => {
        if(res.code == 200){
          PopUp.Toast(res.message,1,2000);
        }else if(res.code == 205){
          PopUp.Toast(res.message,2,2000)
        }else{
          PopUp.Toast('更新失败',2,2000)
        }
        console.log('收到更新的信息', res);
      });
    } catch {
      console.log('无法更新')
    }
  },
  cancelSignIn: async function () {
    const result = await PopUp.Confirm('是否确认取消签到？');
    console.log(result)
    if (result) {
      console.log('取消签到？', result);
      try {
        socket.request('cancelSignIn', 'cancelSignIn', (res) => {
          console.log('收到更新的信息', res)
          const response = JSON.parse(res);
          if (response.code === 200) {
            PopUp.Toast(response.message, 1, 2000);
            setTimeout(() => {
              wx.redirectTo({
                url: '../C_signIn/C_signIn',
              })
            }, 3000)
          } else if (response.code === 205) {
            PopUp.Toast(response.message, 2, 2000);
          } else {
            PopUp.Toast(response.message, 2, 2000);
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
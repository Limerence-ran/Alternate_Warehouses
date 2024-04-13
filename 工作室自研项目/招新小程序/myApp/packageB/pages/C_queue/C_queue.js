// pages/C_queue/C_queue.js
import PopUp from '../../../utils/tools/PopUp'
import socket from '../../../utils/tools/websocket'
import Dialog from '@vant/weapp/dialog/dialog';
import formatTimestamp from '../../../utils/tools/time'
const app = getApp();
Page({
  /* 页面的初始数据*/
  data: {
    socket: null,
    type: '', //init初始化，flush刷新人数，signIn 签到 
    response: {},
    name: '',
    place: '',
    mySigned: '', //我的派号
    now: '', //现在面到的序号
    start: '', //面试开始时间
    end: '' //面试结束时间
  },

  /*生命周期函数--监听页面加载*/
  onLoad: async function (options) {
    let that = this
    //发送第一次更新
    try {
      socket.request('flush', 'flush', (res) => {
        console.log('flush', res)
        const result = JSON.parse(res);
        if (result.code == 200 || result.code == 506) {
          const {
            groupName,
            name,
            place,
            mySigned,
            now,
            start,
            end,
          } = result.data;
          that.setData({
            name: name,
            place: place,
            mySigned: mySigned,
            now: now,
            start: formatTimestamp(start),
            end: formatTimestamp(end),
          })
        } else if (result.code == 401) {
          PopUp.Toast(result.message, 2, 2000)
          wx.removeStorageSync('platformToken')
          setTimeout(() => {
            wx.redirectTo({
              url: '/pages/index/index',
            })
          }, 2000)
        } else {
          PopUp.Toast(result.message, 2, 2000)
        }
      });
    } catch {
      console.log('无法更新')
    }
    // 注册消息拦截器
    socket.registerOnMessageCallback(function (res) {
      // 处理收到的消息
      console.log('Received message:', res);
      if (res.type === 'next') {
        try {
          console.log('next', res)
          const result = res;
          if (result.code == 200 || result.code == 506) {
            that.setData({
              now: result.data,
            })
            if (result.data === that.data.mySigned) {
              this.tip()
            }
          } else if (result.code == 401) {
            PopUp.Toast(result.message, 2, 2000)
            wx.removeStorageSync('platformToken')
            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/index/index',
              })
            }, 2000)
          } else {
            PopUp.Toast(result.message, 2, 2000)
          };
        } catch (e) {
          console.log('无法更新', e)
        }
      } else {
        return
      }
    });
  },

  /**
   * @description 面试到提醒
   */
  tip: function () {
    Dialog.confirm({
        title: '排队提醒',
        message: "到你面试了哦",
        messageAlign: 'center',
      })
      .then(async () => {
        // on confirm
        PopUp.Toast('冲冲冲', 1, 1500);
      })
      .catch(() => {
        // on cancel
        PopUp.Toast('记得报道哦', 1, 1500);
      });
  },

  /**
   * @description 主动更新
   */
  reflesh: async function () {
    try {
      socket.request('flush', 'flush', (res) => {
        const result = JSON.parse(res);
        console.log(result)
        if (result.code == 200 || result.code == 506) {
          const now = result.data.now;
          this.setData({
            now: now
          })
          console.log(result);
          PopUp.Toast(result.message, 1, 2000);
        } else if (result.code == 205) {
          PopUp.Toast(result.message, 2, 2000)
        } else {
          PopUp.Toast('更新失败', 2, 2000)
        }
        console.log('收到更新的信息', res);
      });
    } catch {
      console.log('无法更新')
    }
  },

  /**
   * @description 取消签到
   */
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
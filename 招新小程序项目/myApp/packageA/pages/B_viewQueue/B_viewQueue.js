// packageA/pages/B_viewQueue/B_viewQueue.js
import PopUp from '../../../utils/tools/PopUp'
import {
  Interview
} from '../../../utils/request/api_interview'
import {
  TuTorInterview
} from '../../../utils/request/api_admin'
import socket from '../../../utils/tools/websocket'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    periodid: null, //场次id
    newerInterviewQueueStatuses: [], //面试队列数组
    total: null, //面试人数
    status: null, //场次状态
  },

  /**
   * @description ws实时查看队列
   */
  websocketViewQueue() {
    try {
      socket.request(this.data.periodid, this.data.periodid, (res) => {
        const response = JSON.parse(res);
        if (response.code === 200) {
          this.setData({
            newerInterviewQueueStatuses: response.data.newerInterviewQueueStatuses,
            total: response.data.total,
          })
        } else {
          PopUp.Toast(response.message, 2, 2000);
        }
      });
    } catch (error) {
      // 处理请求失败的情况
      PopUp.Toast('请求失败', 3, 2000);
    }
  },

  /**
   * @description 改变场次状态
   * @param {*} groupid 
   */
  async changeStatus(e) {
    console.log(e, "改变场次状态");
    let option = {
      periodId: parseInt(this.data.periodid),
      status: parseInt(e.target.dataset.status ?? e.currentTarget.dataset.status)
    }
    try {
      const response = await TuTorInterview.changeInterview(option);
      if (response.code === 200) {
        PopUp.Toast(response.message, 1, 3000);
        this.setData({
          status: e.target.dataset.status ?? e.currentTarget.dataset.status
        })
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
   * @description 进行叫号
   * @param {*} options 
   */
  async nextOne() {
    let option = {
      id: parseInt(this.data.periodid)
    }
    try {
      const response = await Interview.interviewNext(option);
      if (response.code === 200) {
        PopUp.Toast(response.message, 1, 3000);
        //刷新数据
        this.websocketViewQueue()
        console.log("叫号成功,刷新数据");
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
      } else if (response.code == 504) {
        PopUp.Toast("叫号成功", 2, 3000);
        setTimeout(() => {
          PopUp.Toast("请联系下一位", 2, 3000);
        }, 3000)
        //刷新数据
        this.websocketViewQueue()
      } else {
        PopUp.Toast(response.message, 2, 3000);
        //刷新数据
        this.websocketViewQueue()
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      PopUp.Toast('请求失败', 3, 2000);
    }
  },

  /**
   * @description 设置异常
   * @param {*} options 
   */
  async isStrange(e) {
    let option = {
      status: parseInt(e.target.dataset.passed ?? e.currentTarget.dataset.passed),
      wid: parseInt(e.target.dataset.wid ?? e.currentTarget.dataset.wid)
    }
    try {
      const response = await Interview.interviewSetInterviewStatus(option);
      if (response.code === 200) {
        PopUp.Toast(response.message, 1, 1500);
        //刷新数据
        this.websocketViewQueue()
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
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    let that = this
    console.log(options);
    //接收参数
    this.setData({
      periodid: options.periodid,
      status: options.status
    })
    //发送ws
    this.websocketViewQueue()
    // 注册消息拦截器
    socket.registerOnMessageCallback(function (res) {
      // 处理收到的消息
      console.log('Received message:', res);
      if (res.type === 'manager') {
        try {
          console.log('manager', res)
          const result = res;
          if (result.code == 200) {
            console.log('数据刷新成功');
            that.setData({
              newerInterviewQueueStatuses: result.data.newerInterviewQueueStatuses,
              total: result.data.total,
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
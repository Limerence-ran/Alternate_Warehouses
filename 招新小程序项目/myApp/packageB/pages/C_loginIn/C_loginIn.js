import PopUp from '../../../utils/tools/PopUp'
import {
  NewerInterview
} from "../../../utils/request/api";
import socket from '../../../utils/tools/websocket'
import QQMapWX from '../../../utils/libs/qqmap-wx-jssdk'
import distance from '../../../utils/tools/Haversine'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    place:'',
    groupName:'',
    name:'',
    steps: [{
      text: '定位成功  2023-03-11 12：30',
      desc: '广东工业大学工学一号馆',
    },
    {
      text: '签到成功 2023-03-11 12：30',
      desc: '',
    },
    ],
    latitude: 0,
    longitude: 0,
    address:''
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
  },
  location: function () {
    // console.log('123')
    PopUp.Loading(true, '定位中');
    setTimeout(() => {
      PopUp.LoadingOff();
    }, 2000);
    setTimeout(() => {
      const that = this;
      wx.getLocation({
        type: 'gcj02', //返回可以用于wx.openLocation的经纬度
        success(res) {
          console.log('定位')
          console.log(res)
          that.setData({
            latitude: res.latitude,
            longitude: res.longitude
          });
          var qqmapsdk = new QQMapWX({
            key: 'MWRBZ-DFZCZ-JPBXP-ZRVVD-6WBHE-SFBZ4'
          });
          // 使用 qqmapsdk 对象的 reverseGeocoder 方法进行逆地址解析：通过用户的经纬度获取用户所在的地址信息
          qqmapsdk.reverseGeocoder({
            location: {
              // latitude: 23.32608,
              // longitude: 113.26436
              latitude: that.data.latitude,
              longitude: that.data.longitude
            },
            success: function (res) {
              console.log('成功', res);
              var standardAddress = res.result.formatted_addresses;
              var address = standardAddress.standard_address;
              console.log(address);//获取到了地址信息
              // 获取用户地址信息成功后，可以将目标地点的经纬度信息传给下一步的搜索方法
              let time =that.currentTime();
              that.setData({
                steps: [
                  ...that.data.steps,
                  {
                    text: '重新定位成功 ' + time,
                    desc: address
                  }
                ]
              });
            },
            fail: function (res) {
              console.log(res);
            },
          });
        }
      });

    }, 2500)
   
  },
  signUp: async function () {
    //简化代码
    const result = await PopUp.Confirm('是否确认签到？');
    if (result) {
      console.log('签到？', result);
      try {
        socket.request('signIn', 'signIn', (res) => {
          console.log('收到更新的信息', res);
          const response = JSON.parse(res);
          if (response.code === 200) {
            PopUp.Toast(response.message, 1, 2000);
            let time = this.currentTime();
            this.setData({
              steps: [
                ...this.data.steps,
                {
                  text: '签到成功 ' + time,
                  desc: '广东工业大学工学一号馆'
                }
              ]
            });
            setTimeout(() => {
              wx.redirectTo({
                url: '../C_queue/C_queue',
              })
            }, 4000)
          } else if (response.code === 205) {
            PopUp.Toast(response.message, 2, 2000);
          } else {
            PopUp.Toast('签到失败', 2, 2000);
          }
        });
      } catch (error) {
        // 处理请求失败的情况
        console.error('请求失败:', error);
        PopUp.Toast('请求失败', 3, 2000);
      }
    } else {
      PopUp.Toast('操作取消', 3, 2000);
    }
  },
  //取消预约
  Cancel: async function () {
    const result = await PopUp.Confirm('是否确认取消预约？');
    if (result) {
      console.log('取消预约？', result);
      try {
        const response = await NewerInterview.cancelBook();
        console.log('response', response);
        if (response.code === 200) {
          PopUp.Toast(response.message, 1, 2000);
          setTimeout(()=>{
          wx.navigateTo({
            url: '/packageB/pages/C_bookInterview/C_bookInterview',
          })
          },2000)
        } else {
          PopUp.Toast('取消预约失败', 2, 2000);
        }
      } catch (error) {
        // 处理请求失败的情况
        PopUp.Toast('请求失败', 3, 2000);
      }
    } else {
      PopUp.Toast('操作取消', 3, 2000);
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    console.log(options)
    this.setData({
      place:options.param1,
      groupName:options.param2,
      name:options.param3
        })
    wx.setNavigationBarTitle({
      title: 'QG面试',
    });
    const that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
        console.log('定位')
        console.log(res)
        that.setData({
          latitude: res.latitude,
          longitude: res.longitude
        });
        var qqmapsdk = new QQMapWX({
          key: 'MWRBZ-DFZCZ-JPBXP-ZRVVD-6WBHE-SFBZ4'
        });
        // 使用 qqmapsdk 对象的 reverseGeocoder 方法进行逆地址解析：通过用户的经纬度获取用户所在的地址信息
        qqmapsdk.reverseGeocoder({
          location: {
            latitude: that.data.latitude,
            longitude: that.data.longitude
          },
          success: function (res) {
            console.log('成功', res);
            var standardAddress = res.result.formatted_addresses;
            var address = standardAddress.standard_address;
            console.log(address);//获取到了地址信息
            let time = that.currentTime();
            that.setData({
              address:address,
              steps: [
                {
                  text: '定位成功 ' + time,
                  desc: address
                }
              ]
            });
          },
          fail: function (res) {
            console.log(res);
          },
        });
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
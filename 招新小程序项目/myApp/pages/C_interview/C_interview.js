// pages/C_interview/C_interview.js
import QQMapWX from '../../utils/libs/qqmap-wx-jssdk'
import distance from '../../utils/tools/Haversine'
Page({
  /* 页面的初始数据*/
  data: {
    latitude: 21.12908,
    longitude: 113.26436
  },

  /* 生命周期函数--监听页面加载*/
  onLoad(options) {
    let that = this;

  },
  //  * 生命周期函数--监听页面初次渲染完成
  getLocation() {
    console.log('定位')
    const kilo = distance(21.12908, 113.26436, 21.12908, 113.26432);//是否超过一千米距离
    console.log('kilo', kilo)
    const that = this;
    wx.getLocation({
      type: 'gcj02', //返回可以用于wx.openLocation的经纬度
      success(res) {
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
          },
          fail: function (res) {
            console.log(res);
          },
        });
        // 使用 qqmapsdk 对象的 search 方法进行周边搜索：传入目标地点的经纬度信息，设置搜索半径为1公里，进行周边搜索
        // qqmapsdk.search({
        //   keyword: '目标地点',
        //   location: {
        //     latitude: that.data.latitude,
        //     longitude: that.data.longitude
        //   },
        //   radius: 1000,
        //   success: function(res){
        //     console.log(res);
        //     // 获取周边搜索结果成功后，可以在页面中展示搜索结果
        //   },
        //   fail: function(res){
        //     console.log(res);
        //   }
        // });

      }
    });
  },
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {
    // let that = this;
    // wx.getLocation({
    //   type: "gcj02",
    //   success(res) {
    //     that.setData({
    //       latitude: res.latitude,
    //       longitude: res.longitude
    //     });
    //   }
    // });

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
});
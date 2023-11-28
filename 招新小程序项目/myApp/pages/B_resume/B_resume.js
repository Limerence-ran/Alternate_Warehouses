// pages/B_resume/B_resume.js
  // import { NewerInterview} from '/utils/request/api.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    shakeAnimation:{},
    userInfo:{}
  },
  initInfo: async function () {
  // try {
  //   const response = await NewerInterview.Info();
    
  //   if (response.code === 200 && response.data) {
  //     let data = response.data;
  //     this.setData({
  //       userInfo:data
  //     });
  //     // wx.setStorageSync('userInfo', response.data);// 如果接口返回的数据中包含了用户信息，可以将用户信息存储到本地缓存中
  //   } else {
     
  //     wx.showToast({
  //       title: '简历渲染失败',
  //       icon: 'none'
  //     });
  //   }
  // } catch (error) {
  //   // 处理请求失败的情况
  //   console.error('请求失败:', error);
  //   wx.showToast({
  //     title: '发送请求失败',
  //     icon: 'none'
  //   });
  // }
},
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
  wx.setNavigationBarTitle({
    title: '个人简历',
  });
this.initInfo();

  const animation = wx.createAnimation({
    duration: 100,
    timingFunction: 'ease',
  });
  // 定义一个抖动动画序列
  function shake() {
    animation.rotateZ(-10).step();
    animation.rotateZ(10).step();
    animation.rotateZ(-10).step();
    animation.rotateZ(10).step();
    animation.rotateZ(0).step();
    this.setData({
      shakeAnimation: animation.export(),
    });
  };
  setTimeout(() => {
    shake.call(this); // 调用 shake 函数开始执行抖动动画
  }, 1000);

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
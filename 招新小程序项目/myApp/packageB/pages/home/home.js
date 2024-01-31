// pages/home/home.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    loadingComplete: false,
    groups: [{
      id: 0,
      group: '工业软件-前端组',
      icon: '../../../utils/svg/web_icon.svg',
      text: '叹为观止的视觉冲击\n只是我们的冰山一角',
      url: "../../../utils/svg/web.svg",
      isShow: false
    },
    {
      id: 1,
      group: '工业软件-后台组',
      icon: '../../../utils/svg/sql_icon.svg',
      text: '无处不在的数据流量\n正是我们的崇山峻岭',
      url: "../../../utils/svg/sql.svg",
      isShow: false
    },
    {
      id: 2,
      group: '人工智能组',
      icon: '../../../utils/svg/ai_icon.svg',
      text: '智联世界只是我们的起点\n\n生成未来才是我们的目标',
      url: "../../../utils/svg/ai.svg",
      isShow: false
    },
    {
      id: 3,
      group: '移动组',
      icon: '../../../utils/svg/mobile_icon.svg',
      text: '其实\n\n我们每一天都在发现连接世界的无限可能',
      url: "../../../utils/svg/mobile.svg",
      isShow: false
    },
    {
      id: 4,
      group: '嵌入式组',
      icon: '../../../utils/svg/embedded_icon.svg',
      text: '生逢万物互联的时代\n\n微小的我们也蕴含着无穷的力量',
      url: "../../../utils/svg/embedded.svg",
      isShow: false
    },
    {
      id: 5,
      group: '设计组',
      icon: '../../../utils/svg/ui_icon.svg',
      text: '作为产品的设计师\n\n我们要让美丽与功能完美融合',
      url: "../../../utils/svg/ui.svg",
      isShow: false
    },
    {
      id: 6,
      group: '图形组',
      icon: '../../../utils/svg/graph_icon.svg',
      text: '你还在想象什么？\n\n快和我们一起\n创造身临其境的奇迹吧！',
      url: "../../../utils/svg/graph.svg",
      isShow: false
    }
    ],
  },

  /**
   * view自动上滑函数--监听页面滚动
   */
  viewScroll: function () {
    const that = this;
    wx.createSelectorQuery().selectAll('.group').boundingClientRect(function (rects) {
      if (rects && rects.length > 0) {
        rects.forEach(function (rect, index) {
          if (rect.top < 730) {
            let targets = that.data.groups;
            targets[index].isShow = true;
            that.setData({
              groups: targets
            })
          } else {
            let targets = that.data.groups;
            targets[index].isShow = false;
            that.setData({
              groups: targets
            })
          }
        });
      }
    }).exec();
  },

  /**
   * 页面行为监听事件--页面滚动
   */
  onPageScroll() {
    this.viewScroll()
  },



  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 模拟页面加载
    setTimeout(() => {
      this.setData({
        loadingComplete: true
      })
    }, 3000)
    // setTimeout(() => {
    //   let result = PopUp.Confirm('你还未报名，是否要跳转到报名页面？');
    //   console.log('result', result)
    //   if (result) {
    //     // on confirm
    //     console.log('确定')
    //     try {
    //       setTimeout(() => {
    //         wx.navigateTo({
    //           url: '../C_resume/C_resume',
    //           events: {
    //             // 为指定事件添加一个监听器，获取被打开页面传送到当前页面的数据

    //           },
    //           success: function (res) {
    //             // 通过eventChannel向被打开页面传送数据

    //           }
    //         })
    //       }, 1000)

    //     } catch (error) {
    //       // 处理请求失败的情况

    //     }
    //   }
    // }, 5000)


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
    setTimeout(() => {
      this.viewScroll()
    }, 3000)
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
  onPullDownRefresh() { },

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
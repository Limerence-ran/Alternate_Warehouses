const app = getApp();
Component({
  // behaviors: [GlobalDataBehavior],
  properties: {
  },
  data: {
    activeIndex: 0
  },
  attached() {
    this.setData({
      activeIndex: app.globalData.activeIndex
    }, () => {
      // 数据设置完成后，进行组件的渲染
      // this.triggerEvent('renderComponent');
    });
  },
  methods: {
    handleNavTap(e) {
      const { index } = e.currentTarget.dataset;
      console.log('导航到页面', index)
      app.globalData.activeIndex = index;
      console.log("app.globalData.activeIndex", app.globalData.activeIndex)
      if (index == 0) {
        console.log('进去了')
        setTimeout(() => {
          wx.navigateTo({
            url: '/packageB/pages/C_bookInterview/C_bookInterview'
          })
        }, 1000)
      } else if (index == 1) {
        wx.navigateTo({
          url: '/packageB/pages/C_score/C_score'
        })
      } else if (index == 2) {
        wx.navigateTo({
          url: '/packageA/pages/B_resume/B_resume'
        })
      }
    }
  }
})
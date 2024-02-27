const app = getApp();
import PopUp from '../../utils/tools/PopUp'
Component({
  // behaviors: [GlobalDataBehavior],
  properties: {},
  data: {
    activeIndex: 0,
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
      const {
        index
      } = e.currentTarget.dataset;
      console.log('导航到页面', index)
      app.globalData.activeIndex = index;
      console.log("app.globalData.activeIndex", app.globalData.activeIndex)
      if (index == 0) {
        try {
          console.log(app.globalData.wssInitInfo);
          const {
            code,
            message
          } = app.globalData.wssInitInfo
          if (code == 103) { //未预约
            setTimeout(() => {
              wx.redirectTo({
                url: '/packageB/pages/C_bookInterview/C_bookInterview'
              })
            }, 1000)
          } else if (code == 104) { //未签到
            setTimeout(() => {
              wx.redirectTo({
                url: '/packageB/pages/C_signIn/C_signIn'
              })
            }, 1000)
          } else if (code == 105) { //面试已结束
            PopUp(message, 2, 1000)
          } else if (code == 200) { //已签到
            setTimeout(() => {
              wx.redirectTo({
                url: '/packageB/pages/C_queue/C_queue'
              })
            }, 1000)
          } else if (code == 102) { //未报名
            PopUp(message, 2, 1000)
          }
        } catch (err) {
          console.log(err);
          // ws未连接
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }, 2000)
        }

      } else if (index == 1) {
        wx.redirectTo({
          url: '/packageB/pages/C_score/C_score'
        })
      } else if (index == 2) {
        wx.redirectTo({
          url: '/packageB/pages/C_resume/C_resume'
        })
      }
    }
  }
})
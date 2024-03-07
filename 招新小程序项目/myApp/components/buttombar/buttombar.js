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
      console.log(app.globalData.wssInitInfo);
      const {
        code,
        message
      } = app.globalData.wssInitInfo
      if (index == 0) {
        try {
          if (code == 103) { //未预约
            setTimeout(() => {
              wx.redirectTo({
                url: '/packageB/pages/C_bookInterview/C_bookInterview'
              })
            }, 500)
          } else if (code == 104) { //未签到
            setTimeout(() => {
              wx.redirectTo({
                url: '/packageB/pages/C_signIn/C_signIn'
              })
            }, 500)
          } else if (code == 105 || code == 508) { //面试已结束
            PopUp.Toast(message, 2, 1000)
          } else if (code == 200) { //已签到
            setTimeout(() => {
              wx.redirectTo({
                url: '/packageB/pages/C_queue/C_queue'
              })
            }, 500)
          } else if (code == 102 || code == 101 || code == 113) { //未报名//没通过上一轮//笔试没通过
            PopUp.Toast(message, 2, 1000)
          }
        } catch (err) {
          console.log(err);
          // ws未连接
          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/index/index',
            })
          }, 500)
        }

      } else if (index == 1) {
        wx.redirectTo({
          url: '/packageB/pages/C_score/C_score'
        })
      } else if (index == 2) {
        if (code == 101) {
          PopUp.Toast(message, 2, 3000)
          setTimeout(function () {
            wx.redirectTo({
              url: '/packageB/pages/C_register/C_register'
            })
          }, 3000)
        }
        wx.redirectTo({
          url: '/packageB/pages/C_resume/C_resume'
        })
      }
    }
  }
})
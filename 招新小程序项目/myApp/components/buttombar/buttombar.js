// components/buttombar/buttombar.js
Component({

  /**
   * 组件的属性列表
   */
  properties: {
    activeIndex: {
      type: Number,
      value: 0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleTabbarClick(e) {
      const index = e.currentTarget.dataset.index
      this.triggerEvent('tabbarclick', { index })
    },
    handleNavTap(e) {
      const { index } = e.currentTarget.dataset;
      console.log('导航到页面',index)
      this.setData({
        activeIndex: index
      });
      if(index==0){
        console.log('进去了')
        wx.redirectTo({
          url: '/pages/C_bookInterview/C_bookInterview'
        })
      }else if(index==1){
      wx.redirectTo({
        url: '/pages/C_score/C_score'
      })
     }else if(index==2){
      wx.redirectTo({
        url: '/pages/B_resume/B_resume'
      })
     }
    }
  }
})
const app = getApp();
const GlobalDataBehavior = Behavior({
  definitionFilter(defFields, definitionFilterArr) {
    const index = app.globalData.activeIndex;
    console.log(index)
    defFields.observers = {
      'index': function (index) {
        console.log('全局数据发生变化', index);
        // 在这里可以执行相应的逻辑
        this.setData({
          activeIndex: activeIndex
        });
      }
    };
  }
});

Component({
  behaviors: [GlobalDataBehavior],
  properties: {
  },

  data: {
    activeIndex: 0
  },
  observers: {
    'app.globalData.activeIndex': function (activeIndex) {
      console.log(111)
      console.log('全局数据发生变化', activeIndex);
      this.setData({
        activeIndex: app.globalData.activeIndex
      });
    }
  },
  created() {
    console.log('组件 created');
   const activeIndex = app.globalData.activeIndex;
   this.setData({
    activeIndex:activeIndex
   })
  },

  methods: {
    
     handleNavTap(e) {
      const { index } = e.currentTarget.dataset;
      console.log('导航到页面',index)
      app.globalData.activeIndex = index;
      this.setData({
        activeIndex:index
      })
     console.log("app.globalData.activeIndex",app.globalData.activeIndex)
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
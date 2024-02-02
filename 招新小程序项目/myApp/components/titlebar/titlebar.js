// components/titlebar/titlebar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    //要接收数据的名称
    contentType: {
      // type 要接收的数据的类型
      type: String,
      // value默认值（没穿是的默认值）
      value: 'logo'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.navBarHeight,
    menuRight: app.globalData.menuRight,
    menuBotton: app.globalData.menuBotton,
    menuHeight: app.globalData.menuHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menu() {
      console.log(666);
      wx.redirectTo({
        url: '../../pages/Freshman_side/Freshman_side'
      })
    }
  }
})
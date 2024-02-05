// components/titlebar/titlebar.js
const app = getApp()
Component({
  /**
   * 组件的属性列表-定制高复用头部导航栏
   */
  properties: {
    //要接收数据的名称
    contentType: {
      // type 要接收的数据的类型
      type: String,
      // value 默认值（没穿是的默认值）
      value: 'logo'
    },
    fontContent: {
      type: String,
      value: 'QG工作室'
    },
  },

  /**
   * 组件的初始数据
   */
  data: {
    navBarHeight: app.globalData.systemInfo.statusBarHeight + 44, //导航栏高度
  },

  /**
   * 组件的方法列表
   */
  methods: {
    menu() {
      return
    }
  }
})
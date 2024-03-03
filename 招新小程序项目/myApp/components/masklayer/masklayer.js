// components/masklayer/masklayer.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
  },


  onClickShow() {
    this.setData({ show: true });
  },

  onClickHide() {
    this.setData({ show: false });
  },

  noop() {},

  
  /**
   * 组件的方法列表
   */
  methods: {

  }
})

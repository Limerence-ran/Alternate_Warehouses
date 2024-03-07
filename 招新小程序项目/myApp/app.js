// app.js 
import socket from './utils/tools/websocket'
App({
  globalData: {
    validtoken: null, //进行token合法性校验
    nextdata: null, //next主动接受的信息
    hastoken: null, //进行token存在性判断
    message: '',
    userInfo: null,
    avatarUrl: wx.getStorageSync('avatarUrl') || '', //头像
    nickName: wx.getStorageSync('nickName') || '', //昵称
    platformToken: '', //token占位符(在index页面中进行注入)
    activeIndex: 0, //底部导航栏索引
    systemInfo: null, //系统信息
    menuButtonBoundingClientRect: null, //胶囊位置信息
    identity: wx.getStorageSync('identity') || '', //用户身份User已报名,Tourist未报名,Admin管理员
    freshmanInfo: null,
    wssInitInfo: null
  },

  onLaunch() {
    // 连接websocket
    socket.connect(this.globalData);
    //获取机型和胶囊信息
    this.getSystemInfomation()
  },

  // 切换后台
  onShow() {
    console.log('ws重启，前台');
    // 重连websocket
    socket.connect(this.globalData);
  },

  // 切入前台
  onHide() {
    console.log('ws关闭，后台');
    // 关闭websocket
    socket.close();
  },

  /**
   * @description 定义发布订阅函数
   */
  watch(method, property) {
    var obj = this.globalData;
    Object.defineProperty(obj, `${property}`, {
      configurable: true, //描述属性是否配置，以及可否删除 
      //false 时不能删除当前属性且不能重新配置当前属性的描述符
      //true 时可以删除当前属性且可以配置当前属性所有描述符
      enumerable: true, //描述属性是否会出现在for in 或者 Object.keys()的遍历中
      set: function (value) {
        console.log(this, '全局数据');
        this[`_${property}`] = value;
        console.log('全局数据发生改变')
        method(value);
      },
      get: function () {
        console.log('全局数据接受读取')
        return this[`_${property}`]
      }
    })
  },

  /**
   * 获取机型相关信息
   */
  getSystemInfomation() {
    // 获取系统信息
    this.globalData.systemInfo = wx.getSystemInfoSync();
    // 胶囊按钮位置信息
    this.globalData.menuButtonBoundingClientRect = wx.getMenuButtonBoundingClientRect();
    // 导航栏高度 = 状态栏高度 + 44
  }
})
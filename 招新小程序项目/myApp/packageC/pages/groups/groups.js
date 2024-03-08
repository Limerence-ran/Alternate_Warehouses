// packageC/pages/groups/groups.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    content: [{
      name: '前端组',
      description: 'QG前端组专注于培养以JavaScript为基础的大前端技术人才，致力于创造高审美度、高安全性、高可视化的用户交互界面。同时我们在多段开发、服务端开发、产品设计、视觉设计等方法正探索一条属于前端的全栈之路。',
      word: ['javascript', 'h5', 'css3', 'vue', 'react', 'uniapp', '小程序', 'nodejs', 'svelte', 'typescript', 'reactnative'],
      url: '../../../utils/svg/web_icon.svg'
    }, {
      name: '后台组',
      description: 'QG后台组以 Java 语言为主，Go 语言为辅，深入各式中间件、高性能架构、分布式系统等，专精于服务端开发，负责对数据和信息进行处理，作为桥梁打通各个小组的联系，提供高性能、高可用、高扩展的后端服务。',
      word: ['java', 'go', 'jdbc', 'mybatis', 'servlet', 'tomcat', 'ssm', 'springcloud', 'rpc', 'mq'],
      url: '../../../utils/svg/sql_icon.svg'
    }, {
      name: '移动组',
      description: 'QG移动组专注于Android开发，组内主要使用Java和Kotlin语言，同时在应用程序开发过程中灵活运用各种主流框架。我们致力于编写高效可靠的移动客户端，以满足用户需求和提供出色的体验。',
      word: ['Android', 'Java', 'Kotlin', 'Jetpack', 'Compose', 'OkHttp', 'Broadcast', 'xml', 'WebSocket', 'Sqlite'],
      url: '../../../utils/svg/mobile_icon.svg'
    }, {
      name: '人工智能组',
      description: 'QG工作室人工智能组主要研究方向为“分布式人工智能系统(Multi-agentSystem)”、“差分隐私(Differential Privacy)“及”智能交通与交通大数据(Connected and Automated Vehicle)“等三大前沿领域并结合现今AI前沿知识不断研究与探索。本小组承担了各类研究项目 50 余项，产出了学术论文 40 余篇。',
      word: ['Python', 'MAS', 'DP', 'CAV', 'PyTorch', 'MindSpore', 'DL', 'ML', 'Kindness'],
      url: '../../../utils/svg/ai_icon.svg'
    }, {
      name: '嵌入式组',
      description: 'QG嵌入式组的方向为基于OpenHarmony、ARM+LINUX平台以及嵌入式AI的车联网编队等嵌入式软件开发方向，小组的学习方式主要是多组联动、以项目为驱动，目前完成多项国家级大创项目、获得过多次重要奖项',
      word: ['51', 'stm32', 'arm', '树莓派', 'c', 'c++', 'linux', 'QT', 'openhamony', 'AI'],
      url: '../../../utils/svg/embedded_icon.svg'
    }, {
      name: '图形组',
      description: 'QG工作室图形组的主要研究方向是实时渲染、物理仿真、AR/VR开发和游戏开发相关渲染技术，以计算机图形学为学习方向，通过学习DX11、OpenGL等图形API理解图形渲染的底层原理，使用Unity3D/虚幻开发仿真平台、AR/VR及其他交互式媒体应用。',
      word: ['c++', 'c#', 'unity', 'unreal', 'hlsl', 'shaderlab', 'rasterization', 'ray tracing', 'rendering', 'simulation'],
      url: '../../../utils/svg/graph_icon.svg'
    }, {
      name: '设计组',
      description: 'QG设计组负责根据产品需求和用户需求，设计用户界面的外观和交互方式。利用设计工具和技术，如 Ps、Ai、figma等，创建用户界面的原型和设计稿。需要与其他开发团队成员进行紧密合作，传达设计需求，确保整体开发流程的协调和顺利进行。',
      word: ['ui/ux', 'ps', 'ai', 'figma', 'app', 'web', 'color', 'Axure', 'blender'],
      url: '../../../utils/svg/ui_icon.svg'
    }],
    id: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    //接收参数
    this.setData({
      id: parseInt(options.id)
    })
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
  onPullDownRefresh() {

  },

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
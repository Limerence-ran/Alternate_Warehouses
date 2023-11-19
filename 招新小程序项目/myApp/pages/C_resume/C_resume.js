// pages/C_resume/C_resume.js
import Toast from '@vant/weapp/toast/toast';
import { request } from "../../utils/request/request";

Page({

  /**
   * 页面的初始数据
   */
  data: {
    arraySex: ['男', '女'],
    indexSex: 0,
    arrayDir: ['前端组', '后台组','移动组','人工智能组','嵌入式组','图形组','设计组'],
    indexDir: 0,
    arrayMajor: ['是', '否'],
    indexMajor: 0,
    showPickerPop: false,
    name:"",
    english: "",
    age: "",
    club: "",
    dormitory: "",
    motto: "",
    studentId: "",
    phone: "",
    rank: "",
    college: "",
    cExperiment: "",
    cTheory: "",
    formSubmitted: false // 控制表单是否已经提交
  },
  bindPickerChangeSex: function(e) {
    this.setData({
      indexSex: e.detail.value,
      showPickerPop: false
    })
  },
  bindPickerChangeDir: function(e) {
    this.setData({
      indexDir: e.detail.value,
      showPickerPop: false
    })
  },
  bindPickerChangeMajor: function(e) {
    this.setData({
      indexMajor: e.detail.value,
      showPickerPop: false
    })
  },
  showPicker: function() {
    this.setData({
      showPickerPop: true
    })
  },
  editClick: function() {
    this.setData({
      inputFocus: true
    });
  },
  formSubmit: function (e) {
    console.log(e)
    this.setData({
      formSubmitted: true,
      name:e.detail.value.name,
      english: e.detail.value.english ,
      age:e.detail.value.age,
      club: e.detail.value.club,
      dormitory: e.detail.value.dormitory,
      motto: e.detail.value.motto,
      studentId:e.detail.value.studentId,
      phone: e.detail.value.phone,
      rank: e.detail.value.rank,
      college: e.detail.value.college,
      cExperiment: e.detail.value.cExperiment,
      cTheory:e.detail.value.cTheory 
    });
    Toast.success('提交成功');
    try {
      const token = wx.getStorageSync('token');
      if (token) {
        request(
          "http://example.com/api", 
          "POST",
           {
            name:this.data.name,
            english:this.data.english,
            age:this.data.age,
            club: this.data.club,
            dormitory: this.data.dormitory,
            motto: this.data.motto,
            studentId: this.data.studentId,
            phone: this.data.phone,
            rank: this.data.rank,
            college: this.data.college,
            cExperiment: this.data.cExperiment,
            cTheory:this.data.cTheory,
            gender:this.data.arraySex[this.data.indexSex],
            flunk:this.data.arrayMajor[this.data.indexMajor],
            intention:this.data.arrayDir[this.data.indexDir]
           },
            token, 
            { 
            loading: { title: "加载中", icon: "loading" }
            }
            ).then(response => {
            console.log("请求成功:", response);
          })
          .catch(error => {
            console.error("请求失败:", error);
          });
      }
    } catch (e) {
     
    }
    
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {
    // 设置顶部导航栏背景颜色和文字颜色
    
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
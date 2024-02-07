import Toast from '@vant/weapp/toast/toast';
import PopUp from '../../../utils/tools/PopUp';
import { NewerInterview } from '../../../utils/request/api'; //接口
import { checkForm } from "../../../utils/tools/checkForm"; //方法

Page({
  /**
   * 页面的初始数据
   */
  data: {
    arraySex: ['男', '女'],
    indexSex: 0,
    arrayDir: ['人工智能组','工业软件-前端组', '工业软件-后台组', '工业软件-移动组','嵌入式组', '图形组', '设计组'],
    indexDir: 0,
    arrayAcademy: ['计算机学院', '自动化学院', '信息工程学院', '物理与光电工程学院', '外国语学院', '机电工程学院', '土木与交通工程学院', '轻工化工学院', '材料与能源学院', '管理学院', '环境科学与工程学院', '艺术与设计学院', '法学院', '继续教育学院', '数学与统计学院', '马克思主义学院', '建筑与城市规划学院', '经济与贸易学院', '生物医药学院', '集成电路学院', '国际教育学院', '生态环境与资源学院', '先进制造学院'],
    indexAcademy: 0,
    arrayMajor: ['是', '否'],
    indexMajor: 0,
    showPickerPop: false,
    name: "",
    english: "",
    age: "",
    club: "",
    dormitory: "",
    motto: "",
    studentId: "",
    phone: "",
    gpa: "",
    major: "",
    cExperiment: "",
    cTheory: "",
    formSubmitted: false, // 控制表单是否已经提交
    loading: false,
    // 检查表单对象
    checkClass: {},
    isHide:false
  },

  // 公共函数，用于更改选择器的值
  changePickerValue(value, key) {
    const data = {};
    data[key] = value;
    data.showPickerPop = false;
    this.setData(data);
  },

  bindPickerChangeSex: function (e) {
    this.changePickerValue(e.detail.value, 'indexSex');
  },

  bindPickerChangeDir: function (e) {
    this.changePickerValue(e.detail.value, 'indexDir');
  },

  bindPickerChangeMajor: function (e) {
    this.changePickerValue(e.detail.value, 'indexMajor');
  },
  bindPickerChangeAcademy: function (e) {
    this.changePickerValue(e.detail.value, 'indexAcademy');
  },
  showPicker: function () {
    this.setData({
      showPickerPop: true
    })
  },


  checkEmpty: function () {

    let nameVal = this.data.name.trim();
    let ageVal = this.data.age.trim();
    let studentIdVal = this.data.studentId.trim();
    let majorVal = this.data.major.trim();
    let phoneVal = this.data.phone.trim();
    let gpaVal = this.data.gpa.trim();
    let {
      checkClass
    } = this.data;
    if (!nameVal) {
      wx.showToast({
        title: '请输入姓名',
        icon: 'none'
      });
      return false;
    };
    if (!checkClass.chinese(nameVal)) {
      wx.showToast({
        title: '姓名格式不正确，请检查',
        icon: 'none'
      });
      return false;
    };

    if (!ageVal) {
      wx.showToast({
        title: '请输入年龄',
        icon: 'none'
      });
      return false;
    };
    if (!checkClass.age(ageVal)) {
      wx.showToast({
        title: '年龄格式不正确，请检查',
        icon: 'none'
      });
      return false;
    };

    if (!studentIdVal) {
      wx.showToast({
        title: '请输入学号',
        icon: 'none'
      });
      return false;
    };
    if (!checkClass.numberNum(studentIdVal)) {
      wx.showToast({
        title: '学号格式不正确，请检查',
        icon: 'none'
      });
      return false;
    };
    if (!majorVal) {
      wx.showToast({
        title: '请输入专业班级',
        icon: 'none'
      });
      return false;
    };
    // if (!checkClass.chinese(classVal)) {
    //   wx.showToast({
    //     title: '专业班级格式不正确，请检查',
    //     icon: 'none'
    //   });
    //   return false;
    // };

    if (!phoneVal) {
      wx.showToast({
        title: '请输入手机号',
        icon: 'none'
      });
      return false;
    };
    if (!checkClass.numberPhone(phoneVal)) {
      wx.showToast({
        title: '手机号格式不正确，请检查',
        icon: 'none'
      });
      return false;
    };

    if (!gpaVal) {
      wx.showToast({
        title: '请输入绩点排名',
        icon: 'none'
      });
      return false;
    };
    if (!checkClass.number(gpaVal)) {
      wx.showToast({
        title: '绩点格式不正确，请检查',
        icon: 'none'
      });
      return false;
    };
    return true; // 验证通过，返回true
  },

  formSubmit:async function (e) {
    console.log(e);
    const data = {
      name: e.detail.value.name,
      english: e.detail.value.english,
      age: e.detail.value.age,
      organization: e.detail.value.club,
      dormitory: e.detail.value.dormitory,
      motto: e.detail.value.motto,
      studentId: e.detail.value.studentId,
      phone: e.detail.value.phone,
      gpa: e.detail.value.gpa,//rank绩点string改成绩点排名gpa int
      major: e.detail.value.major,
      cExperiment: e.detail.value.cExperiment,
      ctheory: e.detail.value.cTheory,
      gender: this.data.arraySex[this.data.indexSex],
      flunk: this.data.indexMajor,//0挂科，1没挂
      intention:this.data.arrayAcademy[this.data.indexDir] ,
      college: this.data.arrayAcademy[this.data.indexAcademy],
    };
    this.setData({
      ...data
    });
    let isEmpty = this.checkEmpty();
    console.log('isEmpty', isEmpty);
    if (isEmpty) {
      let result = await PopUp.Confirm('确认要提交报名表了吗？');
      if (result) {
        // on confirm
        try {
          console.log('data', data);
          const response = await NewerInterview.submitInfo(data);
          console.log('response', response);
          if (response.code === 200) {
            setTimeout(() => {
              this.setData({
                formSubmitted: true
              });
              Toast.success('报名成功');
            }, 1000);
            setTimeout(() => {
              wx.navigateTo({
                url: '/pages/home/home'
              });
            }, 3000);
          } else {
            wx.showToast({
              title: '报名失败',
              icon: 'none'
            });
          }
        } catch (error) {
          // 处理请求失败的情况
          console.error('请求失败:', error);
          wx.showToast({
            title: '请求失败',
            icon: 'none'
          });
        }
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad:async function(options) {
    wx.setNavigationBarTitle({
      title: '报名QG工作室'
    });
    
    let checkClass = new checkForm();
    this.setData({
      checkClass
    });
    try {
      const response = await NewerInterview.fool();
      console.log('response', response);
      let data = response.data;
      if (!data) {
       this.setData({
        isHide:data
      });
      } else {
      }
    } catch (error) {
      // 处理请求失败的情况
      console.error('请求失败:', error);
      wx.showToast({
        title: '请求失败',
        icon: 'none'
      });
    }
  


 

 
    
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
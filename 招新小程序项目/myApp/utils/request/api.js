import {Request} from './request'
// 放接口url
const Api = {
  // 登录接口
  loginUrl: 'login',
  //导师端设置接口

  // 新生面试接口
  formUrl:'enroll',
  resumeUrl:'newersInfo',
  getResume:'getResume',
  signUp: 'signIn',
  cancelBook:'cancelReserve',
  cancelSignIn:'cancelSignIn',
  bookTime:'reserve',
  getInterviewInfo:'getInterviewInfo',//查询场次
  getScore:'getScore',
 //统计接口
 //fool
 fool:'fool'
}

// 放各类请求
const NewerInterview = {
  login: (param) => {
    console.log(param,'param');
    return Request({
        url: Api.loginUrl,
        method: 'POST',
        data: {
            code: param
        }
    })
},
  submitInfo: (options) => {
    console.log('报名信息',options)
  return Request({
      url: Api.formUrl,
      method: 'POST',
      data: options
  })
},
resumeInfo: () => {
  return Request({
      url: Api.resumeUrl,
      method: 'GET'
  })
},
getResume: () => {
  return Request({
    url: Api.getResume,
    method: 'POST'
  })
},
  signUp: (platformToken) => {
      return Request({
          url: Api.signUp,
          method: 'POST'
      })
  },
  cancelBook: () => {
    return Request({
      url: Api.cancelBook,
      method: 'POST'
  })
  },
  cancelSignIn: () => {
    return Request({
      url: Api.cancelSignIn,
      method: 'POST'
  })
  },
  bookTime:(id) =>{
    return Request({
      url: Api.bookTime,
      method: 'POST',
      data:{
        id:id
      }
  })
  },
  fool:() =>{
    return Request({
      url: Api.fool,
      method: 'POST', 
  })
  },
  getInterviewInfo:() =>{
    return Request({
      url: Api.getInterviewInfo,
      method: 'POST', 
  })
  },
  getScore:()=>{
    return Request({
      url:Api.getScore,
      method: 'POST'
    })
  }
}

const TuTorInterview = {
   
}
const CountView = {
  
}
module.exports = {
  NewerInterview,
  TuTorInterview,
  CountView
};

//调用实例
// import { NewerInterview} from '../../Request/api'
// Login: async function (e) {
//   // 获取用户授权登录后得到的 code
//   const { code } = e.detail;
//   try {
//     const response = await NewerInterview.login(code);
//     console.log('登录成功:', response);
    
//     // 如果接口返回的数据中包含了用户信息，可以将用户信息存储到本地缓存中
//     if (response.code === 200 && response.data) {
//       wx.setStorageSync('userInfo', response.data);
//       // 跳转到首页或其他需要登录的页面
//       wx.navigateTo({
//         url: '/pages/home/home'
//       });
//     } else {
//       // 处理登录失败的情况
//       wx.showToast({
//         title: '登录失败',
//         icon: 'none'
//       });
//     }
//   } catch (error) {
//     // 处理请求失败的情况
//     console.error('请求失败:', error);
//     wx.showToast({
//       title: '请求失败',
//       icon: 'none'
//     });
//   }
// }

//调用实例
// import { NewerInterview} from '../../Request/api'
// fun: async function () {

//   try {
//     const response = await NewerInterview.login(code);
//     console.log('成功:', response);
    
//     // 如果接口返回的数据中包含了用户信息，可以将用户信息存储到本地缓存中
//     if (response.code === 200 && response.data) {
//       wx.setStorageSync('userInfo', response.data);
//     } else {
//       // 处理登录失败的情况
//       wx.showToast({
//         title: '失败',
//         icon: 'none'
//       });
//     }
//   } catch (error) {
//     // 处理请求失败的情况
//     console.error('请求失败:', error);
//     wx.showToast({
//       title: '请求失败',
//       icon: 'none'
//     });
//   }
// }
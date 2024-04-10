import {
  Request
} from './request'
// 放接口url
const Api = {
  // 登录接口
  loginUrl: 'login',
  // 新生面试接口
  formUrl: 'enroll',
  resumeUrl: 'newersInfo',
  getResume: 'getResume',
  signUp: 'signIn',
  cancelBook: 'cancelReserve',
  cancelSignIn: 'cancelSignIn',
  bookTime: 'reserve',
  getInterviewInfo: 'getInterviewInfo', //查询场次
  getScore: 'getScore',
  //智慧接口
  fool: 'fool2'
}

// 放各类请求
const NewerInterview = {
  login: (param) => {
    console.log(param, 'param');
    return Request({
      url: Api.loginUrl,
      method: 'POST',
      data: {
        code: param
      }
    })
  },
  submitInfo: (options) => {
    console.log('报名信息', options)
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
  bookTime: (id, showLoading) => {
    return Request({
      url: Api.bookTime,
      method: 'POST',
      data: {
        id: id
      },
      showLoading: showLoading
    })
  },
  fool: () => {
    return Request({
      url: Api.fool,
      method: 'POST',
    })
  },
  getInterviewInfo: () => {
    return Request({
      url: Api.getInterviewInfo,
      method: 'POST',
    })
  },
  getScore: () => {
    return Request({
      url: Api.getScore,
      method: 'POST'
    })
  }
}
module.exports = {
  NewerInterview,
};
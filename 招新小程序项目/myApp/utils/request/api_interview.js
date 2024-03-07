import {
  Request
} from './request_interview'
// 放接口url
const Api = {
  //面试设置接口
  callNext: 'callNext',
  setInterviewStatus: 'setInterviewStatus'
}

// 放各类请求
const Interview = {
  interviewNext: (options) => {
    console.log('叫号下一个', options)
    return Request({
      url: Api.callNext,
      method: 'POST',
      data: options
    })
  },
  interviewSetInterviewStatus:(options) => {
    console.log('设置异常', options)
    return Request({
      url: Api.setInterviewStatus,
      method: 'POST',
      data: options
    })
  },
}

module.exports = {
  Interview,
};
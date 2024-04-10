import {
  Request
} from './request_admin'
// 放接口url
const Api = {
  //导师端设置接口
  arrangeTime: 'arrangeTime',
  getQueue: 'getQueue',
  setQueueStatus: 'setQueueStatus',
}

// 放各类请求
const TuTorInterview = {
  createInterview: (options) => {
    console.log('创建信息', options)
    return Request({
      url: Api.arrangeTime,
      method: 'POST',
      data: options
    })
  },
  lookInterview: (groupid) => {
    console.log('查看信息', groupid)
    return Request({
      url: Api.getQueue + '/' + groupid,
      method: 'GET',
    })
  },
  changeInterview: (options) => {
    console.log('更改队列状态', options)
    return Request({
      url: Api.setQueueStatus,
      method: 'POST',
      data: options
    })
  },
}

module.exports = {
  TuTorInterview,
};
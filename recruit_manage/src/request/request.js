import axios from 'axios';
import { message } from 'antd';
// const DOMAIN = "http://text.moity-soeoe.xyz/newer/";  // 接口根路径
// const DOMAIN = "http://8.138.82.135:8082/";  // 接口根路径
const DOMAIN = "https://qgailab.com/newer/";  // 接口根路径
const Request = axios.create({
    baseURL:DOMAIN,
    //  headers: { 'X-Custom-Header': 'foobar' }
})

// axios拦截器
// 请求拦截器，用于在发送请求前对请求进行处理，包括设置请求头信息等。
Request.interceptors.request.use(config => { 
  // 在发送请求之前做些什么
  const token = window.sessionStorage.getItem('platformToken');
  
  let flag = config.url.indexOf("login") === -1 ;
  // 设置请求头，非登录接口都要加上token
  if(flag){
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',
      'platformToken': token
    }
  }
  else{
    config.headers = {
      'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8',   //登录不用token
    }
  }

  return config
}, error => { 
  message.error({content: '请求超时!'});
  return Promise.resolve(error);
})

// 响应拦截器，用于在接收到响应后对响应进行处理，包括处理不同的状态码，并给出相应的提示信息
Request.interceptors.response.use(data=> {
  console.log('data',data)
  if(!data){
    message.error({content: '数据获取异常'});
    return;
  }
  return data;
}, err=> {
  console.log('err', err)
  if (err.response.status === 500 || err.response.status === 404) {
    message.error({content: '服务器出现问题！'});
  } else if (err.response.status === 401) {
    message.error({content: '请先登录!'});
  } else if (err.response.status === 403) {
    message.error({content: '权限不足,请联系管理员!'});
  }else {
    message.error({content: '未知错误！'});
  }
  return Promise.resolve(err);
})


export default Request














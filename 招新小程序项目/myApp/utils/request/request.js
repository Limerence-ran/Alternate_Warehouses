// const baseUrl = 'http://8.138.82.135:8082/'
import PopUp from '../tools/PopUp'
const baseUrl = 'https://qgailab.com/newer/newers/'
const Request = (options)=> {
  const {
    url,
    data,
    method,
    responseType,
} = options;

const postHead = {
  'content-type': "application/json",
  'platformToken': wx.getStorageSync("platformToken")
};
let getHead = {
  'content-type': 'application/json',
  'appletToken': wx.getStorageSync("appletToken"),
};
let putHead = {
  'content-type': "application/json",
  'appletToken': wx.getStorageSync("appletToken")
};
  return new Promise((resolve, reject) => {
    PopUp.Loading(true,'加载中');
    wx.request({
      url: url.startsWith("http")? url : baseUrl + url,
      method: method|| 'POST',
      data: data|| {},
      header: method === 'GET' ? getHead : method === 'PUT' ? putHead : postHead, // 根据类型确定请求头
      success(res) {
         setTimeout(() => {
          PopUp.LoadingOff(); // 请求成功后隐藏加载提示
         }, 3000);
        resolve(res.data);
      },
      fail(err) {
        setTimeout(() => {
          PopUp.LoadingOff(); // 请求成功后隐藏加载提示
         }, 3000);
        reject(err);
      }
    });
  });
}
module.exports = {
  Request
};

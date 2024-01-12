
const baseUrl = 'http://39.98.41.126:31129/'
import PopUp from '../tools/PopUp'


const Request = (options)=> {
  const {
    url,
    data,
    method,
    responseType,
} = options;
// const option =  { 
//   loading: { title: "加载中", icon: "loading" }
// };
const postHead = {
  'content-type': "application/x-www-form-urlencoded"
};
let getHead = {
  'content-type': 'application/json',
  'appletToken': wx.getStorageSync("appletToken"),
};
let putHead = {
  'content-type': "application/x-www-form-urlencoded",
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

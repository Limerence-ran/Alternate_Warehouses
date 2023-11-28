
const baseUrl = 'https://qgailab.com/newer2023/'


const Request = (options)=> {
  const {
    url,
    data,
    method,
    responseType,
} = options;
const option =  { 
  loading: { title: "加载中", icon: "loading" }
};
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
    if (option && option.loading) {
     setTimeout(() => {
      wx.showToast({
        title: option.loading.title || "加载中",
        icon: option.loading.icon || "loading",
      });
     }, 1000);
    }
    wx.request({
      url: url.startsWith("http")? url : baseUrl + url,
      method: method|| 'POST',
      data: data|| {},
      header: method === 'GET' ? getHead : method === 'PUT' ? putHead : postHead, // 根据类型确定请求头
      success(res) {
       
        if (option && option.loading) {
         setTimeout(() => {
          wx.hideToast(); // 请求成功后隐藏加载提示
         }, 5000);
        }
        resolve(res.data);
      },
      fail(err) {
        if (option && option.loading) {
       setTimeout(() => {
        wx.hideToast(); // 请求失败时隐藏加载提示
       }, 5000);
        }
        reject(err);
      }
    });
  });
}
module.exports = {
  Request
};

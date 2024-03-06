import PopUp from '../tools/PopUp';
const baseUrl = 'https://qgailab.com/newer/newers/';

const Request = (options) => {
  const { url, data, method, responseType, showLoading } = { showLoading: true, ...options };

  const postHead = {
    'content-type': "application/json",
    'platformToken': wx.getStorageSync("platformToken")
  };
  
  let getHead = {
    'content-type': 'application/json',
    'platformToken': wx.getStorageSync("platformToken"),
  };
  let putHead = {
    'content-type': "application/json",
    'platformToken': wx.getStorageSync("platformToken")
  };
  
  return new Promise((resolve, reject) => {
    if (showLoading) { // 根据传入的showLoading参数判断是否显示加载提示
      PopUp.Loading(true, '加载中');
    }
    wx.request({
      url: url.startsWith("http") ? url : baseUrl + url,
      method: method || 'POST',
      data: data || {},
      header: method === 'GET' ? getHead : method === 'PUT' ? putHead : postHead,
      success(res) {
        if (showLoading) { // 请求成功后隐藏加载提示
          setTimeout(() => {
            PopUp.LoadingOff();
          }, 500);
        }
        resolve(res.data);
      },
      fail(err) {
        if (showLoading) { // 请求失败后隐藏加载提示
          setTimeout(() => {
            PopUp.LoadingOff();
          }, 500);
        }
        reject(err);
      }
    });
  });
}

module.exports = {
  Request
};
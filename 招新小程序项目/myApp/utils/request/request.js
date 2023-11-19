function request(url, method, data, token, option) {

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
      url: url,
      method: method,
      data: data,
      header: {
        Authorization: "Bearer " + token
      },
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


// 导入request
module.exports={request}


// request(
//   "http://example.com/api", 
//   "POST",
//    {
//       name: "mumu",
//        age: 18
//    },
//     "your_token_here", 
//     { 
//     loading: { title: "加载中", icon: "loading" }
//     }
//     ).then(response => {
//     console.log("请求成功:", response);
//   })
//   .catch(error => {
//     console.error("请求失败:", error);
//   });



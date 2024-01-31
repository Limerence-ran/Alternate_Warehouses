// index.js
// 获取应用实例
import { NewerInterview } from '../../utils/request/api'
import PopUp from '../../utils/tools/PopUp'
const app = getApp()
Page({
  data: {
    avatarUrl: '',
    // userInfo: {},
    hasLogin: false,
    // canIUseGetUserProfile: false
  },
  onLoad() {
    wx.getSetting({
      success (res) {
        console.log(res.authSetting)
        // res.authSetting = {
        //   "scope.userInfo": true,
        //   "scope.userLocation": true
        // }
      }
    })
    // if (wx.getUserProfile) {
    //   this.setData({
    //     canIUseGetUserProfile: true
    //   })
    //   console.log(app.globalData)
    // }

  },
  onNicknameChange() {
    console.log('昵称改变了')
    setTimeout(() => {
      wx.redirectTo({
        url: '../../packageB/pages/home/home'
      })
    }, 2000)

  },
  login() {
    wx.login({
      async success(res) {
        if (res.code) {
          console.log(res.code, 'code', res);
          try {
            const response = await NewerInterview.login(res.code);
            console.log('成功:', response);
            if (response.code === 200 && response.data) {
              //把新生端Token存储到本地
              wx.setStorageSync('platformToken', response.data.platformToken);
              PopUp.Toast(response.message, 1, 2000);
            } else {
              // 处理登录失败的情况
              PopUp.Toast('授权失败', 2, 2000);
            }
          } catch (error) {
            // 处理请求失败的情况
            console.error('请求失败:', error);
            PopUp.Toast('请求失败', 2, 2000);
          }
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    });
    this.setData({
      hasLogin: true
    })
  },

  onChooseAvatar(e) {
    const { avatarUrl } = e.detail
    wx.setStorageSync('avatarUrl',avatarUrl);
    this.setData({
      avatarUrl,
    })
  }
})

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
import PopUp from './PopUp'
let timer = null //防抖标识

function processModule(code, name, hashTip) {
  console.log(hashTip[code]);
  if (!hashTip[code]) {
    PopUp.Toast('请检查网络', 2, 1500);
    return
  }
  switch (name) {
    // 预约
    case 'bookInterview':
      if (code === 103) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          wx.navigateTo({
            url: '../C_bookInterview/C_bookInterview',
          })
        }, 500)
      } else if (code === 101 || code === 113 || code === 102) {
        PopUp.Toast(hashTip[code], 2, 1500)
      } else {
        PopUp.Toast('已完成预约', 2, 1500)
      }
      break;

      // 签到
    case 'signIn':
      if (code === 104) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          wx.navigateTo({
            url: '../C_signIn/C_signIn',
          })
        }, 500)
      } else if (code === 101 || code === 113 || code === 103 || code === 102) {
        PopUp.Toast(hashTip[code], 2, 1500)
      } else {
        PopUp.Toast('已完成签到', 2, 1500)
      }
      break;

      //排队
    case 'queue':
      if (code === 200 || code === 506) {
        if (timer) {
          clearTimeout(timer)
        }
        timer = setTimeout(() => {
          wx.navigateTo({
            url: '../C_queue/C_queue',
          })
        }, 500)
      } else if (code === 101 || code === 113 || code === 103 || code === 104 || code === 507 || code === 102) {
        PopUp.Toast(hashTip[code], 2, 1500)
      } else {
        PopUp.Toast('已完成面试', 2, 1500)
      }
      break;

      //默认
    default:
      break;
  }
}

module.exports = processModule;
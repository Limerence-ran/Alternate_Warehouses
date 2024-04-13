//挂载API类到全局Vue的自定义属性$api上
import api from '@/api'

export default {
  install (Vue) {
    Vue.prototype.$api = api
  }
}

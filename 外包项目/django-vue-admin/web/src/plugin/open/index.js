//挂载工具util.open到全局Vue的自定义属性$open上
import util from "@/libs/util";

export default {
  install(Vue, options) {
    Vue.prototype.$open = util.open;
  },
};

//设置生产环境时的文件路径
module.exports = (file) => () => import("@/views/" + file);

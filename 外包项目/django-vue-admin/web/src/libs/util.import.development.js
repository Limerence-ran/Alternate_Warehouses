//设置开发环境时的文件路径
module.exports = (file) => require("@/views/" + file).default;

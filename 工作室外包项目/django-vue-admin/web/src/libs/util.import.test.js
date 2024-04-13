//设置测试环境时的文件路径
module.exports = (file) => require("@/views/" + file).default;

const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  // 获取年、月、日
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，然后补齐两位
  const day = date.getDate().toString().padStart(2, '0'); // 补齐两位

  // 获取小时和分钟
  const hour = date.getHours().toString().padStart(2, '0'); 
  const minute = date.getMinutes().toString().padStart(2, '0'); 

  // 格式化为指定格式
  const formattedTimestamp = `${year}-${month}-${day} ${hour}:${minute}`;

  return formattedTimestamp;
};
module.exports = formatTimestamp;
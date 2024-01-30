//时间戳转化为特定格式2024-12-05 09:00-10:00
const formatTimestamp = (timestamp) => {
  const date = new Date(timestamp);
  // 获取年、月、日
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // 月份从0开始，需要加1，然后补齐两位
  const day = date.getDate().toString().padStart(2, '0'); // 补齐两位

  // 获取小时和分钟
  const hour = date.getHours().toString().padStart(2, '0'); 
  const minute = date.getMinutes().toString().padStart(2, '0'); 

  // 结束时间为开始时间加1小时
  const endDate = new Date(date.getTime() + 60 * 60 * 1000);
  const endHour = endDate.getHours().toString().padStart(2, '0'); 
  const endMinute = endDate.getMinutes().toString().padStart(2, '0'); 

  // 格式化为指定格式
  const formattedTimestamp = `${year}-${month}-${day} ${hour}:${minute}-${endHour}:${endMinute}`;

  return formattedTimestamp;
}
module.exports = formatTimestamp;
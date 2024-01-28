const distance=  function(lat1, lon1, lat2, lon2) {
  const radLat1 = lat1 * Math.PI / 180.0;
  const radLat2 = lat2 * Math.PI / 180.0;
  const deltaLat = radLat1 - radLat2;
  const deltaLon = lon1 * Math.PI / 180.0 - lon2 * Math.PI / 180.0;
  const a = Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
            Math.cos(radLat1) * Math.cos(radLat2) *
            Math.sin(deltaLon / 2) * Math.sin(deltaLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const d = 6371 * c;
  return d >= 1; // 判断距离是否超过1千米
}

module.exports = distance;

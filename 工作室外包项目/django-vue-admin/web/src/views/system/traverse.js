//深度遍历辅助函数
export function traverse(obj) {
  if (Array.isArray(obj)) {
    return obj.map((item) => traverse(item));
  } else if (typeof obj === "object") {
    const newObj = {};
    for (let key in obj) {
      if (key === "name") {
        newObj["label"] = obj[key];
      } else if (key === "id") {
        newObj["value"] = obj[key];
      } else if (key === "children" && obj[key].length === 0) {
        continue;
      } else {
        newObj[key] = traverse(obj[key]);
      }
    }
    return newObj;
  } else {
    return obj;
  }
}

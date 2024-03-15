import { request } from "@/api/service";

export const urlPrefix = "/api/eval_config/";

/**
 * @description 获取配置信息
 * @param {*} query
 * @returns
 */
export function GetList() {
  return request({
    url: urlPrefix,
    method: "get",
  });
}

/**
 * @description 修改配置信息
 * @param {*} obj
 * @returns
 */
export function UpdateObj(id, obj) {
  return request({
    url: urlPrefix + id + "/",
    method: "put",
    data: obj,
  });
}

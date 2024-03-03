import { request, requestForFormData, downloadFile } from "@/api/service";
export const urlPrefix = "/api/live_eval_task/";
export const urlStopLiveQUalityDetect = "/api/live_eval/end_nr_live_eval/";

export function GetList(query) {
  return request({
    url: urlPrefix,
    method: "get",
    params: { ...query },
  });
}

/**
 * @description 结束检测任务接口
 * @param id
 */
export function stopDetectData(params) {
  let urlRequest = urlStopLiveQUalityDetect;
  return request({
    url: urlRequest,
    params: params,
    method: "get",
  });
}

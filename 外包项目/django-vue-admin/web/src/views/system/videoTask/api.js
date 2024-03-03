import { request, requestForFormData, downloadFile } from "@/api/service";
export const urlPrefix = "/api/video_eval_task/";
export const urlStopAllQUalityDetect = "/api/video_eval/end_video_eval/";

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
  let urlRequest = urlStopAllQUalityDetect;
  return request({
    url: urlRequest,
    params: params,
    method: "get",
  });
}

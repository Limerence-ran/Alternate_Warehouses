import { request, requestForFormData, downloadFile } from "@/api/service";
// 发起视频信息查询
export const urlVideoEval = "/api/video_eval/";
// 创建视频参考文件
export const urlCreateRefFile = "/api/ref_video_eval/create_video/";
// 发起视频参考文件查询
export const urlRefFileSearch = "/api/ref_video_eval/";
// 发起视频信息检测任务
export const urlVideoEvalDetect = "/api/video_eval/detect_video_codec/";
// 传入视频id发起评估任务
export const urlNrQUalityDetect = "/api/video_eval/video_quality_eval_nr/";
export const urlRefQUalityDetect = "/api/video_eval/video_quality_eval_ref/";
export const urlAllQUalityDetect = "/api/video_eval/video_quality_eval/";

// 传入任务id查询任务详情
export const urlNrTaskResult = "/api/video_nr_eval_task_result/";
export const urlRefTaskResult = "/api/video_ref_eval_task_result/";
export const urlAllTaskResult = "/api/video_eval_task_result/";

// 传入任务id结束评估任务
export const urlStopNrQUalityDetect = "/api/video_eval/end_nr_video_eval/";
export const urlStopRefQUalityDetect = "/api/video_eval/end_ref_video_eval/";
export const urlStopAllQUalityDetect = "/api/video_eval/end_video_eval/";

// 对每一类方法进行有参考任务与无参考任务的请求路径分流

/**
 * @description 查询视频检测任务结果
 * @param {*} query
 * @param {*} type
 * @returns
 */
export function GetDetectResult(query, type = "nr") {
  let urlRequest = "";
  type === "nr"
    ? (urlRequest = urlNrTaskResult)
    : type === "ref"
    ? (urlRequest = urlRefTaskResult)
    : (urlRequest = urlAllTaskResult);
  return request({
    url: urlRequest,
    method: "get",
    params: { ...query },
  });
}

/**
 * @description 视频文件信息查询接口
 * @param id
 */
export function videoEvalData(params) {
  return request({
    url: urlVideoEval,
    params: params,
    method: "get",
  });
}

/**
 * @description 视频文件信息任务接口
 * @param {*} params
 * @param {*} type
 * @returns
 */
export function videoEvalTask(params) {
  return request({
    url: urlVideoEvalDetect,
    params: params,
    method: "get",
  });
}

/**
 * @description 发起检测任务接口
 * @param id
 */
export function startDetectData(params, type = "nr") {
  let urlRequest = "";
  type === "nr"
    ? (urlRequest = urlNrQUalityDetect)
    : type === "ref"
    ? (urlRequest = urlRefQUalityDetect)
    : (urlRequest = urlAllQUalityDetect);
  return request({
    url: urlRequest,
    params: params,
    method: "get",
  });
}

/**
 * @description 结束检测任务接口
 * @param id
 */
export function stopDetectData(params, type = "nr") {
  let urlRequest = "";
  type === "nr"
    ? (urlRequest = urlStopNrQUalityDetect)
    : type === "ref"
    ? (urlRequest = urlStopRefQUalityDetect)
    : (urlRequest = urlStopAllQUalityDetect);
  return request({
    url: urlRequest,
    params: params,
    method: "get",
  });
}

/**
 * @description 查询参考文件
 * @param {*} id
 * @returns
 */
export function refFileSearch(id) {
  return request({
    url: urlRefFileSearch,
    method: "get",
    params: { video: id },
  });
}

/**
 * @description 新建参考文件
 */
export function refFileCreate(params) {
  return requestForFormData({
    url: urlCreateRefFile,
    method: "post",
    data: params,
  });
}

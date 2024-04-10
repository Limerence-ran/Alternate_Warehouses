import { request, requestForFormData, downloadFile } from "@/api/service";
// 发起直播流信息查询
export const urlLiveEval = "/api/live_eval/";
// 发起直播流信息检测任务
export const urlVideoEvalDetect = "/api/live_eval/detect_live_codec/";
// 传入直播id发起评估任务
export const urlLiveQUalityDetect = "/api/live_eval/live_quality_eval_nr/";
// 传入任务id查询任务详情
export const urlLiveTaskResult = "/api/live_eval_task_result/";
// 传入任务id结束评估任务
export const urlStopLiveQUalityDetect = "/api/live_eval/end_nr_live_eval/";
// 传入任务id获取直播流路径
export const urlGetLiveStream = "/api/live_eval_task_channel/";
// 传入历史任务id获取视频片段
export const urlGetVideoSegment = "/api/live_eval_task_video/";

// 传入任务id导出任务数据
export const urlExportTaskData = "/api/live_eval_task_result/export_data/";

// 传入任务id查询任务进度
export const urlPrefix = "/api/live_eval_task/";

/**
 * @description 查询任务进度
 */
export function getProgress(query) {
  return request({
    url: urlPrefix,
    method: "get",
    params: { ...query },
  });
}

/**
 * @description 查询直播检测任务结果
 * @param {*} query
 * @param {*} type
 * @returns
 */
export function GetDetectResult(query, type = "nr") {
  let urlRequest = urlLiveTaskResult;
  return request({
    url: urlRequest,
    method: "get",
    params: { ...query },
  });
}

/**
 * @description 直播流文件信息查询接口
 * @param id
 */
export function liveEvalData(params) {
  return request({
    url: urlLiveEval,
    params: params,
    method: "get",
  });
}

/**
 * @description 直播流文件信息任务接口
 * @param {*} params
 * @param {*} type
 * @returns
 */
export function liveEvalTask(params) {
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
  let urlRequest = urlLiveQUalityDetect;
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
  let urlRequest = urlStopLiveQUalityDetect;
  return request({
    url: urlRequest,
    params: params,
    method: "get",
  });
}

/**
 * @description 获取直播流路径接口
 * @param id
 */
export function GetLiveStream(params, type = "nr") {
  let urlRequest = urlGetLiveStream;
  return request({
    url: urlRequest,
    params: params,
    method: "get",
  });
}

/**
 * @description 获取直播视频片段接口
 * @param id
 */
export function GetVideoSegment(params, type = "nr") {
  let urlRequest = urlGetVideoSegment;
  return request({
    url: urlRequest,
    params: params,
    method: "get",
  });
}

/**
 * @description 导出任务数据
 */
export function exportData(query, type = "nr") {
  return downloadFile({
    url: urlExportTaskData,
    method: "get",
    params: { ...query },
  });
}

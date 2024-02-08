import getPieOptions from "../../utils/echart/pie"
import getColumnOptions from "../../utils/echart/column"
import * as echarts from "../../ec-canvas/echarts";

function initPieChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  var option = getPieOptions();
  chart.setOption(option);
  return chart;
}
function initColumnChart(canvas, width, height, dpr) {
  const chart = echarts.init(canvas, null, {
    width: width,
    height: height,
    devicePixelRatio: dpr // 像素
  });
  canvas.setChart(chart);
  var option = getColumnOptions();
  chart.setOption(option);
  return chart;
}
Page({
  data: {
    ec: {
      onInit: initPieChart
    },
    ec1: {
      onInit:initColumnChart
    }
  }
});
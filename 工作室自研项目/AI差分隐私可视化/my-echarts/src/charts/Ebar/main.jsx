import React from "react";
import * as echarts from "echarts";

class EBar extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var chartDom = document.getElementById("Emainbar");
        var myChart = echarts.init(chartDom);
        var option;
        // prettier-ignore
        let dataAxis = [];
        console.log(this.props.resourceFormat);
        let data = this.props.data_xy.every_dot_var[0];
        for (let i = 0; i < data.length; i++) {
            dataAxis.push(this.props.resourceFormat[i]);
        }
        let yMax = 500;
        let dataShadow = [];
        for (let i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }
        option = {
            backgroundColor: "rgb(214 216 254)",
            title: {
                text: "The Mean Var Of Data",
                bottom: "4%",
                left: "center",
                textStyle: {
                    color: "rgb(143 123 251)",
                    fontSize: "10px",
                    fontFamily: "Fieldstones-ExtraBold-BF64e566a80554d",
                },
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    // inside: true,
                    color: "#fff",
                },
                axisTick: {
                    show: false,
                },
                axisLine: {
                    show: false,
                },
                z: 10,
            },
            yAxis: {
                axisLine: {
                    show: false,
                },
                axisTick: {
                    show: false,
                },
                axisLabel: {
                    formatter: function (value) {
                        // 将数值改为以 10 的 n 次方形式展示
                        // 判断数值是否为负数
                        if (value < 0) {
                            value = -value; // 取绝对值
                            var exponent = Math.floor(Math.log10(value));
                            var base = value / Math.pow(10, exponent);
                            if (exponent === 0) {
                                return "-" + base;
                            } else if (exponent === 1) {
                                return "-" + base + "e";
                            }
                            return "-" + base + "e" + exponent;
                        } else if (value > 0) {
                            var exponent = Math.floor(Math.log10(value));
                            var base = value / Math.pow(10, exponent);
                            if (exponent === 0) {
                                return base;
                            } else if (exponent === 1) {
                                return base + "e";
                            }
                            return base + "e" + exponent;
                        } else {
                            return 0;
                        }
                    },
                    fontSize: "10px",
                    fontFamily: "Fieldstones-ExtraBold-BF64e566a80554d",
                    color: "grey",
                },
            },
            dataZoom: [
                {
                    type: "inside",
                },
            ],
            tooltip: {
                formatter: "var :  {c}  ",
                show: true,
            },
            toolbox: {
                show: true,
                feature: { saveAsImage: { title: false } },
            },
            grid: {
                containLabel: true, // 将坐标轴标签的宽度计算在内
            },
            series: [
                {
                    type: "bar",
                    showBackground: true,
                    itemStyle: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                            { offset: 0, color: "#83bff6" },
                            { offset: 0.5, color: "#188df0" },
                            { offset: 1, color: "#188df0" },
                        ]),
                    },
                    emphasis: {
                        itemStyle: {
                            color: new echarts.graphic.LinearGradient(
                                0,
                                0,
                                0,
                                1,
                                [
                                    { offset: 0, color: "#2378f7" },
                                    { offset: 0.7, color: "#2378f7" },
                                    { offset: 1, color: "#83bff6" },
                                ]
                            ),
                        },
                    },
                    label: {
                        show: false,
                    },

                    data: data,
                },
            ],
        };
        // Enable data zoom when user click bar.
        const zoomSize = 6;
        let isZoom = false; // 添加一个标志位，用于记录是否已经进行了缩放操作
        myChart.on("click", function (params) {
            if (isZoom) {
                myChart.dispatchAction({
                    type: "dataZoom",
                    startValue: 0, // 设置为原始数据的起始值
                    endValue: data[data.length - 1], // 设置为原始数据的结束值
                });
                isZoom = false; // 更新标志位
            } else {
                // 已经进行了缩放操作，再次点击时恢复原始大小
                myChart.dispatchAction({
                    type: "dataZoom",
                    startValue:
                        dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)],
                    endValue:
                        dataAxis[
                            Math.min(
                                params.dataIndex + zoomSize / 2,
                                data.length - 1
                            )
                        ],
                });
                isZoom = true; // 更新标志位
            }
        });

        option && myChart.setOption(option);
        // 监听窗口大小改变事件
        window.addEventListener("resize", function () {
            // 调整图表大小
            myChart.resize();
        });
    }
    render() {
        return (
            <div
                id="Emainbar"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            ></div>
        );
    }
}

export default EBar;

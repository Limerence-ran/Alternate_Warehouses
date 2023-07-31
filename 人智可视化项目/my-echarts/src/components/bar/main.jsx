import React from "react";
import * as echarts from "echarts";

class Bar extends React.Component {
    componentDidMount() {
        var chartDom = document.getElementById("main");
        var myChart = echarts.init(chartDom);
        var option;

        // prettier-ignore
        let dataAxis = ['点', '击', '柱', '子', '或', '者', '两', '指', '在', '触', '屏', '上', '滑', '动', '能', '够', '自', '动', '缩', '放'];
        // prettier-ignore
        let data = [220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];
        let yMax = 500;
        let dataShadow = [];
        for (let i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }
        option = {
            title: {
                text: "QG STUDIO",
                subtext: "Distributed AI System Based on Differential privacy",
                left: "center",
                textStyle: {
                    color: "rgb(143 123 251)",
                },
            },
            xAxis: {
                data: dataAxis,
                axisLabel: {
                    inside: true,
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
                    color: "#fff",
                },
            },
            dataZoom: [
                {
                    type: "inside",
                },
            ],
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
                    data: data,
                },
            ],
        };
        // Enable data zoom when user click bar.
        const zoomSize = 6;
        myChart.on("click", function (params) {
            console.log(dataAxis[Math.max(params.dataIndex - zoomSize / 2, 0)]);
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
        });

        option && myChart.setOption(option);
    }
    render() {
        return (
            <div
                id="main"
                style={{
                    width: "650px",
                    height: "400px",
                    backgroundColor: "rgb(214 216 254)",
                }}
            ></div>
        );
    }
}

export default Bar;

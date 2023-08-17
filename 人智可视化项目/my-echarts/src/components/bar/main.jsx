import React from "react";
import * as echarts from "echarts";

class Bar extends React.Component {
    constructor(props) {
        super(props);
    }
    componentDidMount() {
        var chartDom = document.getElementById("main");
        var myChart = echarts.init(chartDom);
        var option;

        // prettier-ignore
        let dataAxis = [];

        let data = this.props.data_xy.distance;

        //[220, 182, 191, 234, 290, 330, 310, 123, 442, 321, 90, 149, 210, 122, 133, 334, 198, 123, 125, 220];

        for (let i = 0; i < data.length; i++) {
            dataAxis.push("");
        }
        let yMax = 500;
        let dataShadow = [];
        for (let i = 0; i < data.length; i++) {
            dataShadow.push(yMax);
        }
        option = {
            backgroundColor: "rgb(214 216 254)",
            title: {
                text: "Magnitude of change",
                top: "1%",
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
            tooltip: {
                formatter: "distance : ( {c} ) ",
                show: true,
            },
            toolbox: {
                show: true,
                feature: { saveAsImage: { title: false } },
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
        // 监听窗口大小改变事件
        window.addEventListener("resize", function () {
            // 调整图表大小
            myChart.resize();
        });
    }
    render() {
        return (
            <div
                id="main"
                style={{
                    width: "100%",
                    height: "100%",
                }}
            ></div>
        );
    }
}

export default Bar;

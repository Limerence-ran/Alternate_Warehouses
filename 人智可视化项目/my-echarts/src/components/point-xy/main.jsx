import React from "react";

import ReactECharts from "echarts-for-react";
export default function Pointxy(props) {

    // 假设有两组数据分别是 data1 和 data2
    const data1 = props.before_data; // 第一组数据的坐标点 props.before_data

    const data2 = props.result_data; // 第二组数据的坐标点
    function getColorByIndex(index) {
        const colors = ["blue", "red", "green", "yellow", "purple", "orange"];
        return colors[index];
    }

    // 配置散点图的基本参数
    const option = {
        backgroundColor: "rgb(214 216 254)",
        legend: {
            bottom: 10,
            left: "center",
            itemWidth: 9,
            itemHeight: 9,
            data: ["Before processing", "After processing"],
        },
        xAxis: {
            axisLine: {
                //  改变x轴颜色
                lineStyle: {
                    color: "rgb(143 123 251)",
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                //  改变x轴字体颜色和大小
                //formatter: '{value} m³ ', //  给x轴添加单位
                textStyle: {
                    color: "#333",
                    fontSize: 12,
                },
            },
            splitLine: {
                lineStyle: {
                    color: "#E9E9E9",
                },
            },
        },
        yAxis: {
            axisLine: {
                //  改变y轴颜色
                lineStyle: {
                    color: "rgb(143 123 251)",
                },
            },
            axisTick: {
                show: false,
            },
            axisLabel: {
                //  改变y轴字体颜色和大小
                //formatter: '{value} m³ ', //  给y轴添加单位
                textStyle: {
                    color: "#333",
                    fontSize: 12,
                },
            },
            splitLine: {
                lineStyle: {
                    color: "#E9E9E9",
                },
            },
        },
        series: [
            {
                name: "Before processing",
                type: "scatter",
                data: data1.map(function (item, index) {
                    return {
                        value: item,
                        itemStyle: {
                            color: getColorByIndex(index),
                        },
                    };
                }),

                symbolSize: 15,
                symbol: "circle",
            },
            {
                name: "After processing",
                type: "scatter",
                data: data2.map(function (item, index) {
                    return {
                        value: item,
                        itemStyle: {
                            color: getColorByIndex(index),
                        },
                    };
                }),

                symbolSize: 15,
                symbol: "diamond",
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            theme={"AI隐私差分"}
            style={{ width: "500px", height: "300px" }}
        />
    );
}

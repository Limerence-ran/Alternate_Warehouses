import React from "react";

import ReactECharts from "echarts-for-react";
export default function Pointxy() {
    // 假设有两组数据分别是 data1 和 data2
    const data1 = [
        [10.0, 8.04],
        [8.07, 6.95],
        [13.0, 7.58],
        [9.05, 8.81],
        [11.0, 8.33],
        [14.0, 7.66],
        [13.4, 6.81],
        [10.0, 6.33],
        [14.0, 8.96],
        [12.5, 6.82],
        [9.15, 7.2],
        [11.5, 7.2],
        [3.03, 4.23],
        [12.2, 7.83],
        [2.02, 4.47],
        [1.05, 3.33],
        [4.05, 4.96],
        [6.03, 7.24],
        [12.0, 6.26],
        [12.0, 8.84],
        [7.08, 5.82],
        [5.02, 5.68],
    ]; // 第一组数据的坐标点

    const data2 = [
        [11.0, 8.04],
        [9.07, 6.95],
        [14.0, 7.58],
        [10.05, 8.81],
        [12.0, 8.33],
        [15.0, 7.66],
        [14.4, 6.81],
        [11.0, 6.33],
        [15.0, 8.96],
        [13.5, 6.82],
        [10.15, 7.2],
        [12.5, 7.2],
        [4.03, 4.23],
        [13.2, 7.83],
        [3.02, 4.47],
        [2.05, 3.33],
        [5.05, 4.96],
        [7.03, 7.24],
        [13.0, 6.26],
        [13.0, 8.84],
        [8.08, 5.82],
        [6.02, 5.68],
    ]; // 第二组数据的坐标点

    // 配置散点图的基本参数
    const option = {
        backgroundColor: "rgb(214 216 254)",
        legend: {
            bottom: 10,
            left: "center",
            itemWidth: 9,
            itemHeight: 9,
            data: ["处理前", "处理后"],
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
                name: "处理前",
                type: "scatter",
                data: data1,
                itemStyle: {
                    color: "blue",
                },
                symbolSize: 15,
            },
            {
                name: "处理后",
                type: "scatter",
                data: data2,
                itemStyle: {
                    color: "red",
                },
                symbolSize: 15,
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            theme={"AI隐私差分"}
            style={{ width: "650px", height: "400px" }}
        />
    );
}

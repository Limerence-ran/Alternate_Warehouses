import React from "react";
import ReactECharts from "echarts-for-react";
export default function PointNoise(props) {
    const xArray = props.data_xy.noise_x;
    const yArray = props.data_xy.noise_y;

    const combinedArray = xArray.map((x, index) => [x, yArray[index]]);

    const data1 = combinedArray;
    //this.props.data_xy.var
    // 配置散点图的基本参数
    const option = {
        backgroundColor: "rgb(214 216 254)",
        grid: { show: true, containLable: true },
        title: {
            text: `Noise parameters : ${props.data_xy.var}`,
            bottom: "2%",
            right: "10%", // 标题水平居中
            textStyle: {
                color: "#8998AC", // 标题字体颜色
                fontSize: 12, // 标题字体大小
            },
        },
        legend: {
            bottom: "2%",
            right: "center",
            data: ["noise"],
            textStyle: { color: "#3E9FFF", fontSize: 20 },
            itemHeight: 18,
            itemWidth: 18, // 修改icon图形大小
        },
        tooltip: { show: true, formatter: "coordinate : ( {c} ) " },
        toolbox: {
            show: true,
            feature: { saveAsImage: { title: false } },
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
                textStyle: {
                    color: "#333",
                    fontSize: 12,
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgb(143 123 251)",
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
                textStyle: {
                    color: "#333",
                    fontSize: 12,
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgb(143 123 251)",
                },
            },
        },
        series: [
            {
                name: "noise",
                type: "scatter",
                data: data1,
                itemStyle: {
                    color: "#3E9FFF",
                },
                symbolSize: 18,
            },
        ],
    };

    return (
        <ReactECharts
            option={option}
            notMerge={true}
            lazyUpdate={true}
            theme={"AI隐私差分"}
            style={{ width: "100%", height: "100%" }}
        />
    );
}

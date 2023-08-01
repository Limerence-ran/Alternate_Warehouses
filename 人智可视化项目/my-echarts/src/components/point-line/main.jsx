import React from "react";
import ReactECharts from "echarts-for-react";
export default function PointLine(props) {
    const xArray = props.noise_x;
    const yArray = props.noise_y;

    const combinedArray = xArray.map((x, index) => [x, yArray[index]]);

    const data1 = combinedArray;
    //this.props.data_xy.var
    // 配置散点图的基本参数
    const option = {
        backgroundColor: "rgb(214 216 254)",
        title: {
            text: `噪声参数:${props.var}`,
            left: "center", // 标题水平居中
            textStyle: {
                color: "#333", // 标题字体颜色
                fontSize: 18, // 标题字体大小
                fontWeight: "bold", // 标题字体粗细
            },
        },
        legend: {
            bottom: 10,
            left: "center",
            itemWidth: 9,
            itemHeight: 9,
            data: "噪声",
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
                name: "噪声",
                type: "scatter",
                data: data1,
                itemStyle: {
                    color: "blue",
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

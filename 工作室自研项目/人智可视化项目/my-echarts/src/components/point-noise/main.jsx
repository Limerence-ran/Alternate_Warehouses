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
            text: `Private Rank`,
            subtext: `Noise parameters : ${props.data_xy.var}`,
            bottom: "4%",
            right: "center", // 标题水平居中
            subtextStyle: {
                color: "#8998AC", // 标题字体颜色
                fontSize: 7, // 标题字体大小
            },
            textStyle: {
                color: "rgb(143 123 251)",
                fontSize: 10,
                fontFamily: "Fieldstones-ExtraBold-BF64e566a80554d",
            },
        },
        legend: {
            top: "5%",
            right: "center",
            data: ["noise"],
            textStyle: {
                color: "#3E9FFF",
                fontSize: "10px",
                fontFamily: "Fieldstones-ExtraBold-BF64e566a80554d",
            },
            itemHeight: 10,
            itemWidth: 10, // 修改icon图形大小
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
                formatter: function (value) {
                    // 将数值改为以 10 的 n 次方形式展示
                    // 判断数值是否为负数
                    if (value < 0) {
                        value = -value; // 取绝对值
                        var exponent = Math.floor(Math.log10(value));
                        var base = value / Math.pow(10, exponent);
                        if (exponent === 0) {
                            return "-" + base.toFixed(1);
                        } else if (exponent === 1) {
                            return "-" + base.toFixed(1) + "e";
                        }
                        return "-" + base.toFixed(1) + "e" + exponent;
                    } else if (value > 0) {
                        var exponent = Math.floor(Math.log10(value));
                        var base = value / Math.pow(10, exponent);
                        if (exponent === 0) {
                            return base.toFixed(1);
                        } else if (exponent === 1) {
                            return base.toFixed(1) + "e";
                        }
                        return base.toFixed(1) + "e" + exponent;
                    } else {
                        return 0;
                    }
                },
                //  改变x轴字体颜色和大小
                textStyle: {
                    fontSize: "10px",
                    fontFamily: "Fieldstones-ExtraBold-BF64e566a80554d",
                    color: "grey",
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
                formatter: function (value) {
                    // 将数值改为以 10 的 n 次方形式展示
                    // 判断数值是否为负数
                    if (value < 0) {
                        value = -value; // 取绝对值
                        var exponent = Math.floor(Math.log10(value));
                        var base = value / Math.pow(10, exponent);
                        if (exponent === 0) {
                            return "-" + base.toFixed(1);
                        } else if (exponent === 1) {
                            return "-" + base.toFixed(1) + "e";
                        }
                        return "-" + base.toFixed(1) + "e" + exponent;
                    } else if (value > 0) {
                        var exponent = Math.floor(Math.log10(value));
                        var base = value / Math.pow(10, exponent);
                        if (exponent === 0) {
                            return base.toFixed(1);
                        } else if (exponent === 1) {
                            return base.toFixed(1) + "e";
                        }
                        return base.toFixed(1) + "e" + exponent;
                    } else {
                        return 0;
                    }
                },
                //  改变y轴字体颜色和大小
                textStyle: {
                    fontSize: "10px",
                    fontFamily: "Fieldstones-ExtraBold-BF64e566a80554d",
                    color: "grey",
                },
            },
            splitLine: {
                lineStyle: {
                    color: "rgb(143 123 251)",
                },
            },
        },
        grid: {
            containLabel: true, // 将坐标轴标签的宽度计算在内
        },
        series: [
            {
                name: "noise",
                type: "scatter",
                data: data1,
                itemStyle: {
                    color: "#3E9FFF",
                },
                symbolSize: 6,
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

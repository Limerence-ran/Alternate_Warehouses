import React from "react";

import ReactECharts from "echarts-for-react";
export default function Pointxy(props) {

    // 假设有两组数据分别是 data1 和 data2
    const data1 = props.data_xy.before_data; // 第一组数据的坐标点 props.before_data
    const data2 = props.data_xy.result_data; // 第二组数据的坐标点
    const dataline = []; //连线数组
    data1.forEach((item, index) => {
        let arr1 = [];
        arr1.push(item);
        arr1.push(data2[index]);
        dataline.push(arr1);
    });
    const addLine = () => {
        for (let i = 0; i < dataline.length; i++) {
            option.series.push({
                type: "line",
                name: "Moving track",
                data: dataline[i],
                lineStyle: {
                    width: 4,
                    color: getColorByIndex(i), // 线条颜色
                    emphasis: {
                        focus: "self",
                    },
                },
                symbolSize: 0,
            });
        }
    };

    function getColorByIndex(index) {
        const colors = [
            "#6c50f3",
            "#00ffff",
            "#00ff00",
            "#00ff99",
            "#FF0087",
            "#FFBF00",
        ];
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
            data: [
                "Before processing",
                "After processing",
                { name: "Moving track", icon: "none" },
            ],

            itemStyle: {
                color: "rgb(143 123 251)",
            },
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
                    color: "#333",
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
                symbolSize: 20,
                symbol: "circle",
                itemStyle: {
                    color: "#6c50f3",
                    borderWidth: 3,
                    borderColor: "#fff",
                },
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

                symbolSize: 20,
                symbol: "diamond",
                itemStyle: {
                    color: "#6c50f3",
                    borderWidth: 3,
                    borderColor: "#fff",
                },
            },
        ],
    };
    addLine();
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

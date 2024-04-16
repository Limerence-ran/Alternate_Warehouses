import React, { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import * as echarts from "echarts";

export default function Liner() {
    const dataX = [
        "0:00",
        "1:00",
        "2:00",
        "3:00",
        "4:00",
        "5:00",
        "6:00",
        "7:00",
        "8:00",
        "9:00",
        "10:00",
        "11:00",
        "12:00",
        "13:00",
        "14:00",
        "15:00",
        "16:00",
        "17:00",
        "18:00",
        "19:00",
        "20:00",
        "21:00",
        "22:00",
        "23:00",
    ];
    const dataY = [
        30, 40, 30, 40, 30, 40, 30, 60, 20, 40, 30, 40, 30, 40, 30, 40, 30, 60,
        20, 40, 30, 40, 100, 60,
    ];
    const option = {
        tooltip: {
            trigger: "axis",
            fontSize: "10px",
        },
        legend: {
            top: "0%",
            // data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
            data: ["日流量变化"],
            textStyle: {
                color: "rgba(251, 237, 237, 1)",
                fontSize: "14px",
                fontFamily: 'cursive',
              
            }
        },

        grid: {
            left: "2%",
            top: "15%",
            right: "0%",
            bottom: "2%",
            containLabel: true
        },
        xAxis: [
            {
                type: "category",
                boundaryGap: false,
                // x轴更换数据
                data: dataX, // 使用数据中的时间作为横坐标数据
                // 文本颜色为rgba(255,255,255,.6)  文字大小为 12
                axisLabel: {
                    // interval: 0, // 强制显示所有横坐标刻度
                    rotate: 45, // 旋转角度，使横坐标文字不重叠
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12,
                    },
                },
                // x轴线的颜色为   rgba(255,255,255,.2)
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.2)",
                    },
                },
            },
        ],
        yAxis: [
            {
                type: "value",
                axisTick: { show: false },
                axisLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    },
                },
                axisLabel: {
                    textStyle: {
                        color: "rgba(255,255,255,.6)",
                        fontSize: 12,
                    },
                },
                // 修改分割线的颜色
                splitLine: {
                    lineStyle: {
                        color: "rgba(255,255,255,.1)",
                    },
                },
            },
        ],
        series: [
            {
                name: "日流量变化",
                type: "line",
                smooth: true,
                // 单独修改当前线条的样式
                lineStyle: {
                    color: "#0184d5",
                    width: "2",
                },
                // 填充颜色设置
                areaStyle: {
                    color: new echarts.graphic.LinearGradient(
                        0,
                        0,
                        0,
                        1,
                        [
                            {
                                offset: 0,
                                color: "rgba(1, 132, 213, 0.4)", // 渐变色的起始颜色
                            },
                            {
                                offset: 0.8,
                                color: "rgba(1, 132, 213, 0.1)", // 渐变线的结束颜色
                            },
                        ],
                        false
                    ),
                    shadowColor: "rgba(0, 0, 0, 0.1)",
                },
                // 设置拐点
                symbol: "circle",
                // 拐点大小
                symbolSize: 8,
                // 开始不显示拐点， 鼠标经过显示
                showSymbol: false,
                // 设置拐点颜色以及边框
                itemStyle: {
                    color: "#0184d5",
                    borderColor: "rgba(221, 220, 107, .1)",
                    borderWidth: 12,
                },
                data: dataY,
            },
            // {
            //     name: "联盟广告",
            //     type: "line",
            //     smooth: true,
            //     lineStyle: {
            //         normal: {
            //             color: "#00d887",
            //             width: 2
            //         }
            //     },
            //     areaStyle: {
            //         normal: {
            //             color: new echarts.graphic.LinearGradient(
            //                 0,
            //                 0,
            //                 0,
            //                 1,
            //                 [
            //                     {
            //                         offset: 0,
            //                         color: "rgba(0, 216, 135, 0.4)"
            //                     },
            //                     {
            //                         offset: 0.8,
            //                         color: "rgba(0, 216, 135, 0.1)"
            //                     }
            //                 ],
            //                 false
            //             ),
            //             shadowColor: "rgba(0, 0, 0, 0.1)"
            //         }
            //     },
            //     // 设置拐点 小圆点
            //     symbol: "circle",
            //     // 拐点大小
            //     symbolSize: 5,
            //     // 设置拐点颜色以及边框
            //     itemStyle: {
            //         color: "#00d887",
            //         borderColor: "rgba(221, 220, 107, .1)",
            //         borderWidth: 12
            //     },
            //     // 开始不显示拐点， 鼠标经过显示
            //     showSymbol: false,
            //     data: [
            //         130,
            //         10,
            //         20,
            //         40,
            //         30,
            //         40,
            //         80,
            //         60,
            //         20,
            //         40,
            //         90,
            //         40,
            //         20,
            //         140,
            //         30,
            //         40,
            //         130,
            //         20,
            //         20,
            //         40,
            //         80,
            //         70,
            //         30,
            //         40,
            //         30,
            //         120,
            //         20,
            //         99,
            //         50,
            //         20
            //     ]
            // }
        ],
    };
    return (
        <>
            <ReactECharts style={{width:"100%",height:"100%"}} option={option} />
        </>
    );
}

// const data = [
//     ['0:00', 200],
//     ['1:00', 360],
//     ['3:00', 450],
//     ['4:00', 550],
//     ['5:00', 650],
//     ['23:00', 500],
//     ['24:00', 180],
//     ['24:00', 680],
// ];
// const option = {
//     grid: {
//         left: '2%', // 调整左边距
//         right: '4%', // 调整右边距
//         bottom: '25%', // 调整底边距
//         top:"6%",
//         containLabel: true // 自适应文字大小
//     },
//     xAxis: {
//         type: 'category',
//         data: data.map(item => item[0]), // 使用数据中的时间作为横坐标数据
//         boundaryGap: false,
//         axisLabel: {
//             interval: 0, // 强制显示所有横坐标刻度
//             rotate: 45, // 旋转角度，使横坐标文字不重叠
//         },
//     },
//     yAxis: {
//         type: 'value',
//         axisLine: {
//             lineStyle: { // 设置 y 轴横线的样式
//                 color: '#999999', // 设置横线颜色为浅灰色
//             },
//         },
//         splitLine: {
//             lineStyle: { // 设置 y 轴分隔线的样式
//                 color: ['rgba(245, 240, 240, 0.2)'], // 设置分隔线颜色为浅灰色，透明度为 0.5
//             },
//         },
//     },

//     series: [{
//         type: 'line',
//         data: data.map(item => item[1]), // 使用数据中的数值作为纵坐标数据
//         emphasis: {
//             focus: 'series' // 高亮显示折线
//         }
//     }]

// };

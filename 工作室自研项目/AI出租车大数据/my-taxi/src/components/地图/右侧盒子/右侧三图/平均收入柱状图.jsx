import ReactECharts from "echarts-for-react";
import React, { useEffect, useState } from "react";

export default function BarChart() {
    const data = [
        { hour: "0:00", revenue: 200 },
        { hour: "1:00", revenue: 360 },
        { hour: "2:00", revenue: 450 },
        { hour: "3:00", revenue: 350 },
        { hour: "4:00", revenue: 550 },
        { hour: "5:00", revenue: 350 },                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
        { hour: "6:00", revenue: 450 },
        { hour: "7:00", revenue: 150 },
        { hour: "8:00", revenue: 450 },
        { hour: "20:00", revenue: 450 },
        { hour: "21:00", revenue: 150 },
        { hour: "22:00", revenue: 350 },
        { hour: "23:00", revenue: 250 },
        { hour: "24:00", revenue: 450 },
        // ... 其他小时的数据
    ];

    const option = {
        tooltip: {
            trigger: "axis",
            fontSize:"10px",
            axisPointer: {
                // 坐标轴指示器，坐标轴触发有效
                type: "shadow",
                lineStyle: {
                    color: "transparent", // 设置竖线颜色为透明
                }, // 默认为直线，可选为：'line' | 'shadow'
            },
        },
        grid: {
            left: "2%",
            top: "15%",
            right: "0%",
            bottom: "2%",
            containLabel: true,
        },
        legend: {
            top: "0%",
            // data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
            data: ["日平均收入变化"],
            textStyle: {
                color: "rgba(251, 237, 237, 1)",
                fontSize: "14px",
                fontFamily: "cursive",
            },
        },
        xAxis: {
            type: "category",
            data: data.map((item) => item.hour),
            axisLabel: {
                // interval: 0, // 强制显示所有横坐标刻度
                rotate: 45, // 旋转角度，使横坐标文字不重叠
            },
        },
        yAxis: {
            type: "value",
            axisLine: {
                lineStyle: {
                    // 设置 y 轴横线的样式
                    color: "#999999", // 设置横线颜色为浅灰色
                },
            },
            splitLine: {
                lineStyle: {
                    // 设置 y 轴分隔线的样式
                    color: ["rgba(111, 124, 207, 0.2)"], // 设置分隔线颜色为浅灰色，透明度为 0.5
                },
            },
        },
        series: [
            {
                type: "bar",
                name: "日平均收入变化",
                data: data.map((item) => ({
                    value: item.revenue,
                    itemStyle: {
                        color: "#6e94ee", // 默认柱状图颜色
                    },
                })),
                // emphasis: {
                //     focus: 'series',
                //     itemStyle: {
                //         color: '#245bda', // 高亮颜色
                //     },
                // },
            },
        ],
    };

    return <ReactECharts style={{ width: "100%", height: "100%" }} option={option} />;
}

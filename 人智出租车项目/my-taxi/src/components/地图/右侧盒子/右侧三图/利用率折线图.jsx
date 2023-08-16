import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';

export default function Liner1() {
    const dataX = [
        '0:00',
        '1:00',
        '2:00',
        '3:00',
        '4:00',
        '5:00',
        '6:00',
        '7:00',
        '8:00',
        '9:00',
        '10:00',
        '11:00',
        '12:00',
        '13:00',
        '14:00',
        '15:00',
        '16:00',
        '17:00',
        '18:00',
        '19:00',
        '20:00',
        '21:00',
        '22:00',
        '23:00'
    ];
    const dataY = [
        30,
        40,
        30,
        40,
        30,
        40,
        30,
        60,
        5,
        40,
        20,
        40,
        10,
        40,
        30,
        40,
        30,
        60,
        20,
        40,
        30,
        40,
        30,
        40,]
    const option = {
        tooltip: {
            trigger: "axis"
        },
        grid: {
            left: "2%",
            top: "10%",
            right: "0%",
            bottom: "25%",
            containLabel: true
        },
        legend: {
            top: "0%",
            // data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"],
            data: ["日利用率变化"],
            textStyle: {
                color: "rgba(251, 237, 237, 1)",
                fontSize: "14px",
                fontFamily: 'cursive',
            }
        },

        xAxis: {
            type: 'category',
            data: dataX, // 使用数据中的时间作为横坐标数据
            boundaryGap: false,
            axisLabel: {
                // interval: 0, // 强制显示所有横坐标刻度
                rotate: 45, // 旋转角度，使横坐标文字不重叠
            },
        },
        yAxis: {
            type: 'value',
            axisLine: {
                lineStyle: { // 设置 y 轴横线的样式
                    color: '#999999', // 设置横线颜色为浅灰色
                },
            },
            splitLine: {
                lineStyle: { // 设置 y 轴分隔线的样式
                    color: ['rgba(245, 240, 240, 0.2)'], // 设置分隔线颜色为浅灰色，透明度为 0.5
                },
            },
        },

        series: [{
            type: 'line',
            name:"日利用率变化",
            data: dataY,// 使用数据中的数值作为纵坐标数据
            emphasis: {
                focus: 'series' // 高亮显示折线
            }
        }]

    };

    return (
        <>
            <ReactECharts option={option} />
        </>
    )
}

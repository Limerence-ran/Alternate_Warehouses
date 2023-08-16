
//地图右下角流量大小的柱形图
import ReactEcharts from 'echarts-for-react';
import * as echarts from 'echarts';
import React from 'react';

const GradientBarChart = () => {
    // 数据
    const data = [
        20,
        60,
        70,
        100,
        120,
        145,
        178,
        190,
        200,
        230,
        270,
        290,
        300,
        310,
        330,
        367,
        378,
        390,
        400,
        430,
        440,
        500,
         600]

    // 渐变色
    const gradientColor = new echarts.graphic.LinearGradient(0, 0, 0, 1, [
        { offset: 1, color: '#8bd4e5' },
        { offset: 0, color: '#073e4d' },
    ]);

    // 配置项
    const options = {
        'border-radius': '.25rem',
        backgroundColor: ' rgba(0, 0, 1, 0.9)',
        zIndex: '10000',
        'box-shadow': 'inset 0 2px 10px 0 rgba(114, 98, 220, 0.6)',
        title: {
            text: '区域流量大小',
            left: 'center',
            top: 10,
            textStyle: {
                color: '#f9f7f7',
                fontSize: '10px',
            },
        },
       
        grid: {
            left: '43%', // 调整左边距
            right: '10%', // 调整右边距
            bottom: '15%', // 调整底边距
            top: "22%",
            // containLabel: true // 自适应文字大小
        },
        // tooltip: {
        //     trigger: 'axis', // 修改触发类型为axis
        //     formatter: function (params) {
        //         return `流量: ${params[0].value}`;
        //     },
        // },
        axisPointer: {
            lineStyle: {
                color: 'transparent', // 设置竖线颜色为透明
            },
        },
    
        xAxis: {
            type: 'category',
            data: ['流量大小'],
            axisLabel: {
              fontSize:'10px',
              color:"#fff"
            },
           
        },
        yAxis: {
            type: 'value',
            splitLine: {
                lineStyle: { // 设置 y 轴分隔线的样式
                    color: ['rgba(144, 138, 138, 0.2)'], // 设置分隔线颜色为浅灰色，透明度为 0.5
                },
            },
            axisLabel: {
                textStyle: {
                    color: "rgba(255,255,255,.6)",
                    fontSize: 12
                }
            },
        },
        series: [
            {
                type: 'bar',
                data: data,
                itemStyle: {
                    color: gradientColor,
                },
                barWidth: '80%', 
              
            },
        ],
    };

    return <ReactEcharts option={options} style={{ height: '100%', width: '100%' }} />;
};

export default GradientBarChart;
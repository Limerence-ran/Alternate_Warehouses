import React from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';  // 导入 echarts
import "echarts/lib/component/brush";  // 导入 BrushComponent

export default function Node() {
    const option = {
        title: {
            text: 'Draggable Nodes'
        },
        tooltip: {},
        animationDurationUpdate: 1500,
        animationEasingUpdate: 'quinticInOut',
        brush: {
            toolbox: ['rect', 'polygon', 'lineX', 'lineY', 'keep', 'clear'],  // 设置刷选工具的样式
            xAxisIndex: 0,  // 指定 x 轴索引
        },
        series: [
            {
                type: 'graph',
                layout: 'none',
                symbolSize: 50,
                roam: true,
                label: {
                    show: true
                },
                draggable: true,
                edgeSymbol: ['circle', 'arrow'],
                edgeSymbolSize: [4, 10],
                edgeLabel: {
                    fontSize: 20
                },
                data: [
                    { name: 'Node 1', x: 400, y: 300 },
                    { name: 'Node 2', x: 800, y: 300 },
                    { name: 'Node 3', x: 550, y: 100 },
                    { name: 'Node 4', x: 550, y: 500 }
                ],
                links: [
                    { source: 0, target: 1 },
                    { source: 1, target: 2 },
                    { source: 2, target: 3 }
                ],
                lineStyle: {
                    opacity: 0.9,
                    width: 2
                },
                emphasis: {
                    // 高亮节点时的配置
                    focus: 'adjacency', // 只突出显示与高亮节点相邻的边和节点
                    label: {
                        show: true,
                        position: 'right',
                        fontSize: 18
                    },
                    lineStyle: {
                        opacity: 0.6,
                        width: 4
                    }
                },
                // 使用 brush 组件
                brush: {
                    toolbox: ['rect'],
                    inBrush: {
                        opacity: 1 // 设置选中区域的样式
                    },
                    outOfBrush: {
                        opacity: 0.2 // 设置未选中区域的样式
                    }
                },
               
                // 关闭图例点击效果
                legendHoverLink: false
            
            }, 
           
        ]
    };

    return <ReactECharts option={option} style={{ height: '500px' }} />;
}
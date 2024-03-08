import { Chart, getEngine , registerShape, registerInteraction} from '@antv/g2';
import {message} from 'antd'
import PubSub from 'pubsub-js'
import {GroupColors} from '../data/configdata'
import { useEffect, useState } from 'react';
import '../assets/styles/chart.scss'
import React from 'react';

// 更新图表数据
let update = (chart,data) => {

    if(data.length === 0) {
        return 0;
    }
    chart.changeData(data);
    return 1;
}

// 配置饼图
let ConfigChart = (G,chart,configObj) => {
    const {data,colors} = configObj;

    chart.coordinate('theta', {
        radius: 0.75,
        innerRadius: 0.36,
    });

    chart.data(data);

    chart.scale('percent', {
    formatter: (val) => {
        val = val * 100 + '%';
        return val;
    },
    });

    chart.tooltip({
        showTitle: false,
        showMarkers: false,
    });

    chart
    .interval()
    .position('percent')
    .color('name',colors)
    .shape('slice-shape')
    .label('percent', {
        layout: [{ type: 'pie-spider' }, { type: 'hide-overlap' }],
        offset: 8,
        labelHeight: 38,
        content: (obj, item) => {
        const group = new G.Group({});
        // 了解 shape 的绘制原理：y0 左下起点 y1 右上起点
        const [y0, y1] = item.y || [0, 0];
        const inRight = y0 < y1;
        const textAlign = inRight ? 'left' : 'right';

        const topFontSize = 12;
        const bottomFontSize = 14;
        group.addShape({
            type: 'text',
            attrs: {
            x: 0,
            y: 0,
            text: obj.name,
            fill: 'rgba(0, 0, 0, 0.65)',
            fontSize: topFontSize,
            textAlign,
            },
        });

        group.addShape({
            type: 'text',
            attrs: {
            x: 0,
            y: 4,
            text: obj.count,
            textAlign,
            textBaseline: 'top',
            fill: 'rgba(0, 0, 0, 0.65)',
            fontWeight: 700,
            fontSize: bottomFontSize,
            },
        });
        if (!inRight) {
            group.translate(group.getBBox().width, 0);
        }
        group.translate(0, topFontSize);
        return group;
        },
        labelLine: {
        style: {
            lineWidth: 0.5,
        },
        },
    })
    .adjust('stack');
    registerInteraction('element-highlight', {
        start: [{ trigger: 'element:mouseenter', action: 'element-highlight:highlight' }],
        end: [{ trigger: 'element:mouseleave', action: 'element-highlight:reset' }],
    });
    
    chart.interaction('element-highlight');
}


/* 图表组件 */
function PieChart(props){
    let [chartGlobal,setChartGlobal] = useState([]);
    let [chartdata,setChartdata] = useState([]);
    let [isSelectT,setIsSelectT] = useState(false);
    const {data,containerName,isSelect} = props;
    let pubsubtoken = "0";
    /* 接收选择器值 */
   
    const config = {
        colors:GroupColors,
        data
    }

    let padding = [20, 20, 95, 20];
    // 人数的padding要大一点
    // TODO:padding可以作为config，通过props传进来
    if(containerName === "ct-population") padding = [20,20,180,20];
    React.useEffect(() => {
        setIsSelectT(value => isSelect);
        setChartdata(value => data);
        
        // 可以通过调整这个数值控制分割空白处的间距，0-1 之间的数值
        const sliceNumber = 0.01;

        // 自定义 other 的图形，增加两条线
        registerShape('interval', 'slice-shape', {
        draw(cfg, container) {
            const points = cfg.points;
            let path = [];
            path.push(['M', points[0].x, points[0].y]);
            path.push(['L', points[1].x, points[1].y - 2.4*sliceNumber]);
            path.push(['L', points[2].x, points[2].y - sliceNumber]);
            path.push(['L', points[3].x, points[3].y]);
            path.push('Z');
            path = this.parsePath(path);
            return container.addShape('path', {
            attrs: {
                fill: cfg.color,
                path,
                strokeOpacity:0
            },
            });
        },
        });
        const G = getEngine('canvas');
        let chart = new Chart({
            container: containerName,
            autoFit: true,
            localRefresh: false,
            padding:  padding   // 上，右，下，左
        });
        setChartGlobal(value => chart)
        if(ConfigChart(G,chart,config))  {
            message.warning({content:"所选组别没有数据！"});
        }
        return ()=>{
            // pubsub注销
            if(pubsubtoken) PubSub.unsubscribe(pubsubtoken);
        }
        
    },[]);

    // 数据有更新就更新
    useEffect(() => {
        if(isSelect === true) {
            // eslint-disable-next-line react-hooks/exhaustive-deps
            pubsubtoken = PubSub.subscribe("group",(_,index) => {
                // 接收选择器发送的id，渲染对应内容
                if(data && data.length !== 0){
                    update(chartGlobal,data[index].data);
                }
            })
        }

        if(data && data.length!== 0){
            if(chartGlobal) {
                update(chartGlobal,isSelectT?data[0].data : data);  
            }    
        }     
    },[data])

    return (

        <div className='container' id={containerName}></div>

    )
}


export default PieChart;
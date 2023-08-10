import React, { useEffect, useState } from 'react';
import ReactECharts from 'echarts-for-react';
import * as echarts from 'echarts';
import 'echarts/lib/component/geo';

function Map() {
    const [option, setOption] = useState({});

    useEffect(() => {
        // 假设这是您的数据和配置
        const data = [
            { name: '北京', value: 100 },
            { name: '上海', value: 200 },
            { name: '广州', value: 300 },
        ];

        const geoCoordMap = {
            北京: [116.397637, 39.903036],
            上海: [121.472644, 31.231706],
            广州: [113.280637, 23.125178],
        };

        const convertedData = data.map(item => {
            return {
                name: item.name,
                value: geoCoordMap[item.name].concat(item.value),
            };
        });

        const option = {
            tooltip: {
                formatter: params => {
                    return params.name + ': ' + params.value[2];
                },
            },
            geo: {
                map: 'china',
                roam: true,
                label: {
                    emphasis: {
                        show: false,
                    },
                },
                itemStyle: {
                    normal: {
                        areaColor: '#323c48',
                        borderColor: '#111',
                    },
                    emphasis: {
                        areaColor: '#2a333d',
                    },
                },
            },
            series: [
                {
                    type: 'scatter',
                    coordinateSystem: 'geo',
                    data: convertedData,
                    symbolSize: 10,
                    label: {
                        show: true,
                        formatter: '{b}',
                    },
                    itemStyle: {
                        color: '#ddb926',
                    },
                },
            ],
        };

        setOption(option);
    }, []);

    return (
        <div>
            <ReactECharts option={option} style={{ height: '500px' }} />
        </div>
    );
}

export default Map;
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ReactECharts from 'echarts-for-react';

function Echart() {
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get('api/data',{
                headers: {
                    Authorization: 'Bearer token' // 将your_token_here替换为您的实际token值
                }
            }); // 发送 GET 请求获取数据
            setData(response.data);
        } catch (error) {
            console.error(error);
        }
    };

    const option = {
        // 使用从后台获取的数据进行配置
        xAxis: {
            type: 'category',
            data: data.map(item => item.name),
            axisTick: {
                alignWithLabel: true
            }
        },
        yAxis: {
            type: 'value'
        },
        series: [
            {
                name: 'Data',
                type: 'bar',
                barWidth: '60%',
                data: data.map(item => item.value)
            }
        ]
    };

    return (
        <>
            <ReactECharts option={option} />
        </>
    );
}

export default Echart;
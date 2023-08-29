import React, { useEffect } from "react";
import * as echarts from "echarts";

export default function EPie(props) {
    console.log(
        props.data_xy.normalizeDistance.map((item) => {
            return {
                value: item,
            };
        })
    );
    let option = {
        backgroundColor: "rgb(214 216 254)",
        title: {
            text: "Normalize Distance",
            textStyle: {
                color: "rgb(143 123 251)",
                fontSize: "10px",
                fontFamily: "Futura",
            },
            left: "center",
            bottom: "4%",
        },
        tooltip: {
            trigger: "item",
        },
        legend: {
            top: "top",
            itemHeight: 10,
            itemWidth: 10, // 修改icon图形大小
            textStyle: {
                color: "#8998AC",
                fontSize: "10px",
                fontFamily: "Futura",
            },
        },
        series: [
            {
                type: "pie",
                radius: "50%",
                data: props.data_xy.normalizeDistance[0].map((i, index) => {
                    return {
                        value: i,
                        name: "noise" + (index + 1),
                    };
                }),
                label: {
                    show: true,
                    fontSize: "10px",
                    fontFamily: "Futura",
                },
                emphasis: {
                    itemStyle: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: "rgba(0, 0, 0, 0.5)",
                    },
                },
            },
        ],
    };
    useEffect(() => {
        var chartDom = document.getElementById("mainpie");
        var myChart = echarts.init(chartDom);
        option && myChart.setOption(option);
        // 监听窗口大小改变事件
        window.addEventListener("resize", function () {
            // 调整图表大小
            myChart.resize();
        });
    }, []);

    return (
        <>
            <div id="mainpie" style={{ width: "100%", height: "100%" }}></div>
        </>
    );
}

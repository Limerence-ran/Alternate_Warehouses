import React, { useEffect } from "react";
import * as echarts from "echarts";
import "echarts-extension-amap";
import GuangZhouJson from "../../utils/guangzhou.json";
import ChinaJson from "../../utils/china.json";
const EchartMap = () => {
    useEffect(() => {
        //涟漪点-贝塞尔曲线数据
        var color = [
            "#6bcc75",
            "#65c78b",
            "#5fc2a0",
            "#5abead",
            "#52b9c7",
            "#4fb6d2",
            "#4ab2e5",
            "#52b9c7",
            "#5abead",
            "#dfae10",
            "#d5b314",
            "#c1bb1f",
            "#f34e2b",
            "#f56321",
            "#f56f1c",
            "#4ab2e5",
            "#4fb6d2",
            "#f58414",
            "#f58f0e",
            "#f5a305",
            "#e7ab0b",
            "#b9be23",
            "#e7ab0b",
            "#dfae10",
            "#d5b314",
            "#c1bb1f",
            "#b9be23",
            "#a6c62c",
            "#96cc34",
            "#89d23b",
            "#7ed741",
            "#77d64c",
            "#71d162",
        ];
        var points = [
            {
                value: [118.8062, 31.9208],
            },
            {
                value: [127.9688, 45.368],
            },
            {
                value: [110.3467, 41.4899],
            },
            {
                value: [125.8154, 44.2584],
            },
            {
                value: [116.4551, 40.2539],
            },
            {
                value: [123.1238, 42.1216],
            },
            {
                value: [114.4995, 38.1006],
            },
            {
                value: [117.4219, 39.4189],
            },
            {
                value: [112.3352, 37.9413],
            },
            {
                value: [109.1162, 34.2004],
            },
            {
                value: [103.5901, 36.3043],
            },
            {
                value: [106.3586, 38.1775],
            },
            {
                value: [101.4038, 36.8207],
            },
            {
                value: [103.9526, 30.7617],
            },
            {
                value: [108.384366, 30.439702],
            },
            {
                value: [113.0823, 28.2568],
            },
            {
                value: [102.9199, 25.46639],
            },
            {
                value: [119.4543, 25.9222],
            },
            {
                value: [91.11, 29.97],
            },
            {
                value: [87.68, 43.77],
            },
        ];
        //分类热点的数据
        var geoCoordMap = {
            北京: [116.46, 39.92],
            成都: [104.06, 30.67],
            杭州: [120.19, 30.26],
            济南: [117, 36.65],
            福州: [119.3, 26.08],
            上海: [121.48, 31.22],
            重庆: [106.54, 29.59],
            深圳: [114.07, 22.62],
            宁波: [121.56, 29.86],
            南昌: [115.89, 28.68],
            广州: [113.23, 23.16],
            厦门: [118.1, 24.46],
            太原: [112.53, 37.87],
            哈尔滨: [126.63, 45.75],
            西安: [108.95, 34.27],
            沈阳: [123.38, 41.8],
            大连: [121.62, 38.92],
            海口: [110.35, 20.02],
            长沙: [113, 28.21],
            银川: [106.27, 38.47],
            石家庄: [114.48, 38.03],
            昆明: [102.73, 25.04],
            武汉: [114.31, 30.52],
            呼和浩特: [111.65, 40.82],
            天津: [117.2, 39.13],
            贵阳: [106.71, 26.57],
            兰州: [103.73, 36.03],
            青岛: [120.33, 36.07],
            南京: [118.78, 32.04],
            长春: [125.35, 43.88],
            郑州: [113.65, 34.76],
            西宁: [101.74, 36.56],
            合肥: [117.27, 31.86],
            南宁: [108.33, 22.84],
            拉萨: [91.11, 29.97],
            乌鲁木齐: [87.68, 43.77],
        };
        var data = [
            { name: "成都", value: 88.7 },
            { name: "重庆", value: 87.38 },
            { name: "深圳", value: 87.37 },
            { name: "昆明", value: 87.26 },
            { name: "宁波", value: 87.1 },
            { name: "南昌", value: 86.06 },
            { name: "广州", value: 85.89 },
            { name: "西安", value: 83.24 },
            { name: "海口", value: 82.88 },
            { name: "长沙", value: 82.85 },
            { name: "银川", value: 82.49 },
            { name: "呼和浩特", value: 81.61 },
            { name: "贵阳", value: 80.71 },
            { name: "兰州", value: 80.69 },
            { name: "西宁", value: 79.07 },
            { name: "南宁", value: 78.2 },
            { name: "合肥", value: 77.29 },
            { name: "乌鲁木齐", value: 76.91 },
            { name: "拉萨", value: 76.01 },
        ];
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value),
                    });
                }
            }
            return res;
        };

        //1、加载动画用option
        let option1 = {
            graphic: {
                elements: [
                    {
                        type: "text",
                        left: "center",
                        top: "center",
                        style: {
                            text: "QG STUDIO",
                            fontSize: 80,
                            fontWeight: "bold",
                            lineDash: [0, 200],
                            lineDashOffset: 0,
                            fill: "transparent",
                            stroke: "#174ae4",
                            lineWidth: 1,
                        },
                        keyframeAnimation: {
                            duration: 2500,
                            loop: true,
                            keyframes: [
                                {
                                    percent: 0.7,
                                    style: {
                                        fill: "transparent",
                                        lineDashOffset: 200,
                                        lineDash: [200, 0],
                                    },
                                },
                                {
                                    // Stop for a while.
                                    percent: 0.8,
                                    style: {
                                        fill: "transparent",
                                    },
                                },
                                {
                                    percent: 1,
                                    style: {
                                        fill: "#174ae4",
                                    },
                                },
                            ],
                        },
                    },
                ],
            },
        };
        //1-->2无继承合并关系，需要true清除
        //2、显示地图用option
        const option2 = {
            // 时间轴
            // timeline: {
            //     data: "year",
            //     axisType: "category",
            //     autoPlay: true,
            //     playInterval: 5000,
            //     left: "10%",
            //     right: "10%",
            //     bottom: "3%",
            //     width: "80%",
            //     //  height: null,
            //     label: {
            //         normal: {
            //             textStyle: {
            //                 color: "#ddd",
            //             },
            //         },
            //         emphasis: {
            //             textStyle: {
            //                 color: "#fff",
            //             },
            //         },
            //     },
            //     symbolSize: 10,
            //     lineStyle: {
            //         color: "#555",
            //     },
            //     checkpointStyle: {
            //         borderColor: "#777",
            //         borderWidth: 2,
            //     },
            //     controlStyle: {
            //         showNextBtn: true,
            //         showPrevBtn: true,
            //         normal: {
            //             color: "#666",
            //             borderColor: "#666",
            //         },
            //         emphasis: {
            //             color: "#aaa",
            //             borderColor: "#aaa",
            //         },
            //     },
            // },
            amap: {
                maptypecontrol: true,
                zoom: 5,
                skyColor: "#174ae4",
                roam: false,
                viewMode: "3D", //是否启用3d地图
                showLabel: function () {
                    return true;
                },

                largeMode: false,
                pitch: 35, //视角高度
                resizeEnable: true,
                center: [104.397128, 33.916527],
                mapStyle: "amap://styles/darkblue",
            },
            // visualMap: {
            //     min: 75,
            //     max: 90,
            //     left: 40,
            //     bottom: 40,
            //     calculable: false,
            //     seriesIndex: 0,
            //     text: ["高", "低"],
            //     inRange: {
            //         color: ["rgb(4, 1, 255)", "rgb(225, 1, 255)"],
            //     },
            //     textStyle: {
            //         color: "#ffffff",
            //         fontSize: 10,
            //     },
            // },
            title: {
                text: "广州市出租车流量",
                left: "center",
                textStyle: {
                    fontFamily: "YouSheBiaoTiHei",
                    fontSize: "50px",
                    color: "#05e8fe",
                },
            },
            tooltip: {
                trigger: "item",
            },

            series: [
                //分类点
                // {
                //     name: "城市",
                //     type: "scatter",
                //     coordinateSystem: "amap",
                //     data: convertData(data),
                //     symbolSize: function (val) {
                //         return val[2] / 4;
                //     },
                //     label: {
                //         normal: {
                //             formatter: "{b}",
                //             position: "bottom",
                //             textStyle: {
                //                 fontSize: 10,
                //                 fontWeight: "bolder",
                //                 color: "#ffffff",
                //             },
                //             show: true,
                //         },
                //         emphasis: {
                //             show: true,
                //         },
                //     },
                //     emphasis: {
                //         scale: 1.5,
                //     },
                //     itemStyle: {
                //         normal: {
                //             color: "#ddb926",
                //         },
                //     },
                // },
                //上落点
                // {
                //     type: "scatter",
                //     coordinateSystem: "amap",
                //     zlevel: 1,
                //     label: {
                //         normal: {
                //             formatter: "{b}",
                //             position: "right",
                //             offset: [15, 0],
                //             color: "#1DE9B6",
                //             show: true,
                //         },
                //     },
                //     itemStyle: {
                //         normal: {
                //             color: "red",
                //             shadowBlur: 10,
                //             shadowColor: "#333",
                //         },
                //     },
                //     symbol: "pin",
                //     symbolSize: 40,
                //     data: points,
                // },
                //涟漪点
                {
                    type: "effectScatter",
                    coordinateSystem: "amap",
                    showEffectOn: "render",
                    zlevel: 1,
                    rippleEffect: {
                        period: 15,
                        scale: 4,
                        brushType: "fill",
                    },
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: "{b}",
                            position: "right",
                            offset: [15, 0],
                            color: "#1DE9B6",
                            show: true,
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: function (i) {
                                return color[i.dataIndex];
                            },
                            shadowBlur: 10,
                            shadowColor: "#333",
                        },
                    },
                    symbolSize: 12,
                    data: points,
                },
                //贝塞尔曲线
                {
                    type: "lines",
                    coordinateSystem: "amap",
                    zlevel: 2,
                    effect: {
                        show: true,
                        period: 4, //箭头指向速度，值越小速度越快
                        trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                        symbol: "arrow", //箭头图标
                        symbolSize: 7, //图标大小
                    },
                    lineStyle: {
                        normal: {
                            color: function (i) {
                                return color[i.dataIndex];
                            },
                            width: 1, //线条宽度
                            opacity: 0.1, //尾迹线条透明度
                            curveness: 0.3, //尾迹线条曲直度
                        },
                    },
                    data: [
                        {
                            coords: [
                                [118.8062, 31.9208],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [127.9688, 45.368],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [110.3467, 41.4899],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [125.8154, 44.2584],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [116.4551, 40.2539],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [119.4543, 25.9222],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [114.4995, 38.1006],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [117.4219, 39.4189],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [112.3352, 37.9413],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [109.1162, 34.2004],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [103.5901, 36.3043],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [106.3586, 38.1775],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [101.4038, 36.8207],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [103.9526, 30.7617],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [108.384366, 30.439702],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [113.0823, 28.2568],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [102.9199, 25.46639],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [91.11, 29.97],
                                [123.1238, 42.1216],
                            ],
                        },
                        {
                            coords: [
                                [87.68, 43.77],
                                [123.1238, 42.1216],
                            ],
                        },
                    ],
                },
                //轨迹
                // {
                //     type: "lines",
                //     coordinateSystem: "amap",
                //     polyline: true,
                //     lineStyle: {
                //         normal: {
                //             color: "red",
                //             width: 1, //线条宽度
                //         },
                //     },
                //     data: [
                //         {
                //             coords: [
                //                 [113.242883, 23.159608],
                //                 [113.2421, 23.156117],
                //                 [113.244689, 23.151688],
                //                 [113.245339, 23.148395],
                //                 [113.24904, 23.147713],
                //                 [113.251232, 23.148707],
                //                 [113.253302, 23.145272],
                //                 [113.251926, 23.144179],
                //                 [113.253534, 23.139835],
                //                 [113.24969, 23.137862],
                //                 [113.245019, 23.137677],
                //                 [113.243103, 23.136258],
                //                 [113.245779, 23.134682],
                //                 [113.247112, 23.131871],
                //                 [113.253247, 23.128847],
                //                 [113.254701, 23.128847],
                //                 [113.254426, 23.125142],
                //                 [113.252741, 23.118852],
                //                 [113.252708, 23.11499],
                //                 [113.25425, 23.107138],
                //                 [113.248434, 23.104909],
                //                 [113.242078, 23.103276],
                //                 [113.248533, 23.093932],
                //                 [113.252355, 23.081747],
                //                 [113.258336, 23.072061],
                //                 [113.265418, 23.064363],
                //                 [113.270893, 23.060358],
                //                 [113.276885, 23.054448],
                //                 [113.273393, 23.053596],
                //                 [113.265077, 23.05057],
                //                 [113.257807, 23.046778],
                //                 [113.256122, 23.043908],
                //                 [113.254932, 23.044831],
                //                 [113.24535, 23.043368],
                //                 [113.233674, 23.042857],
                //                 [113.225744, 23.041862],
                //                 [113.211689, 23.043311],
                //                 [113.209222, 23.044476],
                //                 [113.20334, 23.050599],
                //                 [113.195762, 23.056167],
                //                 [113.188184, 23.058241],
                //                 [113.184836, 23.059647],
                //                 [113.180606, 23.06317],
                //                 [113.177566, 23.069576],
                //                 [113.178866, 23.07476],
                //                 [113.177412, 23.077558],
                //                 [113.183415, 23.077856],
                //                 [113.193658, 23.083878],
                //                 [113.195233, 23.084105],
                //                 [113.208814, 23.083551],
                //                 [113.209585, 23.086903],
                //                 [113.212504, 23.088323],
                //                 [113.212075, 23.090978],
                //                 [113.213264, 23.092682],
                //                 [113.213099, 23.095665],
                //                 [113.216348, 23.096772],
                //                 [113.215809, 23.100677],
                //                 [113.213848, 23.099797],
                //                 [113.208142, 23.099683],
                //                 [113.206788, 23.107649],
                //                 [113.205246, 23.109509],
                //                 [113.203296, 23.119775],
                //                 [113.203715, 23.121876],
                //                 [113.209718, 23.121848],
                //                 [113.211601, 23.12889],
                //                 [113.212669, 23.141098],
                //                 [113.213716, 23.141695],
                //                 [113.215412, 23.148679],
                //                 [113.216447, 23.149999],
                //                 [113.220479, 23.144505],
                //                 [113.227693, 23.138046],
                //                 [113.229401, 23.14063],
                //                 [113.233278, 23.143739],
                //                 [113.237067, 23.149034],
                //                 [113.238157, 23.156599],
                //                 [113.242883, 23.159608],
                //             ],
                //         },
                //     ],
                // },
            ],
        };

        const mapChart = echarts.init(document.getElementById("aMap"));
        mapChart.setOption(option1);
        // 此时地图实例已创建，可以获取到地图实例并进行操作
        function initialMap() {
            //获取地图对象
            const amap = mapChart.getModel().getComponent("amap").getAMap();
            //加载工具包
            AMap.plugin("AMap.ToolBar", function () {
                //异步加载插件
                var toolbar = new AMap.ToolBar();
                amap.addControl(toolbar);
            });
            amap.addControl(new AMap.Scale());
            amap.addControl(new AMap.ToolBar());
            //广州各区区域渲染
            function addGuangZhouArea() {
                function addPolygon(data, center, name) {
                    let polygon = new AMap.Polygon({
                        path: data,
                        fillColor: "#3d6eff",
                        strokeOpacity: 1,
                        fillOpacity: 0.5,
                        strokeColor: "#2b8cbe",
                        strokeWeight: 1,
                        strokeStyle: "solid",
                        strokeDasharray: [5, 5],
                    });
                    polygon.on("mouseover", () => {
                        polygon.setOptions({
                            fillOpacity: 0.7,
                            fillColor: "#7bccc4",
                        });
                    });
                    polygon.on("mouseout", () => {
                        polygon.setOptions({
                            fillOpacity: 0.5,
                            fillColor: "#3d6eff",
                        });
                    });
                    // 添加鼠标点击事件
                    polygon.on("click", () => {
                        //放大地图等级并切换中心点重新渲染;
                        mapChart.setOption({
                            amap: {
                                center: center,
                                zoom: 12,
                            },
                        });
                    });
                    //统一处理地图放缩事件
                    amap.on("zoomchange", function () {
                        if (amap.getZoom() < 8 || amap.getZoom() >= 12) {
                            amap.remove(polygon);
                        } else {
                            amap.add(polygon, true);
                        }
                    });
                }
                //显示广州各区的模块
                if (!amap.polygon) {
                    for (let i = 0; i < GuangZhouJson.features.length; i++) {
                        let guangzhoujson =
                            GuangZhouJson.features[i].geometry
                                .coordinates[0][0];
                        addPolygon(
                            guangzhoujson,
                            GuangZhouJson.features[i].properties.center,
                            GuangZhouJson.features[i].properties.name
                        );
                    }
                }
            }
            //中国各省区域渲染
            function addChinaArea() {
                function addPolygon(data, center, name) {
                    let polygon = new AMap.Polygon({
                        path: data,
                        fillColor: "#3d6eff",
                        strokeOpacity: 1,
                        fillOpacity: 0.5,
                        strokeColor: "#2b8cbe",
                        strokeWeight: 1,
                        strokeStyle: "solid",
                        strokeDasharray: [5, 5],
                    });
                    polygon.on("mouseover", () => {
                        polygon.setOptions({
                            fillOpacity: 0.7,
                            fillColor: "#7bccc4",
                        });
                    });
                    polygon.on("mouseout", () => {
                        polygon.setOptions({
                            fillOpacity: 0.5,
                            fillColor: "#3d6eff",
                        });
                    });
                    // 添加鼠标点击事件
                    polygon.on("click", () => {
                        //放大地图等级并切换中心点重新渲染;
                        mapChart.setOption({
                            amap: {
                                center: center,
                                zoom: 10,
                            },
                        });
                    });
                    //统一处理地图放缩事件
                    amap.on("zoomchange", function () {
                        if (amap.getZoom() >= 8) {
                            amap.remove(polygon);
                        } else {
                            amap.add(polygon, true);
                        }
                    });
                    amap.add(polygon, true);
                }
                //显示中国各省的模块
                for (let i = 0; i < ChinaJson.features.length; i++) {
                    let chinajson;
                    i != 4
                        ? (chinajson =
                              ChinaJson.features[i].geometry.coordinates[0][0])
                        : (chinajson =
                              ChinaJson.features[4].geometry.coordinates[0]);
                    addPolygon(
                        chinajson,
                        ChinaJson.features[i].properties.center,
                        ChinaJson.features[i].properties.name
                    );
                }
            }
            addChinaArea();
            addGuangZhouArea();
        }
        // 根据延迟时间设置定时器，用于隐藏加载动画并显示动画元素
        setTimeout(function () {
            //加载动画
            mapChart.showLoading();
            //地图渲染
            mapChart.setOption(option2, true);
            //延时处理
            setTimeout(function () {
                mapChart.hideLoading();
            }, 1500);
            initialMap();
        }, 2500);
    }, []);

    return (
        <>
            <div
                id="aMap"
                style={{
                    width: "1920px",
                    height: "930px",
                }}
            ></div>
        </>
    );
};

export default EchartMap;

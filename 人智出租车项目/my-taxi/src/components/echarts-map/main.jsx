import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import "echarts-extension-amap";
import GuangZhouJson from "../../utils/guangzhou.json";
import ChinaJson from "../../utils/china.json";
import GuangDongJson from "../../utils/guangdong.json";
import carIcon from "../../assets/images/car.jpg";
import adsIcon from "../../assets/images/ads.png";
import "./main.css";
const EchartMap = () => {
    const [icon, setIcon] = useState(carIcon);
    //时间生成器
    const TimeLIne = Array.from(Array(24).keys());
    var panyuData = [
        { value: [113.393116, 23.039404], name: "华南师范" },
        { value: [113.405492, 23.048527], name: "北京师范" },
        { value: [113.352062, 23.139339], name: "华南理工" },
        { value: [113.383799, 22.942212], name: "中山大学" },
        { value: [113.366177, 22.946164], name: "广东工业大学" },
        { value: [113.325536, 22.967779], name: "暨南大学" },
        { value: [113.376519, 22.910552], name: "哈工大学" },
    ];
    // const panyuNameArray = panyuData.map((item) => item.name);
    // console.log('panyuNameArray:', panyuNameArray)
    // 热点圆区域
    var HotPoints = [
        {
            value: [113.383917, 22.93756],
            name: "番禺区",
            scale: 1709,
        },
        {
            value: [113.2732, 23.157159],
            name: "白云区",
            scale: 1709,
        },
        {
            value: [113.361597, 23.124817],
            name: "天河区",
            scale: 17091709,
        },
        {
            value: [113.238879, 23.128594],
            name: "荔湾区",
            scale: 17091709,
        },
        {
            value: [113.261503, 23.131377],
            name: "越秀区",
            scale: 17091709,
        },
        {
            value: [113.311916, 23.086615],
            name: "海珠区",
            scale: 17091709,
        },
        {
            value: [113.45378, 23.10901],
            name: "黄埔区",
            scale: 17091709,
        },
    ];
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
    // var data = [
    //     { name: "成都", value: 88.7 },
    //     { name: "重庆", value: 87.38 },
    //     { name: "深圳", value: 87.37 },
    //     { name: "昆明", value: 87.26 },
    //     { name: "宁波", value: 87.1 },
    //     { name: "南昌", value: 86.06 },
    //     { name: "广州", value: 85.89 },
    //     { name: "西安", value: 83.24 },
    //     { name: "海口", value: 82.88 },
    //     { name: "长沙", value: 82.85 },
    //     { name: "银川", value: 82.49 },
    //     { name: "呼和浩特", value: 81.61 },
    //     { name: "贵阳", value: 80.71 },
    //     { name: "兰州", value: 80.69 },
    //     { name: "西宁", value: 79.07 },
    //     { name: "南宁", value: 78.2 },
    //     { name: "合肥", value: 77.29 },
    //     { name: "乌鲁木齐", value: 76.91 },
    //     { name: "拉萨", value: 76.01 },
    // ];

    // var convertData = function (data) {
    //     var res = [];
    //     for (var i = 0; i < data.length; i++) {
    //         var geoCoord = geoCoordMap[data[i].name];
    //         if (geoCoord) {
    //             res.push({
    //                 name: data[i].name,
    //                 value: geoCoord.concat(data[i].value),
    //             });
    //         }
    //     }
    //     return res;
    // };

    useEffect(() => {
        //1、加载动画的option
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
        //2、显示区域流量的option
        const option2 = {
            options: [],
            // 时间轴
            timeline: {
                data: [],
                axisType: "category",
                orient: "vertical",
                autoPlay: true,
                inverse: false,
                playInterval: 2000,
                left: null,
                right: 0,
                top: 10,
                bottom: -5,
                width: 55,
                height: null,
                label: {
                    normal: {
                        position: -0.01,
                        textStyle: {
                            fontFamily: "DS-DIGIT",
                            color: "rgb(0 126 197)",
                        },
                    },
                    emphasis: {
                        textStyle: {
                            color: "#fff",
                            fontFamily: "DS-DIGIT",
                        },
                    },
                },
                symbol: "none",
                lineStyle: {
                    show: false,
                },
                checkpointStyle: {
                    symbol: "none",
                    symbolRotate: -90,
                    symbolSize: 10,
                    color: "rgb(102 110 132)",
                    borderWidth: 0,
                },
                controlStyle: {
                    itemGap: 40,
                    showNextBtn: false,
                    showPrevBtn: false,
                    position: "bottom",
                    itemSize: 20,
                    // opacity: 0,
                    showPlayBtn: true,
                    normal: {
                        color: "#666",
                        borderColor: "#666",
                    },
                    emphasis: {
                        color: "#aaa",
                        borderColor: "#aaa",
                    },
                },
                progress: {
                    lineStyle: {
                        color: "rgb(102 110 132)",
                    },
                    label: {
                        fontFamily: "DS-DIGIT",
                    },
                },
            },
            amap: {
                maptypecontrol: true,
                zoom: 4,
                roam: false,
                viewMode: "3D", //是否启用3d地图
                showLabel: false,
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
                text: "0" + TimeLIne[0],
                right: 70,
                bottom: 20,
                textStyle: {
                    fontSize: "100px",
                    opacity: 0.8,
                    color: "rgb(0 126 197)",
                    fontFamily: "DS-DIGIT",
                },
            },
            tooltip: {
                trigger: "item",
                // formatter:
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
                // 上落点
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
                // {
                //     type: "effectScatter",
                //     coordinateSystem: "amap",
                //     showEffectOn: "render",
                //     zlevel: 1,
                //     rippleEffect: {
                //         period: 15,
                //         scale: 4,
                //         brushType: "fill",
                //     },
                //     hoverAnimation: true,
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
                //             color: function (i) {
                //                 return color[i.dataIndex];
                //             },
                //             shadowBlur: 10,
                //             shadowColor: "#333",
                //         },
                //     },
                //     symbolSize: 10,
                //     data: points,
                // },
                // 贝塞尔曲线
                // {
                //     type: "lines",
                //     coordinateSystem: "amap",
                //     zlevel: 2,
                //     effect: {
                //         show: true,
                //         period: 4, //箭头指向速度，值越小速度越快
                //         trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                //         symbol: "arrow", //箭头图标
                //         symbolSize: 7, //图标大小
                //     },
                //     lineStyle: {
                //         normal: {
                //             color: function (i) {
                //                 return color[i.dataIndex];
                //             },
                //             width: 1, //线条宽度
                //             opacity: 0.1, //尾迹线条透明度
                //             curveness: 0.3, //尾迹线条曲直度
                //         },
                //     },
                //     data: [
                //         {
                //             coords: [
                //                 [118.8062, 31.9208],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [127.9688, 45.368],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [110.3467, 41.4899],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [125.8154, 44.2584],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [116.4551, 40.2539],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [119.4543, 25.9222],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [114.4995, 38.1006],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [117.4219, 39.4189],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [112.3352, 37.9413],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [109.1162, 34.2004],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [103.5901, 36.3043],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [106.3586, 38.1775],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [101.4038, 36.8207],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [103.9526, 30.7617],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [108.384366, 30.439702],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [113.0823, 28.2568],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [102.9199, 25.46639],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [91.11, 29.97],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //         {
                //             coords: [
                //                 [87.68, 43.77],
                //                 [123.1238, 42.1216],
                //             ],
                //         },
                //     ],
                // },
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
            //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分

            // addChinaArea(PathSimplifier,amap);
            // addGuangZhouArea(PathSimplifier, amap);
            // PathSimplifier();
            // ThreeGuangzhou();
            //加载刻度尺
            amap.addControl(
                new AMap.Scale({
                    position: "LT",
                })
            );
            function ThreeGuangzhou() {
                const container = document.getElementById("aMap");
                // 墙体路径原始数据
                const data = GuangDongJson.features[0].geometry.coordinates[0];
                // 地理坐标转为three坐标系，不管用不用arr，都需要转换一个非空数组
                // 否则customCoords没实例化api会报错
                const paths = amap.customCoords.lngLatsToCoords(data);
                // 墙体高度
                const height = 15550;
                // 墙体颜色
                const color = "#25a5f7";
                // 动效纹理
                let texture = null;
                // 动效纹理偏移
                let texture_offset = 0;
                // THREE相关变量
                let camera, scene, renderer;
                // 初始化图层
                function initLayer() {
                    const layer = new AMap.GLCustomLayer({
                        zIndex: 9999,
                        visible: true,
                        init: (gl) => {
                            initThree(gl);
                            createWall();
                            animate();
                        },
                        render: () => {
                            const { near, far, fov, up, lookAt, position } =
                                amap.customCoords.getCameraParams();

                            camera.near = near; // 近平面
                            camera.far = far; // 远平面
                            camera.fov = fov; // 视野范围
                            camera.position.set(...position);
                            camera.up.set(...up);
                            camera.lookAt(...lookAt);

                            // 更新相机坐标系
                            camera.updateProjectionMatrix();

                            renderer.render(scene, camera);

                            // 这里必须执行！重新设置 three 的 gl 上下文状态
                            renderer.resetState();
                        },
                    });

                    amap.add(layer);
                }

                function initThree(gl) {
                    camera = new THREE.PerspectiveCamera(
                        60,
                        container.clientWidth / container.clientHeight,
                        100,
                        1 << 30
                    );
                    renderer = new THREE.WebGLRenderer({
                        context: gl,
                        // canvas: document.querySelector('.amap-layer'), //也可以直接用canvas初始化
                        antialias: true, // 抗锯齿，默认false 耗性能
                    });
                    // 自动清空画布这里必须设置为 false，否则地图底图将无法显示
                    renderer.autoClear = false;
                    renderer.outputEncoding = THREE.sRGBEncoding;

                    scene = new THREE.Scene();
                    // 增加环境光
                    const aLight = new THREE.AmbientLight(0xffffff, 0.3);
                    scene.add(aLight);
                }

                function createCube() {
                    const geometry = new THREE.BoxGeometry(200, 200, 200);
                    const material = new THREE.MeshBasicMaterial({
                        color: 0xffffff,
                        side: THREE.DoubleSide,
                        transparent: true,
                        depthWrite: false,
                    });
                    const cube = new THREE.Mesh(geometry, material);
                    cube.position.set(0, 0, 0);
                    scene.add(cube);
                }

                function createWall() {
                    let faceList = [];
                    let faceVertexUvs = [];

                    // 合并多个闭合范围
                    for (let i = 0; i < paths.length; i++) {
                        const { face, uvs } = generateVecData(paths[i]);
                        faceList = [...faceList, ...face];
                        faceVertexUvs = [...faceVertexUvs, ...uvs];
                    }

                    // 背景层
                    const geometry = new THREE.BufferGeometry();
                    geometry.setAttribute(
                        "position",
                        new THREE.BufferAttribute(new Float32Array(faceList), 3)
                    );
                    geometry.setAttribute(
                        "uv",
                        new THREE.BufferAttribute(
                            new Float32Array(faceVertexUvs),
                            2
                        )
                    );

                    const material1 = new THREE.MeshBasicMaterial({
                        color: color,
                        side: THREE.DoubleSide,
                        transparent: true,
                        depthWrite: false,
                        alphaMap: new THREE.TextureLoader().load(
                            "./images/texture_1.png"
                        ), // 不透明图片
                        // wireframe: true
                    });
                    const mesh1 = new THREE.Mesh(geometry, material1);
                    scene.add(mesh1);

                    // 动画层
                    const geometry2 = geometry.clone();
                    texture = generateTexture(128, color);
                    texture.wrapS = THREE.RepeatWrapping; // 水平重复平铺
                    texture.wrapT = THREE.RepeatWrapping; // 垂直重复平铺

                    const material2 = new THREE.MeshBasicMaterial({
                        side: THREE.DoubleSide,
                        transparent: true,
                        depthWrite: false,
                        map: texture,
                    });

                    const mesh2 = new THREE.Mesh(geometry2, material2);
                    scene.add(mesh2);
                }

                /**
                 * 创建一个闭合范围的模型数据
                 * @param res {Object} 包含面的顶点数据face，UV面的顶点数据uvs
                 */
                function generateVecData(arr) {
                    const vec3List = []; // 顶点数组
                    let faceList = []; // 三角面数组
                    let faceVertexUvs = []; // 面的UV层队列，用于纹理和几何信息映射

                    // t3---t2
                    // |  \  |
                    // t0---t1
                    // UV面
                    // 下三角[t0, t1, t3]
                    // 上三角[t3, t1, t2]
                    const t0 = [0, 0];
                    const t1 = [1, 0];
                    const t2 = [1, 1];
                    const t3 = [0, 1];

                    for (let i = 0; i < arr.length; i++) {
                        const [x1, y1] = arr[i];
                        vec3List.push([x1, y1, 0]);
                        vec3List.push([x1, y1, height]);
                    }

                    // 1---3
                    // | \ |
                    // 0---2
                    // 三角面顶点，没有顺序要求，但要跟UV面顺序一致
                    // 下三角 [0,1,2]
                    // 上三角 [1,2,3]
                    for (let i = 0; i < vec3List.length - 2; i++) {
                        if (i % 2 === 0) {
                            // 下三角
                            faceList = [
                                ...faceList,
                                ...vec3List[i],
                                ...vec3List[i + 2],
                                ...vec3List[i + 1],
                            ];
                            // UV
                            faceVertexUvs = [
                                ...faceVertexUvs,
                                ...t0,
                                ...t1,
                                ...t3,
                            ];
                        } else {
                            // 上三角
                            faceList = [
                                ...faceList,
                                ...vec3List[i],
                                ...vec3List[i + 1],
                                ...vec3List[i + 2],
                            ];
                            // UV
                            faceVertexUvs = [
                                ...faceVertexUvs,
                                ...t3,
                                ...t1,
                                ...t2,
                            ];
                        }
                    }

                    return {
                        face: faceList,
                        uvs: faceVertexUvs,
                    };
                }

                /**
                 * 创建材质图
                 * @param size 尺寸为2的n次方
                 * @param color 颜色
                 * @returns {*}
                 */
                function generateTexture(size = 64, color = "#ff0000") {
                    let canvas = document.createElement("canvas");
                    canvas.width = size;
                    canvas.height = size;
                    let ctx = canvas.getContext("2d");
                    let linearGradient = ctx.createLinearGradient(
                        0,
                        0,
                        0,
                        size
                    );
                    linearGradient.addColorStop(0.2, hexToRgba(color, 0.0));
                    linearGradient.addColorStop(0.8, hexToRgba(color, 0.5));
                    linearGradient.addColorStop(1.0, hexToRgba(color, 1.0));
                    ctx.fillStyle = linearGradient;
                    ctx.fillRect(0, 0, size, size);

                    let texture = new THREE.Texture(canvas);
                    texture.needsUpdate = true; //必须
                    return texture;
                }

                /**
                 * 将十六进制的颜色值转成rgba
                 * @param {String} hex
                 * @param {number} opacity
                 * @returns {string}
                 */
                function hexToRgba(hex, opacity = 1) {
                    return (
                        "rgba(" +
                        parseInt("0x" + hex.slice(1, 3)) +
                        "," +
                        parseInt("0x" + hex.slice(3, 5)) +
                        "," +
                        parseInt("0x" + hex.slice(5, 7)) +
                        "," +
                        opacity +
                        ")"
                    );
                }

                // 动画
                function animate() {
                    // 纹理偏移
                    texture_offset -= 0.005; // 向上移动
                    texture.offset.set(0, texture_offset);

                    if (amap) {
                        amap.render();
                    }
                    requestAnimationFrame(() => {
                        animate();
                    });
                }

                initLayer();
            }
            function PathSimplifier() {
                //转换成2D模式

                //加载PathSimplifier，loadUI的路径参数为模块名中 'ui/' 之后的部分
                AMapUI.load(
                    ["ui/misc/PathSimplifier", "lib/$"],
                    function (PathSimplifier, $) {
                        if (!PathSimplifier.supportCanvas) {
                            alert("当前环境不支持 Canvas!");
                            return;
                        }
                        //just some colors
                        var colors = [
                            "#3366cc",
                            "#dc3912",
                            "#ff9900",
                            "#109618",
                            "#990099",
                            "#0099c6",
                            "#dd4477",
                            "#66aa00",
                            "#b82e2e",
                            "#316395",
                            "#994499",
                            "#22aa99",
                            "#aaaa11",
                            "#6633cc",
                            "#e67300",
                            "#8b0707",
                            "#651067",
                            "#329262",
                            "#5574a6",
                            "#3b3eac",
                        ];
                        var pathSimplifierIns = new PathSimplifier({
                            zIndex: 100,
                            //autoSetFitView:false,
                            map: amap, //所属的地图实例
                            getPath: function (pathData, pathIndex) {
                                return pathData.path;
                            },
                            getHoverTitle: function (
                                pathData,
                                pathIndex,
                                pointIndex
                            ) {
                                if (pointIndex >= 0) {
                                    //point
                                    return (
                                        pathData.name +
                                        "，点：" +
                                        pointIndex +
                                        "/" +
                                        pathData.path.length
                                    );
                                }
                                return (
                                    pathData.name +
                                    "，点数量" +
                                    pathData.path.length
                                );
                            },
                            renderOptions: {
                                pathLineStyle: {
                                    dirArrowStyle: true,
                                },
                                getPathStyle: function (pathItem, zoom) {
                                    var color =
                                            colors[
                                                pathItem.pathIndex %
                                                    colors.length
                                            ],
                                        lineWidth = Math.round(
                                            4 * Math.pow(1.1, zoom - 3)
                                        );
                                    return {
                                        pathLineStyle: {
                                            strokeStyle: color,
                                            lineWidth: lineWidth,
                                        },
                                        pathLineSelectedStyle: {
                                            lineWidth: lineWidth + 2,
                                        },
                                        pathNavigatorStyle: {
                                            fillStyle: color,
                                        },
                                    };
                                },
                            },
                        });
                        window.pathSimplifierIns = pathSimplifierIns;
                        $(
                            '<div id="loadingTip">加载数据，请稍候...</div>'
                        ).appendTo(document.body);
                        $.getJSON(
                            "https://a.amap.com/amap-ui/static/data/big-routes.json",
                            function (d) {
                                $("#loadingTip").remove();
                                var flyRoutes = [];
                                for (var i = 0, len = d.length; i < len; i++) {
                                    if (d[i].name.indexOf("乌鲁木齐") >= 0) {
                                        d.splice(i, 0, {
                                            name: "飞行 - " + d[i].name,
                                            path: PathSimplifier.getGeodesicPath(
                                                d[i].path[0],
                                                d[i].path[d[i].path.length - 1],
                                                100
                                            ),
                                        });
                                        i++;
                                        len++;
                                    }
                                }
                                d.push.apply(d, flyRoutes);
                                pathSimplifierIns.setData(d);
                                //initRoutesContainer(d);
                                function onload() {
                                    pathSimplifierIns.renderLater();
                                }
                                function onerror(e) {
                                    alert("图片加载失败！");
                                }
                                //创建一个巡航器
                                var navg0 =
                                    pathSimplifierIns.createPathNavigator(1, {
                                        loop: true, //循环播放
                                        speed: 500000,
                                    });
                                navg0.start();
                                var navg1 =
                                    pathSimplifierIns.createPathNavigator(1, {
                                        loop: true,
                                        speed: 1000000,
                                        pathNavigatorStyle: {
                                            width: 55,
                                            height: 35,
                                            //使用图片
                                            content:
                                                PathSimplifier.Render.Canvas.getImageContent(
                                                    "../../../src/assets/images/caricon.png"
                                                    // onload,
                                                    // onerror
                                                ),
                                            strokeStyle: null,
                                            fillStyle: null,
                                            //经过路径的样式
                                            pathLinePassedStyle: {
                                                lineWidth: 6,
                                                strokeStyle: "black",
                                                dirArrowStyle: {
                                                    stepSpace: 15,
                                                    strokeStyle: "red",
                                                },
                                            },
                                        },
                                    });
                                navg1.start();
                                var navg2 =
                                    pathSimplifierIns.createPathNavigator(7, {
                                        loop: true,
                                        speed: 500000,
                                        pathNavigatorStyle: {
                                            width: 55,
                                            height: 35,
                                            content:
                                                PathSimplifier.Render.Canvas.getImageContent(
                                                    "../../../src/assets/images/caricon.png"
                                                    // onload,
                                                    // onerror
                                                ),
                                            strokeStyle: null,
                                            fillStyle: null,
                                        },
                                    });
                                navg2.start();
                                var navg3 =
                                    pathSimplifierIns.createPathNavigator(5, {
                                        loop: true,
                                        speed: 500000,
                                        pathNavigatorStyle: {
                                            pathLinePassedStyle: null,
                                            autoRotate: true, //禁止调整方向
                                            width: 55,
                                            height: 35,
                                            content:
                                                PathSimplifier.Render.Canvas.getImageContent(
                                                    "../../../src/assets/images/caricon.png",
                                                    onload,
                                                    onerror
                                                ),
                                            strokeStyle: null,
                                            fillStyle: null,
                                        },
                                    });
                                navg3.start();
                                pathSimplifierIns.setFitView(-1);
                            }
                        );
                    }
                );
            }
            function addGuangZhouArea(PathSimplifier, amap) {
                function addPolygon(data, center, name) {
                    let polygon = new AMap.Polygon({
                        path: data,
                        fillColor: color,
                        strokeOpacity: 1,
                        fillOpacity: 0.5,
                        strokeColor: "#2b8cbe",
                        strokeWeight: 1,
                        strokeStyle: "solid",
                        strokeDasharray: [5, 5],
                    });
                    //添加文本标签
                    let label = new AMap.Text({
                        text: name, // 名称
                        position: center, // 中心位置
                        anchor: "center", // 锚点为中心
                        offset: new AMap.Pixel(0, -10), // 偏移量，使标签在多边形上方显示
                    });
                    label.setStyle({
                        color: "#d1caca",
                        borderRadius: "5px", // 盒子圆角
                        padding: "5px 5px", // 盒子内边距
                        fontSize: "7px", // 字体大小
                        backgroundColor: "transparent",
                        border: "none",
                        fontWeight: "600",
                        fontFamily: "cursive",
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
                            fillColor: color,
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
                        if (amap.getZoom() < 9 || amap.getZoom() >= 12) {
                            amap.remove([polygon, label]);
                        } else {
                            amap.add([polygon, label]);
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
                            GuangZhouJson.features[i].properties.name,
                            colorArray[i]
                        );
                    }
                }
            }
            function addChinaArea(PathSimplifier, amap) {
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
                    // 添加文本标签
                    let label = new AMap.Text({
                        text: name, // 名称
                        position: center, // 中心位置
                        anchor: "center", // 锚点为中心
                        offset: new AMap.Pixel(0, -10), // 偏移量，使标签在多边形上方显示
                    });
                    label.setStyle({
                        color: "#bdb8b8",
                        borderRadius: "5px", // 盒子圆角
                        padding: "5px 5px", // 盒子内边距
                        fontSize: "7px", // 字体大小
                        backgroundColor: "transparent",
                        border: "none",
                        fontFamily: "cursive",
                        fontWeight: "600",
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
                                zoom: 9,
                            },
                        });
                    });
                    //统一处理地图放缩事件
                    amap.on("zoomchange", function () {
                        if (amap.getZoom() >= 9) {
                            amap.remove([polygon, label]);
                        } else {
                            amap.add([polygon, label]);
                        }
                    });

                    amap.add([polygon, label]);
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

            // 行车轨迹渲染
            PathSimplifier(amap, mapChart);
            //单区域极光动画
            // ThreeGuangzhou(amap);

            // 区域极光渲染
            // let loca = (window.loca = new Loca.Container({
            //     map: amap,
            // }));
            // let ambLight = new Loca.AmbientLight({
            //     intensity: 0.6,
            //     color: "#fff",
            // });
            // loca.addLight(ambLight);
            // let dirLight = new Loca.DirectionalLight({
            //     intensity: 0.6,
            //     color: "#fff",
            //     target: [0, 0, 0],
            //     position: [0, 1, 0],
            // });
            // loca.addLight(dirLight);
            // let pointLight = new Loca.PointLight({
            //     color: "rgb(100,100,100)",
            //     position: [120.24289, 30.341335, 20000],
            //     intensity: 3,
            //     distance: 50000,
            // });
            // loca.addLight(pointLight);
            // let geo = new Loca.GeoJSONSource({
            //     url: "https://a.amap.com/Loca/static/loca-v2/demos/mock_data/hz_gn.json",
            // });
            // let colors = [
            //     "#00C6DA",
            //     "#9FE084",
            //     "#9FE084",
            //     "#5ACA70",
            //     "#00AF53",
            //     "#00873A",
            //     "#006B31",
            //     "#004835",
            //     "#003829",
            // ];
            // let height = [10, 20, 40, 60, 80, 100, 120, 140, 160];
            // height = height.map((h) => h * 2);
            // let pl = new Loca.PolygonLayer({
            //     zIndex: 120,
            //     cullface: "none",
            //     shininess: 1,
            //     hasBottom: false,
            //     blockHide: false,
            //     hasSide: true,
            //     hasTop: false,
            //     depth: false,
            // });
            // pl.setSource(geo);
            // pl.setStyle({
            //     topColor: function (index, feature) {
            //         return "rgba(255,255,255,0)";
            //     },
            //     sideTopColor: function (index, feature) {
            //         return "rgba(0,255,255,0)";
            //     },
            //     sideBottomColor: function (index, feature) {
            //         var v = feature.properties.health * 100;
            //         return v < 40
            //             ? colors[8]
            //             : v < 50
            //             ? colors[7]
            //             : v < 55
            //             ? colors[6]
            //             : v < 60
            //             ? colors[5]
            //             : v < 65
            //             ? colors[4]
            //             : v < 70
            //             ? colors[3]
            //             : v < 75
            //             ? colors[2]
            //             : v < 80
            //             ? colors[1]
            //             : v < 100
            //             ? colors[0]
            //             : "green";
            //     },
            //     height: function (index, feature) {
            //         var v = feature.properties.health * 80;
            //         return v * v;
            //     },
            //     altitude: 0,
            // });
            // loca.add(pl);
            // // 图例
            // new Loca.Legend({
            //     loca: loca,
            //     title: {
            //         label: "流量值",
            //         fontColor: "#eee",
            //     },
            //     style: {
            //         backgroundColor: "rgba(255,255,255,0.1)",
            //         left: "20px",
            //         bottom: "40px",
            //     },
            //     dataMap: [
            //         { label: 100, color: colors[8] },
            //         { label: 80, color: colors[7] },
            //         { label: 75, color: colors[6] },
            //         { label: 70, color: colors[5] },
            //         { label: 65, color: colors[4] },
            //         { label: 60, color: colors[3] },
            //         { label: 55, color: colors[2] },
            //         { label: 50, color: colors[1] },
            //         { label: 40, color: colors[0] },
            //     ],
            // });
        }

        // 根据延迟时间设置定时器，用于隐藏加载动画并显示动画元素
        setTimeout(function () {
            //加载动画
            mapChart.showLoading();
            //时间轴渲染
            for (var n = 0; n < TimeLIne.length; n++) {
                option2.timeline.data.push(TimeLIne[n]);
                const timeName = (function () {
                    return TimeLIne[n] >= 10 ? TimeLIne[n] : "0" + TimeLIne[n];
                })();
                option2.options.push({
                    title: {
                        show: true,
                        text: timeName,
                    },
                    //     series: {
                    //         name: TimeLIne[n],
                    //         type: 'scatter',
                    //         itemStyle: itemStyle,
                    //         data: data.series[n],
                    //         symbolSize: function(val) {
                    //             return sizeFunction(val[2]);
                    //         }
                    //     },
                });
            }
            mapChart.setOption(option2, true);
            //延时处理
            setTimeout(function () {
                mapChart.hideLoading();
            }, 1000);
            //地图渲染
            initialMap();
        }, 2500);
    }, []);
    //广州极光动画

    //行车轨迹渲染

    //中国各省区域渲染

    //广州各区区域渲染

    return (
        <>
            <div
                id="aMap"
                className="aMap"
                style={{ width: "100%", height: "100%" }}
            ></div>
        </>
    );
};

export default EchartMap;

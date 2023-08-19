import React, { useEffect, useState } from "react";
import * as echarts from "echarts";
import "echarts-extension-amap";
import GuangZhouJson from "../utils/guangzhou.json";
import ChinaJson from "../utils/china.json";
import carIcon from "../assets/images/car.jpg";
import adsIcon from "../assets/images/ads.png";
const EchartMap = () => {
    const [icon, setIcon] = useState(carIcon);
    useEffect(() => {
        var panyuData = [
            { value: [113.393116, 23.039404], name: "华南师范" },
            { value: [113.405492, 23.048527], name: "北京师范" },
            { value: [113.352062, 23.139339], name: "华南理工" },
            { value: [113.383799, 22.942212], name: "中山大学" },
            { value: [113.366177, 22.946164], name: "广东工业大学" },
            { value: [113.325536, 22.967779], name: "暨南大学" },
            { value: [113.376519, 22.910552], name: "哈工大学" },
        ];
        // 热点圆区域
        var HotPoints = [
            {
                value: [113.383917, 22.93756, 34],
                name: "番禺区",
               
            },
           
          
            {
                value: [113.201503, 23.131377, 45] ,
                name: "越秀区",
               
            },
          
            {
                value: [113.48378, 23.10901, 40],
                name: "黄埔区",
            },
         
            {
                value: [113.810734, 23.261452,50],
                name: "增城区",
     
            },
            {
                value: [113.220125, 23.404326,60],
                name: "花都区",
    
            },
         
        ];
       
        var color = [
            "#1e89be",
            "#2da5e1",
            "#287de4",
            "#1996d5",
            "#2985d1", 
        ];
     
      
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
        
        const option2 = {
          
            amap: {
                maptypecontrol: true,
                zoom: 10,
                skyColor: "#174ae4",
                roam: false,
                viewMode: "3D", //是否启用3d地图
                showLabel: false,
                largeMode: false,
                pitch: 35, //视角高度
                resizeEnable: true,
                center: [113.33, 23.16],
                mapStyle: "amap://styles/darkblue",
            },
          
            title: {
                text: "热点区域",
                left: "center",
                textStyle: {
                    fontFamily: "YouSheBiaoTiHei",
                    fontSize: "50px",
                    color: "#05e8fe",
                    fontFamily: "cursive",
                },
            },
            tooltip: {
                trigger: "item",
            },
            series: [  
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
                                                    formatter: function (params ) {
                                                    
                                                        // 根据 params.dataIndex 获取对应的索引值
                                                        var index =
                                                            params.dataIndex;
                                                        // 根据索引值获取相应的名称
                                                        var name =
                                                            HotPoints.map(
                                                                (item) =>
                                                                    item.name
                                                            )[index];
                                                        // 返回格式化后的字符串
                                                        return name;
                                                    },

                                                    position: "right",
                                                    offset: [0, 0],
                                                    color: "#1DE9B6",
                                                    show: true,
                                                    fontFamily: "cursive",
                                                },
                                            },
                                            itemStyle: {
                                                normal: {
                                                    color: function (i) {
                                                        return color[
                                                            i.dataIndex
                                                        ];
                                                    },
                                                    shadowBlur: 10,
                                                    shadowColor: "#333",
                                                },
                                            },
                                symbolSize: function (i) {return i[2];},
                                  data: HotPoints.map((item) => item.value),

                                            // onClick: function (params) {
                                            //     // 根据 params.dataIndex 获取对应的索引值
                                            //     var index = params.dataIndex;
                                            //     // 根据索引值获取相应的经纬度
                                            //     var latLng = [HotPoints[index].value[0], HotPoints[index].value[1]];
                                            //     console.log(" latLng:", latLng);
                                            //     // 设置地图的缩放级别和中心点位置
                                            //     amap.setZoomAndCenter(
                                            //         12,
                                            //         latLng
                                            //     );
                                            //     // 移除该涟漪点的系列数据
                                            //     amap.remove(this.seriesIndex);
                                            // },
                                        },
            ],
        };
       
        const option3 = {
            amap: {
                maptypecontrol: true,
                zoom:12,
                skyColor: "#174ae4",
                roam: false,
                viewMode: "3D", //是否启用3d地图
                showLabel: false,

                largeMode: false,
                pitch: 35, //视角高度
                resizeEnable: true,
                mapStyle: "amap://styles/darkblue",
            },
            title: {
                text: "番禺区载客热点",
                left: "center",
                textStyle: {
                    fontFamily: "YouSheBiaoTiHei",
                    fontSize: "50px",
                    color: "#05e8fe",
                    fontFamily: "cursive",
                },
            },
            tooltip: {
                trigger: "item",
            },
            series: [
                {
                    name: "载客热点",
                    type: "scatter",
                    coordinateSystem: "amap",
                    zlevel: 1,
                   
                    hoverAnimation: true,
                    label: {
                        normal: {
                            formatter: function (params) {
                                var index = params.dataIndex;
                                var name = panyuData.map((item) => item.name)[index];
                                return name;
                            },

                            position: "right",
                            offset: [0, 0],
                            color: "#1DE9B6",
                            show: true,
                            fontFamily: "cursive",
                        },
                    },
                    itemStyle: {
                        normal: {
                            color: "blue",
                            opacity: 1, // 设置散点图标的透明度
                            shadowColor: "rgba(0, 0, 0, 0.5)", // 设置阴影颜色
                            shadowBlur: 10, // 设置阴影模糊大小
                            shadowOffsetX: 0, // 设置阴影水平偏移量
                            shadowOffsetY: 0, // 设置阴影垂直偏移量
                        },
                    },
                    symbol: "image://" + icon,
                    symbolSize: 20,
                    data: panyuData.map((item) => item.value),
                },
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
                        if (amap.getZoom() < 10 || amap.getZoom() >= 12) {
                            amap.remove([polygon, label]);
                        } else {
                            amap.add([polygon, label]);
                        }
                        // if (amap.getZoom() >= 12) {
                        //     setTimeout(() => {
                        //         mapChart.setOption({
                        //             series: [
                        //                 //涟漪点
                        //                 {
                        //                     type: "effectScatter",
                        //                     coordinateSystem: "amap",
                        //                     showEffectOn: "render",
                        //                     zlevel: 1,
                        //                     rippleEffect: {
                        //                         period: 15,
                        //                         scale: 4,
                        //                         brushType: "fill",
                        //                     },
                        //                     hoverAnimation: true,

                        //                     label: {
                        //                         normal: {
                        //                             formatter: function (
                        //                                 params
                        //                             ) {
                        //                                 // 根据 params.dataIndex 获取对应的索引值
                        //                                 var index =
                        //                                     params.dataIndex;
                        //                                 // 根据索引值获取相应的名称
                        //                                 var name =
                        //                                     HotPoints.map(
                        //                                         (item) =>
                        //                                             item.name
                        //                                     )[index];
                        //                                 // 返回格式化后的字符串
                        //                                 return name;
                        //                             },

                        //                             position: "right",
                        //                             offset: [0, 0],
                        //                             color: "#1DE9B6",
                        //                             show: true,
                        //                             fontFamily: "cursive",
                        //                         },
                        //                     },
                        //                     itemStyle: {
                        //                         normal: {
                        //                             color: function (i) {
                        //                                 return color[
                        //                                     i.dataIndex
                        //                                 ];
                        //                             },
                        //                             shadowBlur: 10,
                        //                             shadowColor: "#333",
                        //                         },
                        //                     },
                        //                     symbolSize: 12,

                        //                     data: HotPoints.map(
                        //                         (item) => item.value
                        //                     ),
                        //                     onClick: function (params) {
                        //                         // 根据 params.dataIndex 获取对应的索引值
                        //                         var index = params.dataIndex;
                        //                         // 根据索引值获取相应的经纬度
                        //                         var latLng = HotPoints.map(
                        //                             (item) => item.value
                        //                         )[index];
                        //                         console.log(" latLng:", latLng);
                        //                         // 设置地图的缩放级别和中心点位置
                        //                         amap.setZoomAndCenter(
                        //                             12,
                        //                             latLng
                        //                         );
                        //                         // 移除该涟漪点的系列数据
                        //                         amap.remove(this.seriesIndex);
                        //                     },
                        //                 },
                        //             ],
                        //         });
                        //     }, 1000);
                        // } else {
                        //     setTimeout(() => {
                        //         mapChart.setOption({
                        //             series: [
                        //                 //贝塞尔曲线
                        //                 {
                        //                     type: "lines",
                        //                     coordinateSystem: "amap",
                        //                     zlevel: 2,
                        //                     effect: {
                        //                         show: true,
                        //                         period: 4, //箭头指向速度，值越小速度越快
                        //                         trailLength: 0.4, //特效尾迹长度[0,1]值越大，尾迹越长重
                        //                         symbol: "arrow", //箭头图标
                        //                         symbolSize: 7, //图标大小
                        //                     },
                        //                     lineStyle: {
                        //                         normal: {
                        //                             color: function (i) {
                        //                                 return color[
                        //                                     i.dataIndex
                        //                                 ];
                        //                             },
                        //                             width: 1, //线条宽度
                        //                             opacity: 0.1, //尾迹线条透明度
                        //                             curveness: 0.3, //尾迹线条曲直度
                        //                         },
                        //                     },
                        //                     data: [
                        //                         {
                        //                             coords: [
                        //                                 [118.8062, 31.9208],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [127.9688, 45.368],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [110.3467, 41.4899],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [125.8154, 44.2584],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [116.4551, 40.2539],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [119.4543, 25.9222],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [114.4995, 38.1006],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [117.4219, 39.4189],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [112.3352, 37.9413],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [109.1162, 34.2004],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [103.5901, 36.3043],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [106.3586, 38.1775],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [101.4038, 36.8207],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [103.9526, 30.7617],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [108.384366, 30.439702],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [113.0823, 28.2568],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [102.9199, 25.46639],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [91.11, 29.97],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                         {
                        //                             coords: [
                        //                                 [87.68, 43.77],
                        //                                 [123.1238, 42.1216],
                        //                             ],
                        //                         },
                        //                     ],
                        //                 },
                        //             ],
                        //         });
                        //     }, 1000);
                        // }
                    });
                    amap.add([polygon, label]);
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
            addGuangZhouArea();
        }
        // 根据延迟时间设置定时器，用于隐藏加载动画并显示动画元素
        setTimeout(function () {
            //加载动画
            mapChart.showLoading();
            mapChart.setOption(option2, true);

            mapChart.on('click', function (params) {
                if (params.componentType === 'series' && params.seriesType === 'effectScatter') {
                    var position = params.value; 
                         var latLng = [position[0], position[1]];
                           console.log(" latLng:", latLng);
                    mapChart.setOption({
                        amap:{
                            zoom:12,
                            center: latLng
                        },
                        series: [
                            {
                                name: "载客热点",
                                type: "scatter",
                                coordinateSystem: "amap",
                                zlevel: 1,
                                hoverAnimation: true,
                                label: {
                                    normal: {
                                        formatter: function (params) {
                                            // 根据 params.dataIndex 获取对应的索引值
                                            var index = params.dataIndex;
                                            // 根据索引值获取相应的名称
                                            var name = panyuData.map((item) => item.name)[
                                                index
                                            ];
                                            // 返回格式化后的字符串
                                            return name;
                                        },

                                        position: "right",
                                        offset: [0, 0],
                                        color: "#1DE9B6",
                                        show: true,
                                        fontFamily: "cursive",
                                    },
                                },
                                itemStyle: {
                                    normal: {
                                        color: "blue",
                                        opacity: 1, // 设置散点图标的透明度
                                        shadowColor: "rgba(0, 0, 0, 0.5)", // 设置阴影颜色
                                        shadowBlur: 10, // 设置阴影模糊大小
                                        shadowOffsetX: 0, // 设置阴影水平偏移量
                                        shadowOffsetY: 0, // 设置阴影垂直偏移量
                                    },
                                },
                                symbol: "image://" + icon,
                                symbolSize: 20,
                                data: panyuData.map((item) => item.value),
                            },
                        ],
                    });
                                            
                                               
                }
            });

            //延时处理
            setTimeout(function () {
                mapChart.hideLoading();
            }, 1000);
            //地图渲染
            // initialMap();
        }, 2500);


    }, []);
    // 监听点击事件
 

    return (
        <>
            <div id="aMap" style={{ width: "100%", height: "100%" }}></div>
        </>
    );
};

export default EchartMap;

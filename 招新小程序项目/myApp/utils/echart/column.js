import * as echarts from "../../ec-canvas/echarts"
const getColumnOptions = ()=>{
  
//  const data = [
//     {
//       name: "使用中资源量",
//       value: 754,
//     },
//     {
//       name: "维修中资源量",
//       value: 611,
//     },
//     {
//       name: "保养中资源量",
//       value: 400,
//     },
//     {
//       name: "已损坏资源量",
//       value: 200,
//     },
//   ];
//   function getArrayValue(array, key) {
//     var key = key || "value";
//     var res = [];
//     if (array) {
//       array.forEach(function (t) {
//         res.push(t[key]);
//       });
//     }
//     return res;
//   }
  
//   function array2obj(array, key) {
//     var resObj = {};
//     for (var i = 0; i < array.length; i++) {
//       resObj[array[i][key]] = array[i];
//     }
//     return resObj;
//   }
  
//   function getData(data) {
//     var res = {
//       series: [],
//       yAxis: [],
//     };
//     for (let i = 0; i < data.length; i++) {
//       // console.log([70 - i * 15 + '%', 67 - i * 15 + '%']);
//       res.series.push({
//         name: "",
//         type: "pie",
//         clockWise: false, //顺时加载
//         hoverAnimation: false, //鼠标移入变大
//         radius: [73 - i * 15 + "%", 68 - i * 15 + "%"],
//         center: ["30%", "55%"],
//         label: {
//           show: false,
//         },
//         itemStyle: {
//           label: {
//             show: false,
//           },
//           labelLine: {
//             show: false,
//           },
//           borderWidth: 5,
//         },
//         data: [
//           {
//             value: data[i].value,
//             name: data[i].name,
//           },
//           {
//             value: sumValue - data[i].value,
//             name: "",
//             itemStyle: {
//               color: "rgba(0,0,0,0)",
//               borderWidth: 0,
//             },
//             tooltip: {
//               show: false,
//             },
//             hoverAnimation: false,
//           },
//         ],
//       });
//       res.series.push({
//         name: "",
//         type: "pie",
//         silent: true,
//         z: 1,
//         clockWise: false, //顺时加载
//         hoverAnimation: false, //鼠标移入变大
//         radius: [73 - i * 15 + "%", 68 - i * 15 + "%"],
//         center: ["30%", "55%"],
//         label: {
//           show: false,
//         },
//         itemStyle: {
//           label: {
//             show: false,
//           },
//           labelLine: {
//             show: false,
//           },
//           borderWidth: 5,
//         },
//         data: [
//           {
//             value: 7.5,
//             itemStyle: {
//               color: "rgb(3, 31, 62)",
//               borderWidth: 0,
//             },
//             tooltip: {
//               show: false,
//             },
//             hoverAnimation: false,
//           },
//           {
//             value: 2.5,
//             name: "",
//             itemStyle: {
//               color: "rgba(0,0,0,0)",
//               borderWidth: 0,
//             },
//             tooltip: {
//               show: false,
//             },
//             hoverAnimation: false,
//           },
//         ],
//       });
//       res.yAxis.push(((data[i].value / sumValue) * 100).toFixed(2) + "%");
//     }
//     return res;
//   }
//  const arrName = getArrayValue(data, "name");
//   const arrValue = getArrayValue(data, "value");
//   const sumValue = arrValue.reduce((acc, val) => acc + val, 0);
//   const objData = array2obj(data, "name");
//   const optionData = getData(data);

  
//   const option = {
//     backgroundColor: "#000",
//     legend: {
//       show: true,
//       icon: "circle",
//       top: "center",
//       left: "70%",
//       data: arrName,
//       width: 50,
//       padding: [0, 5],
//       itemGap: 25,
//       formatter: function (name) {
//         return (
//           "{title|" + name + "}\n{value|" + objData[name].value + "}  {title|项}"
//         );
//       },
  
//       textStyle: {
//         rich: {
//           title: {
//             fontSize: 16,
//             lineHeight: 15,
//             color: "rgb(0, 178, 246)",
//           },
//           value: {
//             fontSize: 18,
//             lineHeight: 20,
//             color: "#fff",
//           },
//         },
//       },
//     },
//     tooltip: {
//       show: true,
//       trigger: "item",
//       formatter: "{a}<br>{b}:{c}({d}%)",
//     },
//     color: [
//       "rgb(24, 183, 142)",
//       "rgb(1, 179, 238)",
//       "rgb(22, 75, 205)",
//       "rgb(52, 52, 176)",
//     ],
//     grid: {
//       top: "16%",
//       bottom: "53%",
//       left: "30%",
//       containLabel: false,
//     },
//     yAxis: [
//       {
//         type: "category",
//         inverse: true,
//         axisLine: {
//           show: false,
//         },
//         axisTick: {
//           show: false,
//         },
//         axisLabel: {
//           interval: 0,
//           inside: true,
//           textStyle: {
//             color: "#fff",
//             fontSize: 16,
//           },
//           show: true,
//         },
//         data: optionData.yAxis,
//       },
//     ],
//     xAxis: [
//       {
//         show: false,
//       },
//     ],
//     series: optionData.series,
//   };
let xLabel = ['3.26', '3.27', '3.28', '3.29', '3.30', '3.31']
let goToSchool = ["40", "60", "22", "85", "50", "40"]
let goOutSchool = ["20", "50", "12", "65", "30", "60"]

const option = {
    backgroundColor: '#0e1c47',
    tooltip: {
        trigger: 'axis',
        backgroundColor:'transparent',
        axisPointer: {
            lineStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                        offset: 0,
                        color: 'rgba(126,199,255,0)' // 0% 处的颜色
                    }, {
                        offset: 0.5,
                        color: 'rgba(126,199,255,1)' // 100% 处的颜色
                    }, {
                        offset: 1,
                        color: 'rgba(126,199,255,0)' // 100% 处的颜色
                    }],
                    global: false // 缺省为 false
                }
            },
        },
        formatter: (p) => {
            let dom = `<div style="width: 79px;
	height: 50px;;color:#fff;position: relative;">
        <svg style="position: absolute;top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);" class="svg" xmlns="http://www.w3.org/2000/svg" width="100" height="71" viewBox="0 0 84 55">
      <defs>
        <style>
          .cls-1 {
            fill: #07172c;
            fill-opacity: 0.8;
            stroke: #a7d8ff;
            stroke-linejoin: round;
            stroke-opacity: 0.2;
            stroke-width: 1px;
            fill-rule: evenodd;
          }

        </style>
      </defs>
      <path id="矩形_419" data-name="矩形 419" class="cls-1" d="M266,595h74v50H266V624.046L261,620l5-3.984V595Z"
        transform="translate(-258.5 -592.5)" />
    </svg>
        <div style="padding: 4px 8px 4px 14px;display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;position: relative;z-index: 1;">
            <div style="margin-bottom: 4px;width:100%;display:${p[0]?'flex':'none'};justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${p[0]?p[0].seriesName:''}</span>
                <span style="font-size:14px;color:#fff;">${p[0]?p[0].data:''}</span>
            </div>
            <div style="width:100%;height:100%;display:${p[1]?'flex':'none'};justify-content:space-between;align-items:center;">
                <span style="font-size:14px;color:#7ec7ff;">${p[1]?p[1].seriesName:''}</span>
                <span style="font-size:14px;color:#fff;">${p[1]?p[1].data:''}</span>
            </div>
        </div>
    </div>`
            return dom
        }
    },
    legend: {
        align: "left",
        right: '10%',
        top:'10%',
        type:'plain',
        textStyle:{
            color:'#7ec7ff',
            fontSize:16
        },
        // icon:'rect',
        itemGap:25,
        itemWidth:18,
        icon:'path://M0 2a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v0a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2z',
        data: [
            {
                name: '上学'
            },
            {
                name: '放学'
            }
        ]
    },
    grid: {
        top: '15%',
        left: '10%',
        right: '10%',
        bottom: '15%',
        // containLabel: true
    },
    xAxis: [{
        type: 'category',
        boundaryGap: false,
        axisLine: { //坐标轴轴线相关设置。数学上的x轴
            show: true,
            lineStyle: {
                color: '#233653'
            },
        },
        axisLabel: { //坐标轴刻度标签的相关设置
            textStyle: {
                color: '#7ec7ff',
                padding: 16,
                fontSize: 14
            },
            formatter: function(data) {
                return data
            }
        },
        splitLine: {
            show: true,
            lineStyle: {
                color: '#192a44'
            },
        },
        axisTick: {
            show: false,
        },
        data: xLabel
    }],
    yAxis: [{
        name: '人数',
        nameTextStyle: {
            color: "#7ec7ff",
            fontSize: 16,
            padding: 10
        },
        min: 0,
        splitLine: {
            show: true,
            lineStyle: {
                color: '#192a44'
            },
        },
        axisLine: {
            show: true,
            lineStyle: {
                color: "#233653"
            }

        },
        axisLabel: {
            show: true,
            textStyle: {
                color: '#7ec7ff',
                padding: 16
            },
            formatter: function(value) {
                if (value === 0) {
                    return value
                }
                return value
            }
        },
        axisTick: {
            show: false,
        },
    }],
    series: [
      {
        name: '上学',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
            normal: {
                width: 5,
                color: "rgba(25,163,223,1)", // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
            color: "rgba(25,163,223,1)",
            borderColor: "#646ace",
            borderWidth: 2

        },
        tooltip: {
            show: true
        },
        areaStyle: { //区域填充样式
            normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(25,163,223,.3)"


                    },
                    {
                        offset: 1,
                        color: "rgba(25,163,223, 0)"
                    }
                ], false),
                shadowColor: 'rgba(25,163,223, 0.5)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
        },
        data: goToSchool
    },
     {
        name: '放学',
        type: 'line',
        symbol: 'circle', // 默认是空心圆（中间是白色的），改成实心圆
        showAllSymbol: true,
        symbolSize: 0,
        smooth: true,
        lineStyle: {
            normal: {
                width: 5,
                color: "rgba(10,219,250,1)", // 线条颜色
            },
            borderColor: 'rgba(0,0,0,.4)',
        },
        itemStyle: {
            color: "rgba(10,219,250,1)",
            borderColor: "#646ace",
            borderWidth: 2

        },
        tooltip: {
            show: true
        },
        areaStyle: { //区域填充样式
            normal: {
                //线性渐变，前4个参数分别是x0,y0,x2,y2(范围0~1);相当于图形包围盒中的百分比。如果最后一个参数是‘true’，则该四个值是绝对像素位置。
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                        offset: 0,
                        color: "rgba(10,219,250,.3)"
                    },
                    {
                        offset: 1,
                        color: "rgba(10,219,250, 0)"
                    }
                ], false),
                shadowColor: 'rgba(10,219,250, 0.5)', //阴影颜色
                shadowBlur: 20 //shadowBlur设图形阴影的模糊大小。配合shadowColor,shadowOffsetX/Y, 设置图形的阴影效果。
            }
        },
        data: goOutSchool
    }
  ]
};
  return option;
}
module.exports = getColumnOptions
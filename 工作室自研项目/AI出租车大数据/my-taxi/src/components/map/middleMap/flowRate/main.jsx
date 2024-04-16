import ReactDOM from 'react-dom';
import React, { useState, useRef, useEffect } from 'react';
import { Map, APILoader, Text, Polygon, ToolBarControl, InfoWindow } from '@uiw/react-amap';
import EchartMap from '../../mapColumn/main';
import style from './main.module.css'
import * as d3 from 'd3';
import Popup from '../../infoPopUps/main';

// 多边形覆盖物路径
const paths = [
    [
        [112.968904, 22.913423],
        [113.182122, 22.400176],
        [113.387271, 22.612501],
        [113.398258, 22.904600]
    ],
    [
        [112.913322, 23.430255],
        [112.820703, 23.697555],
        [112.512292, 23.392353],
        [112.799846, 23.401365]
    ],
    [
        [113.913322, 22.930255],
        [113.820703, 22.997555],
        [113.512292, 22.892353],
        [113.799846, 22.801365]
    ],
    [
        [113.913322, 23.430255],
        [113.820703, 23.697555],
        [113.512292, 23.392353],
        [113.799846, 23.401365]
    ],
    [
        [113.413322, 23.030255],
        [113.320703, 23.197555],
        [113.312292, 23.492353],
        [113.099846, 23.001365]
    ]
];

const Example = () => {
    const [colorArray, setColorArray] = useState([])//颜色数组
    const [hoveredPolygon, setHoveredPolygon] = useState(null);

    // 自定义弹窗设置
    const [showPopup, setShowPopup] = useState(false);
    const [popupPosition, setPopupPosition] = useState({ x: 0, y: 0 });
    const [popupData, setPopupData] = useState(null);
    const handlePolygonClick = (position, data) => {
        setShowPopup(true);
        setPopupPosition(position);
        setPopupData(data);
    };

    const data = [
        { value: 135, name: '拥挤' },
        { value: 274, name: '密集' },
        { value: 390, name: '较密' },
        { value: 435, name: '较疏' },
        { value: 500, name: '稀疏' },
    ];

    // 渐变色柱形图 的配置
    useEffect(() => {
        const minValue = 0;
        const maxValue = 400;
        const minColor = '#8bd4e5';
        const maxColor = '#073e4d';
        const colorScale = d3.interpolate(minColor, maxColor);
        const newcolorArray = data.map(
            (item) => colorScale((item.value - minValue) / (maxValue - minValue))
        );
        setColorArray(newcolorArray)
    }, [])

    const handlePolygonMouseOver = (index) => {
        setHoveredPolygon(index);
    };
    console.log('hoveredPolygon:', hoveredPolygon)
    return (
        <>
                <div style={{ width: '100%', height: '100%', }}>
                    <div className={style.EchartMap}>
                        {/* 渐变色柱形图 */}
                        <EchartMap color={colorArray} data={data} />
                    </div>
                    <Map zoom={9} center={[113.2644, 22.9001]} mapStyle="amap://styles/darkblue">
                        {paths.map((path, index) => (
                            <Polygon
                                key={index}
                                style={{
                                    strokeWidth: hoveredPolygon === index ? '4px' : '2px',
                                    strokeOpacity: hoveredPolygon === index ? 1 : 0.5,
                                    extrusion: true // 设置为 true，使多边形呈现 3D 效果
                                }}
                                visiable={true}
                                strokeOpacity={0.2}
                                path={path}
                                fillColor={colorArray[index]}
                                fillOpacity={0.7} // 设置填充颜色的透明度为50%
                                onMouseOver={(event) => {
                                    const pixel = event.originEvent;
                                    const { x, y } = pixel.pixel;
                                    const position = { x: x, y: y };
                                    console.log("position11:", position)
                                    const data = { title: `区域${index}`, x: `经度：${x.toFixed(3)}`, y: `纬度：${y.toFixed(3)}`, flow: `车流量：1000`, rate: `利用率：200`, income: `平均收入：3000元` };
                                    handlePolygonClick(position, data);
                                }}
                                onClick={() => handlePolygonMouseOver(index)}
                            />
                        ))}
                    </Map>
                    {/* 自定义弹窗 */}
                    {showPopup && popupData && (
                        <Popup
                            position={popupPosition}
                            data={popupData}
                            onClose={() => setShowPopup(false)}
                        />
                    )}
                </div>
        </>
    );
}

const Flow = () => (
    <APILoader akey="a7a90e05a37d3f6bf76d4a9032fc9129">
        <Example />
    </APILoader>
);

export default Flow;
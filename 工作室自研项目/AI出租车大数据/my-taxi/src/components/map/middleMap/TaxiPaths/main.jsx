import ReactDOM from 'react-dom';
import React, { useState, useRef, useEffect } from 'react';
import { Map, APILoader, Text, Polygon, ToolBarControl, InfoWindow } from '@uiw/react-amap';


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
 
 
    return (
        <>
            <div style={{ width: '100%', height: '100%', }}>
               
                <Map zoom={9} center={[113.2644, 22.9001]} mapStyle="amap://styles/darkblue">
                    {paths.map((path, index) => (
                        <Polygon
                            key={index}
                            visiable={true}
                            strokeOpacity={0.2}
                            path={path}
                        />
                    ))}
                </Map>
               
            </div>
        </>
    );
}

const Path = () => (
    <APILoader akey="a7a90e05a37d3f6bf76d4a9032fc9129">
        <Example />
    </APILoader>
);

export default Path;
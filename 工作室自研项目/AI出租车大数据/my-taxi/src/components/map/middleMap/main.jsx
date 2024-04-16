import React, { useEffect, useState } from "react";
import style from "./main.module.css";
import Flow from "./flowRate/main";
import Path from "./TaxiPaths/main";

const Map = () => {
    const [text, setText] = useState(" 广州市出租车流量");
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (!show) {
            setText("广州市出租车路径");
        }
    }, []);

    return (
        <>
            <div className={style.headerMap}>{text}</div>
            {/* 地图组件切换 */}
            {/* {show ? <Flow /> : <Path />} */}
            <Flow />
            {/* <Path /> */}
        </>
    );
};

export default Map;

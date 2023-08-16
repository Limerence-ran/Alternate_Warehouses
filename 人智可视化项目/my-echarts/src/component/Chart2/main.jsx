import style from "./main.module.css";
import React, { useState, useEffect } from "react";
import Pointxy from "../../components/point-xy/main";
import Bar from "../../components/bar/main";
import PointNoise from "../../components/point-noise/main";
import { Skeleton } from "antd";

function Chart2() {
    const [datas, setDatas] = useState([]);
    const [isshow, setisShow] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("data-xy"))
            setDatas(localStorage.getItem("data-xy"));
    }, []);
    function handlesubmit() {
        setisShow(!isshow);
        setTimeout(() => {
            navigate("/Group");
        }, 3000);
    }
    return (
        <>
            <div className={style.content}>
                <div className={style.header}>
                    <span>Data Visualization</span>
                </div>
                <div className={style.data}>
                    <div className={style.chart2}>
                        <div className={style.img}>
                            <Skeleton>
                                <Pointxy data_xy={datas}></Pointxy>
                            </Skeleton>
                        </div>
                        <div className={style.img}>
                            <Skeleton>
                                <Bar data_xy={datas}></Bar>
                            </Skeleton>
                        </div>
                        <div className={style.img}>
                            <Skeleton>
                                <PointNoise data_xy={datas}></PointNoise>
                            </Skeleton>
                        </div>
                    </div>
                    <button onClick={handlesubmit}>finish</button>
                </div>
                {isshow && <Vedio />}
            </div>
        </>
    );
}
export default Chart2;

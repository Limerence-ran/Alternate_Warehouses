import style from "./main.module.css";
import React, { useState, useEffect } from "react";
import Pointxy from "../../components/point-xy/main";
import Bar from "../../components/bar/main";
import PointLine from "../../components/point-line/main";
function Chart2() {
    const [datas, setDatas] = useState([]);
    if (localStorage.getItem("data-xy"))
        setDatas(localStorage.getItem("data-xy"));

    const [isshow, setisShow] = useState(false);
    useEffect(() => {});
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
                    <span>数据结果可视化</span>
                </div>
                <main>
                    <div className={style.chart2}>
                        <div className={style.img}>
                            <Pointxy data_xy={datas}></Pointxy>
                        </div>
                        <div className={style.img}>
                            <Bar data_xy={datas}></Bar>
                        </div>
                        <div className={style.img}>
                            <PointLine data_xy={datas}></PointLine>
                        </div>
                    </div>
                    <button onClick={handlesubmit}>finish</button>
                </main>
                {isshow && <Vedio />}
            </div>
        </>
    );
}
export default Chart2;

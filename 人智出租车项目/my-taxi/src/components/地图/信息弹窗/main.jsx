import React from "react";
import { useEffect } from "react";
import style from "./main.module.css";

const Popup = ({ position, data, onClose }) => {
    useEffect(() => {
        console.log(data);
    }, []);
    return (
        <div
            className={style.infor}
            style={{
                position: "absolute",
                top: position.y,
                left: position.x,
                backgroundColor: "rgb(0, 0, 1,0.8)",
                padding: "10px",
                borderRadius: "5px",
                // opacity:"0.8",
                color: "#fff",
                boxShadow: "inset 0px 0px 5px rgba(0, 0, 0, 0.3)",
            }}
        >
            {/* 在这里根据传入的数据渲染详细信息 */}
            <h4>{data.title}</h4>
            <p>{data.x}</p>
            <p>{data.y}</p>
            <p>{data.flow}</p>
            <p>{data.rate}</p>
            <p>{data.income}</p>
            <button onClick={onClose}>关闭</button>
        </div>
    );
};

export default Popup;

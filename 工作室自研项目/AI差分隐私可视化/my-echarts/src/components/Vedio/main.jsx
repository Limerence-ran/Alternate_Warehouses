import React, { useState } from "react";
import { Button, Modal } from "antd";
import img from "../../assets/1.gif";
import style from "./main.module.css";
import "./main.css";

const Vedio = () => {
    return (
        <>
            <Modal open={true} footer={null} className={style.modal}>
                <img src={img} className={style.img} />
                <div className={style.imgtext}>
                    <span>Iterating...</span>
                    <span>Please do not exit</span>
                </div>
            </Modal>
        </>
    );
};
export default Vedio;

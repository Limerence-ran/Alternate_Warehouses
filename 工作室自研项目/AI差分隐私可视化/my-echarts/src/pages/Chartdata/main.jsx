import style from "./main.module.css";
import Slider from "../../components/Slider/main";
import React, { useState, useEffect, useRef } from "react";
import Group from "../../components/Group/main";
import { BrowserRouter as Router, Outlet } from "react-router-dom";

import HomeTab from "../../charts/home-top/main";
function Chartdata() {
    const renderLis = (lis) => {};

    return (
        <>
            <div className={style.Chartbox}>
                <HomeTab />
                <div className={style.Chartbox_content}>
                    <Slider onLiElements={renderLis} />
                    <Outlet></Outlet>
                </div>
            </div>
        </>
    );
}
export default Chartdata;

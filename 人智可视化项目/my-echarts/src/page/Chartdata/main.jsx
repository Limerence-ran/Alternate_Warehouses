
import style from './main.module.css'
import Slider from '../../component/Slider/main'
import Header from '../../component/Header/main'
import React, { useState, useEffect, useRef } from 'react'
import Group from '../../component/Group/main'
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useRoutes } from "react-router-dom";

import HomeTab from '../../components/home-top/main'
function Chartdata() {
    const renderLis = (lis) => {
    }
   
    return (
        <>
            <div className={style.Chartbox}>
             <HomeTab/>
                <Slider onLiElements={renderLis} />
                <div className={style.swap}>
                    {/* {routes.map((route, index) => (
                        <Link key={index} to={route.path}><button>{index}</button></Link>
                    ))} */}
                  
                </div>
                <Outlet></Outlet>
            </div></>
    )
}
export default Chartdata

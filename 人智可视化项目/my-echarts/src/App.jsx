import React, { useState, useEffect } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import Login from "./pages/Login/main";
import Chartdata from "./page/Chartdata/main";
import Group from "./component/Group/main";
import Cancel from "./component/Cancel/main";
import Slider from "./component/Slider/main";
import UploadMyData from "./component/UploadMydata/main";
import Chart2 from "./component/Chart2/main";
import Chart4 from "./component/Chart4/main";
import CreateGroup from "./component/CreateGroup/main";
import Alldatasets from "./component/Alldatasets/main";
import Mydatasets from "./component/Mydatasets/main";
import Aboutme from "./component/Aboutme/main";
import Chart5 from "./component/Chart5/main";
import Vedio from "./component/Vedio/main";
import HomeTab from "./components/home-top/main";
import routes from "../src/router/router";
import HotGroup from "./component/HotGroup/main";
import Groupshow from "../src/component/Group/Groupshow/main";
import Pointxy from "./components/point-xy/main";
import Bar from "./components/bar/main";
import PointNoise from "./components/point-noise/main";
import RelationChart from "./components/relationship/main";
import EPie from "./components/EPie/main";

function App() {
    const element = useRoutes(routes);
    return (
        <>
            {/* 完整页面 */}
            {/* <Login/> */}
            {/* < LoginRegisterForm /> */}
            {/* <Chartdata /> */}
            {/* < HomeTab /> */}
            {/* < Slider /> */}
            {/* <HotGroup/> */}
            {element}
            {/* <Groupshow/> */}
            {/* < Alldatasets/> */}
            {/* <Mydatasets/>  */}
            {/* <Aboutme/> */}
            {/* <Group /> */}
            {/* <CreateGroup /> */}
            {/* <Slider/> */}
            {/* <Chart2 /> */}
            {/* <Chart4 /> */}
            {/* <Cancel/> */}
            {/* <Chart5 />  */}
            {/* <Chart6/> */}
            {/* <Vedio /> */}
            {/* <HomeTab /> */}
            {/* <Cancel/> */}
            {/* <EPie /> */}
        </>
    );
}

export default App;

import React, { useState, useEffect } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import routes from "../src/router/router";

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

import React from "react";
import Keyboard from "./components/keyboard/main.jsx";
import EchartMap from "./components/echarts-map/main.jsx";
import MainPage from "./pages/MainPage/main.jsx";
import Rain from "./components/rain/main.jsx";
import EchartsDiv from "./components/echartsdiv/main.jsx";
import Login from "./pages/Login/main.jsx";
import routes from "../src/routes/router.jsx";
import { useRoutes } from "react-router-dom";
import { useState } from "react";


const App = () => {

    const element = useRoutes(routes);
    return (
        <>
            {/* <EchartMap /> */}
            {/* <Rain /> */}
            {/* <Keyboard /> */}
            {/* <EchartsDiv /> */}
            <MainPage />
            {/* <Login/> */}
            {/* {element} */}
        </>
    );
};
export default App;

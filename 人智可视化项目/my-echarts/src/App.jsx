import React, { useState } from "react";
import "./App.css";
import { useRoutes } from "react-router-dom"

import Login from "./pages/Login/main";
import Chartdata from './page/Chartdata/main'
import UploadPage from './page/UploadPage/main'

import Group from './component/Group/main'
import Cancel from './component/Cancel/main'
import Slider from './component/Slider/main'
import Chart1 from './component/Chart1/main'
import Chart2 from './component/Chart2/main'
import Chart3 from './component/Chart3/main'
import Chart4 from './component/Chart4/main'
import Header from '../src/component/Header/main'
import CreateGroup from './component/CreateGroup/main'
import Alldatasets from './component/Alldatasets/main'
import Mydatasets from './component/Mydatasets/main'
import Aboutme from './component/Aboutme/main'
import Chart5 from './component/Chart5/main'
import Chart6 from './component/Chart6/main'
import Vedio from './component/Vedio/main'
import HomeTab from './components/home-top/main'
import routes from '../src/router/router'

function App() {

  const element = useRoutes(routes)
  return (
    <>
      {/* 完整页面 */}
      {/* <Login/> */}
      {/* <Chartdata /> */}
      {/* <UploadPage/> */}
      {/* < HomeTab />
      < Slider /> */}
      {element}
      {/* < Alldatasets/>
      {/* <Mydatasets/> */}
      {/* <Aboutme/> */}
      {/* <Group /> */}
      {/* <CreateGroup /> */}
      {/* <Slider/> */}
      {/* <Chart1/> */}
      {/* <Chart2/> */}
      {/* <Chart3/> */}
      {/* <Chart4 /> */}
      {/* <Header/> */}
      {/* <Cancel/> */}
      {/* <Chart5/> */}
      {/* <Chart6/> */}
      {/* <Vedio /> */}
      {/* <HomeTab /> */}
      {/* <Cancel/> */}
    </>
  );
}

export default App;

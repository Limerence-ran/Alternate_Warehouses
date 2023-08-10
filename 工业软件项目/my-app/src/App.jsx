import React from "react";
import "./App.css";
import routes from './router/router' 
import { useRoutes } from "react-router-dom";

// 页面
import Login from "./pages/Login/main";
import UserPage from './page/UserPage/main'
import Manageuser from '../src/page/Manageuser/main'
import Mysoftware from '../src/page/Mysoftware/main'

// 小组件
import Page from '../src/component/Paging/main'
import UploadApp from "./component/UploadApp/main";
import MyApp from '../src/component/MyApp/main'
import App1 from '../src/component/App1/main'
import UserInfor from "./component/UserInfor/main";
import HomeHead from "./components/home-head/main";
import CheckUpdate from './page/CheckUpdate/main';          

import Home from "./pages/Home/main";
import Buy from "./pages/Buy/main";
import Update from "./pages/Update/main";
import Echart from '../src/component/echart'
import Echart2 from "./component/2";
import Echart3 from "./component/3";
import Flex from './component/媒体查询flex'
import ChildComponent from './component/son'
import ParentComponent from "./component/parent";
import Liner from "./component/折线图";
import Column from "./component/柱形图";
import Pie from "./component/饼图";
import Newyue from "./component/纽约路况路径图";
import Node from "./component/关系图";
import DiscreteSlider from "./component/滑动组件";
import Map from "./component/地图";

function App() {
    const element = useRoutes(routes);
    return (
        <>      
                {/* <HomeHead></HomeHead> */}
                {/* {element}   */}
                {/* 完整页面 */}
                {/* <Login /> */}
                {/* <UserPage/> */}
                {/* <Manageuser /> */}
                {/* <Mysoftware/> */}
            {/* <Echart/> */}
            {/* <Echart2 /> */}
            {/* <Echart3 /> */}
            {/* <Flex/> */}
            {/* < ChildComponent/> */}
            {/* < ParentComponent /> */}
            {/* <Liner/> */}
            {/* <Column/> */}
            {/* <Pie/> */}
            {/* <Newyue/> */}
            {/* <Node/> */}
            {/* <DiscreteSlider/> */}
            <Map/>

                {/* <Login></Login> */}
                {/* <Home></Home> */}
                {/* <Buy></Buy> */}
                {/* <Update></Update> */}
                {/* <CheckUpdate/> */}   

        </>
    );
}

export default App
    









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
            

            <Login></Login>
            {/* <Home></Home> */}
            {/* <Buy></Buy> */}
            {/* <Update></Update> */}
            {/* <CheckUpdate/> */}

        </>
    );
}

export default App










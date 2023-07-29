<<<<<<< HEAD
import React from "react";
import "./App.css";

import Login from "./pages/Login/main";
import Home from "./pages/Home/main";
import Buy from "./pages/Buy/main";
import Update from "./pages/Update/main";

function App() {
    return (
        <>
            <div>
                <Login></Login>
                {/* <Home></Home> */}
                {/* <Buy></Buy> */}
                {/* <Update></Update> */}
            </div>
        </>
    );
=======

import "./App.css";
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






function App() {


  return (
    <>
    {/* 完整页面 */}
      <Login />
      {/* <UserPage/> */}
      {/* <Manageuser/> */}
      {/* <Mysoftware/> */}

       {/* 组件 */}
      {/* <UploadApp/> */}
      {/* <UserInfor/> */}
      {/* <MyApp/> */}
      {/* <App1/> */}
      {/* < Page/> */}
    </>
  )
>>>>>>> b4857907f91f42719526ea8224698ddc3ce72e96
}

export default App;

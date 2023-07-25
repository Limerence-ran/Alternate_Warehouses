import { useState } from "react";
<<<<<<< HEAD


import Lunbo from './component/Lunbo/main'
import Login from './component/Login/mian'
import Register from './component/Register/main'
import Agreement from './component/Agreement/main'
import Content from './component/Content/main'
import Header from './component/Header/main'
import Buttom from './component/Buttom/main'
import MainPage from './pages/MainPage/main'



function App() {


  return (
    <>
      {/* <Lunbo/> */}
      {/* <Header/> */}
      {/* <Login /> */}
      {/* <Register /> */}
      {/* <Agreement /> */}
      {/* <Content/> */}
      {/* <Header /> */}
      {/* <Buttom/> */}
      <MainPage/>

    </>
  );
=======
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import Navigation from "./components/navigation/main";
import Pagination from "./components/pagination/main";
import Caro from "./components/carousel/main";
import Lunbo from './component/Lunbo'

function App() {
    return (
        <div>
            <Navigation></Navigation>
            <Caro></Caro>
            <Lunbo/>           
        <Pagination></Pagination>
        </div>)
>>>>>>> eaba5fd94eb8fa6f0ec840b2d300cffe7123c492
}




export default App;


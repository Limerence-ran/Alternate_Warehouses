import { useState } from "react";
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
}




export default App;


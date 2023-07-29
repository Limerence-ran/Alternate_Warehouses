import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Page from './component/PageList/main.jsx'
import { HashRouter, Router } from 'react-router-dom'
ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HashRouter>
            <App />
        </HashRouter>
        {/* <Page/> */}
    </React.StrictMode>
);

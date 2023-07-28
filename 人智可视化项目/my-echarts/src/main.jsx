import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import Page from '../src/component/Paging/main.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <App />
        {/* <Page/> */}
    </React.StrictMode>
);

// import style from './main.module.css'
import { FieldBinaryOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Abouttable from "./Aboutable/main";
// import './main.css'

function Aboutme() {
    const box = useRef(null);
    const [which, setWhich] = useState(0);
    const IsChart = (index) => {
        setWhich(index);
    };

    return (
        <>
            <Abouttable />
        </>
    );
}

export default Aboutme;

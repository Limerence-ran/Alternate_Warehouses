import style from "./main.module.css";
import { FieldBinaryOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Alldatasets from "../Alldatasets/main";
import Mydatasets from "../Mydatasets/main";
import Aboutme from "../Aboutme/main";
import UploadMyData from "../UploadMydata/main";
import { useNavigate } from "react-router-dom";

function Chart4() {
    const box = useRef(null);
    const [which, setWhich] = useState(0);
    const navigate = useNavigate();
    const IsChart = (index, url) => {
        navigate(`/Chartdata/Chart4/${url}`);
        setWhich(index);
    };
    return (
        <>
            <div className={style.content}>
                <div className={style.middle}>
                    <div className={style.header}>
                        <ul className={style.title}>
                            <li>
                                <button
                                    className={style.btnheader}
                                    onClick={() => IsChart(0, "Alldatasets")}
                                >
                                    All data
                                </button>
                            </li>
                            <li>
                                <button
                                    className={style.btnheader}
                                    onClick={() => IsChart(1, "Mydatasets")}
                                >
                                    Data I link to
                                </button>
                            </li>
                            <li>
                                <button
                                    className={style.btnheader}
                                    onClick={() => IsChart(2, "Aboutme")}
                                >
                                    About me
                                </button>
                            </li>
                            <li>
                                <button
                                    className={style.btnheader}
                                    onClick={() => IsChart(3, "UploadMyData")}
                                >
                                    Upload my data
                                </button>
                            </li>
                        </ul>
                    </div>
                    <div ref={box} className={style.middle_buttom}>
                        {which === 0 ? (
                            <Alldatasets />
                        ) : which === 1 ? (
                            <Mydatasets />
                        ) : which === 2 ? (
                            <Aboutme />
                        ) : (
                            <UploadMyData />
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Chart4;

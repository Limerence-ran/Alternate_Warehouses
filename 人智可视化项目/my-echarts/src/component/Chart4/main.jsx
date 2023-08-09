import style from "./main.module.css";
import { FieldBinaryOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Alldatasets from "../Alldatasets/main";
import Mydatasets from "../Mydatasets/main";
import Aboutme from "../Aboutme/main";
import Chart1 from "../Chart1/main";
import "./main.css";

function Chart4() {
    const box = useRef(null);
    const [which, setWhich] = useState(0);
    const IsChart = (index) => {
        setWhich(index);
    };

    return (
        <>
            <div className={style.content}>
<<<<<<< HEAD
                <div className={style.header}>
                    <ul className={style.title}>
                        <li>
                            <button
                                className={style.btnheader}
                                onClick={() => IsChart(0)}
                            >
                                All datasets
                            </button>
                        </li>
                        <li>
                            <button
                                className={style.btnheader}
                                onClick={() => IsChart(1)}
                            >
                                Datasets I link to
                            </button>
                        </li>
                        <li>
                            <button
                                className={style.btnheader}
                                onClick={() => IsChart(2)}
                            >
                                about
                            </button>
                        </li>
                        <li>
                            <button
                                className={style.btnheader}
                                onClick={() => IsChart(3)}
                            >
                                upload my data
                            </button>
                        </li>
                    </ul>
                </div>
                <div ref={box}>
                    {which === 0 ? (
                        <Alldatasets />
                    ) : which === 1 ? (
                        <Mydatasets />
                    ) : which === 2 ? (
                        <Aboutme />
                    ) : (
                        <Chart1 />
                    )}
                </div>
=======
               <div className={style.middle}>
                    <div className={style.header}>
                        <ul className={style.title}>
                            <li><button className={style.btnheader} onClick={() => IsChart(0)}>All datasets</button></li>
                            <li><button className={style.btnheader} onClick={() => IsChart(1)}>Datasets I link to</button></li>
                            <li><button className={style.btnheader} onClick={() => IsChart(2)}>About me</button></li>
                            <li><button className={style.btnheader} onClick={() => IsChart(3)}>Upload my data</button></li>

                        </ul>
                    </div>
                    <div ref={box} >
                        {which === 0 ? <Alldatasets />
                            : which === 1 ? < Mydatasets />
                                : which === 2 ? <Aboutme />
                                    : <Chart1 />}
                    </div>
               </div>
        
>>>>>>> 6cd2e89e341556145f831200ddf19ced819e232f
            </div>
        </>
    );
}

export default Chart4;

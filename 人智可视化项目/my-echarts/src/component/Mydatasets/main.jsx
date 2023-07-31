import style from "./main.module.css";
import { useState, useEffect, useRef } from "react";
import "./main.css";
import Mydatatable from "./Mydatatable/main";
import RelationChart from "../../components/relationship/main";

function Mydatasets() {
    const box = useRef(null);
    const [which, setWhich] = useState(0);
    const [data, setData] = useState([]);
    const IsChart = (index) => {
        setWhich(index);
    };
    console.log(which);

    function onAjaxChange(data) {
        setData(data);
    }

    return (
        <>
            <main>
                <div className={style.body}>
                    <div className={style.chartbox}>
                        <div className={style.box}>
                            <div className={style.chart}>
                                <RelationChart propdata={data} />
                            </div>
                        </div>
                        <div className={style.chartbuttom}>
                            <Mydatatable
                                className={style.paging1}
                                handleAjaxChange={onAjaxChange}
                            />
                        </div>
                    </div>
                </div>
            </main>
        </>
    );
}

export default Mydatasets;

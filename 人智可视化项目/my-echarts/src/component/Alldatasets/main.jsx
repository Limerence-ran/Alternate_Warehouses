import style from "./main.module.css";
import { useState, useEffect, useRef } from "react";
import Pagetable1 from "./Pagetable/main";
import "./main.css";
import RelationChart from "../../components/relationship/main";
import axios from "axios";
import { Skeleton, message } from "antd";

function Alldatasets() {
    const box = useRef(null);
    const [which, setWhich] = useState(0);
    const [data, setData] = useState(0);
    const [datapoint, setDatapoint] = useState();
    const IsChart = (index) => {
        setWhich(index);
    };

    function onAjaxChange(data) {
        setData(data);
    }

    const token = localStorage.getItem("token"); // 从本地存储获取 token

    const id = localStorage.getItem("myGroupid");

    useEffect(() => {
        axios
            .post(
                "http://39.98.41.126:31130/dataVisualization/all",
                {
                    id: id,
                },
                {
                    headers: {
                        Authorization: token, //使用从本地存储中获取的 token
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const { code, msg, data } = response.data;
                if (code == 1) {
                    let newData = data;
                    setDatapoint(newData);
                    // 在这里处理成功的逻辑
                } else {
                    message.error("Failed:" + msg);
                }
            })
            .catch((error) => {
                message.error("An error occurred in the request");
                console.log(error);
            });
    }, []);
    return (
        <div className={style.chartbox}>
            <div className={style.box} ref={box}>
                <div className={style.chart}>
                    {datapoint ? (
                        <RelationChart propdata={datapoint}></RelationChart>
                    ) : (
                        <Skeleton />
                    )}
                </div>
            </div>
            <div className={style.chartbuttom}>
                <Pagetable1 handleAjaxChange={onAjaxChange} />
            </div>
        </div>
    );
}

export default Alldatasets;

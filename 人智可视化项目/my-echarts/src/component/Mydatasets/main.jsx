import React from "react";
import style from "./main.module.css";
import { useState, useEffect, useRef } from "react";
import "./main.css";
import { Skeleton, message } from "antd";
import Mydatatable from "./Mydatatable/main";
import DynamicRelationChart from "../../components/relationship/main";
import axios from "axios";

function Mydatasets() {
    const box = useRef(null);
    const [which, setWhich] = useState(0);
    const [data, setData] = useState();
    const IsChart = (index) => {
        setWhich(index);
    };

    const MydataVisualization = () => {
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        const id = localStorage.getItem("myGroupid");
        axios
            .post(
                "http://39.98.41.126:31130/dataVisualization/relative",
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
                if (code === 1) {
                    setData(data);
                } else {
                    message.error("创建失败: " + msg);
                }
            })
            .catch((error) => {
                message.error("请求出错");
                console.log("请求出错", error);
            });
    };

    function onAjaxChange(data) {
        setData(data);
    }

    useEffect(() => {
        MydataVisualization();
    }, []);

    return (
        <>
            <div className={style.body}>
                <div className={style.chartbox}>
                    <div className={style.box}>
                        <div className={style.chart}>
                            {data ? (
                                <DynamicRelationChart
                                    propdata={data}
                                ></DynamicRelationChart>
                            ) : (
                                <Skeleton />
                            )}
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
        </>
    );
}

export default Mydatasets;

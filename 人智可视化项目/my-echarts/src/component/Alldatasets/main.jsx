import style from "./main.module.css";
import { FieldBinaryOutlined } from "@ant-design/icons";
import { useState, useEffect, useRef } from "react";
import Pagetable1 from "./Pagetable/main";
import "./main.css";
import RelationChart from "../../components/relationship/main";
import axios from "axios";
import { message } from "antd";

function Alldatasets() {
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

    const dataVisualization = () => {
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        const id = localStorage.getItem("myGroupid");
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
                const { code, msg, data } = response;

                if (code === 1) {
                    console.log("data:" + data);
                    setData(response.data.resourceListEnhancedWithRelativeCode);
                    // 在这里处理成功的逻辑
                } else {
                    message.error("创建失败: " + msg);
                }
            })
            .catch((error) => {
                message.error("请求出错");
                console.log("请求出错", error);
            });
    };

    useEffect(() => {
        dataVisualization();
    }, []);

    return (
        <>
            <main>
                <div className={style.body}>
                    <div className={style.chartbox}>
                        <div className={style.box} ref={box}>
                            <div className={style.chart}>
                                <RelationChart propdata={data}></RelationChart>
                            </div>
                        </div>
                        <div className={style.chartbuttom}>
                            <Pagetable1
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

export default Alldatasets;

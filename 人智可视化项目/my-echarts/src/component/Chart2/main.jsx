import style from "./main.module.css";
import React, { useState, useEffect } from "react";
import Pointxy from "../../components/point-xy/main";
import Bar from "../../components/bar/main";
import EBar from "../../components/Ebar/main";
import PointNoise from "../../components/point-noise/main";
import EPie from "../../components/EPie/main";
import { useNavigate, useLocation } from "react-router-dom";
import { Skeleton, message, Button } from "antd";
import Vedio from "../../component/Vedio/main";
import axios from "axios";
function Chart2() {
    const [datas, setDatas] = useState({});
    const [isLoading, setIsLoading] = useState(true);
    const [isshow, setisShow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const [resourceFormat, setResourceFormat] = useState([]);
    const data = location.state ? location.state.data : null;
    useEffect(() => {
        if (data) {
            setDatas(data);
        } else {
            //处理返回Chart5的路由操作
            setisShow(!isshow);
            message.error("The available data is not stored locally");
            setTimeout(() => {
                navigate("/Chartdata/Chart5");
            }, 2000);
        }
        let id = localStorage.getItem("myGroupid");
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        axios
            .post(
                "http://39.98.41.126:31130/dataVisualization/show",
                {
                    id: id,
                },
                {
                    headers: {
                        Authorization: token, // 使用从本地存储中获取的 token
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const { code, msg, data } = response.data;
                if (code === 1) {
                    message.success("Request sent");
                    setResourceFormat(data.resourceFormat);
                    setIsLoading(false);
                } else {
                    message.error("The request failed: " + msg);
                }
            })
            .catch((error) => {
                message.error("There is a problem with the network");
                console.log("There is a problem with the network", error);
            });
    }, [data, navigate]);
    function handlesubmit() {
        setisShow(!isshow);
        setTimeout(() => {
            navigate("/Chartdata/Group");
        }, 3000);
    }
    return (
        <>
            <div className={style.content}>
                <div className={style.header}>
                    <span>Data Visualization</span>
                </div>
                <div className={style.data}>
                    <div className={style.chart2}>
                        <div className={style.img}>
                            {!isLoading ? (
                                <Pointxy
                                    data_xy={datas}
                                    resourceFormat={resourceFormat}
                                ></Pointxy>
                            ) : (
                                <Skeleton />
                            )}
                        </div>
                        <div className={style.img}>
                            {!isLoading ? (
                                <Bar
                                    data_xy={datas}
                                    resourceFormat={resourceFormat}
                                ></Bar>
                            ) : (
                                <Skeleton />
                            )}
                        </div>
                        <div className={style.img}>
                            {!isLoading ? (
                                <EPie
                                    data_xy={datas}
                                    resourceFormat={resourceFormat}
                                ></EPie>
                            ) : (
                                <Skeleton />
                            )}
                        </div>
                        <div className={style.img}>
                            {!isLoading ? (
                                <PointNoise data_xy={datas}></PointNoise>
                            ) : (
                                <Skeleton />
                            )}
                        </div>
                        <div className={style.img}>
                            {!isLoading ? (
                                <EBar
                                    data_xy={datas}
                                    resourceFormat={resourceFormat}
                                ></EBar>
                            ) : (
                                <Skeleton />
                            )}
                        </div>
                    </div>
                </div>
                <Button onClick={handlesubmit} style={{ textAlign: "center" }}>
                    finish
                </Button>
                {isshow && <Vedio />}
            </div>
        </>
    );
}
export default Chart2;

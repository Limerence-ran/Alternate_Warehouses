import React, { useState, useEffect } from "react";
import { Card, Button, message, Steps } from "antd";
import styles from "./main.module.css";
import moment from "moment";
import "moment/locale/zh-cn";
import { useParams } from "react-router-dom";
import axios from "axios";

function PurchasePage() {
    const { softId } = useParams();
    const { Step } = Steps;
    const [name, setName] = useState("");
    const [price, setPrice] = useState();
    const [description, setDescription] = useState("");
    const [picture, setPicture] = useState("");

    useEffect(() => {
        if (document.getElementById("current-time")) {
        const interval = setInterval(() => {
                const currentTime = moment()
                    .locale("zh-cn")
                    .format("YYYY-MM-DD");

                const element = document.getElementById("current-time");
                if (element) element.textContent = currentTime;
            }, 1000);
        }
        const url = `http://39.98.41.126:31135/users/buy/${softId}`;

        const fetchData = () => {
            axios
                .get(url, softId)
                .then((response) => {
                    const data = response.data;
                    const code = response.code;
                    const messageText = response.message;

                    if (code === 1001) {
                        console.log("数据:", data);
                        // 执行查询成功后的逻辑处理

                        // 使用antd的message组件进行提示
                        message.success("查询成功");
                        setName(data.name);
                        setDescription(data.description);
                        setPrice(data.price);
                        setPicture(data.picture);
                    } else {
                        console.log("查询失败:", messageText);
                        // 执行查询失败后的逻辑处理

                        // 使用antd的message组件进行提示
                        message.error("查询失败: " + messageText);
                    }
                })
                .catch((error) => {
                    console.log("请求发生错误:", error);
                    // 执行请求发生错误后的逻辑处理

                    // 使用antd的message组件进行提示
                    message.error("请求发生错误，请稍后再试");
                });
        };
        fetchData();

        return () => {
        };
    }, []);

    const handleOptionOne = () => {
        const inputVal = prompt("请输入硬件指纹：");
        if (inputVal) {
            const authorizationToken = localStorage.getItem("token"); // 从本地存储中获取授权 token

            const requestData = {
                softwareId: softId,
                date: "365",
                hardwareId: inputVal,
            };

            axios
                .post(
                    "http://39.98.41.126:31135/users/purchases",
                    requestData,
                    {
                        headers: {
                            Authorization: authorizationToken, // 使用授权的 token
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    const { code, msg, data } = response;

                    if (code === 1000) {
                        // 身份认证过期
                        message.error(msg);
                    } else if (code === 1001) {
                        // 查询成功
                        message.success(msg);
                        console.log("数据:", data);
                    } else {
                        // 其他错误
                        message.error("查询失败: " + msg);
                    }
                })
                .catch((error) => {
                    message.error("请求出错");
                    console.log("请求出错", error);
                });
            message.success("购买成功");
        }
    };

    const handleOptionTwo = () => {
        message.success("购买成功");
        const authorizationToken = localStorage.getItem("token"); // 从本地存储中获取授权 token

        const requestData = {
            softwareId: "string",
            time: "string",
        };

        axios
            .post("http://39.98.41.126:31135/purchases", requestData, {
                headers: {
                    Authorization: authorizationToken, // 使用授权的 token
                },
            })
            .then((response) => {
                const { code, msg, data } = response;

                if (code === 1000) {
                    // 软件不存在
                    message.error(msg);
                } else if (code === 1001) {
                    // 查询成功
                    message.success(msg);
                    console.log("数据:", data);
                } else {
                    // 其他错误
                    message.error("查询失败: " + msg);
                }
            })
            .catch((error) => {
                message.error("请求出错");
                console.log("请求出错", error);
            });
    };

    return (
        <div className={styles.purchase_card}>
            <Card title="软件下载" style={{ width: 600 }}>
                <img src={picture} alt="软件图片" />
                <h3 className={styles.price}>价格：{price}</h3>
                <p>
                    实时时间：<span id="current-time"></span>
                </p>
                <p>发布时间：2023-07-31</p>
                <h3>购买方式：</h3>
                <div className={styles.purchase_buttons}>
                    <Button
                        type="primary"
                        onClick={handleOptionOne}
                        style={{ marginRight: 10 }}
                    >
                        输入硬件指纹
                    </Button>
                    <Button type="primary" onClick={handleOptionTwo}>
                        返回序列号
                    </Button>
                </div>
            </Card>
        </div>
    );
}

export default PurchasePage;

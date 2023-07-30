import React, { useEffect } from "react";
import { Card, Button, message, Steps } from "antd";
import styles from "./main.module.css";
import moment from "moment";
import "moment/locale/zh-cn";

const { Step } = Steps;

function PurchasePage() {
    const versions = [
        {
            versionNumber: "1.0",
            releaseDate: "2023-07-28",
            downloadLink: "your_download_link_1",
        },
        {
            versionNumber: "2.0",
            releaseDate: "2023-07-29",
            downloadLink: "your_download_link_2",
        },
        {
            versionNumber: "3.0",
            releaseDate: "2023-07-30",
            downloadLink: "your_download_link_3",
        },
    ];

    useEffect(() => {
        const interval = setInterval(() => {
            const currentTime = moment()
                .locale("zh-cn")
                .format("YYYY-MM-DD HH:mm:ss");
            document.getElementById("current-time").textContent = currentTime;
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    const handleOptionOne = () => {
        const inputVal = prompt("请输入硬件指纹：");
        if (inputVal) {
            message.success("购买成功");
        }
    };

    const handleOptionTwo = () => {
        message.success("购买成功");
    };

    return (
        <div className={styles.purchase_card}>
            <Card title="软件下载" style={{ width: 600 }}>
                <img
                    src="https://lf3-cdn-tos.bytescm.com/obj/static/xitu_juejin_web/e08da34488b114bd4c665ba2fa520a31.svg"
                    alt="软件图片"
                />
                <p>
                    下载链接：<a href="your_download_link">点击下载</a>
                </p>
                <h3 className={styles.price}>价格：$99.99</h3>
                <p>
                    实时时间：<span id="current-time"></span>
                </p>
                <p>发布时间：2023-07-28</p>
                <div
                    style={{
                        display: "flex",
                        alignItems: "center",
                        marginBottom: 16,
                    }}
                >
                    <Steps
                        direction="vertical"
                        size="small"
                        style={{ marginRight: 16 }}
                    >
                        {/* {versions.map((version, index) => (
                            <Step
                                key={index}
                                title={`版本号：${version.versionNumber}`}
                                description={`发布时间：${version.releaseDate}`}
                            />
                        ))} */}
                    </Steps>
                    <div>
                        {/* {versions.map((version, index) => (
                            <div key={index}>
                                <Button
                                    type="primary"
                                    style={{ marginBottom: 8 }}
                                    href={version.downloadLink}
                                    target="_blank"
                                >
                                    下载版本 {version.versionNumber}
                                </Button>
                                <br />
                            </div>
                        ))} */}
                    </div>
                </div>
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

import axios from "axios";
import { message } from "antd";

const dataVisualization = () => {
    const token = localStorage.getItem("token"); // 从本地存储获取 token

    axios
        .post(
            "http://example.com/dataVisualization/all",

            {

                id: 0,
                groupName: "string",
                dimension: 0,
                resourceQuantity: 0,
                popularity: 0,
                resourceFormat: [
                    "string"
                ],
                deleted: 0,
                version: 0,
                ownerId: 0,
                description: "string"
            },
            {
                headers: {
                    Authorization: token, // 使用从本地存储中获取的 token
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 1000) {
                message.error("创建失败: " + msg);

            } else {
                console.log("data:" + data)
                // 在这里处理成功的逻辑
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

dataVisualization()

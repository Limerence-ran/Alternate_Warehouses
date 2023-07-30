import axios from "axios";
import { message } from "antd";

const countHot = (id, groupName, dimension, resourceQuantity, popularity, resourceFormat, description) => {
    const token = localStorage.getItem("token"); // 从本地存储获取 token

    axios
        .post(
            "http://example.com/groups/popularity",
            // 要上传的群组信息
            {
                id: 0,
                groupName: "string",
                dimension: 0,
                resourceQuantity: 0,
                popularity: 0,
                resourceFormat: [
                    "string"
                ],
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

            if (code === 0) {

                message.success(msg);
                console.log("data:" + data);
            } else {

                message.error("创建失败: " + msg);
                // 在这里处理其他错误情况的逻辑
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

countHot(id, groupName, dimension, resourceQuantity, popularity, resourceFormat, description)

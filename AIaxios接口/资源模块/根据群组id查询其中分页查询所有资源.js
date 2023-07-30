import axios from "axios";
import { message } from "antd";

const idGroup=(id) => {

    axios
        .put(
            "http://example.com/resource/page",
            // 要上传的群组信息
            {
                relativeUsername: "string",
                currentPage: 0,
                 pageSize: 0,
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
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 1) {

                message.success(msg);
                console.log("data:" + data);
            } else {

                message.error("连接失败: " + msg);
                // 在这里处理其他错误情况的逻辑
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

idGroup( id)

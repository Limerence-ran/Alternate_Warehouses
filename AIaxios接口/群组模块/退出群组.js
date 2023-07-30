import axios from "axios";
import { message } from "antd";

const withdrawalGroup = (groupId, groupName) => {
    const token = localStorage.getItem("token"); // 从本地存储获取 token

    axios
        .delete(
            "http://example.com/groups/quit",
            // 要上传的群组信息
            {
                groupId: 0,
                groupName: "string"
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

            if (code === 1) {

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

withdrawalGroup(groupId,groupName)

import axios from "axios";
import { message } from "antd";

const joinGroup = (id, groupName, ownerId) => {
    const token = localStorage.getItem("token"); // 从本地存储获取 token

    axios
        .post(
            "http://example.com/groups/join",
            
            {

                id: 0,
                groupName: "string",
                ownerId: 0
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

joinGroup(id, groupName, ownerId);

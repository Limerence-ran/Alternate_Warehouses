import { message } from "antd";
import axios from "axios";

const myGroup = () => {
    const token = localStorage.getItem("token"); // 从本地存储获取 token
    axios
        .get(
            `http://example.com/groups`,
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

// 使用示例
myGroup();

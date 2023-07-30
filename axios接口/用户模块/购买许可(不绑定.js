import { message } from "antd";
import axios from "axios";

const fetchData = () => {
    const authorizationToken = localStorage.getItem("token"); // 从本地存储中获取授权 token

    const requestData = {
        softwareId: "string",
        time: "string",
    };

    axios
        .post("http://example.com/api/data", requestData, {
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

// 使用示例
fetchData();

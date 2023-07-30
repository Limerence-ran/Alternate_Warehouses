import { message } from "antd";
import axios from "axios";

const fetchSoftwareData = (softId) => {
    const authorizationToken = localStorage.getItem("Authorization"); // 从本地存储中获取授权 token

    axios
        .get(`http://example.com/api/software/${softId}`, {
            headers: {
                Authorization: authorizationToken, // 使用授权的 token
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const { code, msg, data } = response.data;

            if (code === 1001) {
                // 查询成功
                message.success("查询成功");
                console.log("软件数据:", data);
            } else {
                // 查询失败
                message.error("查询失败: " + msg);
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

// 使用示例
const softId = "<Your Software ID>"; // 替换为实际的软件ID

fetchSoftwareData(softId);

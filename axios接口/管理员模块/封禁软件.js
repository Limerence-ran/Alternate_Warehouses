import { message } from "antd";
import axios from "axios";

const blockSoftware = (token, softId) => {
    axios
        .get(`http://example.com/api/software/${softId}/block`, null, {
            headers: {
                Authorization: token, // 使用授权的 token
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 2001) {
                // 封禁成功
                message.success(msg);
                console.log("封禁结果:", data);
            } else {
                // 封禁失败
                message.error(msg);
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

// 使用示例
const token = localStorage.getItem("token"); // 替换为授权的 token
const softId = "<Your Software ID>"; // 替换为实际的软件ID

blockSoftware(token, softId);

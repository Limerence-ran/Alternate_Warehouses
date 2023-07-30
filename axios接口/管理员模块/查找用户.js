import { message } from "antd";
import axios from "axios";

const findUser = (token) => {
    const token = localStorage.getItem("token"); // 替换为授权的 token
    axios
        .post("http://example.com/api/users", {
            headers: {
                Authorization: token, // 使用授权的 token
                "Content-Type": "application/json",
            },
            params: {
                currentPage: 0,
                pageSize: 0,
                message: "string",
            },
        })
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 2001) {
                // 查找成功
                message.success(msg);
                console.log("用户信息:", data);
            } else {
                // 查找失败
                message.error(msg);
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};



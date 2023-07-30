import { message } from "antd";
import axios from "axios";

const findAllUsers = (token, currentPage, pageSize) => {
    axios
        .get(`http://example.com/api/users/${currentPage}/${pageSize}`, {
            headers: {
                Authorization: token, // 使用授权的 token
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 2000) {
                // 查询成功
                message.success(msg);
                console.log("用户列表:", data);
            } else {
                // 查询失败
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
const currentPage = 0; // 替换为实际的当前页码
const pageSize = 10; // 替换为实际的每页数量

findAllUsers(token, currentPage, pageSize);

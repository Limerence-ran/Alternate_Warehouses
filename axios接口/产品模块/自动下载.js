import axios from "axios";
import { message } from "antd";

const fetchData = (authorization) => {
    axios
        .get("http://example.com/api/data", null, {
            headers: {
                Authorization: authorization,
                "Content-Type": "application/json",
            },
        })
        .catch((error) => {
            console.log("请求出错", error);
            message.error("请求出错");
            // 执行请求出错后的逻辑处理
        });
};

// 使用示例，假设authorization为"your_token_here"
const authorization = localStorage.getItem("token");
fetchData(authorization);

import axios from "axios";
import { message } from "antd";

const fetchData = (mapId, authorization) => {
    axios
        .get(`http://example.com/api/data/${mapId}`, null, {
            headers: {
                Authorization: authorization,
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const { code, msg, data } = response;
            switch (code) {
                case 3001:
                    console.log("数据:", data);
                    message.success(msg);
                    // 执行查询成功后的逻辑处理
                    break;
                case 3000:
                    console.error("查询失败: " + msg);
                    message.error("查询失败: " + msg);
                    // 执行查询失败后的逻辑处理
                    break;

                case 3002:
                    console.error("后台服务器异常或繁忙,请稍后再试");
                    message.error("后台服务器异常或繁忙,请稍后再试");
                    // 执行后台服务器异常后的逻辑处理
                    break;
                default:
                    console.error("未知错误");
                    message.error("未知错误");
                    // 执行其他未知错误后的逻辑处理
                    break;
            }
        })
        .catch((error) => {
            console.log("请求出错", error);
            message.error("请求出错");
            // 执行请求出错后的逻辑处理
        });
};

// 使用示例，假设mapId为"abc123"，authorization为"your_token_here"
const mapId = "abc123";
const authorization = localStorage.getItem("token");
fetchData(mapId, authorization);

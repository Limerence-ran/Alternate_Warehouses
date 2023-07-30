import axios from "axios";
import { message } from "antd";

const fetchData = () => {
    const token = localStorage.getItem("token"); // 从本地存储获取 token

    axios
        .get("http://example.com/api/userInfo", {
            headers: {
                Authorization: token, // 使用从本地存储中获取的 token
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const { code, data, msg } = response;

            if (code === 1001) {
                // 获取个人信息成功
                message.success(msg);
                // 在这里处理获取个人信息成功的逻辑
                //赋值操作

                console.log(data);
            } else if (code === 1000) {
                // 请求格式错误
                message.error(msg);
                // 在这里处理请求格式错误的逻辑
            } else if (code === 1002) {
                // 服务器异常或繁忙
                message.error(msg);
                // 在这里处理服务器异常或繁忙的逻辑
            } else {
                // 其他错误
                message.error("未知错误: " + msg);
                // 在这里处理其他错误情况的逻辑
            }
        })
        .catch((error) => {
            console.log("请求出错", error);
            // 在这里处理请求出错的逻辑
            message.error("请求出错: " + error.message);
        });
};

fetchData();

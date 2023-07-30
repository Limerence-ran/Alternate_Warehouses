import { message } from "antd";
import axios from "axios";

const fetchPageData = (currentPage, pageSize) => {
    const authorizationToken = localStorage.getItem("token"); // 从本地存储中获取授权 token

    axios
        .get(
            `http://example.com/api/data?page=${currentPage}&size=${pageSize}`,
            {
                headers: {
                    Authorization: authorizationToken, // 使用授权的 token
                    "Content-Type": "multipart/form-data",
                },
            }
        )
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 1000) {
                // 身份认证过期
                message.error(msg);
            } else if (code === 1001) {
                // 查询成功
                message.success(msg);
                console.log("分页数据:", data);
            } else {
                // 其他错误
                message.error(msg);
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

// 使用示例
const currentPage = 1; // 当前页码
const pageSize = 10; // 每页数据数量

fetchPageData(currentPage, pageSize);

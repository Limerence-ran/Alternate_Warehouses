import axios from "axios";
import { message } from "antd";

const fetchData = (currentPage, pageSize) => {
    axios
        .get(
            `http://example.com/api/data?currentPage=${currentPage}&pageSize=${pageSize}`
        )
        .then((response) => {
            const { code, msg, data } = response;
            if (code === 1) {
                // 查询成功
                console.log("数据:", data);
                message.success(msg);
            } else {
                // 其他错误
                message.error("查询失败: " + msg);
            }
        })
        .catch((error) => {
            console.log("请求出错", error);
            message.error("请求出错");
        });
};

// 使用示例
const currentPage = 1;
const pageSize = 10;
fetchData(currentPage, pageSize);

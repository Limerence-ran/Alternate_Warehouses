import axios from "axios";
import { message } from "antd";

const fetchData = (softId) => {
    const url = `http://example.com/api/data/${softId}`;

    axios
        .get(url)
        .then((response) => {
            const { data } = response;
            const { code } = response;

            if (code === 1) {
                console.log("数据:", data);
                // 执行查询成功后的逻辑处理
                // 使用antd的message组件进行提示
                message.success("查询成功");
            } else if (code === 3000) {
                console.log("查询失败:", response.msg);
                // 执行查询失败后的逻辑处理

                // 使用antd的message组件进行提示
                message.error("查询失败: " + response.msg);
            } else if (code === 3002) {
                console.log("后台服务器异常或繁忙，请稍后再试");
                // 执行后台服务器异常后的逻辑处理

                // 使用antd的message组件进行提示
                message.error(response.msg);
            } else {
                console.log("未知错误");
                // 执行其他未知错误后的逻辑处理

                // 使用antd的message组件进行提示
                message.error("未知错误");
            }
        })
        .catch((error) => {
            console.log("请求发生错误:", error);
            // 执行请求发生错误后的逻辑处理

            // 使用antd的message组件进行提示
            message.error("请求发生错误，请稍后再试");
        });
};

// 使用示例，假设softId为"abc123"
const softId = "abc123";
fetchData(softId);

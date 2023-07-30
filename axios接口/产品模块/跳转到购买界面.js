import axios from "axios";
import { message } from "antd";

const fetchData = (softId) => {
    const url = `http://example.com/api/data/${softId}`;

    axios
        .get(url)
        .then((response) => {
            const data = response.data;
            const code = response.code;
            const messageText = response.message;

            if (code === 1) {
                console.log("数据:", data);
                // 执行查询成功后的逻辑处理

                // 使用antd的message组件进行提示
                message.success("查询成功");

                // 显示软件名称、价格、描述和图片
                console.log("软件名称:", softwareData.name);
                console.log("价格:", softwareData.price);
                console.log("描述:", softwareData.description);
                console.log("图片:", softwareData.picture);
            } else {
                console.log("查询失败:", messageText);
                // 执行查询失败后的逻辑处理

                // 使用antd的message组件进行提示
                message.error("查询失败: " + messageText);
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

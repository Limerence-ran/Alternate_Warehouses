import axios from "axios";
import { message } from "antd";

const singleGroup = (groupId, groupName) => {

    axios
        .post(
            "http://example.com/groups/detail",
           
            {
                groupId: 0,
                groupName: "string"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 1) {

                message.success(msg);
                console.log("data:" + data);
            } else {

                message.error("创建失败: " + msg);
                // 在这里处理其他错误情况的逻辑
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

singleGroup(groupId, groupName);

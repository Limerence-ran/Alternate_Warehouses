import axios from "axios";
import { message } from "antd";

const createGroup = (groupName, dimension, resourceFormat, description) => {
    const token = localStorage.getItem("token"); // 从本地存储获取 token

    axios
        .post(
            "http://example.com/groups",
            // 要上传的群组信息
            {
                groupName: "hmacb",
                arity: 6,
                dimension: 5,
                resourceFormat: [
                    {
                        a: 32.1,
                        b: 6.3,
                        c: 5.98
                    }
                ],
                description: "Hknc weikq mahnnow srbpr jbbltvg zhich hgbiwfss aggfyou ffobdep pfwdgjzns urxf dfym immicioa klbdfrumqb hdunpcgfuf tds xqvvof xigwuttaf."
            },
            {
                headers: {
                    Authorization: token, // 使用从本地存储中获取的 token
                    "Content-Type": "application/json",
                },
            }
        )
        .then((response) => {
            const { code, msg,data} = response;

            if (code === 1) {
               
                message.success(msg);
                console.log("data:"+ data);
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

createGroup(groupName, dimension, resourceFormat, description);

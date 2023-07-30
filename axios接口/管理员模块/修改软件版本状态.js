import { message } from "antd";
import axios from "axios";

const updateMapStatus = (mapId, status) => {
    const authorizationToken = localStorage.getItem("token"); // 从本地存储中获取授权 token

    const data = {
        mapId: mapId,
        status: status,
    };

    axios
        .get(`http://example.com/api/map/${mapId}/status`, data, {
            headers: {
                Authorization: authorizationToken, // 使用授权的 token
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 1001) {
                // 修改成功
                message.success(msg);
                console.log("修改结果:", data);
            } else {
                // 修改失败
                message.error("修改失败: " + msg);
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

// 使用示例
const mapId = "<Your Map ID>"; // 替换为实际的地图ID
const status = "<Your Map Status>"; // 替换为实际的地图状态

updateMapStatus(mapId, status);

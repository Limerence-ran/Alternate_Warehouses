import { message } from "antd";
import axios from "axios";

const uploadSoftware = (
    authorizationToken,
    files,
    picture,
    name,
    version,
    description,
    price
) => {
    const formData = new FormData();
    formData.append("files", files);
    formData.append("picture", picture);
    formData.append("name", name);
    formData.append("version", version);
    formData.append("description", description);
    formData.append("price", price);

    axios
        .post("http://example.com/api/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
                Authorization: authorizationToken, // 使用授权的 token
            },
        })
        .then((response) => {
            const { code, msg, data } = response;

            if (code === 2001) {
                // 上传成功
                message.success(msg);
                console.log("上传结果:", data);
            } else {
                // 上传失败
                message.error(msg);
            }
        })
        .catch((error) => {
            message.error("请求出错");
            console.log("请求出错", error);
        });
};

// 使用示例
const authorizationToken = localStorage.getItem("token"); 
const files = "<Your Files>"; // 替换为实际的文件对象
const picture = "<Your Picture>"; // 替换为实际的图片对象
const name = "<Your Software Name>"; // 替换为实际的软件名称
const version = "<Your Software Version>"; // 替换为实际的软件版本
const description = "<Your Software Description>"; // 替换为实际的软件描述
const price = "<Your Software Price>"; // 替换为实际的软件价格

uploadSoftware(
    authorizationToken,
    files,
    picture,
    name,
    version,
    description,
    price
);

import axios from "axios";
import { message } from "antd";

const uploadNewVersion = (
    files,
    picture,
    name,
    version,
    description,
    price
) => {
    const token = localStorage.getItem("token"); // 替换为授权的 token
    const formData = new FormData();

    // 添加文件和其他参数到 FormData 中
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
                Authorization: token, // 使用授权的 token
            },
        })
        .then((response) => {
            const { code, msg } = response;

            if (code === 2001) {
                // 上传成功
                console.log("上传成功");
                message.success(msg);
            } else {
                // 上传失败
                message.error(msg);
            }
        })
        .catch((error) => {
            console.log("请求出错", error);
            message.error("请求出错");
        });
};

// 使用示例
// const files = ...; // 替换为要上传的文件
// const picture = ...; // 替换为要上传的图片
// const name = ...; // 替换为软件的名称
// const version = ...; // 替换为软件的版本号
// const description = ...; // 替换为软件的描述
// const price = "..."; // 替换为软件的价格

uploadNewVersion(files, picture, name, version, description, price);

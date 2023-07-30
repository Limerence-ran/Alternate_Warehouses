function findUser() {
    // const token = localStorage.getItem("token"); // 从本地存储获取 token
    const userId = "123456";
    console.log(666);
    axios
        .get(`http://39.98.41.126:31132/managers/ban/${userId}`, null, {
            headers: {
                Authorization:
                    "eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MSwicG93ZXIiOjEsImV4cCI6MTY5MTMyNjIzMH0.U_cLzxtDgWaiJfCRF-SFRaLC5KkMbDaqR9Vrtk8NQ1A", // 使用从本地存储中获取的 token
                "Content-Type": "application/json",
            },
        })
        .then((response) => {
            const { code, data, msg } = response;

            if (code === 1001) {
                // 封禁用户成功

                // 在这里处理封禁用户成功的逻辑
                console.log(data);
            } else if (code === 2001) {
                // 请求格式错误
                // 在这里处理请求格式错误的逻辑
            } else if (code === 2002) {
                // 服务器异常或繁忙
                // 在这里处理服务器异常或繁忙的逻辑
            } else {
                // 其他错误
                // 在这里处理其他错误情况的逻辑
            }
        })
        .catch((error) => {
            console.log("请求出错", error);
            // 在这里处理请求出错的逻辑
            // message.error("请求出错: " + error.message);
        });
}

const userId = "123456"; // 替换为要封禁的用户的ID
// banUser(userId);

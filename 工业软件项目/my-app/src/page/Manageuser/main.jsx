import React, { useEffect, useState } from "react";
import style from "./main.module.css";
import img from "../../assets/user.png";
import SwitchButton from "../../component/UserInfor/btn/";
import { message } from "antd";
import axios from "axios";

function Manageuser() {
    const usersPerPage = 8; // 每页显示的用户数量
    const [currentPage, setCurrentPage] = useState(1); // 当前所在的页码
    const [users, setUsers] = useState([]);
    const totalUsers = users.length; // 总用户数
    const totalPages = Math.ceil(totalUsers / usersPerPage); // 总页数
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    const displayedUsers = users.slice(startIndex, endIndex); // 假设 users 是用户数据数组
    useEffect(() => {
        const findAllUsers = (currentPage, pageSize) => {
            const token = localStorage.getItem("token"); // 替换为授权的 token

            axios
                .get(
                    `http://39.98.41.126:31132/managers/selectAll/${currentPage}/${pageSize}`,
                    {
                        headers: {
                            Authorization: token, // 使用授权的 token
                            "Content-Type": "application/json",
                        },
                    }
                )
                .then((response) => {
                    const { code, msg, data } = response;

                    if (code === 2000) {
                        // 查询成功
                        message.success(msg);
                        console.log("用户列表:", data);
                        setUsers(data.data);
                    } else {
                        // 查询失败
                        message.error(msg);
                    }
                })
                .catch((error) => {
                    message.error("请求出错");
                    console.log("请求出错", error);
                });
        };

        findAllUsers(currentPage, 8);
        function banUser(userId) {
            const token = localStorage.getItem("token"); // 从本地存储获取 token

            axios
                .get(`http://39.98.41.126:31132/managers/ban/${userId}`, null, {
                    headers: {
                        Authorization: token, // 使用从本地存储中获取的 token
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    const { code, data, msg } = response;
                    if (code === 2000) {
                        // 封禁用户成功
                        message.success(msg);
                        // 在这里处理封禁用户成功的逻辑
                        console.log(data);
                    } else if (code === 2001) {
                        // 请求格式错误
                        message.error(msg);
                        // 在这里处理请求格式错误的逻辑
                    } else if (code === 2002) {
                        // 服务器异常或繁忙
                        message.error(msg);
                        // 在这里处理服务器异常或繁忙的逻辑
                    } else {
                        // 其他错误
                        message.error("未知错误: " + msg);
                        // 在这里处理其他错误情况的逻辑
                    }
                })
                .catch((error) => {
                    console.log("请求出错", error);
                    // 在这里处理请求出错的逻辑
                    message.error("请求出错: " + error.message);
                });
        }
    }, []);

    const goToPage = (page) => {
        setCurrentPage(page);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage(currentPage - 1);
        }
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage(currentPage + 1);
        }
    };

    return (
        <>
            {/* <Header /> */}
            <div className={style.managebox}>
                <div className={style.users}>
                    <div className={style.usertitle}>
                        <h3>你可以管理以下用户</h3>
                    </div>
                    <div className={style.lists}>
                        <table className={style.table}>
                            <tbody>
                                {displayedUsers.map((user, index) => (
                                    <tr key={index}>
                                        <td>
                                            <img src={img} alt="User" />
                                            {/* <UserOutlined className={style.userimg}/> */}
                                        </td>
                                        <td>用户ID: {user.id}</td>
                                        <td>用户状态: {user.status}</td>
                                        <td>
                                            <label className={style.labeltext}>
                                                是否封禁用户:
                                            </label>
                                            <SwitchButton
                                                onChange={banUser}
                                                className={style.userbtn}
                                            />
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className={style.pagination}>
                        <button
                            onClick={goToPreviousPage}
                            className={style.pagebtn}
                        >
                            上一页
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => goToPage(index + 1)}
                                className={
                                    currentPage === index + 1
                                        ? style.active
                                        : ""
                                }
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            onClick={goToNextPage}
                            className={style.pagebtn}
                        >
                            下一页
                        </button>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Manageuser;

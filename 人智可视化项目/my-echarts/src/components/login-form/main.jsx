import React, { useState } from "react";
import styles from "./main.module.css";
import { UserOutlined, UnlockOutlined, CheckOutlined } from "@ant-design/icons";
import { message } from "antd";
import axios from "axios";
import CheckIcon from "../check-box/main";

const LoginRegisterForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [isLoginMode, setIsLoginMode] = useState(true);

    const handleUsernameChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9]{0,20}$/.test(value)) {
            setUsername(value);
        }
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9]{0,20}$/.test(value)) {
            setPassword(value);
        }
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        if (/^[a-zA-Z0-9]{0,20}$/.test(value)) {
            setConfirmPassword(value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLoginMode) {
            if (!password) {
                showMessage("请输入密码", "error");
                return;
            }
            handleLogin();
        } else {
            if (!username) {
                showMessage("请输入用户名", "error");
                return;
            }
            if (!password) {
                showMessage("请输入密码", "error");
                return;
            }
            if (!confirmPassword) {
                showMessage("请确认密码", "error");
                return;
            }
            if (password !== confirmPassword) {
                showMessage("密码和确认密码不一致", "error");
                return;
            }
            handleRegister();
        }
    };

    const handleRegister = () => {
        console.log("执行注册操作", username, password);
        axios
            .post(
                "http://39.98.41.126:31130/users/register",
                {
                    username: username,
                    type: "enterprise",
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 0) {
                    // 注册成功
                    resetForm();
                } else {
                    // 注册失败
                    showMessage(response.data.msg, "error");
                }
            })
            .catch((error) => {
                // 处理注册失败后的逻辑
                showMessage("Registration failed, please try again", "error");
                console.error(error);
            });
    };

    const handleLogin = () => {
        console.log("执行登陆操作", username, password);
        axios
            .post(
                "http://39.98.41.126:31130/users/login",
                {
                    username: username,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                if (response.data.code === 0) {
                    // 登录成功
                    const token = response.data.token; // 获取返回的token
                    localStorage.setItem("token", token); // 将token存储在本地
                    resetForm();
                } else {
                    // 登录失败
                    showMessage(response.data.msg, "error");
                }
            })
            .catch((error) => {
                // 处理登录失败后的逻辑
                showMessage(
                    "Login failed, please check username and password",
                    "error"
                );
                console.error(error);
            });
    };

    const resetForm = () => {
        setUsername("");
        setPassword("");
        setConfirmPassword("");
    };

    const showMessage = (content, type) => {
        message[type]({
            content: <div>{content}</div>,
            duration: 3, // 弹框显示的时间，单位为秒
        });
    };

    return (
        <div className={styles.form_main}>
            {isLoginMode && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <UserOutlined></UserOutlined>
                            <input
                                placeholder="username"
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className={styles.formInput}
                                required
                                maxLength={20}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <UnlockOutlined />
                            <input
                                placeholder="password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.formInput}
                                required
                                minLength={6}
                            />
                        </div>

                        <button type="submit" className={styles.authButton}>
                            Login
                        </button>
                    </form>
                    <CheckIcon />
                    <p className={styles.switchModeMessage}>
                        No account？{" "}
                        <span
                            className={styles.switchModeLink}
                            onClick={() => {
                                setIsLoginMode(false);
                            }}
                        >
                            Register Now
                        </span>
                    </p>
                </>
            )}

            {!isLoginMode && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <UserOutlined></UserOutlined>
                            <input
                                placeholder="username"
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className={styles.formInput}
                                required
                                maxLength={20}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <UnlockOutlined />
                            <input
                                placeholder="password"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.formInput}
                                required
                                minLength={6}
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <CheckOutlined />
                            <input
                                placeholder="confirmPassword"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={styles.formInput}
                                required
                                minLength={6}
                            />
                        </div>

                        <button type="submit" className={styles.authButton}>
                            Register
                        </button>
                    </form>

                    <p className={styles.switchModeMessage}>
                        Already have an account?{" "}
                        <span
                            className={styles.switchModeLink}
                            onClick={() => {
                                setIsLoginMode(true);
                            }}
                        >
                            Login
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};

export default LoginRegisterForm;

import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import { message } from "antd";
import axios from "axios";
import {
    UserOutlined,
    UnlockOutlined,
    SendOutlined,
    ShakeOutlined,
    SafetyCertificateOutlined,
    CheckOutlined,
} from "@ant-design/icons";
import { useNavigate } from 'react-router-dom';


const showMessage = (content, type) => {
    message[type]({
        content: <div>{content}</div>,
        duration: 3, // 弹框显示的时间，单位为秒
    });
};

const AuthForm = () => {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [phone, setPhone] = useState("");
    const [emailCode, setEmailCode] = useState("");
    const [isSendingEmailCode, setIsSendingEmailCode] = useState(false);
    const [isEmailValid, setIsEmailValid] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);
    const [emailCodeSent, setEmailCodeSent] = useState(false);
    const [remainingTime, setRemainingTime] = useState(60);
    const [isLoginMode, setIsLoginMode] = useState(true);
    const [isForgotPasswordMode, setIsForgotPasswordMode] = useState(false);
    const navigate = useNavigate();

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handleEmailChange = (e) => {
        const emailValue = e.target.value;
        setEmail(emailValue);
        setIsEmailValid(validateEmail(emailValue));
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    const handlePhoneChange = (e) => {
        const phoneValue = e.target.value;
        setPhone(phoneValue);
    };

    const handleEmailCodeChange = (e) => {
        const emailCodeValue = e.target.value;
        setEmailCode(emailCodeValue);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (isLoginMode) {
            if (!email) {
                showMessage("请输入邮箱", "error");
                return;
            }
            if (!password) {
                showMessage("请输入密码", "error");
                return;
            }
            handleLogin();
        } else if (isForgotPasswordMode) {
            if (!email) {
                showMessage("请输入邮箱", "error");
                return;
            }
            handleForgotPassword();
        } else {
            if (!username) {
                showMessage("请输入用户名", "error");
                return;
            }
            if (!email) {
                showMessage("请输入邮箱", "error");
                return;
            }
            if (!password || password.trim().length === 0) {
                showMessage("请输入密码", "error");
                return;
            }
            if (!confirmPassword || confirmPassword.trim().length === 0) {
                showMessage("请确认密码", "error");
                return;
            }
            if (!phone) {
                showMessage("请输入手机号", "error");
                return;
            }
            if (!emailCode || emailCode.trim().length === 0) {
                showMessage("请输入邮箱验证码", "error");
                return;
            }
            if (password !== confirmPassword) {
                showMessage("密码和确认密码不一致", "error");
                return;
            }
            handleRegister();
        }
    };

    //注册时的ajax请求
    const handleRegister = () => {
        console.log(
            "执行注册操作",
            username,
            password,
            email,
            emailCode,
            phone
        );
        axios
            .post(
                //请求地址
                "http://39.98.41.126:31130/users/register",
                {
                    emailCode: emailCode,
                    password: password,
                    userName: username,
                    email: email,
                    phone: phone,
                    power: 0,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log();
                const { data, msg, code } = response.data;
                if (code === 1001) {
                    // 注册成功
                    showMessage(msg, "success");
                    const token = data;
                    // 将 token 存储在本地存储中
                    localStorage.setItem("token", token);
                    resetForm();
                } else if (code === 1002) {
                    // 注册失败
                    showMessage(msg, "error");
                } else {
                    showMessage(msg, "error");
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                // 处理注册失败后的逻辑
                showMessage("请求出错: " + error.message, "error");
                console.error(error);
            });
    };

    //登录时的ajax请求
    const handleLogin = () => {
        axios
            .post(
                "http://example.com/api/login",
                {
                    email: email,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log("执行登录操作");
                const { code, msg } = response.data;
                if (code === 1001) {
                    // 登录成功
                    showMessage(msg, "success");
                    // 在这里处理成功的逻辑
                    resetForm();
                } else if (code === 1000) {
                    // 请求格式错误
                    showMessage(msg, "error");
                    // 在这里处理请求格式错误的逻辑
                } else if (code === 1002) {
                    // 服务器异常或繁忙
                    showMessage(msg, "error");
                    // 在这里处理服务器异常或繁忙的逻辑
                } else {
                    // 其他错误
                    showMessage("未知错误: " + msg, "error");
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                console.log("请求出错", error);
                // 在这里处理请求出错的逻辑
                showMessage("请求出错: " + error.message, "error");
            });
    };

    //忘记密码时的ajax操作
    const handleForgotPassword = () => {
        axios
            .post(
                "http://example.com/api/users/updatePassword",
                {
                    code: emailCode,
                    password: password,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log("执行登录操作");
                const { code, msg } = response;
                if (code === 1001) {
                    // 更新成功
                    showMessage(msg, "success");
                    // 在这里处理成功的逻辑
                    resetForm();
                } else if (code === 1000) {
                    // 请求格式错误
                    showMessage(msg, "error");
                    // 在这里处理请求格式错误的逻辑
                } else if (code === 1002) {
                    // 服务器异常或繁忙
                    showMessage(msg, "error");
                    // 在这里处理服务器异常或繁忙的逻辑
                } else {
                    // 其他错误
                    showMessage("未知错误: " + msg, "error");
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                console.log("请求出错", error);
                // 在这里处理请求出错的逻辑
                showMessage("请求出错: " + error.message, "error");
            });
    };

    //处理发送验证码的ajax请求
    const handleEmailSummit = () => {
        axios
            .put(
                "http://example.com/api/users/send-code",
                {
                    email: email,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                console.log("执行登录操作");
                const { code, msg } = response;
                if (code === 1001) {
                    // 更新成功
                    showMessage(msg, "success");
                    // 在这里处理成功的逻辑
                    resetForm();
                } else if (code === 1000) {
                    // 请求格式错误
                    showMessage(msg, "error");
                    // 在这里处理请求格式错误的逻辑
                } else if (code === 1002) {
                    // 服务器异常或繁忙
                    showMessage(msg, "error");
                    // 在这里处理服务器异常或繁忙的逻辑
                } else {
                    // 其他错误
                    showMessage("未知错误: " + msg, "error");
                    // 在这里处理其他错误情况的逻辑
                }
            })
            .catch((error) => {
                console.log("请求出错", error);
                // 在这里处理请求出错的逻辑
                showMessage("请求出错: " + error.message, "error");
            });
    };

    //表单格式判断
    const validateEmail = (email) => {
        const re =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;
        return re.test(email);
    };

    const handleSendEmailCode = () => {
        if (isEmailValid && !isSendingEmailCode && !emailCodeSent) {
            handleEmailSummit();
            setIsSendingEmailCode(true);
            setRemainingTime(60);
            // 重置剩余时间为60秒
            setTimeout(() => setEmailCodeSent(false), 1000);
            // 倒计时结束后恢复按钮状态
            setTimeout(() => {
                setIsSendingEmailCode(false); // 设置邮件验证码发送状态为已发送
                clearInterval(timer); // 清除计时器
                setRemainingTime(60);
            }, 60000);
            // 启动计时器进行倒计时
            const timer = setInterval(() => {
                setRemainingTime((prevTime) => prevTime - 1);
            }, 1000);
        }
    };
    useEffect(() => {
        const isUsernameFieldEmpty = username.trim() === "";
        const isEmailFieldEmpty = email.trim() === "";
        const isPasswordFieldEmpty = password.trim() === "";
        const isPhoneFieldEmpty = phone.trim() === "";
        const isEmailCodeEmpty = emailCode.trim() === "";
        const isUsernameValid = !isUsernameFieldEmpty;
        const isEmailValid = !isEmailFieldEmpty && validateEmail(email);
        const isPasswordValid = !isPasswordFieldEmpty;
        const isConfirmPasswordValid = password === confirmPassword;
        const isPhoneValid = !isPhoneFieldEmpty;
        const isEmailCodeValid = !isEmailCodeEmpty;

        if (isLoginMode) {
            isEmailValid && isPasswordValid
                ? setIsFormValid(true)
                : setIsFormValid(false);
        } else if (isForgotPasswordMode) {
            isEmailValid ? setIsFormValid(true) : setIsFormValid(false);
        } else {
            const isRegist =
                isUsernameValid &&
                isEmailValid &&
                isPasswordValid &&
                isConfirmPasswordValid &&
                isPhoneValid &&
                isEmailCodeValid;
            isRegist ? setIsFormValid(true) : setIsFormValid(false);
        }
    }, [username, email, password, confirmPassword, phone, emailCode]);

    const resetForm = () => {
        setUsername("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        setPhone("");
        setEmailCode("");
        setIsSendingEmailCode(false);
        setIsEmailValid(false);
        setEmailCodeSent(false);
        setRemainingTime(60);
    };

    return (
        <div className={styles.form_main}>
            {isLoginMode && !isForgotPasswordMode && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <SendOutlined></SendOutlined>
                            <input
                                placeholder="邮箱"
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <UnlockOutlined />
                            <input
                                placeholder="密码"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <button
                            type="submit"
                            className={styles.authButton}
                            disabled={!isFormValid}
                        >
                            登录
                        </button>
                    </form>
                    <div className={styles.fontlink}>
                        <span className={styles.switchModeMessage}>
                            还没有账号？
                            <span
                                className={styles.switchModeLink}
                                onClick={() => {
                                    setIsLoginMode(false);
                                    setIsForgotPasswordMode(false);
                                }}
                            >
                                注册
                            </span>
                        </span>
                        <span className={styles.switchModeMessage}>
                            忘记密码？{" "}
                            <span
                                className={styles.switchModeLink}
                                onClick={() => {
                                    setIsLoginMode(false);
                                    setIsForgotPasswordMode(true);
                                }}
                            >
                                找回密码
                            </span>
                        </span>
                    </div>
                </>
            )}

            {!isLoginMode && !isForgotPasswordMode && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <UserOutlined></UserOutlined>
                            <input
                                placeholder="用户名"
                                type="text"
                                id="username"
                                value={username}
                                onChange={handleUsernameChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <UnlockOutlined />
                            <input
                                placeholder="密码"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <CheckOutlined />
                            <input
                                placeholder="确认密码"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <ShakeOutlined />
                            <input
                                placeholder="手机号"
                                type="tel"
                                id="phone"
                                value={phone}
                                onChange={handlePhoneChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <SendOutlined></SendOutlined>
                            <input
                                placeholder="邮箱"
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <div className={styles.emailCodeInputContainer}>
                                <SafetyCertificateOutlined />
                                <input
                                    placeholder="邮箱验证"
                                    type="text"
                                    id="emailCode"
                                    value={emailCode}
                                    onChange={handleEmailCodeChange}
                                    className={styles.emailCodeInput}
                                    maxLength={4}
                                    required
                                />
                                {!emailCodeSent && (
                                    <button
                                        type="button"
                                        className={`${
                                            styles.sendEmailCodeButton
                                        } ${
                                            isSendingEmailCode ||
                                            remainingTime < 60
                                                ? styles.sendEmailCodeButtonDisabled
                                                : styles.sendEmailCodeButtonActive
                                        }`}
                                        disabled={
                                            !isEmailValid ||
                                            isSendingEmailCode ||
                                            emailCodeSent ||
                                            remainingTime < 60
                                        }
                                        onClick={handleSendEmailCode}
                                    >
                                        {isSendingEmailCode
                                            ? `已发送 (${remainingTime}s)`
                                            : "发送验证码"}
                                    </button>
                                )}
                            </div>
                        </div>

                        <button
                            type="submit"
                            className={styles.authButton}
                            disabled={!isFormValid}
                        >
                            注册
                        </button>
                    </form>

                    <p className={styles.switchModeMessage}>
                        已有账号？{" "}
                        <span
                            className={styles.switchModeLink}
                            onClick={() => {
                                setIsLoginMode(true);
                                setIsForgotPasswordMode(false);
                            }}
                        >
                            登录
                        </span>
                    </p>
                </>
            )}

            {!isLoginMode && isForgotPasswordMode && (
                <>
                    <form onSubmit={handleSubmit}>
                        <div className={styles.formGroup}>
                            <UnlockOutlined />
                            <input
                                placeholder="新密码"
                                type="password"
                                id="password"
                                value={password}
                                onChange={handlePasswordChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <CheckOutlined />
                            <input
                                placeholder="确认密码"
                                type="password"
                                id="confirmPassword"
                                value={confirmPassword}
                                onChange={handleConfirmPasswordChange}
                                className={styles.formInput}
                                required
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <SendOutlined></SendOutlined>
                            <input
                                placeholder="邮箱"
                                type="email"
                                id="email"
                                value={email}
                                onChange={handleEmailChange}
                                className={styles.formInput}
                                required
                            />
                        </div>
                        <div className={styles.formGroup}>
                            <div className={styles.emailCodeInputContainer}>
                                <SafetyCertificateOutlined />
                                <input
                                    placeholder="邮箱验证"
                                    type="text"
                                    id="emailCode"
                                    value={emailCode}
                                    onChange={handleEmailCodeChange}
                                    className={styles.emailCodeInput}
                                    maxLength={4}
                                    required
                                />
                                {!emailCodeSent && (
                                    <button
                                        type="button"
                                        className={`${
                                            styles.sendEmailCodeButton
                                        } ${
                                            isSendingEmailCode ||
                                            remainingTime < 60
                                                ? styles.sendEmailCodeButtonDisabled
                                                : styles.sendEmailCodeButtonActive
                                        }`}
                                        disabled={
                                            !isEmailValid ||
                                            isSendingEmailCode ||
                                            emailCodeSent ||
                                            remainingTime < 60
                                        }
                                        onClick={handleSendEmailCode}
                                    >
                                        {isSendingEmailCode
                                            ? `已发送 (${remainingTime}s)`
                                            : "发送验证码"}
                                    </button>
                                )}
                            </div>
                        </div>
                        <button
                            type="submit"
                            className={styles.authButton}
                            disabled={!isFormValid}
                        >
                            提交
                        </button>
                    </form>

                    <p className={styles.switchModeMessage}>
                        已有账号？{" "}
                        <span
                            className={styles.switchModeLink}
                            onClick={() => {
                                setIsLoginMode(true);
                                setIsForgotPasswordMode(false);
                            }}
                        >
                            登录
                        </span>
                    </p>
                </>
            )}
        </div>
    );
};

export default AuthForm;

import React, { useState, useEffect } from "react";
import styles from "./main.module.css";
import {
    UserOutlined,
    UnlockOutlined,
    SendOutlined,
    ShakeOutlined,
    SafetyCertificateOutlined,
    CheckOutlined,
} from "@ant-design/icons";

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
        setIsPhoneValid(validatePhone(phoneValue));
    };

    const handleEmailCodeChange = (e) => {
        setEmailCode(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (isLoginMode) {
            handleLogin();
        } else if (isForgotPasswordMode) {
            handleForgotPassword();
        } else {
            handleRegister();
        }
    };

    // 登陆注册重置业务执行
    const handleLogin = () => {
        console.log("执行登录操作");
        resetForm();
    };

    const handleForgotPassword = () => {
        console.log("执行忘记密码操作");
        resetForm();
    };

    const handleRegister = () => {
        console.log("执行注册操作");
        resetForm();
    };

    //表单格式判断
    const validateEmail = (email) => {
        const re =
            /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z]{2,4})+$/;

        return re.test(email);
    };

    const validatePhone = (phone) => {
        const re = /^[1][3,4,5,7,8][0-9]{9}$/;
        return re.test(phone);
    };

    const validateEmailCode = (emailCode) => {
        const re = /^[a-zA-Z0-9]{4}$/;
        return re.test(emailCode);
    };

    const handleSendEmailCode = () => {
        if (isEmailValid && !isSendingEmailCode && !emailCodeSent) {
            setIsSendingEmailCode(true);
            setRemainingTime(60); // 重置剩余时间为60秒
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
        const isPhoneValid = !isPhoneFieldEmpty && validatePhone(phone);
        const isEmailCodeValid =
            !isEmailCodeEmpty && validateEmailCode(emailCode);

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
        setIsPhoneValid(false);
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

                    <p className={styles.switchModeMessage}>
                        还没有账号？{" "}
                        <span
                            className={styles.switchModeLink}
                            onClick={() => {
                                setIsLoginMode(false);
                                setIsForgotPasswordMode(false);
                            }}
                        >
                            注册
                        </span>
                    </p>
                    <p className={styles.switchModeMessage}>
                        忘记密码？{" "}
                        <span
                            className={styles.switchModeLink}
                            onClick={() => {
                                setIsLoginMode(true);
                                setIsForgotPasswordMode(true);
                            }}
                        >
                            找回密码
                        </span>
                    </p>
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

            {isLoginMode && isForgotPasswordMode && (
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

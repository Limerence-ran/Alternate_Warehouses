import React from "react";
import styles from "./main.module.css";
import AuthForm from "../../components/login-box/main";
import LoginTab from "../../components/login-tab/main";

const Login = function () {
    return (
        <div className={styles.father}>
            <div className={styles.backimg}>
                <LoginTab></LoginTab>
                <div className={styles.backimg_demo}></div>
                <AuthForm></AuthForm>
            </div>
        </div>
    );
};

export default Login;

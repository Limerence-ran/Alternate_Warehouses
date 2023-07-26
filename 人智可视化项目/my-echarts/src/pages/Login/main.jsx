import React from "react";
import "./main.module.css";
import styles from "./main.module.css";
import LoginTab from "../../components/login-tab/main";
import LoginDemo from "../../components/login-demo/main";
import LoginRegisterForm from "../../components/login-form/main";

const Login = function () {
    return (
        <div className={styles.father}>
            <div className={styles.backimg}>
                <div className={styles.color}>
                    <LoginTab />
                    <LoginDemo />
                    <LoginRegisterForm />
                </div>
            </div>
        </div>
    );
};

export default Login;

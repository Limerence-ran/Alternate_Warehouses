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
                    <div className={styles.color_content}>
                        <div className={styles.color_left}>
                            <LoginDemo />
                        </div>
                        <div className={styles.color_right}>
                            <LoginRegisterForm />
                        </div>
                  </div>
                   
                </div>
            </div>
        </div>
    );
};

export default Login;

import React, { useEffect, useState } from "react";
import styles from "./main.module.css";
import img from '../../assets/images/Group 9910.png'
import { UserOutlined, UnlockOutlined, CheckOutlined } from "@ant-design/icons";
import { message } from "antd";
import CheckIcon from "../../components/复选框/main";
import axios from "axios";
import { useNavigate } from 'react-router-dom';


function Login() {
    const [username,setUsername] = useState('')
    const [password,setPassword] = useState('')
    const navigate = useNavigate();

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
    const resetForm = () => {
        setUsername("");
        setPassword("");
       
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
                if (response.data.code === 1) {
                    // 登录成功
                    const token = response.data.data; // 获取返回的token
                    localStorage.setItem("token", token); // 将token存储在本地
                    console.log(response.data)
                    resetForm();
                 
                    showMessage(response.data.msg, "success");
                    setTimeout(() => {
                        navigate('/MainPage');
                    }, 3000)

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
    const handleSubmit = (e)=>{
        e.preventDefault();
            if (!password) {
                showMessage("请输入密码", "error");
                return;
            } else if(!username) {
                showMessage("请输入用户名", "error");
                return;
            }else{
                handleLogin();
            }

        }

const showMessage = (content, type) => {
    message[type]({
        content: <div>{content}</div>,
        duration: 3, // 弹框显示的时间，单位为秒
    });
};
   
    return (
        <>
            <div className={styles.body}>
                <div className={styles.login_content}>
                    <div className={styles.login_img}> </div>
                    <div className={styles.login}>
                        <div className={styles.login_header }>
                            <div className={styles.login_header_img}>  <img src={img} alt="" /></div>
                            <div className={styles.login_header_h1}> <h1>基于出租车的大数据可视化系统</h1></div>
                        </div> 
                        <div className={styles.login_text}>
                                  <h3>管理员登录</h3>
                          
                           
                                    <form onSubmit={handleSubmit}>
                                        <div className={styles.formGroup}>
                                    <UserOutlined style={{ fontSize: "2vw", color: "#fff", marginRight: "0%" ,width:"18%" }} />
                                    <input required=" " type="text" value={username} onChange={handleUsernameChange} placeholder="Your Name" />
                                        </div>

                                        <div className={styles.formGroup}>
                                    <UnlockOutlined style={{ fontSize: "2vw", color: "#fff", width:"18%" }}/>
                                    <input required=" " type="password" value={password} onChange={handlePasswordChange} placeholder="Your Password" />
                                        </div>
                                {/* <div className={styles.check_box}>
                                    <CheckIcon/>
                                记住密码
                                </div> */}
                                        <button type="submit" className={styles.authButton}>
                                    登录
                                    <span></span>
                                        </button>
                                    </form>
                        </div> 
                        
                    </div>
              </div>
            </div>
        </>
    );
}

export default Login;
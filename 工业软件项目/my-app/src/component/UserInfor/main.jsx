
import style from './main.module.css'
import { WomanOutlined} from '@ant-design/icons'
import SwitchButton from './btn'
import img from '../../assets/user.png'
import axios from "axios";
import { message } from "antd";
import { useEffect, useState } from 'react';




const UserInfor = () => {
    const [mydata,setMydata]=useState("")
    useEffect(()=>{
        const fetchData = () => {
            const token = localStorage.getItem("token"); // 从本地存储获取 token

            axios
                .get("http://39.98.41.126:31135/users/profile", {
                    headers: {
                        Authorization: token, // 使用从本地存储中获取的 token
                        "Content-Type": "application/json",
                    },
                })
                .then((response) => {
                    const { code, data, msg } = response.data;
                    setMydata(data)
                 
                    if (code === 1001) {
                        // 获取个人信息成功
                        message.success(msg);
                        // 在这里处理获取个人信息成功的逻辑
                        //赋值操作

                        console.log(data);
                    } else if (code === 1000) {
                        // 请求格式错误
                        message.error(msg);
                        // 在这里处理请求格式错误的逻辑
                    } else if (code === 1002) {
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
        };

        fetchData();
    },[])
   
    return (
        <>
      
            <div className={style.title}>
                <span>个人信息</span>
            </div>
         
         <div className={style.form}>
                <div style={{ width: '300px', height: '200px', padding: '20px' }}>
                    <div style={{ display: 'flex' }}>
                        {/* 左边盒子 */}
                        <div style={{ flex: 1 }}>
                            <div className={style.update}>
                             <img src={img}/>
                                
                                <div className={style.updatebtn}> <span>是否自动更新</span> <SwitchButton className={style.active}/></div>
                             
                           </div>
                        </div>

                        {/* 右边盒子 */}
                        <div style={{ flex: 1, }}>
                            <form>
                                <div className={style.infor}>
                                    <label htmlFor="username">用户名：</label>
                                    <input type="text" id="username" value={mydata.username} />
                                </div>
                                <div className={style.infor}>
                                    <label htmlFor="email">邮箱：</label>
                                    <input type="email" id="email" value={mydata.email} />
                                </div>
                                <div className={style.infor}>
                                    <label htmlFor="gender">性别：无</label>
                                    {/* <WomanOutlined className={style.sex} /> */}
                                </div>
                                <div className={style.infor}>
                                    <label htmlFor="location">电话：</label>
                                    <input type="text" id="location" value={mydata.phone} />
                                </div>
                                <div className={style.infor}>
                                    <label htmlFor="bio">个人介绍：</label>
                                    <textarea id="bio" rows="3" cols={45} value={"暂无"}></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
         </div>
        </>

    )
 }
export default UserInfor 




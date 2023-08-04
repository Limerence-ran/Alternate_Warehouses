import style from "./main.module.css";
import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
// import '../../router/router'

function Chart1() {
    const [data_form, setData] = useState([]);
    const navigate = useNavigate();
    function handletoUpload() {
        const token = localStorage.getItem("token"); // 从本地存储获取 token
        const id = localStorage.getItem("myGroupid");
        axios
            .put(
                "http://39.98.41.126:31130//resource/resource",
                {
                    id: id,
                },
                {
                    headers: {
                        Authorization: token, //使用从本地存储中获取的 token
                        "Content-Type": "application/json",
                    },
                }
            )
            .then((response) => {
                const { code, msg, data } = response;
                if (code === 1) {
                    console.log("data:" + data);
                    message.success("创建成功: " + msg);
                    const Indata = data.data;
                    setData(Indata);
                    // 在这里处理成功的逻辑\
                    localStorage.setItem("tableData", data_form);
                    navigate("/ChartData/Chart5");
                } else {
                    message.error("创建失败: " + msg);
                }
            })
            .catch((error) => {
                message.error("请求出错");
                console.log("请求出错", error);
            });
    }
    function nextPage() {
        navigate("/ChartData/Chart6");
    }

    return (
        
           
                   <>
                <div className={style.upload}>
                <div className={style.header}>
                    <span>IMDB Movie Reviews Dataset</span>
                </div>
                <main>
                    <div className={style.chartbox}>
                        <div className={style.chart}>
                          
                        </div>
                        <div className={style.selectbtn}>
                            <span>Please select the level of noise: </span>
                            <input type="radio" name="1"></input>1
                            <input type="radio" name="1"></input>2
                            <input type="radio" name="1"></input>3
                        </div>
                        <div className={style.btn}>
                            <button onClick={handletoUpload}>
                                Using my previous data
                            </button>
                            <button onClick={nextPage}>Upload my data</button>
                        </div>
                    </div>
                </main>
                </div>

                   </>
          
     
    )
}

export default Chart1;

import React, { useEffect, useState } from "react";
import style from "./main.module.css";
import Page from "../../components/地图/分页/page";
import headerIcon from "../../assets/images/Group 9910.png";
import Map from "../../components/地图/地图/main";
import CarInfor from "../../components/地图/右侧盒子/车辆信息/main";
import WrongCap from "../../components/地图/异常车辆/main";
import SearchCap from "../../components/地图/查询异常车牌号/main";
import Hot from "../../components/地图/载客热点/main";
import { LeftOutlined, LogoutOutlined } from "@ant-design/icons";
import EchartMap from "../../components/echarts-map/main";
import Keyboard from "../../components/keyboard/main";
import EchartsDiv from "../../components/echartsdiv/main.jsx";
import { useNavigate } from "react-router-dom";
import { message } from "antd";
import Rain from '../../components/rain/main'
import Mymap from '../../components/main'

import { useSelector } from 'react-redux' //用于从Redux状态树中选择需要的数据。
import { useDispatch } from 'react-redux'   //用于触发Redux中定义的actions。
import { areaChange } from "../../slice/sliceCounter";  //导入actions



function MainPage() {
    const [currentTime, setCurrentTime] = useState("");
    const [showDate, setShowDate] = useState(false); //选择预测日期
    const [date, setDate] = useState('2017.3.1')//展示预测时间
    const [forecastModel, setForecastModel] = useState(false)//预测模式
    const [model,setModel] = useState('区域监控')
    const [carPath, setCarPath] = useState(false);  
    const [witndrawnl, setWithdrawnl] = useState(false);//异常情况返回
    const navigate = useNavigate();
    const [rain, setRain] = useState(true);
    
    //顶部功能按钮控制地图渲染
    const disPatch = useDispatch()
 

    useEffect(() => {
        const timer = setInterval(() => {
            const dt = new Date();
            const y = dt.getFullYear();
            const mt = dt.getMonth() + 1;
            const day = dt.getDate();
            const h = dt.getHours();
            const m = dt.getMinutes();
            const s = dt.getSeconds();

            const timeString =
                "当前时间：" +
                y +
                "年" +
                mt +
                "月" +
                day +
                "-" +
                h +
                "时" +
                m +
                "分" +
                s +
                "秒";

            setCurrentTime(timeString);
        }, 1000);

        return () => {
            clearInterval(timer);
        };
    }, []);
    const handleLiClick = (e) => {
        const currentTime = e.target.innerText;
         const dateArray = currentTime.split(":");
         const day = dateArray[dateArray.length - 1];
        setDate(day);
        setShowDate(false);
    };
    const showMessage = (content, type) => {
        message[type]({
            content: <div>{content}</div>,
            duration: 3, // 弹框显示的时间，单位为秒
        });
    };

    return (
        <>
            {rain && <Rain />}
            <div className={style.body}>
                <div className={style.header}>
                    <header>
                
                        <div className={style.header_text}>
                            <img
                                src={headerIcon}
                                className={style.header_icon}
                            />
                            <h1>出租车的大数据可视化系统</h1>
                        </div>
                        <div className={style.showTime}>{currentTime}</div>
                        <div className={style.navigate_left}>
                            <span className={style.btn_left}>
                                <button onClick={() => { setModel('区域监控'); disPatch(areaChange('区域监控')); setWithdrawnl(false); setCarPath(false); }}>
                                    <div>区域监控</div>
                                </button>
                            </span>
                            <span className={style.btn_left}>
                                <button onClick={() => { setModel('热点分析'); disPatch(areaChange('热点分析')); setWithdrawnl(false); setCarPath(false); }}>
                                    <div>热点分析</div>
                                </button>
                            </span>
                            <span className={style.btn_left}>
                                <button onClick={() => { showMessage("管理员请先登录！", "success"); setModel('行车轨迹'); disPatch(areaChange('行车轨迹')); setCarPath(true) }}>
                                    <div>行车轨迹</div>
                                </button>
                            </span>
                            <span className={style.btn_left}>
                                <button onClick={() => { setShowDate(!showDate); setForecastModel(true); setCarPath(false); setWithdrawnl(false); setModel('区域监控') }}>
                                    <div>预测分析</div>
                                </button>

                                {showDate && (
                                    <div className={style.Timer}>
                                        <span
                                            style={{
                                                color: "#a39f9f",
                                                fontSize: "12px",
                                                fontFamily: "cursive",
                                            }}
                                        >
                                            请选择您要预测的时间
                                        </span>
                                        <ul
                                            style={{
                                                listStyle: "none",
                                                color: "#545050",
                                                fontFamily: "cursive",
                                            }}
                                        >
                                            <li onClick={handleLiClick}>2017.3.1</li>
                                            <li onClick={handleLiClick}>2017.3.2</li>
                                            <li onClick={handleLiClick}>2017.3.2</li>
                                            <li onClick={handleLiClick}>2017.3.2</li>
                                            <li onClick={handleLiClick}>2017.3.3</li>
                                            <li onClick={handleLiClick}>2017.3.4</li>
                                            <li onClick={handleLiClick}>2017.3.5</li>
                                            <li onClick={handleLiClick}>2017.3.6</li>
                                            <li onClick={handleLiClick}>2017.3.7</li>
                                        </ul>
                                    </div>
                                )}
                            </span>
                        </div>
                    <div className={style.navigate_right}>
                            <span className={style.btn_right}>
                                <button onClick={()=>setRain(!rain)}>
                                    <div>天气主题</div>
                                </button>
                            </span>
                            <span className={style.btn_right}>
                                <button onClick={() => { showMessage("管理员请先登录！", "success"); setTimeout(() => { navigate('/Login') },3000)  }}>
                                    <div>登录</div>
                                </button>
                            </span>
                        </div>
                    </header>
                </div>
                <div className={style.content_header}>
                    <div className={style.content_header_left}>
                        {witndrawnl&&
                            <LeftOutlined
                                className={style.withdrawnl}
                            onClick={() => { setWithdrawnl(!witndrawnl);setModel('行车轨迹'); setCarPath(!carPath) }}
                            />
                        }
                        <span>{model}</span>
                        
                    </div>
                    {forecastModel && <div className={style.content_header_middle}>
                        <span >当前预测日期：{date}</span>
                    </div>}
                  
                    
                    <div className={style.content_header_right}>
                        {carPath && <span className={style.btn_wrong}>
                            <button onClick={() => {setCarPath(!carPath);setModel('异常车辆');setWithdrawnl(!witndrawnl)}}>
                                异常情况
                            </button>
                        </span>}
                        {forecastModel && <span className={style.btn_wrong}>
                            <button className={style.btn_forecast} onClick={() => { setCarPath(false); setForecastModel(false) }}>
                                退出预测模式 <LogoutOutlined />
                            </button>
                        </span>}
                        
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.contentbox}>
                        <div className={style.pagelist}>
                            <div
                                style={{
                                    height: "100%",
                                    width: "96%",
                                    margin: "0% 2%",
                                    
                                }}
                            >
                                {/* {carPath ? <Page /> : <SearchCap />}  */}
                                {/* <Page /> */}
                            
                                <Hot/>
                                {/* <Keyboard/> */}
                            </div>
                        </div>
                        <div className={style.bigMap}>
                            <div
                                className={style.map}
                                style={{
                                    width: "100%",
                                    height: "100%",
                                    position: "relative",
                                }}
                            >
                                {/* {carPath ? <Map /> : <WrongCap />}  */}
                                <EchartMap />
                                {/* <WrongCap /> */}
                                {/* <Mymap/> */}
                            </div>
                        </div>
                        <div className={style.column}>
                            <div
                                style={{
                                    height: "100%",
                                    width: "100%",
                               
                                    display:"flex",

                                    flexDirection:"column",
                    
                                    justifyContent:"space-between"
                                }}
                            >
                                {/* <Echart /> */}
                                <EchartsDiv
                                    type="Liner"
                                    cardwidth="100%"
                                    cardheight="32%"
                                    bgwidth="97%"
                                    bgheight="96%"
                                    blobwidth="60%"
                                    blobheight="60%"
                                />
                                <EchartsDiv
                                    type="Liner1"
                                    cardwidth="100%"
                                    cardheight="32%"
                                    bgwidth="97%"
                                    bgheight="96%"
                                    blobwidth="60%"
                                    blobheight="60%"
                                />
                                <EchartsDiv
                                    type="BarChart"
                                    cardwidth="100%"
                                    cardheight="32%"
                                    bgwidth="97%"
                                    bgheight="96%"
                                    blobwidth="60%"
                                    blobheight="60%"
                                />
                                {/* <CarInfor /> */}
                                {/* {carPath?<CarInfor />:<></>}  */}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default MainPage;

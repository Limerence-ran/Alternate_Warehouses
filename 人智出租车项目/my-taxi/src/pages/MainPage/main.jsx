import React, { useEffect, useState } from "react";
import style from "./main.module.css";
import Page from "../../components/地图/分页/page";
import headerIcon from "../../assets/images/Group 9910.png";
import Map from "../../components/地图/地图/main";
import Echart from "../../components/地图/右侧盒子/右侧三图/main";
import CarInfor from "../../components/地图/右侧盒子/车辆信息/main";
import WrongCap from "../../components/地图/异常车辆/main";
import SearchCap from "../../components/地图/查询异常车牌号/main";
import Hot from "../../components/地图/载客热点/main";
import { LeftOutlined } from "@ant-design/icons";
import EchartMap from "../../components/echarts-map/main";
import Keyboard from "../../components/keyboard/main";
import EchartsDiv from "../../components/echartsdiv/main.jsx";

function MainPage() {
    const [currentTime, setCurrentTime] = useState("");
    const [showDate, setShowDate] = useState(false); //选择预测日期
    const [carPath, setCarPath] = useState(false);

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

    return (
        <>
            <div className={style.body}>
                <div className={style.header}>
                    <header>
                        {/* <img src={headerImg} className={style.header_img} /> */}

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
                                <button>
                                    <div>区域监控</div>
                                </button>
                            </span>
                            <span className={style.btn_left}>
                                <button>
                                    <div>热点分析</div>
                                </button>
                            </span>
                            <span className={style.btn_left}>
                                <button>
                                    <div>行车轨迹</div>
                                </button>
                            </span>
                            <span className={style.btn_left}>
                                <button onClick={() => setShowDate(!showDate)}>
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
                                            <li>2017.3.1</li>
                                            <li>2017.3.2</li>
                                            <li>2017.3.3</li>
                                            <li>2017.3.4</li>
                                            <li>2017.3.5</li>
                                            <li>2017.3.6</li>
                                            <li>2017.3.7</li>
                                        </ul>
                                    </div>
                                )}
                            </span>
                        </div>
                        <div className={style.navigate_right}>
                            <span className={style.btn_right}>
                                <button>
                                    <div>天气主题</div>
                                </button>
                            </span>
                            <span className={style.btn_right}>
                                <button>
                                    <div>登录</div>
                                </button>
                            </span>
                        </div>
                    </header>
                </div>
                <div className={style.content_header}>
                    <div className={style.content_header_left}>
                        {!carPath && (
                            <LeftOutlined
                                className={style.withdrawnl}
                                onClick={() => setCarPath(!carPath)}
                            />
                        )}

                        {carPath ? (
                            <span>行车轨迹</span>
                        ) : (
                            <span>查询车辆</span>
                        )}
                        {/* <span>区域监控</span> */}
                        
                    </div>
                    <div className={style.content_header_right}>
                        <span className={style.btn_wrong}>
                            <button onClick={() => setCarPath(false)}>
                                异常情况
                            </button>
                        </span>
                    </div>
                </div>
                <div className={style.content}>
                    <div className={style.contentbox}>
                        <div className={style.pagelist}>
                            <div
                                style={{
                                    height: "96%",
                                    width: "95%",
                                    margin: "10% 2% 7% 3%",
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
                                    width: "96%",
                                    height: "91%",
                                    position: "relative",
                                    margin: "2% 1% 0% 2.5%",
                                }}
                            >
                                {/* {carPath ? <Map /> : <WrongCap />}  */}
                                {/* < EchartMap/> */}
                                <WrongCap />
                            </div>
                        </div>
                        <div className={style.column}>
                            <div
                                style={{
                                    height: "96%",
                                    width: "95%",
                                    margin: "8% 2% 7% 3%",
                                }}
                            >
                                {/* <Echart /> */}
                                <EchartsDiv type="Liner" />
                                <EchartsDiv type="Liner1" />
                                <EchartsDiv type="BarChart" />
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

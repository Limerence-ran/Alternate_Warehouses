import React, { useEffect, useState } from "react";
import style from "./main.module.css";
import Liner from "./车流量折线图";
import Liner1 from "./利用率折线图";
import BarChart from "./平均收入柱状图";

export default function Echart() {
    return (
        <>
            {/* <div style={{ height: '6%', width: "100%", display: "flex" ,alignItems:"center",justifyContent:"center"}}>
                <span style={{ fontFamily: 'cursive',fontSize:"20px",fontWeight:"bold",color:"#fff"}}>番禺区</span>
        </div> */}
         <div style={{ height: '100%', width: "100%",display:"flex",flexDirection:"column",justifyContent:"space-between"}}>
                  
                <div className={style.chart}>
                    <div style={{ height: '5%', width: "100%", display: "flex", alignItems: "center", justifyContent: "center", padding: "2 %" }}>
                        <span style={{ fontFamily: 'cursive', fontSize: "20px", fontWeight: "bold", color: "#fff"}}>番禺区</span>
                    </div>
                    <Liner style={{ height: '90%', width: "100%" }}/></div>

                <div className={style.chart}>
                    <Liner1 />
                </div>

                <div className={style.chart}>
                    <BarChart />
                </div>
            </div>
        </>
    );
}

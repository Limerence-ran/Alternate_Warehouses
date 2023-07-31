
import style from './main.module.css'
import React, { useState } from 'react'
import Pointxy from "../../components/point-xy/main"
import Bar from '../../components/bar/main'
function Chart2() {
    
    return (
        <>
            <div className={style.content}>
                <div className={style.header}>
                    <span>数据结果可视化</span>
                </div>
                <main>
                    <div className={style.chart2}>
                        <div className={style.img}><Pointxy></Pointxy></div>
                        <div className={style.img}><Bar></Bar></div>
                        <div className={style.img}></div>
                    </div>
                    <button>finish</button>
                </main>
            </div>

               
           
        </>
    )
}
export default Chart2

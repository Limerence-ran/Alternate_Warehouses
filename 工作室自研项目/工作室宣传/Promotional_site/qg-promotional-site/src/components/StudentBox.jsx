import React, { useRef } from 'react';
import { useState,useEffect } from 'react';
import PubSub from 'pubsub-js';
import {stu} from '../data/student'

// import SplitLine from './SplitLine';
import "../assets/styles/StudentBox.css"
const Studentbox = () => {
    const [index,setIndex] = useState(0);
    const introRef = useRef();

    // 动画移除
    const animateOut =  async() => {
        const introDom = introRef.current;
        const introConfig = [{transform: 'translateY(0)'},{transform: 'translateY(-200%)'}]
        const introAni = introDom?.animate(introConfig,{fill:'forwards',duration:300,delay:200})
        await introAni?.finished
    }

    // 动画进入
    const animateIn = async() => {
        const introDom = introRef.current;
        const introConfig = [{transform: 'translateY(-200%)'},{transform: 'translateY(0)'}]
        const introAni = introDom?.animate(introConfig,{fill:'forwards',duration:300,delay:300})
        await introAni?.finished
    }

    // 监听切换
    const listenIndex =  () => {
        PubSub.subscribe('left',async (mes,data) => {
            await animateOut();
            setIndex(data)
            await animateIn();
        })
        PubSub.subscribe('right',async (mes,data) => {
            await animateOut();
            setIndex(data)
            await animateIn();
        })
    }

    useEffect(() => {
        listenIndex();
        // return() {

        // }
    }, []);

    return (
      <>
        <div className="student-wrapper">
            <div className="student-ct">
               
                <div className="introduce-ct">
                    <h2 className='intro-title'>简介</h2>
                    <p className="intro-words"><span ref={introRef}>{stu[index].intro}</span></p>
                </div>
              
            </div>
        </div>
      </>
    );
}

export default Studentbox;

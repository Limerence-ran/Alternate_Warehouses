
import React from 'react'
import style from './main.module.css';
import img1 from '../../assets/images/1.jpg'
import Lis from './lis'


const Content = () => {
    const arr = [{
        url: "http://abc", dollar: "300", text: "主要合伙人具有10年以上行业龙头企业管理经验以及海外工作经历,技术氛围浓、研发实力强、上升通道明确"
    },
    {
        url: "http://abc", dollar: "500", text: "主要合伙人具有10年以上行业龙头企业管理经验以及海外工作经历,技术氛围浓、研发实力强、上升通道明确"
    },
    {
        url: "http://abc", dollar: "200", text: "主要合伙人具有10年以上行业龙头企业管理经验以及海外工作经历,技术氛围浓、研发实力强、上升通道明确"
    },
        {
            url: "http://abc", dollar: "200", text: "主要合伙人具有10年以上行业龙头企业管理经验以及海外工作经历,技术氛围浓、研发实力强、上升通道明确"
        },
        {
            url: "http://abc", dollar: "200", text: "主要合伙人具有10年以上行业龙头企业管理经验以及海外工作经历,技术氛围浓、研发实力强、上升通道明确"
        },
        {
            url: "http://abc", dollar: "200", text: "主要合伙人具有10年以上行业龙头企业管理经验以及海外工作经历,技术氛围浓、研发实力强、上升通道明确"
        },


    ]
    return (
        <>
            <div className={style.detail}>
                <ul>
                    {
                        arr.map(
                            (item) => <Lis url={item.url} dollar={item.dollar} text={item.text} />
                        )
                    }
                </ul>
            </div>
        </>
    )
}

export default Content
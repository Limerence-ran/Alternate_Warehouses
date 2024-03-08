import { useOutletContext } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { LogReq } from '../request/api' 
let tempOpData = [];
let tempSignData = [];
let predataOP = []
let predataSign = []
export default function OpLog(props){
    const [signDataTotal,setSignDataTotal] = useState([])
    const [opDataTotal,setOpDataTotal] = useState([])
    const data = useOutletContext();
   
    let opData = data[1];
    let signData = data[2];
   
    if(JSON.stringify(opData) !== "[]" && predataOP !== opData) {
        tempOpData.unshift(opData);
        predataOP = opData;
    }
    if(JSON.stringify(signData) !== "[]" && predataSign !== signData) {
        tempOpData.unshift(signData);
        predataSign = signData;
    }
    useEffect(() => {
        // 获取历史的日志信息
        LogReq.getOriginOpLog().then(res=>{
            if(!res) return;
            console.log(res)
            setOpDataTotal(v=>res.data.data)
            tempOpData = res.data.data;
        })
        LogReq.getOriginNewLog().then(res=>{
            if(!res) return;
            setSignDataTotal(v=>res.data.data)
            tempSignData = res.data.data;
        })
        // 5秒更新一次新的信息
        let timer = setInterval(() => {
            setOpDataTotal(v=>[...tempOpData,...opDataTotal])
            setSignDataTotal(v=>[...tempSignData,...signDataTotal])
        },5000)
        return ()=>{
            if(timer) clearInterval(timer);
            
        }
    },[])



    return(
  
        <div className="oplog-wrapper">
            <ul className="log-list">
                <div className="log-header">
                    <p>新生日志</p>
                </div>
                {
                    signDataTotal?
                    signDataTotal.map((n,index)=>{
                        let {message} = n;
                        return (
                            <li key={index} className="log-list-item signup-log">
                                <span className='item-log-content'>
                                    <span>{message[0]}</span>执行
                                    <span>{message[1]}</span>
                                </span>
                                <span>{n.date}</span>
                            </li>
                        )
                    })
                    :<></>
                }
            </ul>
            <ul className="log-list">
                <div className="log-header">
                    <p>操作日志</p>
                </div>
                {
                    opDataTotal?
                    opDataTotal.map((n,index)=>{
                        let {message} = n;
                        return (
                            <li key={index} className="log-list-item op-log">
                                <span className='item-log-content'>
                                    <span>{message[0]}</span>对
                                    <span>{message[1]}</span>执行
                                    <span>{message[2]}</span>
                                </span>
                                <span>{n.date}</span>
                            </li>
                        )
                    })
                    :<></>
                }
            </ul>
        </div>
    
    )
}
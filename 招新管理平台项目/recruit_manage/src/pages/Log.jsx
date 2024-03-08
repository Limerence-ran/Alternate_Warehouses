import MyNavLink from '../components/MyNavLink'
import { useNavigate } from 'react-router-dom';
import {Outlet} from 'react-router-dom'
import '../assets/styles/Log.scss'
import { check } from '../utils/checkToken';
import { useEffect, useState } from 'react';
const wsUrl = `wss://qgailab.com/newer2022/newer/log`; // websocket的url
export default function Log(props){
    const [opData,setOpData] = useState([])
    const [sysData,setSysData] = useState([])
    const [newerData,setNewerData] = useState([])
    const navigate = useNavigate();
    // 处理websocket的函数
    let connect = false
    let ws = null;          
    let exit = false;
    // 组件挂载时执行
    useEffect(() => {
        // 判断登录状态
        check(navigate).then(res=>{
            if(!res) return;
            else {
                // 连接websocket
                createWebSocket(wsUrl);   
            } 
        })

        return () => {
            // 卸载时关闭ws
            if(ws) closeSocket();
        }
    },[])

    const closeSocket = () => {
        exit = true;
        ws.close();   // 关闭
    }
    const reconnect = (url) => {
        if(connect || exit) return;
        connect = true;
        setTimeout(function () {     //没连接上会一直重连，设置延迟避免请求过多
            createWebSocket(url);
            connect = false;
        }, 2000);
    }

    //心跳检测
    const heartCheck = {
        timeout: 30000,        //1分钟发一次心跳
        timeoutObj: null,
        serverTimeoutObj: null,
        reset: function(){
            clearTimeout(this.timeoutObj);
            clearTimeout(this.serverTimeoutObj);
            return this;
        },
        start: function(){
            let self = this;
            this.timeoutObj = setTimeout(function(){
                //这里发送一个心跳，后端收到后，返回一个心跳消息，
                //onmessage拿到返回的心跳就说明连接正常
                ws.send("ping");
                self.serverTimeoutObj = setTimeout(function(){//如果超过一定时间还没重置，说明后端主动断开了
                    ws.close();     //如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                }, self.timeout)
            }, this.timeout)
        }
    }

    const createWebSocket = (url)=> {
        try{
            if('WebSocket' in window){
                const token = window.sessionStorage.getItem('platformToken');
                ws = new WebSocket(url,[token]);
                initEventHandle(ws);
            }
        }catch(e){
            reconnect(url);
        }     
    }

    const initEventHandle = (ws) => {
        ws.onclose = function () {
            reconnect(wsUrl);
            console.log("连接关闭!");
            connect = false;
        };
        ws.onerror = function (res) {
            connect = false;
            console.log("连接错误!",res);
        };
        ws.onopen = function () {
            heartCheck.reset().start();      //心跳检测重置
            console.log("连接成功!");
        };
        ws.onmessage = function (res) {    //如果获取到消息，心跳检测重置
            heartCheck.reset().start();      //拿到任何消息都说明当前连接是正常的
        
            let data = JSON.parse(res.data);
            switch(data.type) {
            case 100: {
                // 系统日志
                // TODO:这里可以改成扩展运算符，直接累加，就不用子组件里面再处理了
                setSysData(v=>data)
                setOpData(v=>[])
                setNewerData(v=>[])    
                break;
            }
        
            case 101: {
                // 操作日志
                setOpData(v=>data)
                setSysData(v=>[])
                setNewerData(v=>[])
                break;
            }
    
            case 102: {
                // 报名日志
                setNewerData(v=>data)
                setOpData(v=>[])
                setSysData(v=>[])
                break;
            }
            default:;
        }
        };
    }

    return (
        <div className='log-wrapper'>
            <div className='link-header'>
                <MyNavLink to="oplog" className={({ isActive }) => "link-btn" + (isActive ? " active" : "")}>报名&操作日志</MyNavLink>
                <MyNavLink to="systemlog" className={({ isActive }) => "link-btn" + (isActive ? " active" : "")}>系统日志</MyNavLink>    
            </div>
            <Outlet context={[sysData,opData,newerData]}/>
        </div>
    )
}
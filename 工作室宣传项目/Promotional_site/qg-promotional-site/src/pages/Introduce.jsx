import {groupdata,Team} from '../data/introduce'
import {bindSwipeEventY} from '../utils/listenTouch'
import {throttle} from '../utils/throttle';
import UA from 'ua-device';
import '../assets/styles/introduce.scss'
import { useEffect, useState } from 'react'; 
let titleAni = null,mainAni = null,logoAni = null;
let isIn = false;
const hoverImage = ()=>{
    let menuItems = document.querySelectorAll(".menu-list .menu-item");
    let cursor = document.querySelector(".menu-list .cursor-image");
    let getXY = e => [
        e.clientX,
        e.clientY
    ];

    menuItems.forEach(menuItem => {
        // use mouseenter and mouseleave to toggle cursor since they won't bubble!
        
        menuItem.addEventListener("mouseenter", throttle(e => {
            let [x, y] = getXY(e);
            cursor.animate(
            [
                {
                opacity: 0,
                transform: `translate(${x}px, ${y}px) scale(0)`
                },
                {
                opacity: 1,
                transform: `translate(${x}px, ${y}px) scale(1)`
                }
            ],
            { duration: 300, fill: "forwards" }
            );
        },16))
        menuItem.addEventListener("mouseleave", throttle(e => {
            let [x, y] = getXY(e);
            cursor.animate(
                [
                {
                    opacity: 1,
                    transform: `translate(${x}px, ${y}px) scale(1)`
                },
                {
                    opacity: .5,
                    transform: `translate(${x}px, ${y}px) scale(0)`
                }
                ],
                { duration: 300, fill: "forwards" }
            );
        },16));
     
        // move the cursor when mouse moves.
        menuItem.addEventListener("mousemove", throttle(e => {
            let [x, y] = getXY(e);
            cursor.animate(
            [
                {
                transform: `translate(${x}px, ${y}px)`
                },
                {
                transform: `translate(${x}px, ${y}px)`
                }
            ],
            { duration: 500, delay: 100, fill: "forwards" }
            );
        },16));
    });
}

const checkIsPlaying = async ()=>{
    if(titleAni===null) return false;
    const running = 'running';
    let flag1 = titleAni.playState === running;
    let flag2 = mainAni.playState === running;
    let flag3 = logoAni.playState === running;
    if(flag1 || flag2 || flag3){
        if(isIn){
            if(flag1) titleAni.reverse();
            else titleAni.pause();
            mainAni.reverse();
            if(flag3) {
                logoAni.reverse();
                logoAni.finish()
            }
        }
        else{
            titleAni.finish();
            mainAni.finish();
            logoAni.finish();
        }
        return true;
    }else{
        return false;
    }
}
const cardIn = async (title,main,logo) => {
    isIn = true;
    const titleConfig = [{transform:'translateY(200%)'},{transform:'translateY(0)'}];
    const mainConfig = [{transform:'translateY(-100%)'},{transform:'translateY(0)',opacity:1}];
    const logoConfig = [{opacity:0},{opacity:1}];
    const common = {duration:350,fill:'forwards'};
    titleAni = title.animate(titleConfig,{...common});
    mainAni = main.animate(mainConfig,{delay:300,...common});
    logoAni = logo.animate(logoConfig,{delay:500,...common});
    await logoAni.finished;
    isIn = false;
}
const cardOut = async (title,main,logo) => {
    let isplay = await checkIsPlaying()
    if(!isplay){
        const titleConfig = [{transform:'translateX(0)'},{transform:'translateX(-100%)'}];
        const mainConfig = [{opacity:1},{opacity:0,transform:'translateY(-100%)'}];
        const logoConfig = [{opacity:1},{opacity:0}];
        const common = {duration:300,fill:'forwards',easing:'ease-in-out'};
        titleAni = title.animate(titleConfig,common)
        mainAni = main.animate(mainConfig,{delay:250,...common})
        logoAni = logo.animate(logoConfig,{delay:400,...common});
        await logoAni.finished;
    }
}

// 更新列表选中样式
const refreshActive = (items,i,classname) => {
    items.forEach((n,index)=>{
        if(index === i) n.classList.add(classname);
        else n.classList.remove(classname)
    });
}

const checkIsCompatible = () => {
    let isCompatible = true;
    let ua = new UA( navigator.userAgent)
    let {browser,os,device} =ua;
    let {name,version} = browser;
    let {type} = device;
    let versionArr = version.original.split('.');
    version = parseFloat(versionArr[0] + '.' +versionArr[1]);
    switch(name){
        case '微信':
            if(version < 8) isCompatible = false;    
        ;break;
        case 'Chrome':
            if(version < 84) isCompatible = false;    
        ;break;
        case 'Android Chrome':
            if(version < 98) isCompatible = false;    
        ;break;
        case 'Edge':
            if(version < 84) isCompatible = false;    
        ;break;
        case 'Firefox':
            if(version < 75 && type === 'desktop') isCompatible = false;    
            else if(version < 96 && type === 'Android') isCompatible = false;    
        ;break;
        case 'Safari':
            if(version < 13.1 && os.name !== 'iOS') isCompatible = false;    
            else if(version < 13.4 && os.name === 'iOS')
        ;break;
        case 'Opera':
            isCompatible = false;   
        ;break;
        default:isCompatible = false;
    }
    return isCompatible;
}

function Introduce() {
    let [group,setGroup] = useState(Team.title);
    let [english,setEnglish] = useState(Team.english);
    let [main,setMain] = useState(Team.main);
    let [keywords,setKeywords] = useState([]);
    let [isTeam,setIsTeam] = useState(true);
    //let [isCompatible,setIsCompatible] = useState(true);
    // 用于改版卡片内容和加载动画
    const showGroupInfo = async (i,type) => {
        let isCompatible = checkIsCompatible();
        let items = document.querySelectorAll('.menu-list .menu-item');
        let title = document.querySelector('.overview .header p');
        let titleLogo = document.querySelector('.overview .header p span');
        let main = document.querySelector('.main-body div');
        let logo = document.querySelector('.overview .logo'); 
        if(!(title && main && logo)) return;
        // 加淡出动画
        if(isCompatible) await cardOut(title,main,logo);
        if(type === 1) refreshActive(items,i,'menu-item-active'); // pc端
        else if(type === 2){
            let dots = document.querySelectorAll('.slider-dots .dot');
            if(i+1 === 0) setIsTeam(v=>true)
            refreshActive(dots,i+1,'dot-active'); // 手机端
        }
        // 修改卡片信息
        if(i>=0){
            let group = groupdata[i];
            setGroup(group.group);
            setEnglish(group.english);
            setMain(group.text);
            setKeywords(group.keywords)
            // 修改logo
            logo.style.backgroundImage = `url(${group.logo})`;
            titleLogo.style.backgroundImage = `url(${group.titlelogo})`;
            setIsTeam(v=>false);
        }else{
            setGroup(v=>Team.title);
            setEnglish(v=>Team.english);
            setMain(v=>Team.main);
            // 修改logo
            logo.style.backgroundImage = ``;
        }
        if(isCompatible) await cardIn(title,main,logo);
    }
    let show = throttle(showGroupInfo,1700);
    useEffect(() => {
        let overview = document.querySelector(".overview-ct");
        let pageIndex = -1;
        bindSwipeEventY(overview,3250,()=>{
            pageIndex--;
            if(pageIndex === -2){
               pageIndex = 6; 
            }
            showGroupInfo(pageIndex,2);
        },()=>{
            pageIndex++;
            if(pageIndex === 7){
                pageIndex = -1; 
            }
            showGroupInfo(pageIndex,2);
        })
        hoverImage();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    return (
        <div className="ct-page introduce">
            <div className="introduce-ct">
                <div className="list-ct">
                    <p className='title'>关于我们</p>
                    <ul className="menu-list">
                        {
                            groupdata.map((v,i)=><li onClick={show.bind(this,i,1)} className='menu-item' key={'li'+i}><p key={'p'+ i}>{v.english}</p><span key={'span'+ i}>{`${v.group} ${v.english}`}</span></li>)
                        }
                        <div className="cursor-image"></div>
                    </ul>
                </div>
            </div>
            <div className="overview-ct">
                <div className="overview">
                    <div className="slider-ct">
                        <div className="slider-dots">
                            <span className="dot dot-active"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                            <span className="dot"></span>
                        </div>
                    </div>
                    <div className="teamlogo" style={{opacity:isTeam?0.1:0}}></div>
                    <div className="header">
                        <p><span style={{display:isTeam?'none':'block'}}></span>{english}</p>
                    </div>
                    
                    <div className='main-body'>
                        <div>
                            <p className='main-title'>{group}</p>
                            {
                                main.map((v,i)=><p key={i} className='main-text'>{v}</p>)
                            }
                            <p className='main-title' style={{display:isTeam?'none':'block'}}>关键词</p>
                            <p  className='main-keywords' style={{display:isTeam?'none':'block'}}>{keywords.map((v,i)=><span key={i}>· {v}</span>)}</p>
                        </div>
                        
                    </div>
                    <div className="logo"></div>
                </div>
            </div>
            
        </div>
    );
}
    
export default Introduce;
  
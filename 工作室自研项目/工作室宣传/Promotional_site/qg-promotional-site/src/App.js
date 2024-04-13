import {Route,Routes} from 'react-router-dom'
import Layout from './pages/Layout';
import { throttle } from './utils/throttle';
import { notification } from 'antd';
import '../src/assets/styles/App.scss';
import '../node_modules/antd/dist/antd.min.css';
import { useEffect ,useRef,useState} from 'react';
import LOADIMAGES from './data/images';
import loadImage from './utils/loadImages';
const setProgressRate = (progressRate,dom) => {
  progressRate = progressRate.toFixed(2);
  dom.current.innerText = `${progressRate}%`;
}
const cursorEvent = (cursor) => {
  document.addEventListener("mousemove", throttle((e)=>{
    cursor.setAttribute('style', `top:${e.clientY}px; left:${e.clientX}px`);
    cursor.classList.add('cursor-move');
    setTimeout(() => {
      cursor.classList.remove('cursor-move');
    }, 300);
  },10));
  
  document.addEventListener('click', e => {
    cursor.classList.add('cursor-click');
    setTimeout(() => {
      cursor.classList.remove('cursor-click');
    }, 350);
  });
}
const openNotification = () => {
  notification.info({
    message: '温馨提示',
    description:<div><p>首次打开网页可能有些慢，请耐心等待哦！</p><p>使用电脑访问本网站以获得最佳体验！</p></div>
  });
};
function App() {
  const cursor = document.querySelector('.cursor');
  const progressrate = useRef();
  let preProgress = 0;
  let [progress,setProgress] = useState(0);    
  let [isWeiXin,setIsWeiXin] = useState(false);    
  // let [isCorrectBrowser,setIsCorrectBrowser] = useState(false);    
  // 加载进度
  const increaseRate = () => {
    let incremental = progress - preProgress;
    if(incremental === 0) incremental++;
    setProgressRate(incremental,progressrate);
    if(progress === 100) {
      let progressPage = document.querySelector('.progress-ct');
      setTimeout(() => { 
          progressPage.style.opacity = 0;
          setTimeout(() => {
              progressPage.style.display = 'none';
          },300)
      },600)
      return;
    }
    //progress+=incremental;
    if(progress > 100) progress = 100;
  }
  useEffect(()=>{
    window.requestAnimationFrame(increaseRate);
  },[progress])
  useEffect(()=>{
    if(document.documentElement.clientWidth < 940){
      openNotification();
    }
    setTimeout(()=>{
      loadImage(LOADIMAGES,setProgress);
    },500)
    let ua = navigator.userAgent;
    if (ua.includes('Android') || ua.includes('iPhone')) {
      
    }else{
      setIsWeiXin(v=>!!/MicroMessenger/i.test(ua));
    }
    cursorEvent(cursor);
  },[])

  return (
    <>
      {
        isWeiXin?<div className='weixinCover'>
          <div className='coverFont'>请在自带浏览器中打开本网站</div>
        </div>:''
      }
      <div className="progress-ct">
          <div className="progress-box">
              <div className="progress">
                  <span className={progress >= 10 ? 'active' : ''}></span>
                  <span className={progress >= 20 ? 'active' : ''}></span>
                  <span className={progress >= 30 ? 'active' : ''}></span>
                  <span className={progress >= 40 ? 'active' : ''}></span>
                  <span className={progress >= 50 ? 'active' : ''}></span>
                  <span className={progress >= 60 ? 'active' : ''}></span>
                  <span className={progress >= 70 ? 'active' : ''}></span>
                  <span className={progress >= 80 ? 'active' : ''}></span>
                  <span className={progress >= 90 ? 'active' : ''}></span>
                  <span className={progress >= 100 ? 'active' : ''}></span>
              </div>
              <span className='progress-num' ref={progressrate}>0%</span>
          </div>
      </div>
      <Routes>
        <Route path="/*" element={ <Layout/>}></Route>
      </Routes>
    </>
  );
}
//
export default App;

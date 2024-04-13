import { useState, useEffect, useRef } from "react";
import StudentBoxMedia from "../components/StudentBoxMedia";
import StudentAboutUs from "../components/StudentAboutUs";
import PubSub from "pubsub-js";
import Carousel from "../components/Carousel";
import Studentbox from "../components/StudentBox";
import { stu } from "../data/student";
// import AwardCard from './AwardCard';
import "../assets/styles/Students.scss"
function Students() {
  const [index, setIndex] = useState(0);
  const nameRef = useRef();
  const proRef = useRef();
  const wholePageRef = useRef();

  const [isMobile, setIsMobile] = useState(false);
  // 淡出
  const fadeOut = async () => {
    const proDom = proRef.current;
    const proConfig = [{ opacity: 1 }, { opacity: 0 }]
    const proAni = proDom?.animate(proConfig, { fill: 'forwards', duration: 300, delay: 200 })
    await proAni?.finished
  }
  // 淡入
  const fadeIn = async () => {
    const proDom = proRef.current;
    const proConfig = [{ opacity: 0 }, { opacity: 1 }]
    const proAni = proDom?.animate(proConfig, { fill: 'forwards', duration: 300, delay: 200 })
    await proAni?.finished
  }

  // 动画左移除
  const animateLeftOut = async () => {
    const introDom = nameRef.current;
    const introConfig = [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(-200%)', opacity: 0 }]
    const introAni = introDom?.animate(introConfig, { fill: 'forwards', duration: 300, delay: 200 })
    await introAni?.finished
  }

  // 动画右移除
  const animateRightOut = async () => {
    const introDom = nameRef.current;
    const introConfig = [{ transform: 'translateX(0)', opacity: 1 }, { transform: 'translateX(200%)', opacity: 0 }]
    const introAni = introDom?.animate(introConfig, { fill: 'forwards', duration: 300, delay: 200 })
    await introAni?.finished
  }

  // 动画左进入
  const animateLeftIn = async () => {
    const introDom = nameRef.current;
    const introConfig = [{ transform: 'translateX(200%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }]
    const introAni = introDom?.animate(introConfig, { fill: 'forwards', duration: 300, delay: 300 })
    await introAni?.finished
  }

  //  动画右进入
  const animateRightIn = async () => {
    const introDom = nameRef.current;
    const introConfig = [{ transform: 'translateX(-200%)', opacity: 0 }, { transform: 'translateX(0)', opacity: 1 }]
    const introAni = introDom?.animate(introConfig, { fill: 'forwards', duration: 300, delay: 300 })
    await introAni?.finished
  }

  // 监听下标变化
  const listenIndex = () => {
    PubSub.subscribe('left', async (mes, data) => {
      fadeOut()
      await animateLeftOut();
      setIndex(data)
      fadeIn()
      await animateLeftIn();
    })
    PubSub.subscribe('right', async (mes, data) => {
      fadeOut()
      await animateRightOut();
      setIndex(data)
      fadeIn()
      await animateRightIn();
    })
  }

  useEffect(() => {
    listenIndex();
    let ua = navigator.userAgent;
    if (ua.includes('Android') || ua.includes('iPhone') || ua.includes('iPad')) {
      setIsMobile(true);
    } else if (wholePageRef.current.clientWidth < 900) {
      setIsMobile(true);
    }
    return () => {
      // cleanup
    };
  }, []);

  return (
    <div className="student">
      {
        isMobile ?
          <div className="media-page">
            <p className='title'>优秀学生</p>
            <StudentAboutUs></StudentAboutUs>
            {
              stu.map((v, i) =>
                <StudentBoxMedia key={i} name={v.name} pro={v.pro} intro={v.intro} imgindex={i + 1}></StudentBoxMedia>
              )
            }
          </div>
          :
          <div className="pc-page" ref={wholePageRef}>
            <p className='title'>优秀学生</p>
            <div className="edu-words-ct">
              <p className="edu-words">
                <span>团队为大湾区建设培养和输送了大批品学兼优的高水平创新型人才200多名。团队大部分学生进入了华为、阿里巴巴、腾讯、京东、百度、字节跳动、网易游戏等知名IT公司工作，成为了核心技术骨干，获得用人单位的肯定和好评。另有不少毕业生或“推免”留校深造或到海内外高校继续攻读硕（博）士，或在毕业后进行了创业，获得了初步的成功。</span>
              </p>
            </div>
            <Carousel></Carousel>
            <div className="name-pic-wrapper">
              <div className="avator-wrapper">
              </div>
              <div className="name-ct">
                <h2 ref={nameRef}>{stu[index].name}</h2>
                <div className="name-describe" ref={proRef}>{stu[index].pro}</div>
              </div>
            </div>
            <Studentbox></Studentbox>
          </div>
      }



    </div>

  );
}

export default Students;

import ProjectCard from '../components/ProjectCard'
import { projects, projectsList } from '../data/projects'
import { Carousel, message } from 'antd';
import { useRef, useEffect, useState } from 'react'
// import backMBListBtn from 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/backMBProject.svg'
import '../assets/styles/Projects.scss'
import {throttle} from '../utils/throttle'

function Projects() {

    const cardRef = useRef();
    const wholePageRef = useRef();


    // 控制ListPage详情中展示项目的内容
    const [currentListItem, setcurrentListItem] = useState(-1);
    const [ListPageInfo, setListPageInfo] = useState('点击项目查看项目简介');
    //

    // 控制mobile详情中展示项目的内容
    const [currentMBItem, setcurrentMBItem] = useState(-1);
    const [MBPageInfo, setMBPageInfo] = useState({});
    //

    const [isMobile, setIsMobile] = useState(false);
    const showPageRef = useRef();
    const ListPageRef = useRef();

    // 鼠标滚轮切换
    function handleScroll(e){
        // console.log(e.nativeEvent.deltaY);
        if(e.nativeEvent.deltaY>0){
            moreProjects();
        }else{
            backProjects();
        }
    }

    // mobile点击返回回到项目列表
    function backMBList() {
        setcurrentMBItem(-1);
    }

    // 点击mobile中项目触发函数
    function checkProjectMBItem(index) {
        setcurrentMBItem(index);
        setMBPageInfo(projects[index]);
    }

    // 点击List中项目触发函数
    function checkProjectListItem(index) {
        setcurrentListItem(index);
        setListPageInfo(projectsList[index].introducition);
    }

    function moreProjects() {
        // console.log('切换到更多项目');
        showPageRef.current.className += ' hideTopPage';
        ListPageRef.current.className = 'projectList_page currentPage';
    }

    function backProjects() {
        // console.log('切换到奖项展示');
        showPageRef.current.className = 'project_page';
        ListPageRef.current.className = 'projectList_page hideBottomPage';
    }

    useEffect(() => {
        let ua = navigator.userAgent;
        if (ua.includes('Android')||ua.includes('iPhone')||ua.includes('iPad')) {
            setIsMobile(true);
        }else if(wholePageRef.current.clientWidth<900){
            setIsMobile(true);
        }
        let imgs = document.querySelectorAll('.slick-cloned');
        imgs.forEach((v) => {
            v.setAttribute('style', `opacity: 0;`);
        })
    }, [])

    function goPrev() {
        message.destroy();
        let currentImg = document.querySelector('.slick-current');
        if (currentImg.getAttribute('data-index') === 0 + '') {
            message.info('已经到第一张了');
        } else {
            cardRef.current.prev();
        }
    }

    function goNext() {
        message.destroy();
        let imgsLength = document.querySelectorAll('.slick-cloned').length - 2;
        let currentImg = document.querySelector('.slick-current');
        if (currentImg.getAttribute('data-index') === imgsLength + '') {
            message.info('已经到最后一张了');
        } else {
            cardRef.current.next();
        }
    }

    return (
        <div className="ct-page projects" onWheel={throttle((e)=> handleScroll(e),1500)} ref={wholePageRef}>
            <p className='title'>优秀项目</p>
            {
                isMobile ?
                    <div className="mobile">
                        <div className='listPage'>
                            <div className="mb-introduction">
                                <p>团队成立至今，获得各类科技竞赛240余项，其中国家级奖项33项，省级奖项130项，承担大学生创新创业训练计划（国家级）、广东省大学生科技创新培育专项资金（重点）等各类科技项目50项，申请专利和软件著作权等成果40余项。</p>
                            </div>
                            <div className="mb-list">
                                {
                                    projects.map((v, i) =>
                                        i < 4 ?
                                            <div className="mb-listItem" key={'mb-listItem' + i} onClick={() => checkProjectMBItem(i)}>
                                                <div className="mb-itemTitle">
                                                    <p >{v.title}</p>
                                                </div>
                                            </div> : ''
                                    )
                                }
                            </div>
                        </div>
                        <div className={currentMBItem > -1 ? 'mb-detailPage currentDetailPage' : 'mb-detailPage'}>
                            <div className="mb-backBtn" onClick={backMBList}><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/backMBProject.svg' alt="" /></div>
                            <div className="mb-projectDeatilInfo">
                                <div className="mb-projectImg"><img src={MBPageInfo.imgSrc} alt="" /></div>
                                <div className="mb-projectTitle">
                                    <p>{MBPageInfo.title}</p>
                                </div>
                                <div className="mb-projectContent">{MBPageInfo.introducition}</div>
                            </div>
                        </div>
                        <div className="mb-footer">
                            <div className="mb-footerContainer">
                                <p>更多详情请访问QG官网</p>
                                <p>https://qgailab.com</p>
                            </div>
                        </div>
                    </div>
                    :
                    <div className="pc">
                        <div className="project_page" ref={showPageRef}>
                            <div className="CarouselBox">
                                <div className="myArrow prevArrow" onClick={goPrev}>
                                    <div><svg t="1645777992662" className="icon" viewBox="0 0 1027 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="4026" width="7vw" height="7vh"><path d="M340.114286 599.771429l566.857143 362.057142c51.2 32.914286 120.685714-7.314286 120.685714-76.8V160.914286c0-65.828571-65.828571-109.714286-120.685714-76.8L340.114286 446.171429c-54.857143 36.571429-54.857143 120.685714 0 153.6z" fill="#629cf3" p-id="4027"></path><path d="M43.885714 596.114286L654.628571 987.428571v-87.771428L62.171429 519.314286 654.628571 138.971429V36.571429L43.885714 427.885714c-58.514286 36.571429-58.514286 131.657143 0 168.228572z" fill="#c3dbff" p-id="4028"></path></svg></div>
                                </div>
                                <div className="projectCard_container">
                                    <div className="card_backGround"></div>
                                    <Carousel draggable={false} ref={cardRef}
                                    >
                                        {
                                            projects.map((v, i) =>
                                                <ProjectCard title={v.title} imgSrc={v.imgSrc} introducition={v.introducition} key={'ProjectsCard' + i}></ProjectCard>
                                            )
                                        }
                                    </Carousel>
                                </div>
                                <div className="myArrow nextArrow" onClick={goNext}>
                                    <div><svg t="1645778199033" className="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="5489" width="7vw" height="7vh"><path d="M683.885714 424.228571L120.685714 62.171429C65.828571 29.257143 0 69.485714 0 138.971429v724.114285c0 65.828571 65.828571 109.714286 120.685714 76.8l566.857143-362.057143c51.2-36.571429 51.2-120.685714-3.657143-153.6z" fill="#629cf3" p-id="5490"></path><path d="M980.114286 427.885714L369.371429 36.571429v87.771428l596.114285 380.342857-596.114285 380.342857V987.428571l610.742857-391.314285c58.514286-36.571429 58.514286-131.657143 0-168.228572z" fill="#c3dbff" p-id="5491"></path></svg></div>
                                </div>
                            </div>
                            <div className="moreProject" onClick={moreProjects}>
                                {/* <p>点击查看更多优秀项目</p> */}
                                <div className="pointersBox">
                                    <span className="pointer_projects chevron"></span>
                                    <span className="pointer_projects chevron"></span>
                                    <span className="pointer_projects chevron"></span>
                                </div>
                            </div>
                        </div>
                        <div className="projectList_page hideBottomPage" ref={ListPageRef}>
                            <div className="backLastPage" >
                                {/* <div><span onClick={backProjects}>返回上一页</span></div> */}
                                <div className="clickBox" onClick={backProjects}>
                                </div>
                                <div className="pointersBox">
                                    <span className="pointer_projects chevron" onClick={backProjects}></span>
                                    <span className="pointer_projects chevron" onClick={backProjects}></span>
                                    <span className="pointer_projects chevron" onClick={backProjects}></span>
                                </div>
                            </div>
                            <div className="listBox">
                                <div className="itemBox_left">
                                    {
                                        projectsList.map((v, i) =>
                                            i < projectsList.length / 2 ? <div className={currentListItem === i ? 'projectItem currentItem' : 'projectItem'} key={'projectList' + i} onClick={() => checkProjectListItem(i)}>{v.title}</div> : ''
                                        )
                                    }
                                </div>
                                <div className="infoCard">{ListPageInfo}</div>
                                <div className="itemBox_right">
                                    {
                                        projectsList.map((v, i) =>
                                            i >= projectsList.length / 2 ? <div className={currentListItem === i ? 'projectItem currentItem' : 'projectItem'} key={'projectList' + i} onClick={() => checkProjectListItem(i)}>{v.title}</div> : ''
                                        )
                                    }
                                </div>
                            </div>
                        </div>
                    </div>
            }
        </div>
    );
}

export default Projects;

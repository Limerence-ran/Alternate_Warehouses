import { React, useRef, useEffect, useState } from 'react'
import AwardCard from '../components/AwardCard'
import '../assets/styles/Awards.scss'
import { awards } from '../data/awards'


function Awards() {

    const showPageRef = useRef();
    const ListPageRef = useRef();
    const wholePageRef = useRef();

    const [awardsisMobile, setawardsisMobile] = useState(false);

    useEffect(() => {
        let ua = navigator.userAgent;
        // console.log(ua.includes('Android'));
        if (ua.includes('Android')||ua.includes('iPhone')||ua.includes('iPad')) {
            setawardsisMobile(true);
        }else if(wholePageRef.current.clientWidth<900){
            setawardsisMobile(true);
        }
    }, [])

    function moreAwards() {
        // console.log('切换到更多奖项');
        showPageRef.current.className += ' hideTopPage';
        ListPageRef.current.className = 'awardList_page currentPage';
    }

    function backAwards() {
        // console.log('切换到奖项展示');
        showPageRef.current.className = 'awardShow_page';
        ListPageRef.current.className = 'awardList_page hideBottomPage';
    }


    return (
        <div className="ct-page awards" ref={wholePageRef}>
            <p className='awardstitle'>优秀奖项</p>
            {
                awardsisMobile ?
                    <div className="mb_award">
                                                <div>
                            <div className="mb-introduction">
                                <p>团队成立至今，获得各类科技竞赛240余项，其中国家级奖项33项，省级奖项130项，承担大学生创新创业训练计划（国家级）、广东省大学生科技创新培育专项资金（重点）等各类科技项目50项，申请专利和软件著作权等成果40余项。</p>
                            </div>
                            <div className="mb-list">
                                {
                                    awards.map((v, i) =>
                                        i < 4 ?
                                            <div className="mb-listItem" key={'mb-listItem' + i}>
                                                <div className="mb-itemTitle">
                                                    <p >{v.bottomContent}</p>
                                                </div>
                                            </div> : ''
                                    )
                                }
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
                    <div className="pc_award">
                        <div className="awardShow_page" ref={showPageRef}>
                            <div className="awardBox">
                                <AwardCard classname="awardCards" topContent='2017年 荣获称号' bottomContent='大学生"小平科技创新团队"' />
                            </div>
                            <div className="awardIntroduction">
                                <p>QG 科技创新团队承担大学生创新创业训练计划（国家级）、广东省大学生科技创新培育专项资金（重点）、广州市创新创业教育项目等各类学生科技项目50多项，申请专利和软件著作权等成果50余项，获得国家、省、校级各类科技竞赛奖项290余项，其中国家级奖项56项，省级以上奖项150多项。</p>
                            </div>
                            <div className="moreAwards" onClick={moreAwards}>
                                {/* <p>点击查看更多优秀奖项</p> */}
                                <div className="pointersBox">
                                    <span className="pointer_awards chevron"></span>
                                    <span className="pointer_awards chevron"></span>
                                    <span className="pointer_awards chevron"></span>
                                </div>
                            </div>
                        </div>
                        <div className="awardList_page hideBottomPage" ref={ListPageRef}>
                            <div className="backLastPage" >
                                {/* <div><span onClick={backAwards}>返回上一页</span></div> */}
                                <div className="pointersBox" onClick={backAwards} >
                                    <span className="pointer_awards chevron"></span>
                                    <span className="pointer_awards chevron"></span>
                                    <span className="pointer_awards chevron"></span>
                                </div>
                            </div>
                            <div className="listBox">
                                <div className="listFlex">
                                    <div className='awardsLine'>
                                        {
                                            awards.map((v, i) => {
                                                if (i < 3) return (
                                                    <AwardCard classname="awardCards" topContent={v.topContent} bottomContent={v.bottomContent} levelContent={v.levelContent} key={'AwardsCard' + i} />
                                                )
                                            })
                                        }
                                    </div>
                                    <div className='awardsLine'>
                                        {
                                            awards.map((v, i) => {
                                                if (i >= 3) return (
                                                    <AwardCard classname="awardCards" topContent={v.topContent} bottomContent={v.bottomContent} levelContent={v.levelContent} key={'AwardsCard' + i} />
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className="toQG">
                                <span>
                                    更多奖项详情请访问
                                    <a href="https://qgailab.com" target={'_blank'}>QG官网</a>
                                </span>
                            </div>
                        </div>
                    </div>
            }


        </div>
    );
}

export default Awards;



import { useState,useEffect, useRef } from 'react';
import { useLocation ,useNavigate} from 'react-router-dom';
import { DetailReq } from '../request/api';
import { check } from '../utils/checkToken';
import '../assets/styles/Detail.css'
import { message, Modal } from 'antd';

const getTableUrl = `newer/getNewer/`  // {wid}
const getOneUrl = `resume/getNewerResume/` // 查询简历信息 {wid}

export default function Detail(props){
 
    const location = useLocation()
    const [req] = useState(1);
    const [studentData,setStudentData] = useState();
    const [tableData,setTableData] = useState();
    const navigate = useNavigate()

  


    // 获取数据
    useEffect(() => {
        if (req === 1) {
            if (!location.state) {
                let secondToGo = 3;
                const modal =  Modal.warning({
                    title:`请通过正常入口进入！${secondToGo}秒后跳转至报名信息页`,
                    onOk() {
                        navigate("/signup")
                    }
                })
                const timer = setInterval(() => {
                    secondToGo -= 1;
                    modal.update({
                        title: `请通过正常入口进入！${secondToGo}秒后跳转至报名信息页`
                    })
                },1000)
                setTimeout(() => {
                    clearInterval(timer);
                    modal.destroy();
                    navigate("/signup")
                },secondToGo * 1000)  
            } else {
                const {wid} = location.state;
                console.log('location.state', location)
                // 获取表格信息
                DetailReq.getTableData(getTableUrl+wid) 
                    .then(res => res.data)
                    .then(res => {
                        console.log(res)
                       setTableData(res);
                    })
                    .catch(e => {
                        message.destroy();
                        message.error({
                            content: "出现未知错误！请查看控制台",
                            duration: 2
                        })
                        throw(e)
                    })
                DetailReq.getOnesData(getOneUrl+wid)
                    .then(res => res.data)
                    .then(res => {
                      
                       setStudentData(res)
                    })
                    .catch(e => {
                        message.destroy();
                        message.error({
                            content: "出现未知错误！请查看控制台",
                            duration: 2
                        })
                        throw(e)
                    })
            }
        }
    },[req]);

    return(
        <>
          <div id="detail-wrapper">
            <header>个人信息</header>
            <div id="detail-main">
               <div id="detail-ct">
                  
                   <div id="detail">
                       <div id="basic-wrapper" >
                            <div className="name">姓名：<span className='name-ct'>{tableData?.newerName}</span></div>
                           <div className="name">年龄：<span className='name-ct'>{studentData?.newerAge}</span></div>
                           <div className="name">C实验成绩：<span className='name-ct'>{studentData?.newerScoreCe}</span></div>
                           <div className="name">性别：<span className='name-ct'>{tableData?.sex}</span></div>
                           <div className="name">宿舍：<span className='name-ct'>{studentData?.newerDorm}</span></div>
                           <div className="name">英语(1)成绩：<span className='name-ct'>{studentData?.newerS_scoreE}</span></div> 
                           <div className="name">应征部门：<span className='name-ct'>{tableData?.newerGroup}</span></div>
                           <div className="name">上学期绩点排名：<span className='name-ct'>{studentData?.newerRank}</span></div>
                           {/* <div className="name">大一上绩点：<span className='name-ct'>{studentData?.newerGpa}</span></div> */}
                           {/* <div className="name">年级：<span className='name-ct'>2021级</span></div> */}
                           <div className="name">班级职务：<span className='name-ct'>{studentData?.newerDuty}</span></div>
                           {/* <div className="name">邮箱：<span className='name-ct'>{tableData?.newerQQNumber+'@qq.com'}</span></div> */}
                           <div className="name">专业班级：<span className='name-ct'>{tableData?.newerClass}</span></div>
                           <div className="name">是否挂科：<span className='name-ct'>{studentData?.newerFail}</span></div>
                           <div className="name">手机：<span className='name-ct'>{tableData?.newerPhone}</span></div>
                           <div className="name">学号：<span className='name-ct'>{tableData?.newerStudentId}</span></div>
                           <div className="name">C理论成绩：<span className='name-ct'>{studentData?.newerScoreC}</span></div>
                           {/* <div className="name">QQ：<span className='name-ct'>{tableData?.newerQQNumber}</span></div> */}
                       </div>
                        <div id="other-wrapper">
                            <div className='other'>其他学生科技社团、班级职务情况：<div className='name-ct'>{studentData?.newerTeams}</div></div>
                            {/* <div className='classmate'>是否组队报名，填写同组同学姓名(限3人)：<div className='name-ct'>{studentData?.newerTeammate}</div></div> */}
                        </div>
                        <div id="self-wrapper">
                            <div className="hobby">
                                <span>爱好：</span>
                                <div className='name-ct'>{studentData?.newerHobby}</div>
                            </div>
                            <div className="motto">
                                <span>座右铭：</span>
                                <div className='name-ct'>{studentData?.newerMotto}</div>
                            </div>
                        </div>
                        <div id="bigIntro-wrapper">
                            <div className="experence">
                                <p>奖惩情况和实践经历：（社会实践或计算机相关技术学习掌握情况）</p>
                                <div className='name-ct'>{studentData?.newerSelf}</div>
                            </div>
                            <div className="selfCom">
                                <p>自我评价：</p>
                                <div className='name-ct'>{studentData?.newerExp}</div>
                            </div>
                            <div className="example">
                                <p>简述能体现你四个方面的一件事： (1) 善于协作 (2) 刻苦努力 (3) 甘于奉献 (4) 持之以恒</p>
                                <div className='name-ct'>{studentData?.newerExample}</div>
                            
                            </div>
                            <div className="sumAndWhy">
                                <p>请说一下大学四年的个人规划以及为什么希望加入QG工作室：</p>
                                <div className='name-ct'>{studentData?.newerPlan}</div>
                            </div>
                        </div>
                   </div>
           
               </div>
            
            </div>
          </div>
        </>
    )
}
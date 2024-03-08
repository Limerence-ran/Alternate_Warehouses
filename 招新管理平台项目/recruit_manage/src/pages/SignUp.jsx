import { Outlet ,useLocation,useNavigate} from "react-router-dom";
import { useState,useEffect } from "react";
import { Button,Input } from "antd";
import MyNavLink from "../components/MyNavLink";
import MyTable from "../components/MyTable";
import MySelect from "../components/Select";
import { SignupReq } from "../request/api";
import { check, checkToken } from "../utils/checkToken";
import {Modal} from "antd";
import { ExclamationCircleOutlined } from '@ant-design/icons';
import "../assets/styles/SignUp.scss"
import PubSub from "pubsub-js";
import { message } from "antd";
import { columns,facultyData,groupData,rStatusData } from "../data/signData";
const {Search} = Input;

// 请求路径
const getAllUrl = `newer/showAllNewer/`,max = `/15`;// {currentPage}/{max}
const searchUrl = `newer/searchMessageByNameOrNumOrClass/` // {condition}/{current}/{max} 
const userName = window.sessionStorage.getItem('platformUserName')  // 当前用户名
const delUrl = `newer/deleteNewer/${userName}/` // {number}
const screenUrl = `newer/selectBaseMessage/`  // 计算机学院/后台组/未查看/{current}/{max}


// 表格数据
const data = [];


// 点击修改，跳转
let updateClick = (e, navigate, setOpId, wid) => {
    let opId = e.target.parentNode.parentNode.children[3].innerHTML;
    console.log(wid)
    setOpId(opId);
    navigate("/signup/update",{state: {wid}})
}

// 点击详细，跳转
let detailClick = (e,navigate,wid) => {
    // let opId = e.target.parentNode.parentNode.children[3].innerHTML;
    console.log(wid)
    navigate("/signup/detail", { state: { wid }})
}

// 出现删除确认框
let showConfirm = (e,visible,setVisible,setDeleteId,setDataKind,wid) => {
    setVisible(true);
    Modal.confirm({
        title: "删除确认",
        icon: <ExclamationCircleOutlined />,
        content: "确定要删除吗？",
        okText: "确认",
        cancelText: "取消",
        visible: visible,
        centered: true,
        onOk:() => onDelete(e,setVisible,setDeleteId,setDataKind,wid),
        onCancel:() => hideModel(setVisible)
    })
}

// 点击取消删除
let hideModel = (setVisible) => {
    setVisible(false)
}
// 点击确认删除
let onDelete  = (e,setVisible,setDeleteId,setDataKind,wid) => {
    setVisible(false)
    // 删除当前行的数据
    let delId = e.target.parentNode.parentNode.children[3].innerHTML;
    setDataKind(3);
    setDeleteId(wid);
}

 // 模糊搜索请求
 let handleSearch = (value,setCurPage,setSearchValue,setDataKind) => {
    if (value.trim()) {
        setCurPage(1);
        setSearchValue(value);
        setDataKind(1);
    } else {
        message.destroy();
        message.warning({
            content: "您输入的内容为空！",
            duration: 2
        })
    }
}

// 点击筛选
let handleScreen = (setCurPage,setDataKind,setScreenClk) => {
    setCurPage(1);
    setDataKind(2);
    setScreenClk(1);
}

// 详情和修改按钮的顶部标签
let detailhtml = <MyNavLink to="/signup/detail" className={({ isActive }) => "log-link" + (isActive ? " active" : "")}>详细信息</MyNavLink>    
let updatehtml = <MyNavLink to="/signup/update" className={({ isActive }) => "log-link" + (isActive ? " active" : "")}>修改</MyNavLink>    
 
export default function SignUp(){
    // 嵌套路由必须在父组件的最后加上<Outlet/>，否则无法正确匹配底下子路由
    // 监听当前路由，如果是在表格页则渲染表格jsx，否则为占位符
    let {pathname} = useLocation();
    const [visible,setVisible] = useState(false);   // 提示框
    const [dataSource,setDataSource] = useState(data);  // 表格数据
    const [loading,setLoading] = useState(true); // 请求状态
    const [total,setTotal] = useState(); // 数据总数
    const [curPage,setCurPage] = useState(1); // 当前页
    const [dataKind,setDataKind] = useState(0); // 当前展示的数据类型  0:所有数据 1:模糊搜索数据 2:筛选数据
    const [searchValue,setSearchValue] = useState(); // 搜索框数据
    const [faculty,setFaculty] = useState('全部'); // 学院
    const [group,setGroup] = useState('全部'); // 组别
    const [rStatus,setRstatus] = useState('全部'); // 查看状态
    const [screenClk,setScreenClk] = useState();  // 点击状态
    const [deleteId,setDeleteId] = useState();  // 要删除的
    const [opId,setOpId] = useState();   // 正在操作的学生id
    const navigate = useNavigate();



    // 监听变化
    useEffect(() => {
        // 页码
        PubSub.subscribe("currentPage",(msg,data) => {
            console.log(curPage)
            setCurPage(data);
        })

        // 选择器
        PubSub.subscribe("selectitem",(msg,data) => {
            let type1 = data.split(":")[0]
            let type = type1.slice(0,5);
            let value = data.split(":")[1]
            switch(type) {
                case 'facul': {
                    setFaculty(value);
                    break;
                }
                case 'group': {
                    setGroup(value);
                    break;
                }
                case 'rStat': {
                    
                    setRstatus(value);
                    break;
                }
                default:;
            }
        })
    },[]);

   useEffect(() => {
        let check1 = async () => {
            let result = await check(navigate);
            if (result === 1) {
                setDataKind(0);
            }
        }
        check1();
   }, [checkToken]);

    // 请求对应数据
    useEffect(() => {
        setLoading(true);
        console.log(dataKind)
        switch(dataKind) {
            
            // 所有数据
            case 0: {  
                SignupReq.getAllData(getAllUrl+curPage+max)
                    .then(res => res.data)
                    .then(res => {
                        console.log('res.records', res.records)
                     res?.records.map((v,i) => {
                        let wid = v.wid
                         console.log(wid)
                         v.index = i;
                         v.key = v.newerId
                         v.operation = <>
                                   <span className="operation-btn operation-btn-detail" onClick={(e) => detailClick(e,navigate,wid)}>详情</span>
                             <span className="operation-btn operation-btn-update" onClick={(e) => updateClick(e, navigate, setOpId, wid)} opid={opId}>修改</span>
                                   <span className="operation-btn operation-btn-delete" onClick={(e) => showConfirm(e,visible,setVisible,setDeleteId,setDataKind,wid)}>删除</span>
                               </>
                    })
                    setTotal(res.total)
                    setDataSource(res.records);
                        console.log('dataSource', dataSource)
                    setLoading(false);
                 })
                 .catch(e => {
                    message.destroy();
                    message.error({
                      content: '出现未知错误！，请查看控制台',
                      duration: 2
                    })
                    throw(e)
                 })
                break;
            }

            // 搜索数据
            case 1: {
                SignupReq.blurSearch(searchUrl+searchValue.trim()+ '/'+curPage+max)
                    .then(res => res.data) 
                    .then(res => {
                        res?.records.map((v,i) => {
                            let wid = v.wid
                            v.index = i;
                            v.key = v.newerId
                            v.operation = <>
                                <span className="operation-btn operation-btn-detail" onClick={(e) => detailClick(e, navigate,wid)}>详情</span>
                                <span className="operation-btn operation-btn-update" onClick={(e) => updateClick(e, navigate, setOpId,wid)} opid={opId}>修改</span>
                                <span className="operation-btn operation-btn-delete" onClick={(e) => showConfirm(e, visible, setVisible, setDeleteId, setDataKind,wid)}>删除</span>
                                  </>
                        })
                        setDataSource(res.records);
                        setTotal(res.total);
                        setLoading(false);
                    })
                    .catch(e => {
                        message.destroy();
                        message.error({
                          content: '出现未知错误！，请查看控制台',
                          duration: 2
                        })
                        throw(e);
                    })
                break;
            }

            // 筛选数据
            case 2: {
             
                    SignupReq.screenSearch(screenUrl+faculty+'/'+group+'/'+rStatus+'/'+curPage+max)
                    .then(res => res.data)
                    .then(res => {
                        res?.records?.map((v,i) => {
                            let wid = v.wid
                            v.index = i;
                            v.key = v.newerId
                            v.operation = <>
                                <span className="operation-btn operation-btn-detail" onClick={(e) => detailClick(e, navigate, wid)}>详情</span>
                                <span className="operation-btn operation-btn-update" onClick={(e) => updateClick(e, navigate, setOpId, wid)} opid={opId}>修改</span>
                                <span className="operation-btn operation-btn-delete" onClick={(e) => showConfirm(e, visible, setVisible, setDeleteId, setDataKind, wid)}>删除</span>
                                  </>
                        })
                        setScreenClk(0);
                        setDataSource(res.records);
                        setTotal(res.total);
                        setLoading(false);
                    })
                   .catch(e => {
                        message.destroy();
                        message.error({
                          content: '出现未知错误！，请查看控制台',
                          duration: 2
                        })
                        throw(e);
                   })
                break;
            }

            // 根据学号删除学生
            case 3: {
                SignupReq.deleteById(delUrl+deleteId)
                   .then(res => res.data)
                   .then(res => {
                        setLoading(false)
                        if (res == true) {
                            message.destroy();
                            message.success({
                                content: "删除成功！",
                                duration: 2
                            })
                            setDataKind(0);
                        } else {
                            message.destroy();
                            message.warning({
                                content: "删除失败！",
                                duration: 2
                            })
                        }
                   })
                   .catch(e => {
                        message.destroy();
                        message.error({
                          content: '出现未知错误！，请查看控制台',
                          duration: 2
                        })
                        throw(e);
                   })
                break;
            }
        }
        
     }, [curPage,dataKind,searchValue,deleteId,screenClk]);
   
   
    return (
        <>
        <div className='link-header'>
            {pathname === "/signup"
            ?<MyNavLink to="" className={({ isActive }) => "link-btn" + (isActive ? " active" : "")}>报名信息</MyNavLink>
            :
            <>
                <MyNavLink to="" className="link-btn-unactive">报名信息</MyNavLink>
                {
                    pathname==="/signup/detail"
                    ?detailhtml
                    :updatehtml
                }
            </>
            
        }
        </div>
         {
             pathname === "/signup"
             ?
             <div id="signup-wrapper">
                <main id="main-wrapper">
                    <div id="nav-wrapper">
                        <div className="blur-search">
                            <Search loading={loading} bordered={false} placeholder="搜索班级，姓名或学号" onSearch={(value) =>handleSearch(value,setCurPage,setSearchValue,setDataKind)} style={{ width: 220 }} />
                        </div>
                        <div className="faculty-filter">
                            <MySelect bordered={false}  options={facultyData} defaultValue={faculty}></MySelect>
                        </div>
                        <div className="group-filter">
                            <MySelect bordered={false}  options={groupData} defaultValue={group}></MySelect>
                        </div>
                        <div className="rStatus-filter">
                            <MySelect bordered={false} options={rStatusData} defaultValue={rStatus}></MySelect>
                        </div>
                        <div className="screen-btn">
                        <Button loading={loading} type="primary" onClick={() => handleScreen(setCurPage,setDataKind,setScreenClk)}>筛选</Button>
                        </div>
                    </div>
                    <MyTable 
                      mykey={dataSource.map(v => v.newerStudentId)}
                      dataSource={dataSource} 
                      columns={columns} 
                      seleted={false}
                      loading={loading}
                      total={total}
                      myCurrent={curPage}
                    ></MyTable>
                  
                </main>
             </div>
             :  <Outlet></Outlet>
         }
         
       
        </>
    )
}
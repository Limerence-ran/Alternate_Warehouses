import '../assets/styles/Log.scss'
import MyTable from '../components/MyTable'
import {SystemTableColumn} from '../data/configdata'
import {Modal,Typography,List,Badge,Button} from 'antd'
import { BellOutlined } from '@ant-design/icons'
import { useState,useEffect } from 'react'
import { LogReq } from '../request/api'
import PubSub from 'pubsub-js'
import {check} from '../utils/checkToken'
import { useNavigate } from 'react-router-dom'
import { useOutletContext } from 'react-router-dom'
import { sysSelect } from '../data/sysData'
import MySelect from '../components/Select'
// 页码 页容量 日志类型  
const { Paragraph,Text } = Typography;

// 表格数据，message消息数据
let data = [], sysMess = [];  
let tempdata = [];
let prevdata = [];


let handleChangeValue = (value,setType) => {
    setType(value)
}

export default function SystemLog(props) {
    const [content,setContent] = useState();
    const [title,setTitle] = useState();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [dataSource,setDataSource] = useState([]);
    const [loading,setLoading] = useState(true)
    const [sysTotal,setSysTotal] = useState();
    const [curPage,setCurPage] = useState(1);
    const [checkToken] = useState();  // 检查标志
    const [getOrigin,setGetOrigin] = useState();  // 获取原数据标志
    const [count,setCount] = useState(0);  // 新增的消息数量
    const [refreshFlag,setRefreshFlag] = useState();  // 标志是否请求新数据
    const [type,setType] = useState('全部');


  

    const systemdata = useOutletContext()[0];
    if(JSON.stringify(systemdata) !== "[]" && prevdata !== systemdata) {
        console.log(11);
        tempdata.push(systemdata);
        prevdata = systemdata;
    }
    const navigate = useNavigate();

     // 验证token
     useEffect(() => {
        let check1 = async () => {
            let result = await check(navigate);
            if (result === 1) {
                setGetOrigin(1);
            }
        }
        check1()
    },[checkToken]);
   

    const showModal = (i) => {  
        // 根据点击的下标，显示对应的系统数据
        let content =  <>
                <p>请求链接：<Text code>{sysMess[i].message[0]}</Text></p>
                <p>所属父类：<Text code>{sysMess[i].message[1]}</Text></p>
                <p>所属方法：<Text code>{sysMess[i].message[2]}</Text></p>
                <p>传入参数：<Text code>{sysMess[i].message[3]}</Text></p>
                <p>信息输出：</p>
                <Paragraph>
                   <List dataSource={sysMess[i].message[4]} renderItem={(item,index) => <List.Item key={index}>{index+1 +'： '+item.trim()}</List.Item>} gutter={5}></List>
                </Paragraph>
                <p>堆栈调用：<Text code>{sysMess[i].message[5]}</Text></p>
                {/* <Paragraph>
                   <List dataSource={sysMess[i].message[5]} renderItem={(item,index) => <List.Item>{index+1 +'： '+item.trim()}</List.Item>} gutter={5}></List>
                </Paragraph> */}
            </>
        let title = `日志详情 ${((curPage-1) * 15) + (i+1)}`;
        setContent(content);
        setTitle(title);
        setIsModalVisible(true);
    }

    // 隐藏提示层
    const handleCancel = () => {
        setIsModalVisible(false);
    }
    
    // 监听页码变化
    useEffect(() => {
        PubSub.subscribe('currentPage',(msg,data) => {
            setCurPage(data);
        })

        let timer = setInterval(() => {
            setCount(tempdata.length);
        },5000)
      
        return ()=>{
           if(timer) clearInterval(timer);
        }
    },[]);

    
    // 检测到了页码/选择器变化，发起新的旧数据请求
    useEffect(() => {
        if (refreshFlag === 1 || curPage || getOrigin === 1) {
            sysMess = [];data = [];
            setLoading(true)
            LogReq.getOriginSysLog(curPage-1,type)
            .then(res => {
                setLoading(false);
                setSysTotal(res.data.sysTotal);
                res.data.data.map((v,i) => {
                   if (v.type == 100) {  // 系统日志
                   let item = {};
                   item.key = v.id;
                   item.serial = ((curPage-1) * 15) + (i+1);
                   item.operation = <span className='operation-btn operation-btn-detail' onClick={()=>showModal(i)}>展开</span>
                   item.date = v.date;
                   item.level = v.level;
                   item.message = v.message[4] ? v.message[4][0] : "null";
                   data.push(item);
                   sysMess.push({
                     message: v.message
                   })
                  }
                })
                setRefreshFlag(0);
                setDataSource(data);
            })
        }
    }, [curPage,refreshFlag,getOrigin,type]);

    const refreshData = () => {
        tempdata = [];
        setCount(v=>0);
        setRefreshFlag(v=>1);
        setCurPage(v=>1);
        setType('全部');
        let screen_slt = document.querySelector('.ant-select-selection-item')
        screen_slt.title = '全部'
        screen_slt.innerHTML = '全部'
    }

    return(
        <>
        <div className='log-content'>
                <Modal 
                    key={title}
                    title={title}
                    visible={isModalVisible} 
                    footer={null}
                    onCancel={handleCancel}>
                    {content}
                </Modal>
                <div className="log-header">
                <p>
                    <span style={{marginRight: "20px"}}>系统日志</span>
                    <MySelect bordered={false}  options={sysSelect} defaultValue={type} changeValue={(value) => handleChangeValue(value,setType)}></MySelect>
                </p>
                <div className='refresh-wrapper'>
                <Badge count={count}>
                   <BellOutlined />
                </Badge>  
                <Button type="primary" style={{marginLeft:"20px"}} onClick={refreshData}>刷新日志数据</Button>
                </div>
            </div>
            <MyTable 
               mykey={dataSource.map(v => v.id)}
               seleted={false} 
               columns={SystemTableColumn} 
               dataSource={dataSource} 
               loading={loading} 
               total={sysTotal}
               myCurrent={curPage}
            >
            </MyTable>  
        </div>
        </>
        
    )
}

import '../assets/styles/Home.scss'
import { useNavigate } from 'react-router-dom';
import { Modal } from 'antd';
import { useEffect, useState } from 'react';
import {bindSwipeEventX} from '../utils/listenTouch';
import groupCode from '../assets/images/group-code.png'
// import appcode from 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/app-code.jpg';
// import groupcode from 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/group-code.png';
function Home() {
    const navigate = useNavigate();
    let [previewTitle,setPreviewTitle] = useState('提示')
    let [previewVisible,setPreviewVisible] = useState(false)
    let [searchText,setSearchText] = useState('点击此处开始探索QG')
    const toIntroduce = ()=>{
        navigate('/introduce')
    }
    const handleCancel = () => {
        setPreviewVisible(v=>false);
    }
    const showCode = (type) => {
        switch(type){
            case "app":
                setPreviewTitle(v=>'招新报名小程序');
                setPreviewVisible(v=>true);
                break;
            case "group":
                setPreviewTitle(v=>'招新咨询群');
                setPreviewVisible(v=>true);
                break;
            default:;
          }
    }
    useEffect(() => {
        if(document.documentElement.clientWidth < 940){
            setSearchText('左滑开始探索QG');
            let home = document.querySelector('.home');
            bindSwipeEventX(home,1000,() => {},() => {
                navigate('/introduce');   
            })
        } 
        // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])
    return (
        <div className='ct-page home'>
            <Modal
                  visible={previewVisible}  //true 出现
                  title={previewTitle}  //放状态${this.state.previewTitle}
                  footer={null}
                  onCancel={handleCancel}
            >
                {/* <img id="ph" src={previewTitle === "招新报名小程序"?'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/app-code.jpg':'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/group-code.png'} alt="" /> */}
                <img id="ph" src={previewTitle === "招新报名小程序"?'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/app-code.jpg' : groupCode} alt="" />
            </Modal>
            <div className="large-logo-ct">
            <div className="large-logo"></div>
            <div className="search">
                <span className="pointers"  style={{display:searchText==='左滑开始探索QG'?'none':'inline'}} children='>'></span>
                <span className="pointers"  style={{display:searchText==='左滑开始探索QG'?'none':'inline'}} children='>'></span>
                <span className="pointers"  style={{display:searchText==='左滑开始探索QG'?'none':'inline'}} children='> '></span>
                <span onClick={toIntroduce}> {searchText} </span>
                <span className="pointers" children=' <'></span>
                <span className="pointers" children='<'></span>
                <span className="pointers" children='<'></span>
            </div>
            </div>
            <div className="code-ct">
                <div className="code" onClick={()=>showCode("group")}><span>欢迎加入招新咨询群</span></div>
                <div className="code" onClick={()=>showCode('app')}><span>招新报名小程序</span></div>
            </div>
        </div>
    );
}

export default Home;

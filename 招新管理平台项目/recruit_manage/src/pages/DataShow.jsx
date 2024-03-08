import React, { PureComponent } from 'react'
import { message } from 'antd'
import { Navigate } from 'react-router-dom'
import Title from '../components/Title'
import ChartBox from '../components/ChartBox'
import '../assets/styles/DataShow.scss'
import { ChartReq } from '../request/api';
import { checkClass } from '../utils/checkToken'


const successMessage = {
  content:"加载完成！",
  durantion:1.5
}


let loadingkey = "loadChart";

  
export default class Datashow extends PureComponent {

    // 各类图表数据
    state={
        sex:[],
        group:[],
        college:[],
        writtenTest:[],
        firstInterview:[],
        secondInterview:[],
        isReplace:false
    }
    // 获取图表信息，调接口
    async GetData(){
        let Chartdata;
        await ChartReq.getChartData().then((res) => {
            const {data} = res;
            Chartdata = data;
        }).catch((error) => {
            return null;
        })
        return Chartdata;
    }
    // 获取图标信息入口
    async GetDataTop (){
        message.loading( {content:"正在加载...", duration:1.5,key:loadingkey});
        
        let data = await this.GetData();
        if(data && data.length !== 0) {
        // message.destroy();
        message.success({...successMessage,key:loadingkey});
            this.showChart(data);
            return 1;
        }else{
            //message.destroy();
            //message.error({...errorMessage,key:loadingkey});
            return 0;
        }
    }
    
    // 传数据，一次性修改state
    showChart(data) {
        let {collegePercent,sexPercent,groupPercent,writtenTest,firstInterview,secondInterview} = data;
        this.setState({college:collegePercent,sex:sexPercent,group:groupPercent,writtenTest,firstInterview,secondInterview});
    }
    // 判断登录状态后获取信息
    componentDidMount(){
        checkClass(this).then(res=>{
            if(!res) return;
            else {
                this.GetDataTop();
            }
        })
        
    }

    render() {
        const {isReplace,sex,group,college,writtenTest,firstInterview,secondInterview} = this.state;
        return (
            <>
            {
                isReplace?<Navigate to="/login"></Navigate>:<></>
            }
            <Title title="数据统计"></Title>
            <ChartBox title="报名人数男女比例" size="mid" container="ct-sex" isSelect={true} data={sex}/>
            <ChartBox title="各组人员数量统计" size="large" container="ct-population" isSelect={false} data={group}/>
            <ChartBox title="报名人数学院" size="mid" container="ct-college" isSelect={false} data={college}/>
            <ChartBox title="笔试通过状态" size="small" container="ct-test" isSelect={false} data={writtenTest}/>
            <ChartBox title="一轮通过状态" size="small" container="ct-interview1" isSelect={false} data={firstInterview}/>
            <ChartBox title="二轮通过状态" size="small" container="ct-interview2" isSelect={false} data={secondInterview}/>
            
          </>
        )
    }
}
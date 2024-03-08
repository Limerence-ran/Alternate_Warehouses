import { Button, Input, message, Modal } from "antd"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import '../assets/styles/Result.scss'
import MySelect from '../components/Select'
import PubSub from "pubsub-js"
import { Groups } from '../data/configdata'
import { College, TestType, Pass, Notice } from '../data/resultData'
import { columns } from '../data/resultData'
import Title from "../components/Title"
import MyTable from "../components/MyTable"
import { useState } from "react"
import { check } from "../utils/checkToken"
import MyForm from "../components/MyForm"
import { TableReq } from '../request/api'
const { Search } = Input


let tempop = -1;
let tempindex = -1;
let tabledataTemp = [];
export default function Result(props) {
    const [tabledata, setTabledata] = useState([]);   // 表格数据
    const [isModalVisible, setIsModalVisible] = useState(false); // modal是否显示
    const [modalcontent, setModalcontent] = useState(false);    // modal内容
    const [operation, setOperation] = useState({ op: -1, index: -1 });// 操作数和操作对象（可以是数组），可以多一个updateData为更新内容，用于静态更新数据
    // 选择器id
    const [group, setGroupSelect] = useState(Groups[0].value);
    const [college, setCollege] = useState(College[0].value);
    const [round, setRound] = useState(TestType[0].value);
    const [isPass, setIsPass] = useState(Pass[0].value);
    const [isNotice, setIsSend] = useState(Notice[0].value);
    const [formData, setFormData] = useState({});
    // 成绩输入框内容
    const [batchGrade, setBatchGrade] = useState(0);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // 设置成绩
    const handleBatchInput = (data) => {
        setBatchGrade(value => parseInt(data.target.value, 10));
    }
    // 通过，打分合法性检测
    const checkInput = (value) => {
        if (!value || Number.isNaN(value)) {
            message.warning({ content: "请输入数字！" })
            return 0;
        }
        else if (value > 100 || value < 0) {
            message.warning({ content: "请输入0 ~ 100 内的数字！" })
            return 0;
        }
        return 1;
    }
    // 获取对应学生的信息，解析为表单数据
    const getSendData = (data) => {
        let { isPass, examEvalCharacter, scoreCharacter, examEvalStudy, scoreStudy, examEvalBasic, scoreBasic, examScoreAll } = data;
        let grade1 = {
            assess: examEvalCharacter,
            score: !scoreCharacter ? 0 : scoreCharacter
        };
        let grade2 = {
            assess: examEvalStudy,
            score: !scoreStudy ? 0 : scoreStudy
        };
        let grade3 = {
            assess: examEvalBasic,
            score: !scoreBasic ? 0 : scoreBasic
        };
        return { isPass, grade1, grade2, grade3, examScoreAll };
    }

    const getKeyIndex = (key, data) => {
        for (let i = 0; i < data.length; i++) {
            if (data[i].resultId === key) return i;
        }
        return -1;
    }
    // 批量录入成绩的输入框
    const conditionInput = <Input placeholder="请输入0 ~ 100 内的数字！" onChange={handleBatchInput}></Input>
    // 根据操作数设置modal内容
    const SetModalContent = (op) => {
        if (op === -1) return;
        switch (op) {
            // 0\4是删除和批量删除
            case 0:
            case 4: setModalcontent(value => <p>确定要删除吗？</p>); break;
            // 1 是打分
            case 1: setModalcontent(value => conditionInput); break;
            // 2 是通过考试
            case 2: setModalcontent(value => <p>确定要通过吗？</p>); break;
            // 3 评价
            case 3: setModalcontent(value => {
                let index = getKeyIndex(tempindex, tabledataTemp);
                if (index === -1) return;
                // 根据id获取对应数据，并处理为表单数据
                let data = tabledataTemp[index];
                let senddata = getSendData(data);
                return (
                    <div className="modal-content-update">
                        <p><span className="bold-title">姓名：</span>{data.newerName}</p>
                        <p><span className="bold-title">轮次：</span>{data.examRound}</p>
                        <MyForm getFormData={getFormData} senddata={senddata} examRound={data.examRound}></MyForm>
                    </div>
                )
            }); break;
            // 发送通知
            case 5: setModalcontent(value => <p>确定要发送吗？</p>); break;
            default: ;
        }
    }

    // 打开modal
    const showModal = (op) => {
        tempop = op;            // 暂存操作数
        SetModalContent(op);
        setIsModalVisible(true);
    }
    // 点击ok的回调
    const handleOk = () => {
        console.log(tempop)
        if (tempop === 3) {
            // 发给MyForm说我好了
            PubSub.publish("submit", 1);
        }
        // 删除
        else if (tempop === 1) {
            if (checkInput(batchGrade)) {
                SendOperation(tempop, 6, batchGrade);
                setIsModalVisible(false);
            }
        }
        // 通过
        else if (tempop === 2) {
            SendOperation(tempop, 7, "已通过");
            setIsModalVisible(false);
        }
        else {
            SendOperation(tempop, tempindex);      // 存此次操作数
            setIsModalVisible(false);
        }
    }
    // 点击取消的回调
    const handleCancel = () => {
        setIsModalVisible(false);
        tempop = -1;        // 点取消就重置
    }
    // 重置操作数
    const resetOperation = () => {
        setOperation(value => ({
            op: -1,
            index: null
        }));
        tempindex = -1;
        tempop = -1;
    }
    // 搜索
    const onSearch = (message) => {
        if (!message) {
            getAllResult();
            return;
        }
        // 发送请求
        let param = {
            message,
            current: 1,
            max: 2147483640
        }
        setLoading(true)
        TableReq.search(param).then((data) => {
            console.log(data)
            tabledataTemp = handleTableData(data.data.records)
            setTabledata(value => tabledataTemp);
            setLoading(false)
        })
    }

    // 设置操作数和数据
    const SendOperation = (op, index, newdata) => {
        if (op !== -1) {
            setOperation(value => ({
                op,
                index: index === -1 ? null : index,
                updatedata: !newdata ? undefined : newdata
            }));

        }
    }

    // 重置操作数
    const ResetOp = (reset, setOp) => {
        if (reset === 1) resetOperation();
        setLoading(false)
    }
    // 三个评价信息拼接起来
    const concatAssess = (data) => {
        data.map(v => v.assess = <><p>{v.examEvalCharacter}</p><p>{v.examEvalStudy}</p><p>{v.examEvalBasic}</p></>)
        return data;
    }
    // 刷新信息
    const ResetData = (data) => {
        setLoading(true)
        concatAssess(data);
        setTabledata(value => data)
        setLoading(false)
    }

    // 转表单数据为表格数据
    const turnFormDataToTb = (sourcedata) => {
        let data = {}
        let { pass, grade1, grade2, grade3, totalscore } = sourcedata;
        data.isPass = pass;
        data.examScoreAll = totalscore;
        data.scoreCharacter = grade1.score;
        data.examEvalCharacter = grade1.assess;
        data.scoreStudy = grade2.score;
        data.examEvalStudy = grade2.assess;
        data.scoreBasic = grade3.score;
        data.examEvalBasic = grade3.assess;
        return data;
    }

    // 接收子组件传来的表单数据
    const getFormData = (data) => {
        console.log(data, 666);
        if (data.length !== 0) {
            data = turnFormDataToTb(data);
            setFormData(value => data);
            if (tempop === 3) SendOperation(tempop, tempindex, data);  // 如果当前处于更新操作,则发送操作数给表格
            setIsModalVisible(false);
        } else {
            message.warning({ content: "请输入正确的信息!", duration: 1 });
        }
    }
    // 更新一条数据
    const updateOne = (index) => {
        tempop = 3;
        tempindex = index;
        showModal(3);
    }
    // 删除一条数据
    const deleteOne = (index) => {
        tempindex = index;
        showModal(4, index)
    }

    // 筛选
    const filterate = () => {
        let condition = {
            college: college === "全部" ? undefined : college,
            round,
            group: group === "全部" ? undefined : group,
            isPass,
            isNotice,
            current: 0,
            max: 2147483640,
            sort: ""
        }
        setLoading(true);
        // 发请求
        TableReq.filter(condition).then((data) => {
            tabledataTemp = handleTableData(data.data.records)
            setTabledata(value => tabledataTemp);
            setLoading(false)
        })
    }
    // 发送通知
    const sendNotice = () => {
        tempop = 5;
        showModal(5);
    }
    // 设置选择器id
    const sendvalue = (type, value) => {
        switch (type) {
            case 1: setCollege(n => value); break;
            case 2: setGroupSelect(n => value); break;
            case 3: setRound(n => value); break;
            case 4: setIsPass(n => value); break;
            default: setIsSend(n => value);
        }
    }

    // 获取所有数据
    const getAllResult = () => {
        let param = {
            current: 1,
            max: 2147483640
        }
        setLoading(true)
        TableReq.getAllData(param).then(data => {
            let temp = data.data.records;
            console.log('temp', temp)
            temp = handleTableData(temp);
            setTabledata(value => temp);
            tabledataTemp = temp;
            setLoading(false)
        })
    }

    // 处理接收到的数据以显示在表格中
    const handleTableData = (data) => {
        if (!data) return [];
        data.map((v, i) => {
            let { newer } = v;
            Object.assign(v, newer);     // 拆出学生信息
            v.assess = <><p>{v.examEvalCharacter}</p><p>{v.examEvalStudy}</p><p>{v.examEvalBasic}</p></>
            v.operation = <><span className="operation-btn operation-btn-update" onClick={() => updateOne(v.resultId)}>修改</span>
                <span className="operation-btn operation-btn-delete" onClick={() => deleteOne(v.resultId)}>删除</span></>
        })
        return data;
    }

    useEffect(() => {
        check(navigate).then(res => {
            console.log(res)
            if (!res) return
            else {
                getAllResult();
            }
        })


    }, [])


    return (
        <>
            <Modal title="提示" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                {modalcontent}
            </Modal>
            <Title title="考试结果"></Title>
            <div className="result-ct">
                <div className="result-header">
                    <Button type="primary" onClick={() => showModal(0)}>删除</Button>
                    <Button type="primary" onClick={() => showModal(1)}>批量录入</Button>
                    <Button type="primary" onClick={() => showModal(2)}>批量通过</Button>
                    <Search bordered={false} placeholder="姓名/学号/学院/组别" loading={loading} onSearch={onSearch} style={{ width: 190, height: 32 }} />
                    <MySelect sendvalue={(value) => sendvalue(1, value)} bordered={false} options={College} defaultValue="全部"></MySelect>
                    <MySelect sendvalue={(value) => sendvalue(2, value)} bordered={false} options={Groups} defaultValue="全部"></MySelect>
                    <MySelect sendvalue={(value) => sendvalue(3, value)} bordered={false} options={TestType} defaultValue="笔试"></MySelect>
                    <MySelect sendvalue={(value) => sendvalue(4, value)} bordered={false} options={Pass} defaultValue="未面试"></MySelect>
                    <MySelect sendvalue={(value) => sendvalue(5, value)} bordered={false} options={Notice} defaultValue="已通知"></MySelect>
                    <Button type="primary" loading={loading} onClick={filterate}>筛选</Button>
                    <Button type="primary" loading={loading} onClick={sendNotice}>发送通知</Button>
                </div>

                <MyTable
                    ResetOp={() => ResetOp(1, setOperation)}
                    ResetData={ResetData}
                    dataSource={tabledata}
                    columns={columns}
                    total={tabledata.total}
                    operation={operation}
                    loading={loading}
                />
            </div>
        </>
    )
}



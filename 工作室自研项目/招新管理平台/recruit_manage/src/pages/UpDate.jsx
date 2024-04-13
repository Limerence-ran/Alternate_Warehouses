import MyInput from "../components/MyInput";
import MyTextarea from "../components/MyTextarea";
import Select from "../components/Select";
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Button, message } from "antd";
import {
    sex,
    group,
    grade,
    inputSize_150,
    inputSize_96,
    inputSize_200,
    inputSize_590,
    textSize_1000,
    textSize_500,
} from "../data/updateData";
import { UpdateReq, DetailReq } from "../request/api";
import { replaceStr } from "../utils/checkForm";
import "../assets/styles/Update.css";
import { Modal } from "antd";
import { ExclamationCircleOutlined } from "@ant-design/icons";

const getTableUrl = `newer/getNewer/`; // {number}
const getOneUrl = `resume/getNewerResume/`; // 查询简历信息 {学号}
const userName = window.sessionStorage.getItem("platformUserName"); // 当前用户名
const updateOneUrl = `resume/updateNewerResume/${userName}/`; // {number} ?newerAge=10
const updateSignUrl = `newer/updateNewer/${userName}/`; // {newerId}/{newerName}/{newerFaculty}/{newerClass}/{newerStudentId}/{newerGroup}/{newerPhone}/{newerQQNumber}

// 简历属性名,数组顺序按照表单的获取元素顺序,加了"!"的是报名信息，没有加的是简历信息
const propsName = [
    "！newerName",
    "！newerAge",
    "newerScoreCe",
    "！sex",
    "newerDorm",
    "newerS_scoreE",
    "！newerGroup",
    "newerRank",
    "newerDuty",
    "！newerClass",
    "！newerFail",
    "！newerPhone",
    "newerStudentId",
    "！newerScoreC",
    "newerTeams",
    "newerHobby",
    "newerMotto",
    "newerExp",
    "newerSelf",
    "newerExample",
    "newerPlan",
];
// 报名信息属性名,数组顺序按照表单的获取元素顺序,''的是简历信息
const propsName_ifm = [
    "newerName",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "",
    "newerClass",
    "",
    "newerPhone",
    "",
    "",
    "newerQQNumber",
];
// 选择器属性名
const propsName_slt = ["sex", "newerGroup"];

// 点击提交
let updateClick = async (n, opid, navigate) => {
    let ipt = document.querySelectorAll(".ant-input");
    // console.log('ipt',ipt)
    let slt = document.querySelectorAll(".ant-select-selection-item");
    // console.log('slt', slt)
    let formStr = `?`,
        informStr = `?`;
    console.log(ipt.length);
    for (let i = 0; i < ipt.length; ++i) {
        // if (ipt[i].value != '大一' && ipt[i].value.indexOf("@qq.com") === -1 && propsName[i].indexOf("！") === -1) {
        if (propsName[i].indexOf("！") !== -1) {
        } else {
            formStr += `${propsName[i]}=${replaceStr(ipt[i].value)}&`;
            //  console.log(propsName[i])
            // console.log(replaceStr(ipt[i].value))
        }

        // console.log('formStr',formStr)

        // // }

        if (
            ipt[i].value != "大一" &&
            ipt[i].value.indexOf("@qq.com") === -1 &&
            propsName_ifm[i]
        ) {
            informStr += `${propsName_ifm[i]}=${ipt[i].value}&`;
        }
    }
    console.log("informStr", informStr);
    for (let i = 0; i < slt.length; ++i) {
        informStr += `${propsName_slt[i]}=${replaceStr(slt[i].innerHTML)}&`;
    }
    // console.log(informStr)
    let param = formStr.slice(0, formStr.length - 1);
    let param1 = informStr.slice(0, informStr.length - 1);
    console.log("param,param1", param, param1);
    let result1 = await updateResumeReq(opid, param);
    let result2 = await updateSignReq(opid, param1);

    if (result1 && result2) {
        message.destroy();
        message
            .success({
                content: "修改成功！",
                duration: 2,
            })
            .then(() => navigate("/signup"));
    } else {
        message.destroy();
        message
            .error({
                content: "修改失败！",
                duration: 2,
            })
            .then(() => navigate("/signup"));
    }
};

let hideModel = (setVisible) => {
    setVisible(false);
};

// 修改简历请求
let updateResumeReq = (opid, param) => {
    return new Promise((resolve, reject) => {
        UpdateReq.UpdateOnesData(updateOneUrl + opid + param)
            .then((res) => res.data)
            .then((res) => {
                if (res) resolve(1);
                else reject();
            })
            .catch((e) => {
                message.destroy();
                message.error({
                    content: "出现了未知错误！请查看控制台",
                    duration: 2,
                });
                throw e;
            });
    });
};

// 修改报名信息请求
let updateSignReq = (opid, param1) => {
    return new Promise((resolve, reject) => {
        UpdateReq.UpdateOnesSign(updateSignUrl + opid + param1)
            .then((res) => res.data)
            .then((res) => {
                // console.log(res)
                if (res) resolve(1);
                else reject();
            })
            .catch((e) => {
                message.destroy();
                message.error({
                    content: "出现了未知错误！请查看控制台",
                    duration: 2,
                });
                throw e;
            });
    });
};

// 提交确认框
let showConfirm = (visible, setVisible, opid, navigate) => {
    setVisible(true);
    Modal.confirm({
        title: "提交确认",
        icon: <ExclamationCircleOutlined />,
        content: "确定要提交吗？",
        okText: "确认",
        cancelText: "取消",
        visible: visible,
        centered: true,
        onOk: () => updateClick(setVisible, opid, navigate),
        onCancel: () => hideModel(setVisible),
    });
};

const Update = () => {
    const location = useLocation();
    const [visible, setVisible] = useState(false);
    // const [req] = useState(1);  // 检查成败标志
    const [studentData, setStudentData] = useState();
    const [tableData, setTableData] = useState();
    const [opid, setOpid] = useState();
    const navigate = useNavigate();

    // 获取数据
    useEffect(() => {
        if (!location.state) {
            let secondToGo = 3;
            const modal = Modal.warning({
                title: `请通过正常入口进入！${secondToGo}秒后跳转至报名信息页`,
                onOk() {
                    navigate("/signup");
                },
            });
            const timer = setInterval(() => {
                secondToGo -= 1;
                modal.update({
                    title: `请通过正常入口进入！${secondToGo}秒后跳转至报名信息页`,
                });
            }, 1000);
            setTimeout(() => {
                clearInterval(timer);
                modal.destroy();
                navigate("/signup");
            }, secondToGo * 1000);
        } else {
            const { wid } = location.state;
            setOpid(wid);
            // 获取表格信息
            DetailReq.getTableData(getTableUrl + wid)
                .then((res) => res.data)
                .then((res) => {
                    setTableData(res);
                })
                .catch((e) => {
                    message.destroy();
                    message.error({
                        content: "出现未知错误！请查看控制台",
                        duration: 2,
                    });
                    throw e;
                });
            // 获取简历信息
            DetailReq.getOnesData(getOneUrl + wid)
                .then((res) => res.data)
                .then((res) => {
                    console.log(res);
                    setStudentData(res);
                })
                .catch((e) => {
                    message.destroy();
                    message.error({
                        content: "出现未知错误！请查看控制台",
                        duration: 2,
                    });
                    throw e;
                });
        }
    }, []);

    return (
        <>
            <div id="update-wrapper">
                <header>个人信息</header>
                <div id="update-main">
                    <div id="update-ct">
                        <p id="warn-word">❈以下全为必填，如无请填“无”</p>
                        <div id="update">
                            <div id="basic-wrapper">
                                {/* defaultValue中填后台数据 */}
                                <div className="name">
                                    姓名：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={tableData?.newerName}
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    年龄：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={studentData?.newerAge?.trim()}
                                        type="number"
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    C实验成绩：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={studentData?.newerScoreCe?.trim()}
                                        type="number"
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    性别
                                    <Select
                                        options={sex}
                                        defaultValue={tableData?.sex}
                                    ></Select>
                                </div>
                                <div className="name">
                                    宿舍：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={studentData?.newerDorm}
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    英语(1)成绩：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={studentData?.newerS_scoreE?.trim()}
                                        type="number"
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    应征部门：
                                    <Select
                                        options={group}
                                        defaultValue={tableData?.newerGroup}
                                    ></Select>
                                </div>
                                <div className="name">
                                    上学期绩点排名：
                                    <MyInput
                                        options={inputSize_96}
                                        defaultValue={studentData?.newerRank}
                                        type="number"
                                    ></MyInput>
                                </div>
                                {/* <div className="name">大一上绩点：<MyInput options={inputSize_150} defaultValue={studentData?.newerGpa} type="number"></MyInput></div> */}
                                {/* <div className="name">年级：<MyInput options={inputSize_150} defaultValue="大一"></MyInput></div> */}
                                <div className="name">
                                    班级职务：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={studentData?.newerDuty}
                                    ></MyInput>
                                </div>
                                {/* <div className="name">邮箱：<MyInput options={inputSize_200} defaultValue={tableData?.newerQQNumber ? tableData?.newerQQNumber+'@qq.com': ""}></MyInput></div> */}
                                <div className="name">
                                    专业班级：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={tableData?.newerClass}
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    是否挂科：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={studentData?.newerFail}
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    手机：
                                    <MyInput
                                        options={inputSize_200}
                                        defaultValue={tableData?.newerPhone}
                                        type="number"
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    学号：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={tableData?.newerStudentId}
                                        type="number"
                                    ></MyInput>
                                </div>
                                <div className="name">
                                    C理论成绩：
                                    <MyInput
                                        options={inputSize_150}
                                        defaultValue={studentData?.newerScoreC}
                                        type="number"
                                    ></MyInput>
                                </div>
                                {/* <div className="name">QQ：<MyInput options={inputSize_200} defaultValue={tableData?.newerQQNumber} type="number"></MyInput></div> */}
                            </div>
                            <div id="other-wrapper">
                                <div className="other">
                                    其他学生科技社团情况：
                                    <MyInput
                                        options={inputSize_590}
                                        defaultValue={studentData?.newerTeams}
                                    ></MyInput>
                                </div>
                                {/* <div className='classmate'>是否组队报名，填写同组同学姓名(限3人)：<MyInput options={inputSize_590} defaultValue={studentData?.newerTeammate}></MyInput></div> */}
                            </div>
                            <div id="self-wrapper">
                                <div className="hobby">
                                    <span>爱好：</span>
                                    <MyTextarea
                                        options={textSize_500}
                                        defaultValue={studentData?.newerHobby}
                                    ></MyTextarea>
                                </div>
                                <div className="motto">
                                    <span>座右铭：</span>
                                    <MyTextarea
                                        options={textSize_500}
                                        defaultValue={studentData?.newerMotto}
                                    ></MyTextarea>
                                </div>
                            </div>
                            <div id="bigIntro-wrapper">
                                <div className="experence">
                                    <p>
                                        奖惩情况和实践经历：（社会实践或计算机相关技术学习掌握情况）
                                    </p>
                                    <MyTextarea
                                        options={textSize_1000}
                                        defaultValue={studentData?.newerExp}
                                    ></MyTextarea>
                                    {/* 小小的一个文本框：  */}
                                </div>
                                <div className="selfCom">
                                    <p>自我评价：</p>
                                    <MyTextarea
                                        options={textSize_1000}
                                        defaultValue={studentData?.newerSelf}
                                    ></MyTextarea>
                                </div>
                                <div className="example">
                                    <p>
                                        简述能体现你四个方面的一件事： (1)
                                        善于协作 (2) 刻苦努力 (3) 甘于奉献 (4)
                                        持之以恒
                                    </p>
                                    <MyTextarea
                                        options={textSize_1000}
                                        defaultValue={studentData?.newerExample}
                                    ></MyTextarea>
                                </div>
                                <div className="sumAndWhy">
                                    <p>
                                        请说一下大学四年的个人规划以及为什么希望加入QG工作室：
                                    </p>
                                    <MyTextarea
                                        options={textSize_1000}
                                        defaultValue={studentData?.newerPlan}
                                    ></MyTextarea>
                                </div>
                            </div>
                        </div>
                        <div className="com-btn">
                            <Button
                                type="primary"
                                onClick={() =>
                                    showConfirm(
                                        visible,
                                        setVisible,
                                        opid,
                                        navigate
                                    )
                                }
                            >
                                提交
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Update;

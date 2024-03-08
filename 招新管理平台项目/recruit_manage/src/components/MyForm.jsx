import React, { useState } from 'react';
import { Form, Input, Select, Button } from 'antd';
import { useEffect } from 'react';
import {Pass,dimension} from '../data/resultData'
import PubSub from 'pubsub-js';
import { useForm } from 'antd/lib/form/Form';
const { Option } = Select;

// 成绩输入框
const GradeInput = ({value = {}, onChange}) => {
  const [score, setScore] = useState(0);
  const [assess, setAssess] = useState('');
  // 处理输入内容
  const triggerChange = (changedValue) => {
    onChange?.({
      score,
      assess,
      ...value,
      ...changedValue,
    });
  };
  // 限制只能输入数字
  const onNumberChange = (e) => {
    const newNumber = parseInt(e.target.value || 0, 10);
    if (Number.isNaN(score)) {
        return;
    }
    if (!('score' in value)) {
        setScore(newNumber);
    }
    triggerChange({
      score: newNumber,
    });
  };

  // 输入回调
  const onAssessChange = (e) =>{
      const newAssess = e.target.value || "";
      setAssess(newAssess);
      triggerChange({
        assess: newAssess,
      });
  }
  return (
    <span>
    <Input
        type="text"
        value={value.assess}
        onChange={onAssessChange}
        style={{
            width: 180,
        }}
        placeholder='评价'
        defaultValue={"无"}
    />
    <Input
        type="text"
        value={value.score}
        onChange={onNumberChange}
        style={{
            width: 50,
        }}
        placeholder='分数'
    />
      
  
    </span>
  );
};

// 计算总分
let getTotal = (data,dimension)=>{
    let total = 0;
    let scoreArr = [];
    for(let n in data){
        
        if(data[n] && data[n].score) scoreArr.push(data[n].score); 
    }
    for(let i = 0;i < scoreArr.length;i++){
        total += dimension[i].weight * scoreArr[i];
    }
    return parseInt(total);
}

// 填成绩的表单
export default function MyForm(props) {
    console.log(props)
    const { getFormData, senddata, examRound } = props;
    const [form] =  Form.useForm();
    const [totalscore,setTotalscore] = useState(0);
    const onFinish = (values) => {
        console.log(values)
        let total = getTotal(values,dimension);
        setTotalscore(value=>total);
        getFormData({ ...values, totalscore: total, examRound: examRound });
        console.log('getFormData',getFormData)
    };
    // 验证失败 发送空数组以标志
    const onFinishFailed = (values,errorfields) => {
        getFormData([]);
    }
    // 输入合法性检查
    const checkGrade = (_, value) => {
        if(!value) return Promise.resolve();
        if (value.score < 0 || value.score > 100) {
        
            return Promise.reject(new Error('成绩必须在 0 ~ 100 以内!'));
        }
        else if(value.assess && value.assess.length>50){
            return Promise.reject(new Error('评价超过最大字数 50 !'));
        }
        else {
            return Promise.resolve();
        }
    };

    // 选择器回调
    const handleselect = (pass) => {  
        form.setFieldsValue({
            grade1: senddata.grade1,
            grade2: senddata.grade2,
            grade3: senddata.grade3,
            pass:pass
        }) 
    }

    // 监听submit事件
    useEffect(() => {
        let token = PubSub.subscribe("submit",(_,value) => {
            form.submit();   
        })
 
        return ()=>{
            if(token) PubSub.unsubscribe(token);
        }
    },[])

    // 监听不同学生信息变化，并赋给表单
    useEffect(() => {
        form.setFieldsValue({
            grade1: senddata.grade1,
            grade2: senddata.grade2,
            grade3: senddata.grade3,
            pass:senddata.isPass
        }) 
        setTotalscore(value=>senddata.examScoreAll);
    },[senddata])

  return (
    <>
        <Form
        form={form}
        name="customized_form_controls"
        layout="inline"
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        
        ><span className="bold-title">状态：</span>
            <Form.Item name="pass">
                <Select bordered={true} options={Pass} onChange={handleselect}></Select>
            </Form.Item>
            <p><span className="bold-title">评价与成绩：</span></p>
          
            {
                dimension.map((n,index) => (
                <Form.Item
                    key={index}
                    name={n.name}
                    label={n.label}
                    rules={[
                    {
                        validator: checkGrade,
                    },
                    ]}
                >
                    <GradeInput/>
                </Form.Item>
                ))
            }
             <p>总分：{totalscore}</p>
        </Form>
    </>
  );
};



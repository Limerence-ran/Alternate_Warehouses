import React, { useState } from 'react';
import { Form, Radio, Input, Button, message, Modal } from 'antd';
import style from './main.module.css'; // 导入自定义的CSS文件

const CreateGroup = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);
 
    const [dimension, setDimension] = useState(1);
    const [arity, setArity] = useState([]);
    // dimension 用来追踪下拉框的选择值，初始值为 1。arity 则用来存储右边输入框的数据，初始为空数组。
    
    const handleFinish = (values) => {
        setIsSubmitting(true);

        // 模拟提交请求
        setTimeout(() => {
            setIsSubmitting(false);
            setIsSuccessModalVisible(true);
            form.resetFields();
        }, 2000);
    };

    const handleSuccessModalClose = () => {
        setIsSuccessModalVisible(false);
    };

    return (

        <>
        <div className={style.content} id='CreateGroup'>
                    <main>
                        <div className={style.chartbox} >
                        <div className={style.container}>
                            <Form form={form} onFinish={handleFinish} layout="vertical" className={style.formstyle}>
                                <Form.Item
                                    label="Group name"
                                    name="name"
                                    rules={[{ required: true, message: 'Please input Group name' }]}
                                >
                                    <Input className={style.inputstyle} />
                                </Form.Item>

                                <Form.Item
                                    label="Type"
                                    name="type"
                                    rules={[{ required: true, message: 'Please input Group type' }]}
                                >
                                    <Radio.Group>
                                        <Radio value="type1" className="round-radio-button">
                                            collection
                                        </Radio>
                                        <Radio value="type2" className="round-radio-button">
                                            individual
                                        </Radio>
                                    </Radio.Group>
                                </Form.Item>

                                <Form.Item
                                    label="Input Dimension "
                                    name="text"
                                    rules={[{ required: true, message: 'Please input Dimension' }]}
                                >    
                                <input/>
                                  
                                </Form.Item>

                                <Form.Item
                                    label="Dimension parameters "
                                    name="parameters"
                                    // rules={[{ required: true, message: 'Please input parameters' }]}
                                >
        
                                    <span>
                                        Arity  Select: 
            
                                        <select  onChange={(e) => {
                                            const selectedDimension = parseInt(e.target.value);
                                            setDimension(selectedDimension);
                                            setArity(Array(selectedDimension).fill(''));
                                        }}>
                                            <option value="1">1</option>
                                            <option value="2">2</option>
                                            <option value="3">3</option>
                                            <option value="4">4</option>
                                            <option value="5">5</option>
                                            <option value="6">6</option>
                                        </select>
                                    </span>
                                    <span className={style.parameters}>Please input parameters name :</span>
                                    <span className={style.parameters}>
                                        {arity.map((value, index) => (
                                            <input key={index} value={value} onChange={(e) => {
                                                const newArray = [...arity];
                                                newArray[index] = e.target.value;
                                                setArity(newArray);
                                            }} />
                                        ))}
                                    </span>
                                </Form.Item>

                                <Form.Item
                                    label="Group Description"
                                    name="description"
                                    rules={[{ required: true, message: 'Please input Group description' }]}
                                >
                                    <Input.TextArea rows={5} className={style.textareastyle} />
                                </Form.Item>

                                <Form.Item>
                                    <Button type="primary" htmlType="submit" loading={isSubmitting} className={style.SubmitButton}>
                                        Submit
                                    </Button>
                                </Form.Item>
                            </Form>

                            <Modal
                                visible={isSuccessModalVisible}
                                onCancel={handleSuccessModalClose}
                                onOk={handleSuccessModalClose}
                                okText="Close"
                                title="提交成功"
                                centered
                                className="success-modal-style"
                            >
                                <p>submit success！</p>
                            </Modal>
                        </div>
                
                        </div>
                    </main>
                </div>
                </>
       
    );
};

export default CreateGroup;


{/* <Radio.Group>
                                        <Radio value="purpose1" className="round-radio-button">
                                            technical exchange
                                        </Radio>
                                        <Radio value="purpose2" className="round-radio-button">
                                            learning and discussion
                                        </Radio>
                                        <Radio value="purpose3" className="round-radio-button">
                                            learning and discussion
                                        </Radio>
                                        <Radio value="purpose4" className="round-radio-button">
                                            other
                                        </Radio>
                                    </Radio.Group> */}
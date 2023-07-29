import React, { useState } from 'react';
import { Form, Radio, Input, Button, message, Modal } from 'antd';
import style from './main.module.css'; // 导入自定义的CSS文件

const CreateGroup = () => {
    const [form] = Form.useForm();
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isSuccessModalVisible, setIsSuccessModalVisible] = useState(false);

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
                                    label="Group Purpose"
                                    name="purpose"
                                    rules={[{ required: true, message: 'Please input Group purpose' }]}
                                >
                                    <Radio.Group>
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
                                    </Radio.Group>
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
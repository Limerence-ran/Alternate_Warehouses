import React from 'react'
import '../assets/styles/Register.scss'
import qs from 'qs'
import Title from '../components/Title'
import { LockOutlined, UserOutlined, GoldOutlined, FileTextOutlined } from '@ant-design/icons';
import { Button, Form, Input, Select, message } from 'antd';
import { RegisterReq } from '../request/api';

const { Option } = Select;

export default function Register() {

    const registerUrl = 'user/AdminRegister'

    // 点击提交按钮
    const onFinish = (values) => {
        console.log('values->', values);
        const param = {
            userAccount: values.userAccount,
            userGroup: values.userGroup,
            userName: values.userName,
            userPass: values.userPass,
        }
        message.loading({
            content: "正在请求...",
            duration: 2,
            key: 'key0'
           })
        // 这里没有做很具体的表单验证
        RegisterReq.registerRequest(registerUrl, qs.stringify(param))
            .then(res => {
                return JSON.parse(JSON.stringify(res.data))
            })
            .then(res => {
                console.log(res);
                switch(res?.status) {
                    case 202: {
                      message.destroy();
                      message.success({
                        content: res.msg,
                        duration: 2,
                        key: 'key1'
                      })
                      break;
                    }
                    default: {
                      message.destroy();
                      message.error({
                        content: res.msg,
                        duration: 2,
                        key: 'key2'
                      })
                      break;
                    }
                  }
              })
              .catch(e => {
                message.destroy();
                message.error({
                  content: '出现未知错误！，请查看控制台',
                  duration: 2,
                  key: 'key3'
                })
                throw(e);
              })  
    };

    return (
        <div className="register">
            <Title title="管理员注册"></Title>
            <div className="content">
                <div className="form">
                    <span className="swimAround"></span>
                    <Form
                        name="register-form"
                        className="register-form"
                        onFinish={onFinish}
                    >
                        <Form.Item
                            name="userGroup"
                            rules={[
                            {
                                required: true,
                                message: '组别不能为空!',
                            },
                            ]}
                        >
                            <Select placeholder="组别选择">
                                <Option value="人工智能组">人工智能组</Option>
                                <Option value="工业软件-前端组">工业软件-前端组</Option>
                                <Option value="工业软件-后台组">工业软件-后台组</Option>
                                <Option value="移动组">移动组</Option>
                                <Option value="嵌入式组">嵌入式组</Option>
                                <Option value="设计师组">设计师组</Option>
                                <Option value="图形组">图形组</Option>
                            </Select>
                        </Form.Item> 

                        <Form.Item
                            name="userName"
                            rules={[
                            {
                                required: true,
                                message: '姓名不能为空!',
                            },
                            ]}
                        >
                            <Input prefix={<UserOutlined/>} placeholder="姓名" />
                        </Form.Item>

                        <Form.Item
                            name="userAccount"
                            rules={[
                            {
                                required: true,
                                message: '账号不能为空!',
                            },
                            ]}
                        >
                            <Input prefix={<FileTextOutlined />} placeholder="账号" />
                        </Form.Item>

                        <Form.Item
                            name="userPass"
                            rules={[
                            {
                                required: true,
                                message: '密码不能为空!',
                            },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined/>}
                                type="password"
                                placeholder="密码"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button type="primary" htmlType="submit">注册</Button>
                        </Form.Item>
                    </Form>
                </div>

            </div>
        </div>
    )
}

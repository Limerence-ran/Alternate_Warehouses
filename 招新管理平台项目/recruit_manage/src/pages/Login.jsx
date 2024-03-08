import React, { Component, useState } from 'react'
import { Navigate } from 'react-router-dom'
import '../assets/styles/Login.scss'
import { myCookie } from '../utils/loginCookie'
import qs from 'qs'
import {LoginReq} from '../request/api'
import { checkToken } from '../utils/checkToken'

import { message } from 'antd'
let flag1 = 0
let flag2 = 0

let chinese1 = /^[\u4e00-\u9fa5]{0,}$/
let chinese2 = /[\u4e00-\u9fa5]/
let symbol = /[\u3002|\uff1f|\uff01|\uff0c|\u3001|\uff1b|\uff1a|\u201c|\u201d|\u2018|\u2019|\uff08|\uff09|\u300a|\u300b|\u3008|\u3009|\u3010|\u3011|\u300e|\u300f|\u300c|\u300d|\ufe43|\ufe44|\u3014|\u3015|\u2026|\u2014|\uff5e|\ufe4f|\uffe5]/
const loginUrl = `user/login`

export default class Login extends Component {
  state = {
    remember: false,
    jump: false,
  }

  componentWillUnmount() {
    
  }

  // 页面加载完成
  componentDidMount(){
    console.log('页面加载完成')
    message.destroy();
    const {showBox,accounts,password,commitBtn,accWarn,passWarn,remember} = this.refs;
    const cookie = new myCookie();

    // 验证cookie中是否保存信息
    let checkRemember = () => {
      console.log('验证coookie')
      let value = cookie.getCookie('remember');
      console.log(value)
      if (value && cookie.getCookie('accounts').trim() && cookie.getCookie('password').trim()) {
        remember.checked = true;
        accounts.value = cookie.getCookie('accounts');
        password.value = cookie.getCookie('password');
        flag1 = flag2 = 1;
        console.log(flag1, flag2)
      } 
    }
    checkRemember();

    // 验证token
    let getStatus = async () => {
      // let self = this;
      console.log('验证token')
      try {
        let result = await checkToken();
        console.log('验证token',result)
        switch(result) {
          case 0: {
            loginMutual();
            break;
          }
          case 1: {
            // 登录成功，跳转到数据统计页
            this.setState({jump:true});
            break;
          }
          default:;
        }
        
      } catch(e) {
        // 报错
        message.error({
          content: "出现未知错误！请查看控制台",
          duration: 2
        })
        throw(e)
      }
    }
    
    getStatus();

    // 表单验证
    let checkForm = (e) => {
      console.log('表单验证')
      const key1 = 'lgDelay1'
      const key2 = 'lgDelay2'
      // alert(flag1,flag2)
      // const { accounts, password } = self.refs
      if (e)
        e.preventDefault()
      if (accounts.value.trim() == '请输入账号' ||
        password.value.trim() == '请输入密码' ||
        accounts.value.trim() === '' ||
        password.value.trim() === '') {
        message.warning({
          content: '您的账号或是密码为空！',
          duration: 2,
          key: key2,
        })
      } else if (flag1 === 1 && flag2 === 1) { // 表单验证通过，发送登录请求
        console.log('登陆')
        handleLoginRequest()
      } else {
        message.destroy();
        message.warning({
          content: '您的账号或是密码格式错误！',
          duration: 2,
          key: key1,
        })
      }
    }

    // 登录的表单检查交互函数
    let loginMutual = () => {
      accounts.addEventListener('keyup', function (e) {
        if (this.value.trim() === '' || this.value.trim() === '请输您的账号') {
          accWarn.style = 'visibility: visible'
          accWarn.innerHTML = '账号不可为空'
          flag1 = 0;
        } else if (
          chinese1.test(accounts.value.trim()) ||
          chinese2.test(accounts.value.trim()) ||
          symbol.test(accounts.value.trim())
        ) {
          accWarn.style = 'visibility: visible'
          accWarn.innerHTML = '您输入的账号包含中文或是中文字符！'
          flag1 = 0;
        } else if (e.keyCode == 13) {
          console.log('验证表单')
          checkForm();
        } else {
          accWarn.style = 'visibility: hidden'
          flag1 = 1
        }
      })

      password.addEventListener('keyup', function (e) {
        if (
          this.value.trim() === '' ||
          this.value.trim() === '请输入5-12位密码'
        ) {
          passWarn.style = 'visibility: visible'
          passWarn.innerHTML = '您输入的密码不可为空'
          flag2 = 0
        } else if (
          chinese1.test(password.value.trim()) ||
          chinese2.test(password.value.trim()) ||
          symbol.test(password.value.trim())
        ) {
          passWarn.style = 'visibility: visible'
          passWarn.innerHTML = '您输入的密码包含中文符号或是中文！'
          flag2 = 0
        } else if (e.keyCode == 13) {
          checkForm();
        }else {
          passWarn.style = 'visibility: hidden'
          flag2 = 1
        }
      })
      console.log(commitBtn)
      commitBtn.addEventListener('click', function (e) {
        console.log(111)
        checkForm(e);
      })
    }

    // 发送登录请求
    let handleLoginRequest = () => {
      console.log('点击登录')
      const {commitBtn} = this.refs;
      const key0 = "key0",key1 = "key1",key2 = "key2", key3 = "key3";
      let param = {
        userName: accounts.value,
        userPass: password.value
      }

      message.loading({
       content: "正在请求...",
       duration: 2,
       key: key0
      })
      commitBtn.disabled = true;
      commitBtn.style = "cursor:default";
      console.log('123',qs.stringify(param))
      LoginReq.loginRequest(loginUrl,qs.stringify(param))
        .then(res => {
          return JSON.parse(JSON.stringify(res.data))
        })
        .then(res => {
          console.log(res)
          switch(res?.status) {
            case 200: {
              message.destroy();
              message.success({
                content: res.msg,
                duration: 2,
                key: key1
              })
              sessionStorage.setItem("platformToken",res.data.token);
              sessionStorage.setItem("platformUserName",res.data.userName);
              // 验证通过，若勾选记住 则存入cookie中
              if (remember.checked) {
                this.setState({remember});
                cookie.setCookie('accounts',accounts.value,1);
                cookie.setCookie('password',password.value,1);
                cookie.setCookie('remember',true,1);
              } else {
                cookie.removeCookie('accounts');
                cookie.removeCookie('password');
                cookie.setCookie('remember',false,1);
              }
              this.setState({jump:true})
              break;
            }
            default: {
              message.destroy();
              message.error({
                content: res.msg,
                duration: 2,
                key: key2
              })
              commitBtn.disabled = false;
              commitBtn.style = "cursor:pointer";
              break;
            }
          }
        })
        .catch(e => {
          commitBtn.disabled = false;
          commitBtn.style = "cursor:pointer";
          message.destroy();
          message.error({
            content: '出现未知错误！，请查看控制台',
            duration: 2,
            key: key3
          })
          throw(e);
        })  
    }

    // 复选框样式
    showBox.addEventListener("click",(e) => {
      let ipt = e.target.parentNode.children[0];
      ipt.checked = !ipt.checked;
    })
  }

  render() {
    return (
      
    <>
      {this.state.jump && (
          <Navigate to='/datashow' replace='true' />
        )}
      <div id="content"> 
        <div id="bg-pic"></div>
        <div id="login-ct">
          <header>
            <div className="studio-logo"></div>
            <div className="studio-name">QG 工作室招新平台</div>
          </header>
          <form action="" id="login">
            <input
              type="text"
              placeholder="请输入账号"
              className="accounts-ipt"
              name="accounts"
              ref="accounts"
              autoComplete="off"
            />
            <span
              className="acc-warn"
              // style={{
              //   visibility: 'hidden',
              // }}
              ref="accWarn"
            >
              您输入的账号包含中文或是中文符号！
            </span>
            <input
              type="password"
              placeholder="请输入密码"
              className="password-ipt"
              name="password"
              ref="password"
              autoComplete="off"
            />
            <span
              className="pass-warn"
              // style={{
              //   visibility: 'hidden',
              // }}
              ref="passWarn"
            >
              您输入的密码包含中文或是中文符号！
            </span>
            <div className="form-footer">
              <div className="remember-ct">
                <div className='remember-chk'>
                  <input type="checkbox" name='remember-cb' id='remember-ipt' ref="remember"/>
                  <div className="realshow-box" ref="showBox"></div>
                  <div className="bg-box"></div>
                </div>
                <label htmlFor="remember-ipt">记住我</label>
              </div>
            </div>
            <button className="commit-btn" type="submit" ref="commitBtn"></button>
          </form>
        </div>
      </div>
      </>
    )
  }
}

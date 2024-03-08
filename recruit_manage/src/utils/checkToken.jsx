import { message } from 'antd'
import {LoginReq } from  '../request/api'
import {Modal} from "antd";
const checkTokenUrl = `user/token`

const checkToken = () => {
    return new Promise((resolve, reject) => {
        LoginReq.checkToken(checkTokenUrl)
        .then(res => res.data)
        .then(data => {
            console.log(data)
            if (data) {
                switch(data?.code) {  
                    case 401: {  // token验证失败
                        resolve(0);
                        break;
                    }
                    case 200: {  // token验证成功
                        resolve(1);
                        break;
                    }
                }
            } else {
                message.destroy();
                message.error({
                    content: '数据出错，请刷新！',
                    duration: 2,
                })
            }
        })
        .catch(e => {
            message.error({
                content: '出现未知错误！请查看控制台',
                duration: 2,
            })
            throw(e);
        })
    })
}

const check = async (navigate) => {
    let result = await checkToken();
    if (result === 0) {  // token验证失败
        // Modal.destroy()
        let secondToGo = 3;
        const modal = Modal.warning({
            title: `请先登录管理员帐号，${secondToGo}秒后跳转至登陆页面`,
            onOk() {
               navigate("/login")
            }
        })
        const timer = setInterval(() => {
            secondToGo -= 1;
            modal.update({
                title: `请先登录管理员帐号，${secondToGo}秒后跳转至登陆页面`,
            })
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            navigate("/login")
        }, secondToGo * 1000);
        return Promise.resolve(0)
    }else if(result === 1){
        return Promise.resolve(1)
    }
}

let checkClass = async (self) => {
    let result = await checkToken();
    if (result === 0) {  // token验证失败
        let secondToGo = 3;
       
        const modal = Modal.warning({
            title: `请先登录管理员帐号，${secondToGo}秒后跳转至登陆页面`,
            onOk() {
                self.setState({isReplace:true})
            }
        })
        const timer = setInterval(() => {
            secondToGo -= 1;
            modal.update({
                title: `请先登录管理员帐号，${secondToGo}秒后跳转至登陆页面`,
            })
        }, 1000);
        setTimeout(() => {
            clearInterval(timer);
            modal.destroy();
            self.setState({isReplace:true})

        }, secondToGo * 1000);
        return Promise.resolve(0)
    }else if(result === 1){
        return Promise.resolve(1)
    }
}
export {check,checkToken,checkClass}

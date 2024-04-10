import Datashow from '../pages/DataShow'
import SignUp from '../pages/SignUp'
import Log from '../pages/Log'
import Result from '../pages/Result'
import Login from '../pages/Login'
import OpLog from '../pages/OpLog'
import SystemLog from '../pages/SystemLog'
import Detail from '../pages/Detail'
import UpDate from '../pages/UpDate'
import Register from '../pages/Register'
const routes = [
    {
        id:1,
        title:"数据展示",
        path:"/datashow",
        component: Datashow
    },
    {
        id: 2,
        title: "报名信息",
        path: "/signup",
        component: SignUp,
        children:[
            {
                id:6,
                title:"详细",
                path:"detail",
                component:Detail
            },
            {
                id:7,
                title:"修改",
                path:"update",
                component:UpDate
            }
        ]
    },
    {
        id: 3,
        title: "考试结果",
        path: "/result",
        component: Result
    },
    {
        id: 4,
        title: "日志",
        path: "/log",
        component: Log,
        children:[
            {
                id:8,
                title:"操作日志",
                path:"oplog",
                component:OpLog
            },
            {
                id:9,
                title:"系统日志",
                path:"systemlog",
                component:SystemLog
            }
        ]
    },
    {
        id: 5,
        title: "登录",
        path: "/login",
        component: Login
    },
    {
        id:6,
        title:"管理员注册",
        path:"/register",
        component: Register
    }
]



export {routes}
import Home from "../pages/Home"
import Introduce from "../pages/Introduce"
import Awards from "../pages/Awards"
import Projects from "../pages/Projects"
import Students from "../pages/Students"
import Educator from "../pages/Educator"
const routes = [
    {
        title:"主页",
        path:"/",
        component: Home
    },
    {
        title:"团队简介",
        path:"/introduce",
        component: Introduce
    },
    {
        title:"指导老师",
        path:"/educator",
        component: Educator
    },
    {
        title:"优秀奖项",
        path:"/awards",
        component: Awards
    },
    {
        title:"优秀项目",
        path:"/projects",
        component: Projects
    },
    {
        title:"优秀学生",
        path:"/students",
        component: Students
    }
    // {
    //     id: 2,
    //     title: "报名信息",
    //     path: "/signup",
    //     component: SignUp,
    //     children:[
    //         {
    //             id:6,
    //             title:"详细",
    //             path:"detail",
    //             component:Detail
    //         },
    //         {
    //             id:7,
    //             title:"修改",
    //             path:"update",
    //             component:UpDate
    //         }
    //     ]
    // },
]



export {routes}

import { UserOutlined, UploadOutlined, ManOutlined, AppstoreOutlined, ContainerOutlined } from '@ant-design/icons'
import style from './main.module.css'
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useRoutes } from "react-router-dom";
// import App from '../../router/App'
import App1 from '../../component/App1/main'

const Mysoftware = () => {
    return (
        <>
            <div className={style.body}>
                <div className={style.box}>
                    <div className={style.content}>
                        <div className={style.left}>

                            <Link to={"App1"}> <div className={style.leftbox}><span>软件1</span></div></Link>
                            <Link to={"App2"}>  <div className={style.leftbox}><span>软件2</span></div></Link>
                            <Link to={"App3"}> <div className={style.leftbox}><span>软件3</span></div></Link>
                        </div>
                        <div className={style.right}>
                            <Outlet></Outlet>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Mysoftware
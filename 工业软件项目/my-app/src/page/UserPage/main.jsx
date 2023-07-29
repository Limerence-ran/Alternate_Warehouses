
import { UserOutlined, UploadOutlined, ManOutlined, AppstoreOutlined, ContainerOutlined } from '@ant-design/icons'
import style from './main.module.css'
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useRoutes } from "react-router-dom";
import routes from '../../router/router'

const User = () => {
    return (
        <>
            <div className={style.body}>
                {/* <Header /> */}
                <div className={style.box}>
                    <div className={style.content}>
                        <div className={style.left}>
                            <UserOutlined />

                            <Link to={"/MyApp"}> <div className={style.leftbox}><AppstoreOutlined /> <span>已购买的软件</span></div></Link>
                            <Link to={"/UploadApp"}>  <div className={style.leftbox}><UploadOutlined /><span>已下载的软件</span></div></Link>
                            <Link to={"/UserInfor"}> <div className={style.leftbox}><ContainerOutlined /><span>用户信息</span></div></Link>
                        </div>
                        <div className={style.right}>
                            <Routes>
                                {routes.map((route, index) => (
                                    <Route key={index} path={route.path} element={route.element} />
                                ))}
                            </Routes>
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default User
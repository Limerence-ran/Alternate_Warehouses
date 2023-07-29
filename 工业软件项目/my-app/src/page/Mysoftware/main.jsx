
import { UserOutlined, UploadOutlined, ManOutlined, AppstoreOutlined, ContainerOutlined } from '@ant-design/icons'
import style from './main.module.css'
import { BrowserRouter as Router, Routes, Route, Link, Outlet, useRoutes } from "react-router-dom";
import App from '../../router/App'

const Mysoftware = () => {
    return (
        <>
            <div className={style.body}>
                {/* <Header /> */}
                <div className={style.box}>
                    <div className={style.content}>
                        <div className={style.left}>

                            <Link to={"/App1"}> <div className={style.leftbox}><span>软件1</span></div></Link>
                            <Link to={"/App1"}>  <div className={style.leftbox}><span>软件2</span></div></Link>
                            <Link to={"/App1"}> <div className={style.leftbox}><span>软件3</span></div></Link>
                        </div>
                        <div className={style.right}>
                            <Routes>
                                {App.map((router, index) => (
                                    <Route key={index} path={router.path} element={router.element} />
                                ))}
                            </Routes>
                            {/* <App1/> */}
                        </div>
                    </div>
                </div>
            </div>
        </>

    )
}
export default Mysoftware
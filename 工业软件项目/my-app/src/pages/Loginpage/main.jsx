import Header from '../../component/Header/main'
import Login from '../../component/Login/mian'
import Register from '../../component/Register/main'
import style from './main.module.css'

const LoginPage = () =>{
    return (
       <>
            <Header />
            <div className={style.fix}>
                <div className={style.container}>
                    <div className={style.right}>
                         <div className={style.header}>
                        <h1>Welcome back</h1>

                        <div className={style.form}>
                            <Login />
                             {/* <Register/> */}
                        </div>


                    </div></div>
                </div>
            </div>
       </>
        
    )
}
export default LoginPage
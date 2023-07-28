import Header from '../../component/Header/main'
import { UserOutlined, UploadOutlined, ManOutlined } from '@ant-design/icons'
import img from '../../assets/images/3.jpg'
import style from './main.module.css'
import Software from './software'

const User = () => {
    return (
        <>
          <div className={style.body}>
                <Header />
                <div className={style.box}>
                    <div className={style.content}>
                        <div className={style.left}>
                            <UserOutlined />
                            <form>
                                <h4>用户名：<i>123456789</i></h4>
                                <h4>性别：<i><ManOutlined /></i></h4>
                                <h4>所在地区：<i>广东省广州市</i></h4>
                                <h4>个人介绍：<i>暂无</i></h4>
                            </form>
                        </div>
                        <div className={style.right}>
                            <div className={style.title}>
                                <span>已购买的软件</span>
                            </div>
                            <Software/>
                            <Software/>
                            <Software/>
                        </div>
                    
                       
                            
                       
                </div>
                </div>
          </div>
        </>

            )
 }
 export default User
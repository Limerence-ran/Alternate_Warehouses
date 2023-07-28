
import style from './main.module.css'
import img3 from '../../assets/images/3.jpg'
import {BellOutlined , CommentOutlined, UserOutlined,SearchOutlined} from '@ant-design/icons'
const  Header = () => {
    return (
        <>
        <div className={style.header}>
                  <div className={style.brand}>
                    <img src={img3} alt='' className={style.img}/>
                    <h3>QG软件升级助手</h3>
                  </div>
                  
                    <form action="#">
                        <div className={style.formGroup}>
                        <input type="text" placeholder="Search..."/>
                        
                        <SearchOutlined className={style.icon} style={{ width: "40px", height: "40px" }} />
                        </div>
                    </form>
                   <div className={style.iconInfor}>
                    <a href="#">
                        <BellOutlined style={{ width: "40px", height: "40px" }} className={style.Icon} />
                        <span className={style.text}>更新</span>
                    </a>
                    <a href="#" >
                        <UserOutlined />
                    </a>
                   </div>
                   
        </div>
        </>
    )
}
export default Header;
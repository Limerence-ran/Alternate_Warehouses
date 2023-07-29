
import style from './main.module.css'
import { WomanOutlined} from '@ant-design/icons'
import SwitchButton from './btn'
import img from '../../assets/user.png'


const UserInfor = () => {
    
   
    return (
        <>
            <div className={style.title}>
                <span>个人信息</span>
            </div>
         
         <div className={style.form}>
                <div style={{ width: '300px', height: '200px', padding: '20px' }}>
                    <div style={{ display: 'flex' }}>
                        {/* 左边盒子 */}
                        <div style={{ flex: 1 }}>
                            <div className={style.update}>
                             <img src={img}/>
                                
                                <div className={style.updatebtn}> <span>是否自动更新</span> <SwitchButton className={style.active}/></div>
                             
                           </div>
                        </div>

                        {/* 右边盒子 */}
                        <div style={{ flex: 1, }}>
                            <form>
                                <div className={style.infor}>
                                    <label htmlFor="username">用户名：</label>
                                    <input type="text" id="username" value={"光头强"} />
                                </div>
                                <div className={style.infor}>
                                    <label htmlFor="email">邮箱：</label>
                                    <input type="email" id="email" value={"2713975114@qq.com"} />
                                </div>
                                <div className={style.infor}>
                                    <label htmlFor="gender">性别：</label>
                                    <WomanOutlined className={style.sex} />
                                </div>
                                <div className={style.infor}>
                                    <label htmlFor="location">所在地区：</label>
                                    <input type="text" id="location" value={"广东省广州市"} />
                                </div>
                                <div className={style.infor}>
                                    <label htmlFor="bio">个人介绍：</label>
                                    <textarea id="bio" rows="3" cols={45} value={"暂无"}></textarea>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
         </div>
        </>

    )
 }
export default UserInfor 




import style from './main.module.css'
const Buttom = () => {
    return (
       <>
            <div className={style.buttom}>
                <div className={style.left}>
                    <div className={style.top }>
                         <h3>QG软件升级助手</h3>
                        <span>Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod 
                            tempor incididunt ut labore egtt doloremagna aliqua</span>
                    </div>
                    <h3>网站标签</h3>
                    <div className={style.last}>
                     <ul>
                            <li><a href=''>升级助手</a></li>
                            <li><a href=''>升级助手</a></li>
                            <li><a href=''>升级助手</a></li>
                            <li><a href=''>升级助手</a></li>    
                     </ul>
                     
                    </div>
                </div>
                <div className={style.right}>
                    <div className={style.text1}>
                        <h3>Company</h3>
                        <ul>
                            <li>About us</li>
                            <li>Connect us</li>
                            <li>Join us</li>
                            <li>Our Lives</li>
                            <li>Current Ideas</li>
                        </ul>
                    </div>
                    <div className={style.text2}>
                        <h3>Our Services</h3>
                        <ul>
                            <li>Outsourcing</li>
                            <li>Abbreviated Dialing</li>
                            <li>Heuristic Reasoning</li>
                           
                            
                        </ul>
                    </div>
                    <div className={style.text3}>
                        <h3>Contact Us</h3>
                        <ul>
                            <li>3434 Safari Court,Los</li>
                            <li>Syntax 12901</li>
                            <li> </li>
                            <li>Phone: +1712-168-2209</li>
                            <li>Email:support@rax-ble.com</li>
                        </ul>
                    </div>
                </div>
            </div>
            </>
           
    )
}
export default Buttom
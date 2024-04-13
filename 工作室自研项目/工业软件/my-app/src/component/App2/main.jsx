import style from './main.module.css'
import img from '../../assets/login-back.jpg'
import Page from '../Paging/main'


const App2 = () => {
    return (
        <>
            <div className={style.title}>
                <div className={style.titlebox}>
                    <img src={img} />
                    <div><h3>软件名称2</h3></div>
                    <button className={style.deletebtn}>删除该软件</button>
                </div>
            </div>
            <div className={style.App1}>
                <Page />
            </div>
        </>

    )
}
export default App2
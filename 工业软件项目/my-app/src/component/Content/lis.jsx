import style from './main.module.css';
import img from '../../assets/images/1.jpg'



const Lis = (props) => {
    console.log(props)
    return (
        <>
            <li>
                <div className={style.front}>
                    <a><img src={img} alt=""  className={style.img}/></a>
                    <h3 className={style.softName}><a>翼果科技</a></h3>
                    <h3 className={style.softName}><a>{props.dollar}</a></h3>
                    {/* <h4 className={style.wordCut}>主要合伙人具有10年以上行业龙头企业管理经验以及海外工作经历,技术氛围浓、研发实力强、上升通道明确。</h4> */}
                    <h4 className={style.wordCut}>{props.text}</h4>
                </div>
                <div className={style.last}>
                    <a href="#" className={style.link}>详情</a>
                    <button className={style.btn}>购买</button>
                </div>
            </li>
                    {/* <li>

                        <div className={style.front}>
                            <a><img src="" alt="" /></a>
                            <h3 className={style.softName}><a>翼果科技</a></h3>
                            <h4 className={style.wordCut}>主要合伙人具有10年以上行业龙头企业管理经验以及海外工作经历,技术氛围浓、研发实力强、上升通道明确。</h4>
                        </div>
                        <div className={style.last}>
                            <a href="#" className={style.link}>详情</a>
                            <button className={style.btn}>购买</button>
                       </div>
                    </li> */}
        </>
    )
}

export default Lis
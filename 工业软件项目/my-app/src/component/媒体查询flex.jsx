
import style from './main.module.css'
import Table1 from './table'
import { Button, Table } from 'antd';
import { UpCircleOutlined, GoogleOutlined, RedditOutlined } from '@ant-design/icons'
import CalendarCard from './日历';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
export default function Flex(){
   

    return(
        <>
        <div className={style.body}>
                <div className={style.header}>
                    <div className={style.icon}>
                        <span> <UpCircleOutlined style={{ fontSize: '24px', color: "skyblue",cursor:"pointer", transition: 'all 0.3s' }}
                            onMouseOver={(e) => e.currentTarget.style.fontSize = '36px'}
                            onMouseOut={(e) => e.currentTarget.style.fontSize = '24px'} /></span>
                        <span>  <GoogleOutlined style={{ fontSize: '24px', color: "skyblue", cursor: "pointer", transition: 'all 0.3s' }} 
                            onMouseOver={(e) => e.currentTarget.style.fontSize = '36px'}
                            onMouseOut={(e) => e.currentTarget.style.fontSize = '24px'} /></span>
                        <span>  <RedditOutlined style={{ fontSize: '24px', color: "skyblue", cursor: "pointer", transition: 'all 0.3s' }} 
                            onMouseOver={(e) => e.currentTarget.style.fontSize = '36px'}
                            onMouseOut={(e) => e.currentTarget.style.fontSize = '24px'} /></span>
                        <span>  <AddShoppingCartIcon style={{ fontSize: '24px', color: "skyblue", cursor: "pointer", transition: 'all 0.3s' }} onMouseOver={(e) => e.currentTarget.style.fontSize = '36px'}
                            onMouseOut={(e) => e.currentTarget.style.fontSize = '24px'} /></span>
                    </div>
            </div>
          <div className={style.box}>
                    <div className={style.box1}>1</div>
                    <div className={style.box2}>2</div>
                    <div className={style.box3}>3</div>
                    <div className={style.box4}>4</div>
          </div>
          <div className={style.lunbobox}>
                    <div className={style.lunbo}>
                        <span className={style.btn1}>6</span>
                        <span className={style.btn2}>9</span>
                        <ul>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                            <li></li>
                        </ul>
                    </div>
          </div>
                
          <div className={style.media}>
                    <div className={style.box5}>1</div>
                    <div className={style.box5}>1</div>
                    <div className={style.box5}>1</div>
                    <div className={style.box5}>1</div>
          </div>
          <div className={style.xiangying}>
                    <div className={style.box6}>1</div>
                    <div className={style.box6}>2</div>
                    <div className={style.box6}>3</div>
                    <div className={style.box6}>4</div>
          </div>   
          <div className={style.tablebox}>
                    <div className={style.table}>
                        <Table1/>
                    </div>
          </div> 
           <div className={style.calc}>
             <div className={style.calc1}>my name</div>
             <div className={style.calc2}>calc width</div>
           </div>
                <div className={style.calender}>
                    <div className={style.card}>
                        <CalendarCard />
                  </div>
           </div>
        </div>
        
        </>
    )
}


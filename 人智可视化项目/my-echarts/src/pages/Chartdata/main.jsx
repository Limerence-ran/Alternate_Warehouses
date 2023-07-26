
import style from './main.module.css'
import Slider from '../../component/Slider/main'
import { FieldBinaryOutlined } from '@ant-design/icons'
function Chartdata(){
    return(
        <>
            <Slider/>
            <div className={style.content}>
                <div className={style.header}>
                    <ul className={style.title}>
                        <li><button className={style.btnheader}>All datasets</button></li>
                        <li><button className={style.btnheader}>All datasets</button></li>
                        <li><button className={style.btnheader}>All datasets</button></li>
                    </ul>
                </div>
                <main>
                    <div className={style.body}>
                        <div className={style.chartbox}>
                              <div className={style.chart}></div>
                           
                                {/* <th>
                                    <td>className</td>
                                    <td>className</td>
                                    <td>className</td>
                                    <td>className</td>
                                </th> */}
                              <div className={style.chartbuttom}>
                                <table>
                                    <tr>
                                        <th>className</th>
                                        <th>className</th>
                                        <th>className</th>
                                        <th>className</th>
                                        <th></th>
                                        
                                    </tr> 
                                    <tr>
                                        <td><FieldBinaryOutlined /></td>
                                        <td>Outlined </td>
                                        <td>Outlined </td>
                                        <td>100</td>
                                        <td><button>Get</button></td>
                                    </tr>
                                    <tr>
                                        <td><FieldBinaryOutlined /></td>
                                        <td>Outlined </td>
                                        <td>Outlined </td>
                                        <td>100</td>
                                        <td><button>Get</button></td>
                                    </tr>
                                    <tr>
                                        <td><FieldBinaryOutlined /></td>
                                        <td>Outlined </td>
                                        <td>Outlined </td>
                                        <td>100</td>
                                        <td><button>Get</button></td>
                                    </tr>
                                    <tr>
                                        <td><FieldBinaryOutlined /></td>
                                        <td>Outlined </td>
                                        <td>Outlined </td>
                                        <td>100</td>
                                        <td><button>Get</button></td>
                                    </tr>
                                    <tr>
                                        <td><FieldBinaryOutlined /></td>
                                        <td>Outlined </td>
                                        <td>Outlined </td>
                                        <td>100</td>
                                        <td><button>Get</button></td>
                                    </tr>

                                </table>
                              </div>
                           
                              </div>
                            
                    </div>
                </main>
            </div>
        </>
    )
}
export default Chartdata

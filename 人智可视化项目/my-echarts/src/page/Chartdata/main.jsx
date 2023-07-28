
import style from './main.module.css'
import Slider from '../../component/Slider/main'
import { FieldBinaryOutlined } from '@ant-design/icons'
import { useState,useEffect, useRef } from 'react'
import Chart2 from '../../component/Chart2/main'
function Chartdata(){
    const box = useRef(null)
    const [which,setWhich] =useState(0)
    // let which = 0
    const IsChart = (index) => {
     
       setWhich(index)

    }
    console.log(which)


    const renderLis = (lis) => {
        // console.log(lis)
    }
    return(
        <>
           <div className={style.Chartbox}>
                <Slider onLiElements={renderLis} />
                <div className={style.content}>
                    <div className={style.header}>
                        <ul className={style.title}>
                            <li><button className={style.btnheader} onClick={() => IsChart(0)}>All datasets</button></li>
                            <li><button className={style.btnheader} onClick={() => IsChart(1)}>All datasets</button></li>
                            <li><button className={style.btnheader} onClick={() => IsChart(2)}>All datasets</button></li>

                        </ul>
                    </div>
                    <main>
                        <div className={style.body}>
                            <div className={style.chartbox} >
                                <div className={style.box} ref={box}>
                                    {which === 0 ? <div className={style.chart} >1</div>
                                        : which === 1 ? <Chart2/>
                                            : <div className={style.chart}>3</div>}

                                </div>
                                <div className={style.chartbuttom}>
                                    <table>
                                        <tbody>
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
                                        </tbody>

                                    </table>
                                </div>

                            </div>

                        </div>
                    </main>
                </div>
           </div>
        </>
    )
}
export default Chartdata

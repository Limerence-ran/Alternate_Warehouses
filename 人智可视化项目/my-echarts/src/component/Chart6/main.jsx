import style from './main.module.css'
import { useNavigate } from 'react-router-dom';
import Vedio from '../../component/Vedio/main';
import { useState } from 'react';


function Chart6() {
    const navigate = useNavigate();
  const [isshow,setisShow] =useState(false)

    const startIntera = () => {
       setisShow(!isshow)
        setTimeout(() => {
            navigate('/Chart2');
        }, 3000)
    }
    return (
        <>
            <div className={style.content}>
                <div className={style.header}>
                    <span>IMDB Movie Reviews Dataset</span>
                </div>
                <main>
                    <div className={style.chartbox} >
                        <div className={style.chart}>

                        </div>
                        <button onClick={startIntera}>Start iteracion</button>
                        {isshow&&<Vedio/>}
                    </div>
                </main>
            </div>
        </>
    )
}

export default Chart6
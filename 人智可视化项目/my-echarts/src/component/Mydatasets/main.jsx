import style from './main.module.css'
import { useState, useEffect, useRef } from 'react'
import './main.css'
import Mydatatable from './Mydatatable/main'

function Mydatasets() {
    const box = useRef(null)
    const [which, setWhich] = useState(0)
    const IsChart = (index) => {

        setWhich(index)

    }
    console.log(which)

    return (
        <>
                <main>
                    <div className={style.body}>
                        <div className={style.chartbox} >
                            <div className={style.box}>
                                    <div className={style.chart} >2</div>
                            </div>
                            <div className={style.chartbuttom}>
                                <Mydatatable className={style.paging1} />
                            </div>

                        </div>

                    </div>
                </main>
        </>
    )
}

export default Mydatasets
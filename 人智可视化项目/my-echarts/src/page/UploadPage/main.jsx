
import style from './main.module.css'
import Slider from '../../component/Slider/main'
import { useState, useEffect, useRef } from 'react'
import UploadForm from '../../component/Upload/main'
function UploadPage() {

    const renderLis = (lis) => {
    }
    return (
        <>
            <div className={style.Chartbox}>
                <Slider onLiElements={renderLis} />
                <div className={style.content}>
                    <main>
                        <div className={style.chartbox} >
                          <UploadForm/>
                
                        </div>
                    </main>
                </div>
            </div>
        </>
    )
}
export default UploadPage

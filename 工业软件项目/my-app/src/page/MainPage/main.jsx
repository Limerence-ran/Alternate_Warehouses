import Login from '../../component/Login/mian'
import Register from '../../component/Register/main'
import { useEffect, useState } from 'react'
import Header from '../../component/Header/main'
import Lunbo from '../../component/Lunbo/main'
import Content from '../../component/Content/main'
import Buttom from '../../component/Buttom/main'
import Introduction from '../../component/Introduction/main'
import style from './main.module.css'


function MainPage() {

    return (
        <>
            
                <Header />
            <div className={style.lunbobox}><Lunbo /></div>
            <div className={style.profile}>  <Introduction /></div>
            <div className={style.content}><Content /></div>
            <div className={style.buttom}><Buttom /></div>
        </>
    )
}

export default MainPage
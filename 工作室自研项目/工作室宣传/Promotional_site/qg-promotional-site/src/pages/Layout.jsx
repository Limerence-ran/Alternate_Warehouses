import React, { useState } from 'react'
import {Route,Routes,NavLink,useLocation} from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import {routes} from '../route/routes';
import {header} from '../data/LayoutData'
import MyNavLink from '../components/MyNavLink';
import '../assets/styles/Layout.scss';
const openMenu = () => {
    let menu = document.querySelector('.nav-box');
    menu.classList.toggle('oppenned');
}
export default function Layout(){
    let [isLoading,setIsLoading] = useState(false); 

    const location = useLocation();  
    let setLoading = () => {
        if(isLoading) return;
        setIsLoading(v=>true);
        setTimeout(() => {
            setIsLoading(v=>false);
        },2000)
    }

    return (
        <div className='wrapper'>
            <header>
                <div className='logo-box'>
                    <div className="mask-layer-logo" style={{display:isLoading?'block':'none'}}></div>
                    <NavLink to="/" className="logo" onClick={setLoading}></NavLink>
                    <span></span>
                </div>
                <div className='nav-box' onClick={openMenu}>
                    <span className="cls"></span>
                    <span>
                        <div className="sub-menu" onClick={setLoading}>
                        <div className='mask-layer' style={{display:isLoading?'block':'none'}}></div>
                        {header.map((v,i)=><MyNavLink className="nav-btn" active="nav-active" path={v.path} key={i} title={v.title}></MyNavLink> )}              
                        </div>
                    </span>
                    <span className="cls"></span>
                </div>
            </header>
            <div className='main-ct'>
                {/* <aside>
                    {
                        FirstNav.map(n=> n.id<4 ? <MyNavLink className={({ isActive }) => (isActive ? "onActive" : "noActive")} key={n.id} to={n.path} children={n.name}/> : null)
                    }
                </aside> */}

                <TransitionGroup className='main'>
                    <CSSTransition key={location.key} timeout={1000} classNames="forward">
                    <Routes location={location}>
                        {
                            routes.map((item,i) => 
                            <Route 
                                key={i} 
                                path={item.path} 
                                element={<item.component/>}

                            >
                                {
                                  item.children 
                                  ? item.children.map((n,j)=><Route key={j} path={n.path} element={<n.component/>}/>)  
                                  :<></>                                    
                                }
                            </Route>)                     
                        }                        
                    </Routes>
                    </CSSTransition>
                </TransitionGroup>
                    
                    

            </div>
        </div>
    )
}


import React, { useRef, useEffect, useState, useLayoutEffect} from 'react';
import './Lunbo.css'
import img1 from '../assets/images/1.jpg'
import img2 from '../assets/images/2.jpg'
import img3 from '../assets/images/3.jpg'
import img4 from '../assets/images/4.jpg'



const arr = [img1,img2,img3,img4]
function Lunbo() {
   
    const [index,setIndex] = useState(0)
    
    
    const nextImg = ()=> {
     let newIndex =index;
        if(index === arr.length -1) {
           newIndex = 0;
        } else {
            newIndex = index +1;
        }
        setIndex(newIndex)

    }
    const preImg = () => {
        let newIndex = index;
        if (index === 0) {
            newIndex = arr.length -1;
        } else {
            newIndex = index - 1;
        }
        setIndex(newIndex)

    }
    const lisClick = (n) => {
        setIndex(n)
    }

    useLayoutEffect(()=>{
        let timer;
       
        if(!timer){
            timer = setInterval(() => {
                console.log(33)
                nextImg();
            }, 1000)
          
        }
    },[])


        return (
            <>
                <div className="slider">
                    <div className="slider-wrapper">
                        <img src={arr[index]} alt=""  />
                    </div> 
                    <ul className="slider-indicator"> 
                        <li className= {index===0? 'active':''} onClick={()=>{lisClick(0)}}></li>
                        <li className= {index===1? 'active':''} onClick={()=>{lisClick(1)}}></li>
                        <li className= {index===2? 'active':''} onClick={()=>{lisClick(2)}}></li>
                        <li className= {index===3? 'active':''} onClick={()=>{lisClick(3)}}></li>
                    </ul>
                    <button className="prev" onClick={preImg}>&lt;</button>
                    <button className="next" onClick={nextImg}>&gt;</button>
                </div>
                <div className='mom'>

                </div>
            </>
        )

     
}



export default Lunbo

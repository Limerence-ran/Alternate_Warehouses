import React from 'react'
import { useRef,useEffect } from 'react';
import "../assets/styles/StudentBoxMedia.css"
export default function StudentBoxMedia(props) {
    const imgRef = useRef();
    useEffect(() => {
        const imgDom = imgRef.current;
        imgDom.classList.add(`img${props.imgindex}`)
    }, []);
   
  return (
    <div className="student-wrapper-media">
        <div className="student-ct-media">
            <div className="name-pic-wrapper-media">
                <div className="img-wrapper" ref={imgRef}>
                </div>
                <div className="pro-name-wrapper">
                    <div className="name"><span>{props.name}</span></div>
                    <div className="pro"><span>{props.pro}</span></div>
                </div>
            </div>
            <div className="introduce-ct">
                <h2 className='intro-title'>简介</h2>
                <p className="intro-words"><span>{props.intro}</span></p>
            </div>
        </div>
        <div className="white-place"></div>
    </div>
  )
}

import React from 'react'
import { useEffect,useRef } from 'react'
import "../assets/styles/EducatorBoxMedia.css"
export default function EducatorBoxMedia(props) {
  const picRef = useRef();
  useEffect(() => {
    const picDom = picRef.current;
    picDom.classList.add(props.myclassname)
  }, []);
  return (
    <div className="educator-media-wrapper"> 
      <div className="educator-media-ct">
        <div className="pic-name-pro-wrapper">
          <div className="pic-wrapper" ref={picRef}>

          </div>
          <div className="name-pro-wrapper">
                <h2 className="name-wrapper">{props.name}</h2>
                <div className="pro-wrapper">
                  <ul>
                  {
                    props.job.map((v,i) => 
                      <li key={i}><span>{v}</span></li>
                    )
                  }
                  </ul>
                </div>
          </div>
        </div>
        <div className="intro-acade-wrapper">
          <div className="intro-wrapper">
            <h2>简介</h2>
             <div className="ul-wrapper">
              <ul>
                {
                  props.about.map((v,i) => 
                    <li key={i}><span>{v}</span></li>
                  )
                }
              </ul>
             </div>
          </div>
          <div className="acade-wrapper">
            <h2>学术兼职</h2>
            <div className="ul-wrapper">
              <ul>
              {
                  props.academic.map((v,i) => 
                    <li key={i}><span>{v}</span></li>
                  )
                }
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

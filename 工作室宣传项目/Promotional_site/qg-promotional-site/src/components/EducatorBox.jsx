import React, { useRef } from 'react';
import { useEffect } from 'react';
import "../assets/styles/EducatorBox.scss"
import 'animate.css';

const Educatorbox = (props) => {
  // const [picClass,setPicClass] = useState();
  const picRef = useRef();
  useEffect(() => {
    const picDom = picRef.current;
    picDom.classList.add(props.myclassname);
  }, []);
    return (
        <>
          <div className="educator-wrapper">
           
            <div className="educator-ct">
              <div className="pic-job-wrapper">
                  <div className="pic-wrapper" ref={picRef}>
                  </div>
                  <div className="job-wrapper">
                      <h2>{props.name}</h2>
                      <ul>
                        {
                          props.job.map((v,i) => 
                              <li key={i}><span>{v}</span></li>
                          )
                        }
                      </ul>
                  </div>
              </div>
              <div className="intro-acade-wrapper">
                <div className="intro-wrapper">
                  <h2>简介</h2>
                  <ul>
                    {
                      props.about.map((v,i) => 
                          <li key={i}><span>{v}</span></li>
                      )
                    }
                  </ul>
                </div>
                <div className="acade-wrapper">
                  <h2>学术兼职</h2>
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
        </>
    );
}

export default Educatorbox;

import Educatorbox from "../components/EducatorBox";
import EducatorBoxMedia from "../components/EducatorBoxMedia";
import { x_about, x_academic, li_about, li_academic, x_job, l_job } from "../data/educator";
import '../assets/styles/Educator.scss'
import 'animate.css';
import { useState, useEffect, useRef } from "react";

function Educator() {

    const wholePageRef = useRef();

    const [isMobile, setIsMobile] = useState(false);


    useEffect(() => {
        let ua = navigator.userAgent;
        if (ua.includes('Android') || ua.includes('iPhone') || ua.includes('iPad')) {
            setIsMobile(true);
        } else if (wholePageRef.current.clientWidth < 900) {
            setIsMobile(true);
        }
    }, []);

    return (
        <div className="educator">
            {
                isMobile ?
                    <div className="educator-media-page">
                        <p className='title'>指导老师</p>
                        <EducatorBoxMedia about={x_about} academic={x_academic} job={x_job} name="谢光强博士" myclassname='img-xie'></EducatorBoxMedia>
                        <EducatorBoxMedia about={li_about} academic={li_academic} job={l_job} name="李杨博士" myclassname='img-li'></EducatorBoxMedia>
                    </div>
                    :
                    <div className="educator-pc-page" ref={wholePageRef}>
                        <p className='title'>指导老师</p>
                        <Educatorbox about={x_about} academic={x_academic} job={x_job} name="谢光强博士" myclassname='img-xie'></Educatorbox>
                        <Educatorbox about={li_about} academic={li_academic} job={l_job} name="李杨博士" myclassname='img-li'></Educatorbox>
                    </div>
            }


        </div>
    );
}

export default Educator;

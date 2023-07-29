// import React, { useState } from 'react';
// import { Button, Modal } from 'antd';
// import img from '../../assets/1.gif'
// import style from './main.module.css'
// import './main.css'
// const Vedio = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const showModal = () => {
//         setIsModalOpen(true);
//     };
//     // const handleOk = () => {
//     //     setIsModalOpen(false);
//     // };
//     // const handleCancel = () => {
//     //     setIsModalOpen(false);
//     // };
//     return (
//         <>
//             <Button type="primary" onClick={showModal}>
//                 Open Modal
//             </Button>
//             <Modal  open={isModalOpen}>
//                 <img src={img} className={style.img}/>
//                <div className={style.imgtext}><span>Iterating...</span>
//                     <span>Please do not exit</span>
//                </div>
//             </Modal>
//         </>
//     );
// };
// export default Vedio;



import React, { useState } from 'react';
import { Button, Modal } from 'antd';
import img from '../../assets/1.gif'
import style from './main.module.css'
import './main.css'

const Vedio = () => {
    const [isModalOpen, setIsModalOpen] = useState(true);
    const showModal = () => {
        setIsModalOpen(true);
    };
    return (
        <>
            <Modal open={isModalOpen} footer={null}>
                <img src={img} className={style.img} />
             <div className={style.imgtext}>
                <span>Iterating...</span>
                <span>Please do not exit</span>
                 </div>
            </Modal>
        </>
    );
};
export default Vedio;
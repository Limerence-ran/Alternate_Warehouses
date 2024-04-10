import { React, useRef, useState, useEffect } from 'react'
import '../assets/styles/ProjectCard.scss'
import { Modal } from 'antd';
import { throttle } from '../utils/throttle';

function ProjectCard(props) {
	// 分别是类名，active类名，路径和文字
	const { title, introducition, imgSrc, isPC } = props;

	const BoxRef = useRef();
	const titleRef = useRef();
	const imgBoxRef = useRef();

	const [isModalVisible, setIsModalVisible] = useState(false);

	const hoverImage = () => {
		let menuItems = document.querySelectorAll(".ct-page");
		let dots = document.querySelectorAll(".slick-dots li button");
		let card_backGround = document.querySelector(".card_backGround");
		let getXY = e => [
			e.clientX,
			e.clientY
		];

		menuItems.forEach(menuItem => {
			// move the cursor when mouse moves.
			menuItem.addEventListener("mousemove", throttle(e => {
				let [x, y] = getXY(e);
				// console.log(x, y);
				// console.log(`translate3d(${-30+x*0.01}px, ${-8+y*0.01}px, 0px) rotateX(${-2+y*0.01}deg) rotateY(${-8+x*0.01}deg);`);
				titleRef?.current?.setAttribute('style', `transform:translate3d(${-30 + x * 0.08}px, ${-8 + y * 0.08}px, 1000px) rotateX(${-2 + y * 0.01}deg) rotateY(${-8 + x * 0.01}deg);`);
				dots?.forEach((v, i) => {
					v?.setAttribute('style', `transform:translate3d(${-30 + x * 0.08}px, ${-8 + y * 0.08}px, 0px) rotateX(${-2 + y * 0.01}deg) rotateY(${-8 + x * 0.01}deg) skew(-15deg);`);
				})
				imgBoxRef?.current?.setAttribute('style', `transform:translate3d(${-30 + x * 0.03}px, ${-8 + y * 0.03}px, 0px) rotateX(${-2 + y * 0.01}deg) rotateY(${-8 + x * 0.01}deg);`);
				card_backGround?.setAttribute('style', `transform:translate3d(${-30 - x * 0.02}px, ${-8 - y * 0.02}px, 0px) rotateX(${-2 + y * 0.01}deg) rotateY(${-8 + x * 0.01}deg);`);
			}, 1));
		});
	}

	// 弹窗提示函数
	const showModal = () => {
		setIsModalVisible(true);
	};

	const handleOk = () => {
		setIsModalVisible(false);
	};

	let handleCancel = () => {
		setIsModalVisible(false);
	};

	useEffect(() => {
		let ua = navigator.userAgent;
		if (!ua.includes('Android') ) {
			hoverImage();
		}
	}, [])

	return (
		<div className="projectCard_box" ref={BoxRef}  >
			<h2 className="projectCard_title" ref={titleRef} >{title}</h2>
			<div className="projectCard">
				<div className="pj_content">
					<div className="img_container" ref={imgBoxRef}>
						<img src={imgSrc} alt="" onClick={showModal} />
					</div>
				</div>
			</div>
			<Modal
				title={title}
				visible={isModalVisible}
				onOk={handleOk}
				onCancel={handleCancel}
				footer={null}
				bodyStyle={
					{
						'fontSize': '20px',
						'textAlign': '2em'
					}
				}
			>
				<p>{introducition}</p>
			</Modal>
		</div>
	)
}
export default ProjectCard;
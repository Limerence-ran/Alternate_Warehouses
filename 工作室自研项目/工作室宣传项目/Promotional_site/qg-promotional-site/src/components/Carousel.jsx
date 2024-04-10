import React from 'react'
// import { throttle } from '../utils/throttle';
import { useEffect } from 'react';
import { message } from 'antd';
import PubSub from 'pubsub-js';
import { throttle } from '../utils/throttle';
import '../assets/styles/Carousel.css'


// 模运算
Number.prototype.mod = function(n) {
	return ((this % n) + n) % n;
}
let liNextArr = ['li-n-2','li-n-3','li-n-4','li-n-5','li-n-6','li-n-1']
let liPrevArr = ['li-p-6','li-p-1','li-p-2','li-p-3','li-p-4','li-p-5']
let index = 0;
var box 
,slide
,arraw
,lis 
,next 
,prev 
,timer
,flag ,myUl


export default function Carousel() {
	const nextChange = throttle((liArrParam,liPrevArrParam) => {
		liArrParam.unshift(liArrParam.pop());
		let newIndex = (++index).mod(6);
		liPrevArrParam = [];
		liArrParam.forEach((v,i) => {
	   
		   let index = Number(v.split('-')[2])

		   let result = (index-2)>0 ? index-2 : index-2+6;
		   
		   // v = `li-n-${result}`
		   liPrevArrParam.push(`li-p-${result}`)
		   
	   })
	   liPrevArr = [...liPrevArrParam];
   
	   PubSub.publish("left",newIndex)

   },700)

	const prevChange = throttle((liArrParam,liNextArrParam) => {
	
		liArrParam.push(liArrParam.shift());
		let newIndex = (--index).mod(6);
		liNextArrParam = [];
		liArrParam.forEach((v,i) => {
			
			let index = Number(v.split('-')[2])

			let result = (index+2)<=6 ? index+2 : index+2-6;
			
			// v = `li-n-${result}`
			liNextArrParam.push(`li-n-${result}`)
			
		})
		liNextArr = [...liNextArrParam];
		
	   PubSub.publish("right",newIndex)
   },700)

	const box_over =  () => {
		prev.classList.remove('arraw-out')
		next.classList.remove('arraw-out')
		prev.classList.add('arraw-in')
		next.classList.add('arraw-in')
	}
	const box_out = () => {
		next.classList.remove('arraw-in')
		prev.classList.remove('arraw-in')
		next.classList.add('arraw-out')
		prev.classList.add('arraw-out')
	}
	const next_click = throttle(() => {
		let childrenArr = Array.from(myUl.children)
		nextChange(liNextArr,liPrevArr);
		
		childrenArr.map((v,i) => {
			v.className = '';
			v?.classList.add(liNextArr[i]);
		})
	

	},700)


	const prev_click = throttle(() => {
		let childrenArr = Array.from(myUl.children)
		prevChange(liPrevArr,liNextArr);
		childrenArr.map((v,i) => {
			v.className = '';
			v?.classList.add(liPrevArr[i]);
		

		})	
	},700)
	// const prev_leave = () => {
	// 	clearInterval(timer);
	// }
	

	useEffect(() => {
		index = 0;
		liNextArr = ['li-n-2','li-n-3','li-n-4','li-n-5','li-n-6','li-n-1']
        liPrevArr = ['li-p-6','li-p-1','li-p-2','li-p-3','li-p-4','li-p-5']
		// 需要重新初始化以下数据
		box = document.querySelector('#turn-box');
		// slide = document.querySelector('.slide');
		arraw = document.querySelector('.arraw');
		// lis = document.querySelectorAll('li');
		next = document.querySelector('.next');
		prev = document.querySelector('.prev');
		myUl = document.querySelector('.my-ul');
		
		box?.addEventListener('mouseover',box_over,false);
		box?.addEventListener('mouseout',box_out,false);
		next?.addEventListener('click',next_click,false);
		// next?.addEventListener('mouseleave',next_leave,false);
		prev?.addEventListener('click',prev_click,false );
		// prev?.addEventListener('mouseleave',prev_leave,false);
		return () => {
			box?.removeEventListener('mouseover',box_over,false);
			box?.removeEventListener('mouseout',box_out,false);
			next?.removeEventListener('click',next_click,false);
			// next?.removeEventListener('mouseleave',next_leave,false);
			prev?.removeEventListener('click',prev_click,false );
			// prev?.removeEventListener('mouseleave',prev_leave,false);
			clearInterval(timer);
		};
	}, []);

  return (
    <>
	   	<div id="turn-box" >
		<div className="slide" >
			<div className="img-wrapper">
				<ul className='my-ul'>
					<li><span><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/students/xjy.jpg' alt=""/></span></li>
					<li><span><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/students/lq.jpg' alt=""/></span></li>
					<li><span><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/students/hyk.jpg' alt=""/></span></li>
					<li><span><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/students/zrp.jpg' alt=""/></span></li>
					<li><span><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/students/hzt.jpg' alt=""/></span></li>
					<li><span><img src='https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/students/gyg.jpg' alt=""/></span></li>

				</ul>
				<div className="arraw">
					<span href="#" className='prev'></span>
					<span href="#" className="next"></span>
					
				</div>
			</div>
		</div>
	</div>
    </>
  )
}



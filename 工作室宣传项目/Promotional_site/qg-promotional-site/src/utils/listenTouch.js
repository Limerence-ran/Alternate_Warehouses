//import { throttle } from "./throttle";
const bindSwipeEventY= (dom,throttleTime,upCallback,downCallback) => {
    // 手势实现的条件:滑动并且滑动距离大于50px
    let isMove=false;
    let startY=0;
    let distanceY=0;
    dom.addEventListener('touchstart',(e)=>{
        startY=e.touches[0].clientY;
    });
    dom.addEventListener('touchmove',e=>{
        isMove=true;
        let moveY=e.touches[0].clientY;
        distanceY=moveY-startY;
    });
    dom.addEventListener('touchend',(e)=>{
        // 滑动结束
        if(isMove && Math.abs(distanceY)>50){
            if(distanceY<0){
                downCallback && downCallback.call(this,e);
            }else{
                upCallback && upCallback.call(this,e);
            }
        }
        // 重置参数
        isMove=false;
        startY=0;
        distanceY=0;
    });
};
const bindSwipeEventX= (dom,throttleTime,rightCallback,leftCallback) => {
    // 手势实现的条件:滑动并且滑动距离大于50px
    let isMove=false;
    let startX=0;
    let distanceX=0;
    dom.addEventListener('touchstart',(e)=>{
        startX=e.touches[0].clientX;
    });
    dom.addEventListener('touchmove',e=>{
        isMove=true;
        let moveX=e.touches[0].clientX;
        distanceX=moveX-startX;
    });
    dom.addEventListener('touchend',(e)=>{
        // 滑动结束
        if(isMove && Math.abs(distanceX)>50){
            if(distanceX>0){
                rightCallback && rightCallback.call(this,e);
            }else{
                leftCallback && leftCallback.call(this,e);
            }
        }
        // 重置参数
        isMove=false;
        startX=0;
        distanceX=0;
    });
};

export {bindSwipeEventY,bindSwipeEventX}
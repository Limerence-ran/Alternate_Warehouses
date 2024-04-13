// 节流
const throttle = function(fn,t){ 
    let before = 0;   //函数第一次点击时的起始时间
    return (...args) => {     
        let now = new Date().getTime();  
        if(now - before > t ){  
            //用函数执行的时间差与所选的时间间隔比较，大于则执行
            fn.apply(this,args);
            before = now;
        }
    }
}

// 防抖，防止连续执行，每次点击执行都会重置时间
let debounce = function(fn,t){
    let timer = null;
    return function(){
        let first = !timer; 
        //如果定时器不存在，那么就说明是第一次执行(短时间内)
        if(timer){
            clearTimeout(timer); 
            //如果计时器存在，则清除后重新赋值。也就是重置间隔事件
        }
        if(first){
            fn.apply(this,arguments);  
            //如果是第一次那就直接执行
        }
        //否则执行下面语句，让timer在 t 时间后删除，也就是在t时间后才能继续执行函数
        timer = setTimeout(() => {
            timer = null;
        }, t);
    }
}
export {throttle,debounce};
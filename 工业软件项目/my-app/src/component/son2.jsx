import React, { useEffect, useRef } from "react";

// useRef 提供了一种在函数组件中存储任意可变值的方法，而且不会引起重新渲染
const ChildComponent2 = ({ value }) => {

    const prevValueRef = useRef(value);
    useEffect(() => {
        if (prevValueRef.current !== value) {
            console.log("value 发生了变化");
            // 在这里执行你想要执行的函数
        }
        prevValueRef.current = value;
    }, [value]);
    return (
        <div>{value}</div>
    );
};

export default ChildComponent2;
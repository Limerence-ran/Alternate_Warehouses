import React from 'react';
import ChildComponent from './son';
import ChildComponent2 from './son2';
import { useEffect, useState } from 'react';

// 1、将数据作为属性传递给子组件。在父组件中定义属性，并将其作为props传递给子组件，子组件可以通过props访问到这些数据。
// const ParentComponent = () => {
//     const data = 'Hello, child component!';
//     // useEffect(()=>{
//     //   console.log(message)
//     // },[])
//     return (
//         <div>
//             <ChildComponent message={data} />
//         </div>
//     );
// };

// export default ParentComponent

// 2、当多个组件需要共享相同的状态时，可以将状态提升到它们的最近共同父组件中，然后将状态通过props传递给子组件。
//父组件可以向子组件传递状态量和函数
// const ParentComponent = () => {
//     const [count, setCount] = useState(0);

//     const incrementCount = () => {
//         setCount(count + 1);
//     };

//     return (
//         <div>
//             <ChildComponent count={count} increment={incrementCount} />
//         </div>
//     );
// };

//3、使用上下文（Context）：上下文提供了一种在组件树中共享数据的方式，避免了通过props一层层传递的麻烦。通过创建上下文对象，在父组件中提供数据，并在子组件中访问它们
// import MyContext from './Context传值';
// const ParentComponent = () => {
//     const data = 'Hello, child component!';//只能传值，不能传函数
//     return (
//         <div>
//             <MyContext.Provider value={data}>
//                 <ChildComponent />
//             </MyContext.Provider>
//         </div>
//     );
// };

const ParentComponent = () => {
    const [value, setValue] = useState(""); // 要传递的值

    // 在这里定义处理值变化的函数
    const handleChange = (newValue) => {
        setValue(newValue);
        
    };
    console.log("value:", value)
    return (
        <div>
            <ChildComponent value={value} handleChange={handleChange} />
            <ChildComponent2 value={value} />
        </div>
    );
};
export default ParentComponent
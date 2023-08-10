import React from 'react';
// 1、
// const ChildComponent = (props) => {
//     console.log('props:',props)
//     return (
//         <div>
//             <p>{props.message}</p>
//         </div>
//     );
// };


//2、
// const ChildComponent = (props) => {
//     console.log("props:",props)
//     return (
//         <div>
//             <p>Count: {props.count}</p>
//             <button onClick={props.increment}>Increment</button>
//         </div>
//     );
// };

//3、
// import MyContext from './Context传值';
// const ChildComponent = () => {
//     return (
//         <div>
//             <MyContext.Consumer>
//                 {(value) => <p>{value}</p>}
//             </MyContext.Consumer>
//         </div>
//     );
// };

const ChildComponent = ({ value, handleChange }) => {
    const handleInputChange = (event) => {
        const newValue = event.target.value;
        handleChange(newValue);
    };

    return (
        <input type="text" value={value} onChange={handleInputChange} />
    );
};

export default ChildComponent;
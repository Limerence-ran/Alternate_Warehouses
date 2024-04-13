/**
 * 定义一个可重置的一次性函数
 * @param {func} fn 要作用的函数
 * @returns {object} {runOnce:func, reset:func }
 */
//实现在接收相同的函数时只执⾏⼀次
function resetableOnce(fn) {
    // TODO: 待补充代码
    let result;
    //runOnce ：⼀个函数，⽤于执⾏包装后的函数 fn 。当第⼀次调⽤ runOnce 时，它将执⾏ fn 函数，并将结果保存，之后的每次调⽤将直接返回之前计算的结果。注意：如果传⼊的函数（ fn ）不是同⼀个函数，则 resetableOnce 函数重新执⾏。
    function runOnce() {
        if (!result) {
            // 第一次调用时，result 为 undefined，执行 fn 函数并将结果保存
            result = fn.apply(this, arguments);
        }
        return result;
    }
    // reset ：⼀个函数，⽤于重置包装后的函数的状态。调⽤ reset 后可以让下⼀次调⽤ runOnce时，再次执⾏ fn 函数。
    function reset() {
        result = undefined;
    }
    // TODO: END
    return { runOnce, reset };
}

// 测试用例 1：resetableOnce（fn） fn 有参数的情况
// 定义一个加法函数
// function addNumbers(a, b) {
//     return a + b;
//   }

// const test1 = resetableOnce(addNumbers);
// console.log(test1.runOnce(2, 3)); // 输出: 5
// console.log(test1.runOnce(4, 5)); // 第二次调用不会执行加法操作，返回上次执行的值，输出: 5

// // 重置 once
// test1.reset();
// console.log(test1.runOnce(4, 5)); // 因为重置，addNumbers 再次执行，输出: 9

// // 测试用例 2：resetableOnce（fn） fn 无参数的情况
// let a = 10;
// let fn = () => {
// return a = a + 1;
// };
// const test2 = resetableOnce(fn); // 传入了不同的函数，之前的 once 不针对此函数生效。
// console.log(test2.runOnce()); //输出 11
// console.log(test2.runOnce()); // 输出 11
// test2.reset();
// console.log(test2.runOnce()); // 输出 12

// 以下代码为检测需要，请勿删除
try {
    module.exports = resetableOnce;
} catch (e) {}

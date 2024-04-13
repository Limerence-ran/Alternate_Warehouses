/**
 * @param {*} initialValue 初始值
 * @param {Array} sequence 由普通函数或 Promise 函数组成的数组
 * @return {Promise}
 */

//封装⼀个⽀持异步的 pipeline 管道函数，能够按顺序执⾏⼀系列异步操作，每个异步操作的结果将作为下⼀个异步操作的输⼊。
// 函数参数说明：
// initialValue ：管道的初始值（第⼀个异步步骤将以此值开始，即 sequence 中第⼀个函数的参数）。它是整个异步管道的起点。
// sequence ：是⼀个由具有返回值和可以传参的函数组成的数组，函数可以是普通函数也可以是Promise 函数。每个函数接收前⼀个步骤的输出（即该函数的参数是上⼀个函数的执⾏结果），并返回⼀个 Promise。这个数组定义了整个管道中的处理步骤和它们的顺序。
// 函数返回值说明：
// pipeline 函数返回⼀个 Promise ，这个 Promise 最终解析为整个管道执⾏完成后的结果。
const pipeline = (initialValue, sequence) => {
    // TODO: 待补充代码

    return new Promise((resolve, reject) => {
        sequence
            .reduce((p, fn) => {
                return p.then(fn).catch(reject);
            }, Promise.resolve(initialValue))
            .then(resolve)
            .catch(reject);
    });
};

// 检测需要，请勿删除
try {
    module.exports = { pipeline };
} catch {}

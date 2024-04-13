function myRace(iterable) {
    // TODO：待补充代码
    //在不使⽤ Promise.race 的情况下，完善其中的 TODO部分，⽬标如下：
    //myRace 接收的参数应为可迭代对象，可迭代对象包含数组（ Array ）、字符串（ String ）、 Set 、 Map 。
    //1. 如果不是可迭代对象则函数应该根据参数类型，返回⼀个拒绝的 Promise ，并抛出 TypeError 错误。格式为: 数据类型 is not iterable 。
    if (
        Array.isArray(iterable) ||
        iterable instanceof Set ||
        iterable instanceof Map ||
        typeof iterable === "string"
    ) {
        // 可迭代对象
        // 参数如果是可迭代对象，则 myRace 函数返回⼀个新的 Promise 对象，该对象代表了传⼊的可迭代对象中最先解决或拒绝的 Promise 的状态。
        return new Promise((resolve, reject) => {
            // 遍历可迭代对象
            console.log(iterable);
            iterable.forEach((item) => {
                // 判断是否为 Promise 对象
                if (item instanceof Promise) {
                    // 是 Promise 对象，则返回该 Promise 对象
                    item.then((result) => {
                        resolve(result);
                    });

                    item.catch((error) => {
                        reject(error);
                    });
                }
                // 不是 Promise 对象，则返回该 Promise 对象
                else {
                    resolve(item);
                    // 返回该 Promise 对象
                }
            });
        });
    } else {
        //不可迭代对象
        throw new TypeError(`${typeof iterable} is not iterable`);
    }
}

// 测试⽤例 1
myRace([1, 2]); //返回 Promise {<fulfilled>: 1}
// 测试⽤例 2
myRace("hello"); // 返回 Promise {<fulfilled>: 'h'}
// 测试⽤例 3
let promise1 = new Promise((resolve, reject) => {
    reject(1);
});
let promise2 = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(2);
    }, 1000);
});
myRace([promise1, promise2]).then(
    (res) => {
        console.log(res);
    },
    (reason) => {
        console.log(reason); // 输出 1
    }
);

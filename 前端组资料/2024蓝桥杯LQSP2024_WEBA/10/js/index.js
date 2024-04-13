/**
 * @param {iterable} iterable 可迭代对象
 * @return {promise}
 */
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

// 以下代码不需要修改
const random = Math.random();
const output = document.getElementById("output"); // 下载输出
const startButton = document.getElementById("startButton"); // 下载按钮
let isDownloading = false; //是否已经开始下载
// 定义不同下载源的下载任务，链接仅为函数模拟使用，不存在联网情况
const downloadTasks = [
    () => executeTask("quick", "https://quick.lanqiao.com/"),
    () => executeTask("learn", "https://learn.lanqiaoshiyan.com/"),
    () => executeTask("study", "https:/study.lanqiao.com/"),
];
// 下载进度
function simulateDownload(source, httpLink, result) {
    output.textContent = `The current download source ${source},npm http fetch GET 200  ${httpLink}/\n`;
    output.textContent += "Downloading packages...\n";

    setTimeout(() => {
        output.textContent += "Fetching package 1/5...\n";
    });

    setTimeout(() => {
        output.textContent += "Fetching package 2/5...\n";
    }, 500);

    setTimeout(() => {
        output.textContent += "Fetching package 3/5...\n";
    }, 1000);

    setTimeout(() => {
        output.textContent += "Fetching package 4/5...\n";
    }, 1500);

    setTimeout(() => {
        if (result == "complete") {
            output.textContent += "Fetching package 5/5...\n";
            output.textContent += `Download ${result}!\n`;
        } else {
            output.textContent += "Fetching package 4/5...\n";
            output.textContent += `Download ${result}!\n`;
        }
    }, 2000);
}

// 点击开始匹配最快的下载源进行下载，并拿到下载成功失败的结果
startButton.addEventListener("click", () => {
    startButton.style.display = "none";
    myRace(downloadTasks).then(
        ({ source, httpLink }) => {
            isDownloading = true;
            simulateDownload(source, httpLink, "complete");
        },
        ({ source, httpLink }) => {
            isDownloading = true;
            simulateDownload(source, httpLink, "fail");
        }
    );
});

// 匹配最快的下载源进行下载
function executeTask(source, httpLink) {
    return new Promise((resolve, reject) => {
        //executionTime 定义不同下载源的下载速度
        const executionTime = Math.random() * 300;
        // 设置需要下载的进度 100%
        let downloadPercentage = 100;
        const decreaseAmount = 100 / executionTime;

        if (random < 0.5) {
            setTimeout(() => {
                reject({ source, httpLink }); //下载失败
            }, executionTime);
        }
        interval = setInterval(() => {
            if (isDownloading) return clearInterval(interval);
            downloadPercentage -= decreaseAmount;
            if (downloadPercentage <= 0) {
                clearInterval(interval);
                resolve({ source, httpLink }); //下载成功
            }
        }, 10);
    });
}

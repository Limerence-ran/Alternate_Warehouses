const computerScreen = document.querySelector(".computer-screen");
// 在动画结束后添加类以隐藏进度条
computerScreen.addEventListener("animationend", () => {
    computerScreen.classList.add("hide-progress");
    computerScreen.remove();
});

// 电脑主体
const macbook = document.querySelector(".inner");
// 电脑屏幕
const screen = document.querySelector(".screen");
// 影子
const shadow = document.querySelector(".shadow");

// 动画函数1 - 屏幕后折+向左微微旋转
const ani1 = (element) => {
    const aniTime = 0.4;
    return new Promise((resolve) => {
        element.style.transition =
            screen.style.transition =
            shadow.style.transition =
                `transform ${aniTime}s ease`;
        screen.style.transform = "rotateX(50deg)";
        element.style.transform =
            "rotateX(-20deg) rotateY(-20deg) rotateZ(0deg)";
        element.style.backgroundPosition = "left bottom";
        shadow.style.transform = "rotateX(80deg) rotateY(10deg) rotateZ(0deg)";
        shadow.style.boxShadow = "0 0 60px 40px rgba(0, 0, 0, 0.3)";
        setTimeout(() => resolve(element), aniTime * 1000);
    });
};
// 动画函数2 - 向后旋转展示电脑底部，并合上电脑屏幕
const ani2 = (element) => {
    const aniTime = 0.8;
    return new Promise((resolve) => {
        element.style.transition =
            screen.style.transition =
            shadow.style.transition =
                `transform ${aniTime}s ease`;

        screen.style.transform = "rotateX(-90deg)";
        element.style.transform =
            "rotateX(50deg) rotateY(200deg) rotateZ(0deg)";
        element.style.backgroundPosition = "-150px top";
        shadow.style.transform =
            "rotateX(30deg) rotateY(25deg) rotateZ(-20deg)";
        shadow.style.boxShadow = "0 0 50px 30px rgba(0, 0, 0, 0.2)";
        setTimeout(() => resolve(element), aniTime * 1000);
    });
};

// 动画函数3 - 电脑向上仰起，展示电脑上盖
const ani3 = (element) => {
    const aniTime = 0.8;
    return new Promise((resolve) => {
        element.style.transition =
            screen.style.transition =
            shadow.style.transition =
                `transform ${aniTime}s ease`;

        screen.style.transform = "rotateX(15deg)";
        element.style.transform =
            "rotateX(-60deg) rotateY(150deg) rotateZ(0deg)";
        element.style.backgroundPosition = "left bottom";
        shadow.style.transform = "rotateX(80deg) rotateY(0deg) rotateZ(50deg)";
        shadow.style.boxShadow = "0 0 35px 15px rgba(0, 0, 0, 0.1)";
        setTimeout(() => resolve(element), aniTime * 1000);
    });
};
// 动画函数4 - 电脑向下缓慢放平，展示电脑侧面视角
const ani4 = (element) => {
    const aniTime = 1.2;
    return new Promise((resolve) => {
        element.style.transition =
            screen.style.transition =
            shadow.style.transition =
                `transform ${aniTime}s ease-out`;

        screen.style.transform = "rotateX(-40deg)";
        element.style.transform =
            "rotateX(-20deg) rotateY(130deg) rotateZ(0deg)";
        element.style.backgroundPosition = "right top";
        shadow.style.transform =
            "rotateX(80deg) rotateY(0deg) rotateZ(-50deg) translateX(30px)";
        shadow.style.boxShadow = "0 0 35px 15px rgba(0, 0, 0, 0.3)";
        setTimeout(() => resolve(element), aniTime * 1000);
    });
};
// 动画函数5 - 电脑旋转回正面
const ani5 = (element) => {
    const aniTime = 0.9;
    return new Promise((resolve) => {
        element.style.transition =
            screen.style.transition =
            shadow.style.transition =
                `transform ${aniTime}s ease`;

        screen.style.transform = "rotateX(0deg)";
        element.style.transform =
            "rotateX(-20deg) rotateY(360deg) rotateZ(0deg)";
        element.style.backgroundPosition = "right center";
        shadow.style.transform = "rotateX(80deg) rotateY(0deg) rotateZ(0deg)";
        shadow.style.boxShadow = "0 0 60px 40px rgba(0, 0, 0, 0.3)";
        setTimeout(() => resolve(element), aniTime * 1000);
    });
};

let canAnimation = true;
document.addEventListener("click", animationQuence);

async function animationQuence() {
    if (!canAnimation) {
        return;
    }
    canAnimation = false;
    await pipeline(macbook, [ani1, ani2, ani3, ani4, ani5]);

    // 动画序列结束后，初始化状态
    macbook.style.transition = "unset";
    screen.style.transition = "unset";
    screen.style.transform = "rotateX(0deg)";
    macbook.style.transform = "rotateX(-20deg) rotateY(0deg) rotateZ(0deg)";
    macbook.style.backgroundPosition = "right center";
    console.log("All steps completed!");
    canAnimation = true;
}

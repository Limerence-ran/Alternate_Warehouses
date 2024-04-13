// 获取元素
const layoutContainer = document.getElementById("layoutContainer"); // 布局元素
const layoutOptions = document.querySelectorAll(".layout-option"); // 三个模式元素
const switching = document.getElementById("switching"); // 模式按钮

// 显示模式
switching.addEventListener("click", function () {
    mode.style.display = "flex"; // 设置显示为flex布局
});

// 遍历选项
layoutOptions.forEach(function (option) {
    // 经典模式，浏览模式，工具模式点击事件
    option.addEventListener("click", function () {
        // TODO：待补充代码
        //实现被点击的模式元素（ class=layout-option ）处于激活状态，即添加⼀个类名（ active ），其他元素（ class=layout-option ）移除激活状态，即移除类名（ active ）

        // 移除其他选项的激活状态
        layoutOptions.forEach(function (option) {
            option.classList.remove("active");
        });

        // 添加当前选项的激活状态
        this.classList.add("active");

        // TODO：END
        //  以下代码无需修改
        // 根据不同选项进行布局处理
        if (this === layoutOptions[0]) {
            // Classic mode
            tool.style.display = "none"; // 隐藏工具
            layoutContainer.classList.add("two-column-layout"); // 添加两列布局类
            layoutContainer.classList.remove("three-column-layout"); // 移除三列布局类
        } else if (this === layoutOptions[1]) {
            // Browse mode
            tool.style.display = "none"; // 隐藏工具
            layoutContainer.classList.add("three-column-layout"); // 添加三列布局类
            layoutContainer.classList.remove("two-column-layout"); // 移除两列布局类
        } else if (this === layoutOptions[2]) {
            // Tool mode
            tool.style.display = "flex"; // 显示工具
        }
        mode.style.display = "none"; // 隐藏布局容器
    });
});

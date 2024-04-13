const fs = require("fs");
const path = require("path");

// 生成文件树
//generateTree 函数接收⼀个⽂件夹路径（ dirPath ）作为参数，返回值为包含该⽂件夹⽣成的⽂件树对象的数组，每个对象包含⼀个⽂件或⽂件夹的名称，以及其对应的⼦⽂件树（如果是⽂件夹）。函数返回值数据结构示例如下：
// [
// { name: 'app.js' }, // 因为不是⽂件夹，没有 children
// { name: 'js', children: [{name:"demo.js"},{name:"index.js"}] } // 只有⼀层⽂件夹
// { name: 'css', children: [{name:"index.css"},{name:"lib",children:[{name:'a.css'}]}]
// //多层⽂件夹，⼦⽂件树递归显示
// ]
function generateTree(dirPath) {
    // TODO：待补充代码
    //提示： fs.statSync(filePath).isDirectory() 根据给定的 filePath 路径返回⼀个布尔值，表示该路径是否为⽬录。 fs.readdirSync(dirPath) 是读取 dirPath ⽬录下的⽂件和⼦⽬录，并以数组的形式返回它们的名称列表。
    // 读取目录下的文件和子目录
    const files = fs.readdirSync(dirPath);
    const tree = [];
    // 遍历文件和子目录
    for (const file of files) {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);

        // 如果是目录，递归调用 generateTree 函数
        if (stats.isDirectory()) {
            const subTree = generateTree(filePath);
            tree.push({ name: file, children: subTree });
        }
        // 如果是文件，直接添加到 tree 数组中
        else {
            tree.push({ name: file });
        }
    }

    return tree;
}

// 根据数据生成 tree 命令
function generateDirectoryStructure(data, indent = "") {
    let result = "";
    if (!Array.isArray(data)) throw Error("返回的数据不是数组");
    for (let i = 0; i < data.length; i++) {
        const item = data[i];
        const name = item.name;
        const isLast = i === data.length - 1;

        result += `${indent}${isLast ? "└──" : "├──"} ${name}\n`;

        if (item.children) {
            const childIndent = indent + (isLast ? "    " : "│   ");
            result += generateDirectoryStructure(item.children, childIndent);
        }
    }

    return result;
}

// 读取指定文件夹，传递本题目文件夹
const directoryPath = __dirname;
const tree = generateTree(directoryPath);
const treem = generateDirectoryStructure(tree);
console.log(treem);

// 以下代码检测需要，请勿删除
module.exports = generateTree;

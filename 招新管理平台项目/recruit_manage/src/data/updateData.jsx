// 性别选择器
const sex = [
    {
        id: 0,
        key: 0,
        children: '男',
        value: 'sex1',
        bgc: "rgba(240, 241, 242)",
        width: "55%",
        // height: "28px",
        borderRadius: "5px",
    },
    {
        id: 1,
        key: 1,

        children: '女',
        value: 'sex2'
    }
]

// 组别选择器
const group = [
    {
        id:0,
        key:0,
        children:"全部",
        value:"group1",
        bgc: "rgba(240, 241, 242)",
        width: "55%",
        // height: "28px",
        borderRadius: "5px"
    },
    {
        id:1,
        key: 1,
        children:"人工智能组",
        value:"group2"
    },
    {
        id:2,
        key: 2,
        children:"工业软件-前端组",
        value:"group3"
    },
    {
        id:3,
        key: 3,
        children:"工业软件-后台组",
        value:"group4"
    },
    {
        id:4,
        key: 4,
        children:"嵌入式组",
        value:"group5"
    },
    {
        id:5,
        key: 5,
        children:"图形组",
        value:"group6"
    },
    {
        id:6,
        key: 6,
        children:"移动组",
        value:"group7"
    },
    {
        id:7,
        key: 7,
        children:"设计组",
        value:"group8",
    }
]

// 年级选择器
const grade = [
    {
        id:0,
        key: 0,
        children:"大一",
        value:"grade1",
        bgc: "rgba(240, 241, 242)",
        width: "55%",
        // height: "28px",
        borderRadius: "5px"
    },
    {
        id:1,
        key: 1,
        children:"大二",
        value:"grade2",
    },
    {
        id:2,
        key: 2,
        children:"大三",
        value:"grade3",
    },
    {
        id:3,
        key: 3,
        children:"大四",
        value:"grade3",
    }
]

// 不同大小的输入框
const inputSize_150 = [
    {
        id: 0,
        width: "55%",
        height: "100%"
    }
]
const inputSize_96 = [
    {
        id: 0,
        width: "40%",
        height: "100%"
    }
]
const inputSize_200 = [
    {
        id: 0,
        width: "70%",
        height: "100%"
    }
]
const inputSize_590 = [
    {
        id: 0,
        width: "65%",
        height: "100%"
    }
]

// 不同宽度的文本框
const textSize_500 = [
    {
        id: 0,
        width: "100%",
        height: "6vw",
        minHeight: "70px"
    }
]

const textSize_1000 = [
    {
        id: 0,
        width: "100%",
        height: "8vw",
        minHeight: "80px"
    }
]
export {sex,group,grade,inputSize_150,inputSize_96,inputSize_200,inputSize_590,textSize_500,textSize_1000} ;
// 表头
const columns = [
    {
        title: '姓名',
        dataIndex: 'newerName'
    },
    {
        title: '班级',
        dataIndex: 'newerClass'
    },
    {
        title: '学号',
        dataIndex: 'newerStudentId'
    },
    {
        title: '组别',
        dataIndex: 'newerGroup'
    },
    {
        title: '评价',
        dataIndex: 'assess'
    },
    {
        title:'考试轮次',
        dataIndex: 'examRound'
    },
    {
        title: '总分',
        dataIndex: 'examScoreAll',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.grade - b.grade,
    },
    {
        title: '是否通过',
        dataIndex: 'isPass'
    },
    {
        title: '通知状态',
        dataIndex: 'isNotice'
    },
    {
        title: '操作',
        dataIndex: 'operation'
    }
]

const College = [
    {
        id: 0,
        key: 0,
        children: '全部',
        value: '全部'
    },
    {
        id:1,
        key: 1,
        children: '计算机学院',
        value: '计算机学院'
    },
    {
        id:2,
        key: 2,
        children: '自动化学院',
        value: '自动化学院'
    },{
        id:3,
        key: 3,
        children: '信息工程学院',
        value: '信息工程学院'
    }
    ,{
        id:4,
        key: 4,
        children: '物理与光电工程学院',
        value: '物理与光电工程学院'
    },
    {
        id:5,
        key: 5,
        children: '外国语学院',
        value: '外国语学院'
    },
    {
        id:6,
        key: 6,
        children: '机电工程学院',
        value: '机电工程学院'
    },
    {
        id:7,
        key: 7,
        children: '土木与交通工程学院',
        value: '土木与交通工程学院'
    },
    {
        id:8,
        key: 8,
        children: '轻工化工学院',
        value: '轻工化工学院'
    },
    {
        id:9,
        key: 9,
        children: '材料与能源学院',
        value: '材料与能源学院'
    },
    {
        id:10,
        key: 10,
        children: '管理学院',
        value: '管理学院'
    },
    {
        id:11,
        key: 11,
        children: '环境科学与工程学院',
        value: '环境科学与工程学院'
    },
    {
        id:12,
        key: 12,
        children: '艺术与设计学院',
        value: '艺术与设计学院'
    },
    {
        id:13,
        key: 13,
        children: '法学院',
        value: '法学院'
    },
    {
        id:14,
        key: 14,
        children: '继续教育学院',
        value: '继续教育学院'
    },
    {
        id:15,
        key: 15,
        children: '数学与统计学院',
        value: '数学与统计学院'
    },
    {
        id:16,
        key: 16,
        children: '马克思主义学院',
        value: '马克思主义学院'
    },
    {
        id:17,
        key:17,
        children: '建筑与城市规划学院',
        value: '建筑与城市规划学院'
    },
    {
        id:18,
        key: 18,
        children: '经济与贸易学院',
        value: '经济与贸易学院'
    },
    {
        id:19,
        key: 19,
        children: '生物医药学院',
        value: '生物医药学院'
    }
    ,
    {
        id:20,
        key: 20,
        children: '集成电路学院',
        value: '集成电路学院'
    },
    {
        id:21,
        key: 21,
        children: '国际教育学院',
        value: '国际教育学院'
    },
    {
        id:22,
        key: 22,
        children: '生态环境与资源学院',
        value: '生态环境与资源学院'
    },
    {
        id:23,
        key: 23,
        children: '先进制造学院',
        value: '先进制造学院'
    }
];

const TestType = [
    {
        key:0,
        children:"笔试",
        value:"笔试"
    },
    {
        key:1,
        children:"一轮面试",
        value:"一轮面试"
    },
    {
        key:2,
        children:"二轮面试",
        value:"二轮面试"
    }
]

const Pass = [
    {
        key: -1,
        children: "已签到但不在场",
        value: "已签到但不在场"
    },
    {
        key:0,
        children:"未面试",
        value:"未面试"
    },
    {
        key:1,
        children:"已通过",
        value:"已通过"
    },
    {
        key:2,
        children:"未通过",
        value:"未通过"
    },
    {
        key: 3,
        children: "面试中",
        value: "面试中"
    },
    {
        key: 4,
        children: "待定",
        value: "待定"
    }
]

const Notice = [
    {
        key:0,
        children:"已通知",
        value:"已通知"
    },
    {
        key:1,
        children:"未通知",
        value:"未通知"
    },
]

const dimension = [
    {
        name:"grade1",
        label:"性格态度",
        weight:0.5
    },
    {
        name:"grade2",
        label:"学习能力",
        weight:0.3
    },
    {
        name:"grade3",
        label:"基础知识",
        weight:0.2
    },
]





export {columns,College,TestType,Pass,Notice,dimension}
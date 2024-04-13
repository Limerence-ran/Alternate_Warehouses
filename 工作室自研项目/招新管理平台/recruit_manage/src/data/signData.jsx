// 选择器
const facultyData = [
    {
        id: -1,
        key: -1,
        children: '全部',
        value: 'faculty0',
        bgc: "rgba(240, 241, 242)",
        borderRadius: "5px"
    },
    {
        id: 0,
        key: 0,
        children: '计算机学院',
        value: 'faculty1'
    },
    {
        id:1,
        key: 1,
        children: '自动化学院',
        value: 'faculty2'
    },{
        id:2,
        key: 2,
        children: '信息工程学院',
        value: 'faculty3'
    }
    ,{
        id:3,
        key: 3,
        children: '物理与光电工程学院',
        value: 'faculty4'
    },
    {
        id:4,
        key: 4,
        children: '外国语学院',
        value: 'faculty5'
    },
    {
        id:5,
        key: 5,
        children: '机电工程学院',
        value: 'faculty6'
    },
    {
        id:6,
        key: 6,
        children: '土木与交通工程学院',
        value: 'faculty7'
    },
    {
        id:7,
        key: 7,
        children: '轻工化工学院',
        value: 'faculty8'
    },
    {
        id:8,
        key: 8,
        children: '材料与能源学院',
        value: 'faculty9'
    },
    {
        id:9,
        key: 9,
        children: '管理学院',
        value: 'faculty10'
    },
    {
        id:10,
        key: 10,
        children: '环境科学与工程学院',
        value: 'faculty11'
    },
    {
        id:12,
        key: 12,
        children: '艺术与设计学院',
        value: 'faculty13'
    },
    {
        id:13,
        key: 13,
        children: '法学院',
        value: 'faculty14'
    },
    {
        id:14,
        key: 14,
        children: '继续教育学院',
        value: 'faculty15'
    },
    {
        id:15,
        key: 15,
        children: '数学与统计学院',
        value: 'faculty16'
    },
    {
        id:16,
        key: 16,
        children: '马克思主义学院',
        value: 'faculty17'
    },
    {
        id:17,
        key:17,
        children: '建筑与城市规划学院',
        value: 'faculty18'
    },
    {
        id:18,
        key: 18,
        children: '经济与贸易学院',
        value: 'faculty19'
    },
    {
        id:19,
        key: 19,
        children: '生物医药学院',
        value: 'faculty20'
    }
    ,
    {
        id:20,
        key: 20,
        children: '集成电路学院',
        value: 'faculty21'
    },
    {
        id:21,
        key: 21,
        children: '国际教育学院',
        value: 'faculty22'
    },
    {
        id:22,
        key: 22,
        children: '生态环境与资源学院',
        value: 'faculty23'
    },
    {
        id:23,
        key: 23,
        children: '先进制造学院',
        value: 'faculty24'
    }
]

const groupData = [
    {
        id:2,
        key: 2,
        children:"全部",
        value:"group1",
        bgc: "rgba(240, 241, 242)",
        borderRadius: "5px"
    },
    {
        id:3,
        key: 3,
        children:"人工智能组",
        value:"group2"
    },
    {
        id:4,
        key: 4,
        children:"工业软件-前端组",
        value:"group3"
    },
    {
        id:5,
        key: 5,
        children:"工业软件-后台组",
        value:"group4"
    },
    {
        id:6,
        key: 6,
        children:"嵌入式组",
        value:"group5"
    },
    {
        id:7,
        key: 7,
        children:"图形组",
        value:"group6",
    },
    {
        id:8,
        key: 8,
        children:"移动组",
        value:"group7",
    },
    {
        id:9,
        key: 9,
        children:"设计师组",
        value:"group8",
    }
]

const rStatusData = [
    {
        id: 10,
        key: 10,
        children: '全部',
        value: 'rStatus0',
        bgc: "rgba(240, 241, 242)",
        borderRadius: "5px"
    },
    {
        id: 11,
        key: 11,
        children: '已填写',
        value: 'rStatus1',
    },
    {
        id: 12,
        key: 12,
        children: '未填写',
        value: 'rStatus2',
    }
]

// 表头
const columns = [
    {
        title: '姓名',
        dataIndex: 'newerName'
    },
    {
        title: '学院',
        dataIndex: 'newerFaculty'
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
        title: '电话',
        dataIndex: 'newerPhone',
    },
    {
        title: '简历状态',
        dataIndex: 'resumeStatus'
    },
    {
        title: '操作',
        dataIndex: 'operation'
    }
]
export {facultyData,groupData,rStatusData,columns}
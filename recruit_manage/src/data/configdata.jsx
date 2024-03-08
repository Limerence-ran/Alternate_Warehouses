const  FirstNav = [
    {
        id:0,
        name:"数据统计",
        path:"/datashow"
    },
    {
        id:1,
        name:"报名信息",
        path:"/signup"
    },
    {
        id:2,
        name:"考试结果",
        path:"/result"
    },
    {
        id:3,
        name:"日志记录",
        path:"/log"
    },
    {
        id:4,
        name:"管理员注册",
        path:"/register"
    },
]

const Groups = [
    {
        key:0,
        children:"全部",
        value:"全部"
    },
    {
        key:1,
        children:"人工智能组",
        value:"人工智能组"
    },
    {
        key:2,
        children:"工业软件-前端组",
        value:"工业软件-前端组"
    },
    {
        key:3,
        children:"工业软件-后台组",
        value:"工业软件-后台组"
    },
    {
        key:4,
        children:"嵌入式组",
        value:"嵌入式组"
    },
    {
        key:5,
        children:"图形组",
        value:"图形组"
    },
    {
        key:6,
        children:"移动组",
        value:"移动组"
    },
    {
        key:7,
        children:"设计师组",
        value:"设计组"
    },
]


const SystemTableColumn = [
    {
        title: '序号',
        dataIndex: 'serial'
    },
    {
        title: '级别',
        dataIndex: 'level'
    },
    {
        title: '创建日期',
        dataIndex: 'date'
    },
    {
        title: '信息输出',
        dataIndex: 'message'
    },
    {
        title: '操作',
        dataIndex: 'operation'
    }
]

const GroupColors = ['#4edbb2','#a593ff','#78d1ff','#3b86ff','#ffcd2f','#fc594c','#ff7a8f'];

export {FirstNav,Groups,GroupColors,SystemTableColumn};
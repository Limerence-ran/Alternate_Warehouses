// import zxt from 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/zxt.png'
// import dundun from 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/dundun.png'
// import graphdata from 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/graphdata.png'
// import taxi from 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/taxi.png'
// import xt from 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/xt.png'


const projects = [
    {
        title: "智行通-盲人出行之眸",
        imgSrc: 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/zxt.png',
        introducition: "本项目志在为全社会提供一份解决盲人安全出行难题的方案，我们通过新型智能拐杖帮助盲人规避障碍物，支持自动急救报警，关联手机App提供实时出行信息给盲人亲属，并设大数据平台汇集广大盲人出行数据，统计出高频出行地点，联合志愿团队设置线下服务点对盲人出行突发状况做精准处理，同时可提供数据给政府机关及公益机构，调动各方力量，共同保障盲人的出行安全。"
    },
    {
        title: "基于机器学习与视觉的作业环境警报定位系统",
        imgSrc: 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/xt.png',
        introducition: "作品基于图像处理，机器视觉和嵌入式Linux开发等技术实现了一款软硬件结合的系统。以减少安全隐患、检测工人安全状态、发送险情报警和定位事故人员位置为核心切入点，实现了一款安全有效的定位急救系统。本作品在多个学术竞赛中斩获佳绩，共获得两项国家级奖项，三项省级奖项，得到了专家评委的一致认可。"
    },
    {
        title: "基于出租车大数据的指挥城市区域吸引力研究",
        imgSrc: 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/taxi.png',
        introducition: '基于海量出租车大数据进行分析预测，以及吸引力研究。相关论文"AttractRank: District Attraction Ranking Analysis Based on Taxi Big Data"在IEEE Transactions on Industrial Informatics (IEEE TII)(中科院一区，JCRQ1，IF=9.112)发表。共获得各类科技竞赛奖项11项，其中国际级3项，国家级4项，省级4项，同时也获得国家级大创立项。'
    },
    {
        title: "逐梦冰雪 ",
        imgSrc: 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/dundun.png',
        introducition: "本项目计划通过游戏这一新型传播媒介宣传2022年北京冬奥会，让参与者亲身参与到冬奥会比赛项目中，一边体验比赛项目，一边学习北京冬奥会知识。通过提供多方面的感受和寓教于乐的方式，达到更好的宣传效果。"
    },
    {
        title: "图数据挖掘",
        imgSrc: 'https://qg-newer.oss-cn-shenzhen.aliyuncs.com/images/graphdata.png',
        introducition: "本项目实现了一个图数据挖掘算法可视化系统，通过数据挖掘、信息处理、信息计量和图形绘制等直观的方式展示出任务关系图的拓扑结构，拓扑属性，可能存在的链接关系等，揭示社交网络的动态发展规律，为社交网络的研究提供切实的、有价值的参考。"
    },
]

const projectsList = [
    {
        title: '构建民航知识图谱及语义查询',
        introducition:'本项目通过输入海量民航业资料、客服资料、民航信息系统运维资料等，挖掘有用信息，并将互相关联的信息建立链接，构建并可视化知识图谱以汇总、融合知识；建立基于语义的查询系统，自动化完成问答业务，推进民航旅客服务智能化发展。'
    },
    {
        title: '可重构模块化机器人编程平台 ',
        introducition:'本项目通过使用基于内容的推荐算法，模块化机器人以及增强现实和人工智能技术，使得STEAM教育更加直观且普惠，让更多的孩子享受到编程乐趣，启发他们对编程的思考，从而为国内STEAM教育推广工作做出贡献。'
    },
    {
        title: '候鸟的奇妙冒险',
        introducition:'本项目是一款模拟候鸟迁徙的游戏。利用游戏宣传候鸟保护，让被宣传者亲身参与到候鸟的迁徙过程中来，让其能有更多方位的感受，游戏面向社会广大人群，其具有一定的公益宣传性质，同时还有一定的趣味性，能够让玩家在游戏中得到乐趣的同时，激发玩家对候鸟保护的思考，继而达到更好的环保宣传效果。'
    },
    {
        title: '智能车辆协调仿真平台',
        introducition:'智能车辆仿真平台使用Unity3D引擎制作,是一个面向广大研究多无人汽车协调切换(即在不停车解决车道切换)等问题的开发者的仿真平台,拟改进当前仿真的方式,使仿真的方式更加便捷更加简单以及仿真的效果更为直观。'
    },
    {
        title: 'ForWhale',
        introducition:'ForWhale软件是一款面向社会广大人群的模拟类游戏。在ForWhale软件的模拟世界中，玩家扮演“海洋守护协会”的船只阻碍捕鲸船的捕鲸行为，同时与“自卫队”周旋以逃脱其追捕。能够让玩家在游戏中得到乐趣的同时，激发玩家对鲸鱼保护的思考，继而引发玩家对海洋保护的思考。同时呼吁大家拒绝鲸制品，保护鲸鱼和海洋生态，没有买卖就没有杀害。'
    },
    {
        title: '家庭用电智能监督管理系统',
        introducition:'本项目以排插为硬件载体，研发一套有利于控制监测家庭用电的监督管理系统，其包括一个新型的智能排插，以及配套使用的微信小程序终端，并且对节能推荐的实现做了详细的算法设计分析与研究。本系统不仅能够实时监测用电器的使用情况，还能查看过去用电量、预测未来用电量、轻松控制各类家电的开关、给出人性化的节能推荐，为用户提供了家电使用新体验。'
    },
    {
        title: '基于压感数据采集的睡眠监测设备',
        introducition:'本作品提出了基于压感数据采集分析用户睡眠姿态时候心率和呼吸速率的方法，该方法对用户的睡眠侵入性小，并且具有稳定的数据准确性，结合数据分析模型对采集到的数据进行分析，得出针对于用户睡眠质量、 睡眠环境、睡眠习惯的各项睡眠报告，并提出睡眠优化建议，配合小程序平台进行显示，形成一个完善的、对用户无拘束行的睡眠检测体系。'
    },
    {
        title: '基于Kinect的康复训练评估系统',
        introducition:'本发明实施例公开了一种针对康复动作的评分系统，能够针对性的实时评估康复动作的相似度，给出相应评分。本系统针对康复动作的特点采用针对性的骨骼权值分配方法，并利用DTW算法计算用户动作的评分，具有针对性强，速度快的特点。'
    },
]

export {projects,projectsList};
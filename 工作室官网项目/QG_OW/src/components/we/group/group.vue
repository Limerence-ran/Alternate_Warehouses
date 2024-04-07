<style lang="scss" scoped>
.group-container {
  position: relative;
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 90vh;
  
  >div {
    position: relative;
    width: 50vw;
    height: 100%;
    overflow: hidden;
  }

  .choice-group {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    .choice-container {
      position: relative;
      width: 8.1rem;
      height: 8rem;
      
      span {
        position: relative;
        cursor: pointer;
        display: block;
        font-size: 0.24rem;
        margin-top: .64rem;
        text-align: start;
        transition: .5s ease all;
        .intro {
          font-size:16px;
        }

        div {
          position: absolute;
          z-index: -1;
          left: -.2rem;
          top: 50%;
          transform: translateY(-50%);
          width: 100%;
          height: .24rem;
        }
      }

      .active {
        font-size: 0.48rem;
      }
    }
    .choice-container::after {
      content: "";
      display: block;
      clear: both;
    }
  }

}
.group-container {

}
</style>

<template>
  <div class="group-container">
    <div class="choice-group">
      <div class="choice-container">
        <span 
          v-for="(item, index) in groupList"
          :key="item.name"
          :data-index="index"
          :class="index == currentIndex ? 'active' : ''"
          @click="changeGroup"
        >
        {{ item.name }}
        <div
          v-show="index == currentIndex"
          :style="'background-color: ' + item.toColor"
        ></div>
        </span>
      </div>
    </div>
    <div class="show-group">
      <list
        v-for="(item, index) in groupList"
        :key="item.name"
        :data-index="index"
        :floatIconUrl="item.floatIconUrl"
        :zIndex="item.zIndex"
        :fromColor="item.fromColor"
        :toColor="item.toColor"
        :width="item.width"
        :url="item.url"
        :intro="item.intro"
        :isActive="currentIndex === index"
      ></list>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import list from './list/list.vue'
import Component from 'vue-class-component'

@Component({
  components: {
    list
  }
})
export default class Group extends Vue {
  currentIndex: number = -1;

  groupList: Array<any> = [
    {
      name: '工业软件-前端组',
      intro: '工业软件-前端组主要负责开发Web页面、小程序等客户端应用，结合各类主流组件或图形API实现丰富的需求，还与其他小组协同开发，达到 1+1 > 2 的效果。另外，作为工业软件项目的主要开发小组之一，我们运用前端安全防护技术，结合对交互设计和用户体验的深入研究，提高项目的安全性和用户体验，帮助企业提质增效，保障工业信息安全。经过QG工作室的磨练，组内许多成员成长为优秀前端工程师，目前就职于微信、腾讯、字节跳动、阿里巴巴等知名企业。',
      url: require('@/assets/icons/front.png'),
      activeUrl: require('@/assets/icons/front_small.png'),
      bgUrl: require('@/assets/images/we/group/front.png'),
      floatIconUrl: require('@/assets/icons/triangle_red.png'),
      fromColor: '#ED3E46',
      toColor: '#ff9c9c',
      width: 4,
      zIndex: 1,
    },
    {
      name: '工业软件-后台组',
      intro: '工业软件-后台组专精于服务端开发，负责对数据和信息进行处理，作为桥梁打通各个小组的联系，提供高性能、高可用、高扩展的后端服务。在信息安全、权限管理、数据处理、数据存取和实时通讯等方面有深入的研究，并落地应用于工业软件的授权和升级领域。工作室后台以 Java 语言为主，Go 语言为辅，深入各式中间件、高性能架构、分布式系统等，成功为工作室多数项目提供了优质服务，慢慢成长为一支团结可靠的队伍。',
      url: require('@/assets/icons/end.png'),
      activeUrl: require('@/assets/icons/end_small.png'),
      bgUrl: require('@/assets/images/we/group/end.png'),
      floatIconUrl: require('@/assets/icons/tripe_circle blue.png'),
      fromColor: '#2b8be1',
      toColor: '#97c4fe',
      width: 4,
      zIndex: 1
    },
    {
      name: '人工智能组',
      intro: '人工智能小组现主要的研究方向为“分布式人工智能（Multi-agent System）”、“差分隐私（Differential Privacy）”及“智能交通与交通大数据（车联网）”等三大前沿领域，契合学校和世界的发展潮流。本小组紧跟学校战略目标，承担了各类研究项目 50 余项，产出了学术论文 40 余篇。其中， 2021 年3月发表了一篇中科院 SCI 一区期刊论文，且于同年 6 月份进入 ESI 高被引论文；同时 2021 年 12 月已投稿中科院 SCI 一区、CCF A 类期刊论文。相关论文成果已转化为系统并部署上云，以供人们使用与浏览。人工智能领域作为一个新兴领域，正逐渐渗透到我们生活中的每个角落，深刻改变着我们所处的世界，让我们携手共进，在人工智能领域开辟一片新天地！',
      url: require('@/assets/icons/data.png'),
      activeUrl: require('@/assets/icons/data_small.png'),
      bgUrl: require('@/assets/images/we/group/data.png'),
      floatIconUrl: require('@/assets/icons/line.png'),
      fromColor: '#EC502C',
      toColor: '#f5c295',
      width: 4,
      zIndex: 8
    },
    {
      name: '嵌入式组',
      intro: '作为计算机学院历史最悠久、实力最强的嵌入式开发团队。小组内部有着丰富的开发资源及技术传承，主要研究方向为基于Openharmony、ARM+LINUX平台以及嵌入式AI的车联网编队等嵌入式软件开发方向。小组的学习方式主要是多组联动、以项目为驱动，目前已立项、完成多项国家级大创项目，小组的学习之旅伴随着大量的比赛，近年来在与其他小组合作中获得过许多重要奖项，并且多次刷新了学校在获奖层次的记录。如：第十四届“挑战杯”全国大学生课外学术科技作品竞赛“智慧城市”专项赛决赛特等奖。',
      url: require('@/assets/icons/embedded.png'),
      activeUrl: require('@/assets/icons/embedded_small.png'),
      bgUrl: require('@/assets/images/we/group/embedded.png'),
      floatIconUrl: require('@/assets/icons/square.png'),
      fromColor: '#37AC47',
      toColor: '#9ad29c',
      width: 4,
      zIndex: 1
    },
    {
      name: '移动组',
      intro: '移动组主攻Android APP开发方向，同时将HarmonyOS纳入学习和研究的范畴。APP作为信息时代不可或缺的数据获取平台，不仅大幅度提高了数据流通的速度和广度，而且将生活的各个领域连接起来，满足了用户各种日常需求。移动组主要使用 Java 语言 与 Kotlin 语言，开发过程中我们会灵活运用各种主流框架实现APP的界面显示，动画交互，数据库存取等功能。我们会与其他小组协同开发，打造出各种高效可靠的移动应用程序。',
      url: require('@/assets/icons/mobile.png'),
      activeUrl: require('@/assets/icons/mobile_small.png'),
      bgUrl: require('@/assets/images/we/group/mobile.png'),
      floatIconUrl: require('@/assets/icons/rectangle_yellow.png'),
      fromColor: '#b5a502',
      toColor: '#fbf8ab',
      width: 2.5,
      zIndex: 1
    },
    {
      name: '设计师组',
      intro: '设计组的研究方向为网页、APP以及小程序的界面设计以及交互。近年来，设计组也在进行3D建模设计的研究和用户体验的调研，通过组员的设计素养、对人机交互的设计能力完成其他组需要的设计。设计组与其他组相辅相成，携手在各大赛事上都取得了不错的成绩。智能打印机、智行通、逐梦冰雪等代表作品都斩获了不少奖项。',
      url: require('@/assets/icons/design.png'),
      activeUrl: require('@/assets/icons/design_small.png'),
      bgUrl: require('@/assets/images/we/group/design.png'),
      floatIconUrl: require('@/assets/icons/circle_pink.png'),
      fromColor: '#FC71A4',
      toColor: '#ffd8d8',
      width: 3.5,
      zIndex: 1
    },
    {
      name: '图形组',
      intro: '图形组主攻的方向是计算机图形学与AR/VR开发。小组以计算机图形学作为主要的学习方向，计算机图形学包括渲染，模拟，物理等技术，通过DirectX 11理解底层图形的渲染原理，使用Unity3D引擎用于开发AR/VR虚拟现实应用程序、仿真平台以及其他交互式媒体应用程序，同时我们组也有研究游戏开发的相关图形渲染技术，并参加相应的游戏开发比赛。',
      url: require('@/assets/icons/image.png'),
      activeUrl: require('@/assets/icons/image_small.png'),
      bgUrl: require('@/assets/images/we/group/game.png'),
      floatIconUrl: require('@/assets/icons/diamond_gold.png'),
      fromColor: '#EC502C',
      toColor: '#d1c88c',
      width: 3,
      zIndex: 1
    }
  ];

  groupNameList: any = [];

  isMoving: boolean = false;

  mounted() {
    // (<any>document.getElementsByClassName('el-carousel__indicators')[0]).style.display = 'none';
    this.groupNameList = []
    for (let i = 0; i < this.groupList.length; i++) {
      let name = this.groupList[i].name
      this.groupNameList.push({
        name
      })
    };
    this.currentIndex = 0
  }

  changeGroup(event: any) {
    if (this.isMoving) return ;
    let index = event.target.getAttribute('data-index');
    let temp = this.currentIndex;
    if (!index) return ;
    this.groupList[temp].zIndex = 9;
    this.groupList[parseInt(index)].zIndex = 999;
    this.$nextTick(() => {
      this.currentIndex = parseInt(index);
    })
    this.isMoving = true
    setTimeout(() => {
      this.isMoving = false;
    }, 1500)
    // (<any>this.$children[0]).setActiveItem(this.currentIndex);
  }
}
</script>

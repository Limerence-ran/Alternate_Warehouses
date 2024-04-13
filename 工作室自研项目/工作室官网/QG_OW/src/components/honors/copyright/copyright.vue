<style lang="scss" scoped>
%clear-both::after {
  content: "";
  display: block;
  clear: both;
}

.award-container {
  @extend %clear-both;

  position: relative;
  width: 100%;
  margin-bottom: .5rem;
  overflow: hidden;
  text-align: start;
  padding-bottom: 0.4rem;

  .title {
    display: block;
    margin-top: 0.4rem;
    font-size: 0.36rem;
    color: #2a2a2a;
    text-align: center;
  }

  .header {
    width: 100%;
    height: 1.28rem;
    display: flex;
    justify-content: center;

    span {
      display: block;
      font-size: .24rem;
      height: 1.28rem;
      line-height: 1.28rem;
      color: #707070;
    }
    .award-main {
      @extend %clear-both;

      position: relative;
      width: 100%;
    }
  }
}
.page-container {
  margin-top: 0.3rem;
  text-align: center;
}
</style>

<template>
  <div class="award-container">
    <span class="title">专利</span>
    <div class="header">
      <span
        v-for="(item) in headerList"
        :key="item.value"
        :style="'width: ' + item.width + 'rem;'"
      >{{ item.value }}</span>
    </div>
    <div class="award-main">
    <list
      v-for="(item, index) in dispalyList"
      :key="index + 1"
      :index="index + 1"
      :item="item"
    ></list>
    <el-pagination
      class="page-container"
      background
      layout="prev, pager, next"
      :total="totalPage"
      :current-page="currentPage"
      @current-change="changePage"
    >
    </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component';
import list from './list/list.vue'
import { Watch } from 'vue-property-decorator';
import { copyrights } from '../../../utils/data/copyright.js';
@Component({
  components: {
    list
  }
})
export default class copyright extends Vue {
    headerList: any = [
    {
      width: 2,
      value: '序号'
    },
    {
      width: 3.5,
      value: '类型'
    },
    {
      width: 3.5,
      value: '名称'
    },
    {
      width: 3.5,
      value: '专利号'
    },
    {
      width: 3.5,
      value: '发明人'
    }
  ];

  copyRightList: any = [];

  dispalyList: Array<any> = [];

  bashIndex: Number = 0;

  currentPage: Number = 0;

  totalPage: Number = 0;

  mounted() {
    this.currentPage = 1;
    this.totalPage = Math.ceil(copyrights.length);
  }

  changePage(newVal) {
    this.currentPage = newVal;
  }

  @Watch('currentPage')
  changeCurrentPage(newVal) {
    this.dispalyList = [];

    for (let i = (newVal - 1) * 10; i < (newVal) * 10 && i < copyrights.length; i++) {
      this.dispalyList.push(copyrights[i]);
    }

  }
}
</script>

<style lang="scss" scoped>
.members-main {
    margin-top: 0.2rem;
    width: 100%;
    position: relative;
    display: flex;
    padding-bottom: 30px;
    overflow: hidden;

    .left-section {
        position: relative;
        width: 3rem;
        height: 100%;
        // display: flex;
        // justify-content: center;

        li {
            cursor: pointer;
            padding: 0.05rem;
            border-radius: 12px;
            margin: 0.1rem auto;
            width: 1rem;
            // height: 0.5re1m;
        }
    }

    .right-section {
        flex: 1;
        display: flex;
        flex-flow: row wrap;
        // justify-content: center;
    }
}
.active {
    background-color: #a0a0a0;
}
.members-nav-container {
    width: 100%;
    height: 1.2rem;
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;

    li {
        cursor: pointer;
        font-size: 0.24rem;
        color: #707070;
        margin-left: 0.36rem;
    }
}

.active1 {
    color: #1a1a1a !important;
}
</style>

<template>
    <div>
        <div class="members-nav-container">
            <li
                @click="choiceYear"
                v-for="(item, index) in years"
                :key="index + 1"
                :data-index="index"
                :class="currentIndex == index ? 'active1' : ''"
            >
                {{ item }}
            </li>
        </div>
        <div class="members-main">
            <div class="left-section">
                <li
                    @click="changeGroup"
                    v-for="(item, index) in groupList"
                    :key="index + 1"
                    :data-index="index"
                    :class="index == groupIndex ? 'active' : ''"
                >
                    {{ item }}
                </li>
            </div>
            <div class="right-section">
                <list
                    v-for="(item, index) in memList"
                    v-show="item.isShow"
                    :key="index + 1"
                    :year="item.year + '级'"
                    :group="item.group"
                    :name="item.name"
                    :url="item.url"
                ></list>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import list from "./list/list.vue";
import { Watch } from "vue-property-decorator";
import { members } from "@/utils/data/members";

@Component({
    components: {
        list,
    },
})
export default class Main extends Vue {
    groupList: Array<any> = [
        "全部",
        "前端组",
        "后台组",
        "嵌入式组",
        "人工智能组",
        "移动组",
        "图形渲染组",
        "设计师组",
    ];

    groupIndex = 0;

    memList: Array<any> = members;

    years: Array<any> = [
        "全部",
        "2016",
        "2017",
        "2018",
        "2019",
        "2020",
        "2021",
        "2022",
    ];

    currentIndex: Number = 0;

    year: String = "";

    changeGroup(event: any) {
        let index = event.target.getAttribute("data-index");
        if (!index) {
            return;
        }
        this.$data.groupIndex = index;
    }

    mounted() {
        this.$data.year = "全部";
        this.memList = this.memList.sort((a: any, b: any): number => {
            return a.name < b.name ? -1 : 1;
        });
        this.memList = this.memList.sort((a: any, b: any): number => {
            return a.year < b.year ? -1 : 1;
        });
        this.memList = this.memList.sort((a: any, b: any): number => {
            return a.group < b.group ? -1 : 1;
        });
    }

    choiceYear(event: any) {
        let index = event.target.getAttribute("data-index");
        if (!index) {
            return;
        }
        this.$data.currentIndex = index;
        this.$data.year = this.$data.years[index];
    }

    @Watch("year")
    watchYear(newVal: String) {
        let groupList = this.$data.groupList,
            index = this.$data.groupIndex;

        for (let i = 0; i < this.$data.memList.length; i++) {
            if (
                groupList[index] == "全部" ||
                groupList[index] == this.$data.memList[i].group
            ) {
                if (newVal == "全部" || newVal == this.$data.memList[i].year) {
                    this.$data.memList[i].isShow = true;
                } else {
                    this.$data.memList[i].isShow = false;
                }
            } else {
                this.$data.memList[i].isShow = false;
            }
        }
    }

    @Watch("groupIndex")
    watchGroupIndex(newVal: any) {
        let groupList = this.$data.groupList;

        for (let i = 0; i < this.$data.memList.length; i++) {
            if (
                groupList[newVal] == "全部" ||
                groupList[newVal] == this.$data.memList[i].group
            ) {
                if (
                    this.$data.year == "全部" ||
                    this.$data.year == this.$data.memList[i].year
                ) {
                    this.$data.memList[i].isShow = true;
                } else {
                    this.$data.memList[i].isShow = false;
                }
            } else {
                this.$data.memList[i].isShow = false;
            }
        }
    }
}
</script>

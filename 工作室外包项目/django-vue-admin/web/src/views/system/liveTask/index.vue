<template>
  <d2-container>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @stopTask="stopTask"
    >
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
        <crud-toolbar
          :search.sync="crud.searchOptions.show"
          :compact.sync="crud.pageOptions.compact"
          :columns="crud.columns"
          @refresh="doRefresh()"
          @columns-filter-changed="handleColumnsFilterChanged"
        />
      </div>
    </d2-crud-x>
  </d2-container>
</template>

<style></style>

<script>
import * as api from "./api";
import { crudOptions, fileContent } from "./crud";
import { d2CrudPlus } from "d2-crud-plus";
import log from "@/libs/util.log";

export default {
  name: "liveTask",
  mixins: [d2CrudPlus.crud],
  data() {
    return {};
  },

  methods: {
    //获取对应匹配信息
    getCrudOptions() {
      return crudOptions(this);
    },
    //获取页面分页信息
    pageRequest(query) {
      return api.GetList(query);
    },
    //停止任务功能
    async stopTask(row) {
      if (row.row.id !== null) {
        const status = await api.stopDetectData({ id: row.row.id });
        if (status.code === 2000) {
          this.$message.success("停止检测任务成功");
        } else {
          this.$message.error("停止检测任务失败");
        }
      } else {
        this.$message.warning("未拥有该任务终止权限");
      }
    },
    // 部门懒加载
    loadChildrenMethod({ row }) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const childs = [
            {
              id: row.id + 100000,
              parent: row.id,
              name: row.name + "Test45",
              type: "mp4",
              size: null,
              date: "2021-10-03",
              hasChild: true,
            },
            {
              id: row.id + 150000,
              parent: row.id,
              name: row.name + "Test56",
              type: "mp3",
              size: null,
              date: "2021-07-09",
              hasChild: false,
            },
          ];
          resolve(childs);
        }, 500);
      });
    },
  },
};
</script>

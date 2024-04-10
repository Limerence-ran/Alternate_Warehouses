<template>
  <d2-container>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @evaluate="evaluate"
      @clickedit="clickedit"
    >
      <div slot="header">
        <crud-search
          ref="search"
          :options="crud.searchOptions"
          @submit="handleSearch"
        />
        <el-button-group>
          <el-button
            size="small"
            type="primary"
            v-permission="'Create'"
            @click="addRow"
            ><i class="el-icon-plus" /> 新增</el-button
          >
          <el-button size="small" type="danger" @click="batchDelete">
            <i class="el-icon-delete"></i> 批量删除
          </el-button>

          <!-- <el-button
            size="small"
            type="warning"
            @click="onExport"
            v-permission="'Export'"
            ><i class="el-icon-download"></i> 导出
          </el-button>

          <importExcel api="api/system/user/" v-permission="'Import'"
            >导入
          </importExcel> -->
        </el-button-group>
        <crud-toolbar
          :search.sync="crud.searchOptions.show"
          :compact.sync="crud.pageOptions.compact"
          :columns="crud.columns"
          @refresh="doRefresh()"
          @columns-filter-changed="handleColumnsFilterChanged"
        />
      </div>
    </d2-crud-x>
    <!-- 对话框 -->
    <el-dialog title="更新" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- <el-form-item label="数据归属部门" :label-width="formLabelWidth">
          <el-cascader
            :options="deptoptions"
            :show-all-levels="false"
            v-model="form.dept_belong_id"
          ></el-cascader>
        </el-form-item> -->
        <el-form-item label="文件名称" :label-width="formLabelWidth">
          <el-input v-model="form.name" autocomplete="off"></el-input>
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input
            type="textarea"
            v-model="form.description"
            autocomplete="off"
          ></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="doRowRefresh">确 定</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<style></style>

<script>
import * as api from "./api";
import { crudOptions, fileContent } from "./crud";
import { d2CrudPlus } from "d2-crud-plus";
import { traverse } from "../traverse";
import log from "@/libs/util.log";

export default {
  name: "video",
  mixins: [d2CrudPlus.crud],
  data() {
    return {
      // 对话框开关
      dialogFormVisible: false,
      // 部门选择器
      deptoptions: [],
      // 表单宽度
      formLabelWidth: "120px",
      // 表单数据
      form: {
        id: "",
        name: "",
        description: "",
      },
    };
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
    //打开更新表单功能
    clickedit(row) {
      this.form.id = row.row.id;
      this.form.id = row.row.id;
      this.form.name = row.row.name;
      this.form.description = row.row.description;
      //更改字段启动弹框
      this.dialogFormVisible = true;
      //返回数据处理
      let deptData = JSON.parse(localStorage.getItem("dept_belong_id"));
      const transformedData = traverse(deptData);
      this.deptoptions = transformedData;
    },
    //提交更新表单功能
    async doRowRefresh() {
      // 检查表单每一项都不为空
      if (this.form.name == "" || this.form.description == "") {
        return this.$message.error("表单不能为空");
      }
      this.dialogFormVisible = false;
      // this.form.dept_belong_id = this.form.dept_belong_id.pop();
      return new Promise((res, rej) => {
        api
          .UpdateObj(this.form)
          .then((res) => {
            this.$message.success("更新成功");
            this.doRefresh();
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },
    //删除数据功能
    delRequest(row) {
      return api.DelObj(row.id);
    },
    //批量删除数据功能
    batchDelRequest(ids) {
      return api.BatchDel(ids);
    },
    //导出数据功能
    onExport() {
      const that = this;
      this.$confirm("是否确认导出所有数据项?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(function () {
        const query = that.getSearch().getForm();
        return api.exportData({ ...query });
      });
    },
    //评估质量跳转
    evaluate(scope) {
      this.$router.push({
        name: "liveCheck",
        query: {
          id: scope.row.id,
          name: scope.row.name,
          live_parameters: scope.row.live_parameters,
          live_url: scope.row.live_url,
          type: "nr",
        },
      });
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
    //新增文件功能
    addRequest(row) {
      //处理文件未上传的逻辑
      if (!fileContent) {
        return this.$message.error("请先选择文件");
      }
      //将文件加入到flie字段
      row["file"] = fileContent.raw;
      return api.AddObj(row);
    },
  },
};
</script>

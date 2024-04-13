<template>
  <d2-container>
    <div class="configbox">
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
      >
        <el-form-item label="帧间隔" prop="frame_interval">
          <el-input v-model="ruleForm.frame_interval"></el-input>
        </el-form-item>
        <el-form-item label="检测时长" prop="detect_duration">
          <el-input v-model="ruleForm.detect_duration"></el-input>
        </el-form-item>
        <el-form-item label="检测间隔" prop="detect_interval">
          <el-input v-model="ruleForm.detect_interval"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >更新配置</el-button
          >
          <el-button @click="resetForm('ruleForm')">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
  </d2-container>
</template>

<style>
.configbox {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>

<script>
import log from "@/plugin/log/index";
import * as api from "./api";
export default {
  data() {
    //定义数字检验函数
    var validateFrame_interval = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入帧间隔"));
      }
      setTimeout(() => {
        if (!Number.isInteger(parseInt(value))) {
          callback(new Error("请输入数字值"));
        } else {
          if (value <= 0) {
            callback(new Error("必须大于0"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    //定义检测时长检验函数
    var validateDetect_duration = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入检测时长"));
      }
      setTimeout(() => {
        if (!Number.isInteger(parseInt(value))) {
          callback(new Error("请输入数字值"));
        } else {
          if (value <= 0) {
            callback(new Error("必须大于0"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    //定义检测间隔检验函数
    var validateDetect_interval = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("请输入检测间隔"));
      }
      setTimeout(() => {
        if (!Number.isInteger(parseInt(value))) {
          callback(new Error("请输入数字值"));
        } else {
          if (value <= 0) {
            callback(new Error("必须大于0"));
          } else {
            callback();
          }
        }
      }, 500);
    };
    return {
      ruleForm: {
        frame_interval: "",
        detect_duration: "",
        detect_interval: "",
      },
      rules: {
        frame_interval: [
          {
            validator: validateFrame_interval,
            trigger: "blur",
          },
        ],
        detect_duration: [
          {
            validator: validateDetect_duration,
            trigger: "blur",
          },
        ],
        detect_interval: [
          {
            validator: validateDetect_interval,
            trigger: "blur",
          },
        ],
      },
      configId: "", //用户当前的配置id
    };
  },
  methods: {
    /**
     * @description 提交表单
     */
    submitForm(formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          this.updateConfig();
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    /**
     * @description 重置表单
     */
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    /**
     * @description 获取配置信息
     */
    async getConfig() {
      // 数据返回
      const result = await api.GetList();
      // 成功信息
      if (result.code === 2000) {
        if (result.data.data.length === 0) {
          return;
        }
        // 使用reduce方法找到具有最大值属性的对象
        let maxObj = result.data.data.reduce((prev, current) =>
          prev.id > current.id ? prev : current
        );
        // 匹配最新配置
        const { detect_duration, detect_interval, frame_interval, id } = maxObj;
        // 更新到表单中
        this.ruleForm.detect_duration = detect_duration;
        this.ruleForm.detect_interval = detect_interval;
        this.ruleForm.frame_interval = frame_interval;
        this.configId = id;
      } else {
        // 失败信息
        this.$message.error("请检查网络");
      }
    },
    /**
     * @description 更新配置信息
     */
    async updateConfig() {
      // 数据发送
      const result = await api.UpdateObj(this.configId, this.ruleForm);
      if (result.code === 2000) {
        //成功信息
        this.$message.success("更新成功");
      } else {
        // 失败信息
        this.$message.error("请检查网络");
      }
    },
  },
  mounted() {
    //获取配置信息
    this.getConfig();
  },
};
</script>

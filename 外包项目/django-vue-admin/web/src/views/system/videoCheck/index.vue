<template>
  <d2-container>
    <template slot="header">
      <div class="yxt-flex-between">
        <div>
          <el-tag> 来自文件:{{ $route.query.name }}</el-tag>
          <el-divider direction="vertical"></el-divider>
          <el-tag>
            检测类型:{{
              $route.query.type === "nr"
                ? "无参考"
                : $route.query.type === "ref"
                ? "有参考"
                : "全部"
            }}</el-tag
          >
        </div>
        <el-button-group>
          <el-button type="info" @click="videoEval">编码检测</el-button>
          <el-button type="primary" @click="qualityDetect">质量检测</el-button>
          <el-button type="danger" @click="stopDetect">停止检测</el-button>
          <el-button
            type="success"
            @click="createReferenceFile"
            v-permission="'Create'"
            v-show="$route.query.type !== 'nr'"
            >参考文件</el-button
          ></el-button-group
        >
      </div>
    </template>
    <d2-crud-x
      ref="d2Crud"
      v-bind="_crudProps"
      v-on="_crudListeners"
      @output="output"
    >
      <div slot="header">
        <div id="card">
          <div class="card__content">
            <div class="videodiv">
              <video
                id="my-player"
                class="video-js vjs-default-skin"
                controls
                autoplay
                muted
                preload="auto"
              ></video>
            </div>
            <div class="paramsdiv">
              <el-table :data="tableData" style="width: 100%" stripe="true">
                <el-table-column
                  prop="name"
                  label="视频参数"
                  align="center"
                  width="180"
                >
                </el-table-column>
                <el-table-column
                  prop="value"
                  label="参数值"
                  width="180"
                  align="center"
                >
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </d2-crud-x>
    <!-- 新增功能对话框 -->
    <el-dialog title="更新" :visible.sync="dialogFormVisible" :width="'700px'">
      <el-form :model="form">
        <el-form-item label="数据归属部门" :label-width="formLabelWidth">
          <el-cascader
            :options="deptoptions"
            :show-all-levels="false"
            v-model="form.dept_belong_id"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="文件" :label-width="formLabelWidth">
          <el-upload
            class="upload-demo"
            :drag="true"
            :auto-upload="false"
            :multiple="false"
            :limit="1"
            :action="''"
            :on-exceed="
              () => {
                this.$message.warning('只能上传一个文件');
              }
            "
            :on-change="fileHandler"
          >
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或<em>点击上传</em>
            </div>
          </el-upload>
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
        <el-button type="primary" @click="doFileRefresh">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 新增播放对话框 -->
    <el-dialog
      title="视频片段"
      :visible.sync="dialogVideoVisible"
      :width="'700px'"
    >
      <video
        id="my-playerDiolog"
        class="video-js vjs-default-skin"
        controls
        autoplay
        muted
        preload="auto"
      ></video>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeVideoDialog">取 消</el-button>
      </div>
    </el-dialog>
  </d2-container>
</template>

<style lang="scss">
$width: 100%;
#card {
  width: $width;
  height: calc(#{$width} * 9 / 16);
  margin: 0 auto 10px;
  display: flex;
  flex-direction: column;
  justify-content: start;
  background-color: #ffffff;
  border-radius: 8px;
  z-index: 1;
}

.card__content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
}
.videodiv {
  flex: 0.7;
  width: 100%;
  height: 100%;
  video {
    width: 95%;
    height: 30vh;
  }
}
.paramsdiv {
  flex: 0.3;
  width: 100%;
  height: 100%;
}
.my-player-dimensions {
  flex: 0.7;
  width: 100%;
  height: 30vh;
}
.video-js .vjs-tech {
  width: 100%;
  height: 100%;
}
</style>

<script>
import "video.js/dist/video-js.css";
import * as api from "./api";
import { crudOptions } from "./crud";
import { d2CrudPlus } from "d2-crud-plus";
import { traverse } from "../traverse";
import videojs from "video.js";
import { ref } from "vue";
import log from "@/libs/util.log";
// 首先定义videoPlayer为null
const videoPlayer = ref(null);
const videoPlayerDiolog = ref(null);
export default {
  name: "videoCheck",
  mixins: [d2CrudPlus.crud],
  data() {
    return {
      tableData: [
        {
          name: "编码格式",
          value: <el-tag size="small">暂无数据</el-tag>,
        },
        {
          name: "码率",
          value: <el-tag size="small">暂无数据</el-tag>,
        },
        {
          name: "分辨率",
          value: <el-tag size="small">暂无数据</el-tag>,
        },
      ],
      // 视频地址
      videoUrl: this.$route.query.url,
      // 查询定时器
      interval: null,
      // 参考视频字段-默认为false
      referenceVideo: false,
      // 参考视频信息
      referenceVideoInfo: {},
      // 对话框开关
      dialogFormVisible: false,
      // video对话框开关
      dialogVideoVisible: false,
      // 部门选择器
      deptoptions: [],
      // 表单宽度
      formLabelWidth: "120px",
      // 上传表单内容
      form: {
        file: "",
        dept_belong_id: "",
        description: "",
      },
      // 视频播放器
      player: null,
      //终止任务用id
      stopTaskId: null,
    };
  },
  methods: {
    /**
     * @description: 创建videojs播放器
     */
    createVideoJs(url, videoPlayer, id) {
      videoPlayer.value = videojs(id, {
        bigPlayButton: false,
        textTrackDisplay: false,
        posterImage: true,
        errorDisplay: false,
        controlBar: true,
      });
      videoPlayer.value.src([
        {
          src: url, //你的url地址
          type: "application/x-mpegURL",
        },
      ]);
      setTimeout(function () {
        videoPlayer.value.play();
      }, 300);
      //处理videojs视频播放错误的语法
      videoPlayer.value.on("error", () => {
        this.$message.error(`视频加载失败，请稍候重试！`);
        return false;
      });
    },
    /**
     * @description: 销毁videojs播放器
     */
    destroyVideoJs(videoPlayer) {
      if (videoPlayer.value) {
        videoPlayer.value.pause(); //暂停播放数据流
        videoPlayer.value.dispose(); //销毁播放器实例
        videoPlayer.value = null;
      }
    },

    /**
     * @description: 停止视频检测任务
     */
    async stopDetect() {
      // 依据定时器判断
      if (!this.interval) {
        return this.$message.warning("请先开始检测任务");
      }
      // 请求参数必填项为id值
      const obj = { id: this.stopTaskId };
      // 数据返回
      const status = await api.stopDetectData(obj, this.$route.query.type);
      if (status.code === 2000) {
        this.$message.success("停止检测任务成功");
        clearInterval(this.interval);
      } else {
        this.$message.error("停止检测任务失败");
      }
    },

    /**
     * @description: 开始视频检测任务
     */
    async qualityDetect() {
      const that = this;
      // 请求参数必填项为id值
      const obj = { id: this.$route.query.id };
      if (this.$route.query.type === "ref" && this.referenceVideo === false) {
        return this.$message.warning("请先上传参考文件");
      } else {
        // 任务发起接口-注意避免重复发起
        const status = await api.startDetectData(obj, this.$route.query.type);
        if (status.code === 2000) {
          //拿到任务id
          this.stopTaskId = status.data.task_id;
          this.$message.success("自动发起检测任务,请耐心等待");
          this.interval = setInterval(() => {
            that.doRefresh();
          }, 3000);
          console.log(this.interval, "定时器id");
        } else {
          this.$message.error("检测任务发起失败,请联系我们");
        }
      }
    },

    /**
     * @description: 视频编码格式信息检测
     */
    async videoEval() {
      // 请求参数必填项为id值
      const obj = { id: this.$route.query.id };
      // 数据返回
      const codeParams = await api.videoEvalData(obj);
      // 数据查询失败-需要发起检测任务
      if (!codeParams.data.data[0].codec) {
        this.$message.warning("已发起检测任务,请耐心等待");
        const videoEvalTask = await api.videoEvalTask(obj);
        if (videoEvalTask.code === 2000) {
          // 发起检测任务后,需要等待检测完成,再进行前端展示
          return setTimeout(() => {
            this.videoEval();
          }, 2500);
        }
      } else {
        // 数据查询成功-直接进行前端展示
        // 数据解构
        const { codec_name, bit_rate, width, height } =
          codeParams.data.data[0].codec;
        // 数据注入
        if (codec_name)
          this.tableData[0].value = <el-tag size="small">{codec_name}</el-tag>;
        if (bit_rate)
          this.tableData[1].value = <el-tag size="small">{bit_rate}</el-tag>;
        if (width && height)
          this.tableData[2].value = (
            <el-tag size="small">
              {width} * {height}
            </el-tag>
          );
      }
    },

    /**
     * @description 参考文件获取-onchange事件的监听
     */
    fileHandler(file) {
      this.form.file = file.raw;
    },

    /**
     * @description 参考文件管理
     */
    async createReferenceFile() {
      // 开启对话框
      this.form.video = this.$route.query.id;
      // 更改字段启动弹框
      this.dialogFormVisible = true;
      // 返回数据处理
      let deptData = JSON.parse(localStorage.getItem("dept_belong_id"));
      const transformedData = traverse(deptData);
      this.deptoptions = transformedData;
      if (this.referenceVideo === false) {
        return;
      } else {
        this.dialogFormVisible = false;
        return this.$message.warning("已上传参考视频");
      }
    },

    /**
     * @description 对话框表单提交
     */
    // 提交更新表单功能
    async doFileRefresh() {
      this.dialogFormVisible = false;
      this.form.dept_belong_id = this.form.dept_belong_id.pop();
      return new Promise((resolve, reject) => {
        api
          .refFileCreate(this.form)
          .then((res) => {
            this.$message.success("创建参考文件成功");
            this.referenceVideo = true;
          })
          .catch((error) => {
            console.log(error);
          });
      });
    },

    /**
     * @description 查询参考视频
     */
    async queryReferenceVideo() {
      // 发送网络请求判断参考视频文件
      const { code, data } = await api.refFileSearch(this.$route.query.id);
      if (code === 2000 && data.total === 0) {
        // 不存在参考文件
      } else if (code === 2000 && data.total !== 0) {
        // 存在参考文件
        this.referenceVideo = true;
        this.referenceVideoInfo = {
          url: data.data[0].url,
          name: data.data[0].name,
          id: data.data[0].id,
        };
        console.log(this.referenceVideoInfo);
      } else {
        //请求失败
        this.$message.warning("请检查网络");
      }
    },
    /**
     * @description: 获取crud配置
     */
    getCrudOptions() {
      console.log(this);
      return crudOptions(this, this.$route.query.type);
    },
    /**
     *@description: 获取视频任务结果
     * @param {*} query
     */
    pageRequest(query) {
      const videoId = this.$route.query.id;
      return api.GetDetectResult(
        { ...query, video: videoId },
        this.$route.query.type
      );
    },

    /**
     * @description: 播放视频片段
     * @param {*} row
     */
    output(row) {
      // 更改字段启动弹框
      this.dialogVideoVisible = true;
      // 创建视频播放器
      const formatType = this.getVideoFormat(row.row.url);
      if (formatType === "m3u8") {
        this.createVideoJs(row.row.url, videoPlayerDiolog, "my-playerDiolog");
      } else if (formatType === "mp4") {
        setTimeout(() => {
          const video = document.getElementById("my-playerDiolog");
          video.src = row.row.url;
          video.play();
        }, 1000);
      } else {
        this.$message.warning("该视频格式暂不支持播放");
      }
    },

    /**
     * @description: 关闭视频弹框
     */
    closeVideoDialog(row) {
      this.dialogVideoVisible = false;
      // 销毁视频播放器
      // 清除视频
      const formatType = this.getVideoFormat(this.$route.query.url);
      if (formatType === "m3u8") {
        this.destroyVideoJs(videoPlayerDiolog);
      } else if (formatType === "mp4") {
        const video = document.getElementById("my-player");
        video.pause();
        video.src = "";
      }
    },

    /**
     * @description: 获取视频格式
     */
    getVideoFormat(url) {
      // 动态分流播放m3u8以及mp4格式视频
      // 获取最后一个`.`的位置
      const lastIndex = url.lastIndexOf(".");
      if (lastIndex === -1) {
        return this.$message.warning("视频格式错误"); // 如果没有找到`.`，则返回报错
      }
      // 使用substring方法获取后缀名
      const extension = url.substring(lastIndex + 1);
      return extension;
    },
  },

  /**
   * @description 页面创建时的处理
   */
  mounted() {
    if (this.$route.query.type === "ref") {
      this.queryReferenceVideo();
    }
    this.videoEval();
    // 播放视频
    const formatType = this.getVideoFormat(this.$route.query.url);
    if (formatType === "m3u8") {
      this.createVideoJs(this.$route.query.url, videoPlayer, "my-player");
    } else if (formatType === "mp4") {
      const video = document.getElementById("my-player");
      video.src = this.$route.query.url;
      video.play();
    } else {
      this.$message.warning("该视频格式暂不支持播放");
    }
  },

  /**
   * @description 页面销毁时的处理
   */
  beforeDestroy() {
    // 清除定时器
    clearInterval(this.interval);
    // 清除后台任务
    if (this.stopTaskId) {
      api.stopDetectData({ id: this.stopTaskId }, this.$route.query.type);
    }
    // 清除视频
    const formatType = this.getVideoFormat(this.$route.query.url);
    if (formatType === "m3u8") {
      this.destroyVideoJs(videoPlayer);
    } else if (formatType === "mp4") {
      const video = document.getElementById("my-player");
      video.pause();
      video.src = "";
    }
  },
};
</script>

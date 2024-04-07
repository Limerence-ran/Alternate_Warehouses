<template>
  <d2-container>
    <template slot="header">
      <div class="yxt-flex-between">
        <div>
          <el-tag> 来自直播源:{{ $route.query.live_url }}</el-tag>
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
          <el-button type="warning" @click="exportData">结果导出</el-button>
          <el-button type="info" @click="liveEval">编码检测</el-button>
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
              <video id="videoElement" controls autoplay muted></video>
            </div>
            <div class="paramsdiv">
              <el-table
                :data="tableData"
                style="width: 100%; height: 200px; overflow: scroll"
                stripe="true"
              >
                <el-table-column
                  prop="name"
                  label="直播参数"
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
        id="myLive-playerDiolog"
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
.video-js .vjs-tech {
  width: 100%;
  height: 100%;
}
.video-js {
  width: 100%;
}
</style>

<script>
import "video.js/dist/video-js.css";
import * as api from "./api";
import { crudOptions } from "./crud";
import { d2CrudPlus } from "d2-crud-plus";
import flvjs from "flv.js";
import videojs from "video.js";
import { ref } from "vue";
// 首先定义flvPlayer为null
const flvPlayer = ref(null);
let videoPlayerDiolog = ref(null);
export default {
  name: "liveCheck",
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
        {
          name: "封装格式",
          value: <el-tag size="small">暂无数据</el-tag>,
        },
        {
          name: "帧速",
          value: <el-tag size="small">暂无数据</el-tag>,
        },
      ],
      // 查询定时器
      interval: null,
      // 无参考视频字段-默认为true
      referenceVideo: true,
      // 参考视频信息
      referenceVideoInfo: {},
      // 参考文件对话框开关
      dialogFormVisible: false,
      // 视频对话框开关
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
      //终止任务用id
      stopTaskId: null,
    };
  },
  methods: {
    /**
     * @description: 结果导出
     */
    exportData() {
      // 请求参数必填项为id值
      const that = this;
      this.$confirm("是否导出最新检测数据?", "警告", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      }).then(async function () {
        const result = await api.exportData(
          {
            task: parseInt(that.crud.list[0].task),
          },
          that.$route.query.type
        );
        if (result.code === 2000) {
          // 下载成功
          that.$message.success("导出成功");
        } else {
          that.$message.error("暂未开放权限");
        }
      });
    },

    /**
     * @description: 创建直播流播放器
     */
    createVideo(url) {
      if (flvjs.isSupported()) {
        var videoElement = document.getElementById("videoElement");
        flvPlayer.value = flvjs.createPlayer({
          type: "flv",
          url: url, //你的url地址
          isLive: true,
          hasAudio: false,
        });
        flvPlayer.value.attachMediaElement(videoElement);
        flvPlayer.value.load();
        setTimeout(function () {
          flvPlayer.value.play();
        }, 300);
        //处理视频播放错误的语法
        flvPlayer.value.on("error", () => {
          this.$message.error(`直播加载失败，请稍候重试！`);
          return false;
        });
      }
    },
    /**
     * @description: 销毁直播流播放器
     */
    destroy() {
      if (flvPlayer.value) {
        flvPlayer.value.pause(); //暂停播放数据流
        flvPlayer.value.unload(); //取消数据流加载
        flvPlayer.value.detachMediaElement(); //将播放实例从节点中取出
        flvPlayer.value.destroy(); //销毁播放实例
        flvPlayer.value = null;
      }
    },

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
      const formatType = this.getVideoFormat(url);
      if (formatType === "m3u8") {
        videoPlayer.value.src([
          {
            src: url, //你的url地址
            type: "application/x-mpegURL",
          },
        ]);
      } else if (formatType === "mp4") {
        videoPlayer.value.src([
          {
            src: url, //你的url地址
            type: "video/mp4",
          },
        ]);
      } else {
        this.$message.warning("该视频格式暂不支持播放");
        return;
      }
      setTimeout(function () {
        videoPlayer.value.play();
      }, 500);
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
        // videoPlayer.value.dispose(); //销毁videojs播放器
        videoPlayer.value = null;
      }
    },

    /**
     * @description: 视频编码格式信息检测
     */
    async liveEval() {
      // 请求参数必填项为id值
      const obj = { id: this.$route.query.id };
      // 数据返回
      const codeParams = await api.liveEvalData(obj);
      // 数据查询失败-需要发起检测任务
      if (!codeParams.data.data[0].codec) {
        const liveEvalTask = await api.liveEvalTask(obj);
        if (liveEvalTask.code === 2000) {
          // 发起检测任务后,需要等待检测完成,再进行前端展示
          return setTimeout(() => {
            this.liveEval();
          }, 5000);
        }
      } else {
        // 数据查询成功-直接进行前端展示
        // 数据解构
        const { codec_name, frame_rate, width, height, bit_rate, format_name } =
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

        if (format_name)
          this.tableData[3].value = (
            <el-tag size="medium">{format_name}</el-tag>
          );
        if (frame_rate)
          this.tableData[4].value = <el-tag size="small">{frame_rate}</el-tag>;
      }
    },

    /**
     * @description: 开始直播流检测任务
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
          this.$message.success("自动发起检测任务,请耐心等待");
          this.stopTaskId = status.data.task_id;
          //处理直播流视频
          setTimeout(() => {
            this.getLiveUrl(status.data.task_id);
          }, 2000);
          // 定时器
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
     * @description: 停止直播流检测任务
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
        this.destroy();
      } else {
        this.$message.error("停止检测任务失败");
      }
    },

    /**
     * @description 直播流播放地址查询
     */
    async getLiveUrl(taskId) {
      const res = await api.GetLiveStream({ task: taskId });
      if (res.code === 2000) {
        var originalUrl = res.data.data[0].channel;
        var replacedUrl = originalUrl.replace(
          "10.24.11.16:8080",
          "live.v6.idcfengye.com"
        );
        this.createVideo(replacedUrl);
      } else {
        this.$message.warning("获取直播流播放地址失败");
      }
    },

    /**
     * @description: 播放视频片段
     * @param {*} row
     */
    output(row) {
      // 更改字段启动弹框
      this.dialogVideoVisible = true;
      setTimeout(() => {
        // 创建视频播放器
        this.createVideoJs(
          row.row.url,
          videoPlayerDiolog,
          "myLive-playerDiolog"
        );
      });
    },

    /**
     * @description: 关闭视频弹框
     */
    closeVideoDialog(row) {
      this.dialogVideoVisible = false;
      // 销毁视频播放器
      this.destroyVideoJs(videoPlayerDiolog);
    },

    /**
     * @description: 获取crud配置
     */
    getCrudOptions() {
      console.log(this);
      return crudOptions(this, this.$route.query.type);
    },
    /**
     *@description: 获取直播任务结果
     * @param {*} query
     */
    pageRequest(query) {
      const liveId = this.$route.query.id;
      return api.GetDetectResult(
        { ...query, live: liveId },
        this.$route.query.type
      );
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
    if (flvjs.isSupported()) {
    }
    this.liveEval();
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
    // 销毁播放器
    this.destroy();
  },
};
</script>

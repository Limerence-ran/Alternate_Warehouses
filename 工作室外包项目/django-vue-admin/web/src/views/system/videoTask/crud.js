export let fileContent = {};
//定义配置方法
export const crudOptions = (vm) => {
  // util.filterParams(vm, ['dept_name', 'role_info{name}', 'dept_name_all'])

  return {
    pageOptions: {
      compact: true,
    },
    options: {
      height: "100%",
      // tableType: 'vxe-table',
      // rowKey: true,
      rowId: "id",
    },
    selectionRow: {
      align: "center",
      width: 46,
    },
    //行操作
    rowHandle: {
      width: 150,
      fixed: "right",
      view: {
        thin: true,
        text: "",
        disabled() {
          return !vm.hasPermissions("Retrieve");
        },
      },
      //屏蔽掉原来的按钮
      edit: {
        thin: true,
        text: "",
        disabled() {
          return true;
        },
        show: false,
      },
      remove: {
        thin: true,
        text: "",
        disabled() {
          return true;
        },
        show: false,
      },
      custom: [
        //自定义编辑按钮
        {
          text: "终止任务",
          show(index, row) {
            return true;
          },
          disabled(index, row) {
            //判断菜单按钮权限
            if (row.task_status === "正在执行") {
              return false;
            }
            return true;
          },
          type: "danger",
          size: "small",
          emit: "stopTask",
          icon: "el-icon-document-delete",
          thin: true,
        },
      ],
    },
    viewOptions: {
      componentType: "form",
    },
    formOptions: {
      defaultSpan: 12, // 默认的表单 span
    },
    indexRow: {
      // 或者直接传true,不显示title，不居中
      title: "序号",
      align: "center",
      width: 60,
    },
    //自定义列表配置
    columns: [
      //关键词
      {
        title: "关键词",
        key: "search",
        show: false,
        disabled: true,
        search: {
          disabled: false,
        },
        form: {
          disabled: true,
          component: {
            placeholder: "请输入关键词",
          },
        },
        view: {
          disabled: true,
        },
      },
      //id
      {
        title: "ID",
        key: "id",
        disabled: false,
        form: {
          disabled: true,
        },
      },
      //任务类型
      {
        title: "任务类型",
        key: "task_type",
        search: {
          disabled: true,
        },
        width: 140,
        type: "input",
        form: {
          disabled: true,
        },
        //查找权限
        search: {
          disabled: false,
        },
        valueBuilder(row, key) {
          switch (row.task_type) {
            // 视频编码检测
            case "detect_video_codec":
              row.task_type = "视频编码检测";
              break;
            // 视频
            case "video_eval":
              row.task_type = "视频检测";
              break;
            case "ref_video_eval":
              row.task_type = "有参考检测";
              break;
            case "nr_video_eval":
              row.task_type = "无参考检测";
              break;
            case "convert_video_codec":
              row.task_type = "转码检测";
              break;
            default:
              break;
          }
        },
      },
      //视频ID
      {
        title: "视频ID",
        key: "video",
        form: {
          disabled: true,
        },
        //查找权限
        search: {
          disabled: false,
        },
      },
      //任务状态
      {
        title: "任务状态",
        key: "task_status",
        width: 120,
        search: {
          disabled: true,
        },
        form: {
          disabled: true,
        },
        //查找权限
        search: {
          disabled: false,
        },
      },
      //创建者
      {
        title: "创建者",
        key: "creator_name",
        disabled: false,
        //排序方式
        sortable: "custom",
        //最小宽度
        minWidth: 120,
        //查找权限
        search: {
          disabled: false,
        },
      },
      //更新时间
      {
        title: "更新时间",
        key: "update_datetime",
        width: 160,
        type: "datetime",
        form: {
          disabled: true,
        },
      },
      //创建时间
      {
        title: "创建时间",
        key: "create_datetime",
        width: 160,
        type: "datetime",
        form: {
          disabled: true,
        },
      },
    ],
  };
};

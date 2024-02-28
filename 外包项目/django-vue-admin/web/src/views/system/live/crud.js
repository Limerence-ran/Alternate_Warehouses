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
      width: 240,
      fixed: "right",
      view: {
        thin: true,
        text: "",
        disabled() {
          return !vm.hasPermissions("Retrieve");
        },
      },
      //屏蔽掉原来的编辑按钮
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
          return !vm.hasPermissions("Delete");
        },
      },
      custom: [
        //自定义编辑按钮
        {
          text: "",
          disabled(index, row) {
            return !row.id || !vm.hasPermissions("Update");
          },
          thin: true,
          emit: "clickedit",
          type: "primary",
          size: "small",
          icon: "el-icon-edit",
          order: 2,
        },
        {
          text: "直播检测",
          show(index, row) {
            if (row.live_url && row.id && row.live_parameter_url) {
              return true;
            }
            return false;
          },
          disabled() {
            //判断菜单按钮权限
            return !vm.hasPermissions("Search");
          },
          type: "success",
          size: "small",
          emit: "evaluate",
          icon: "el-icon-video-play",
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
      //部门
      {
        title: "数据归属部门",
        key: "dept_belong_id",
        search: {
          disabled: false,
        },
        minWidth: 140,
        type: "tree-selector",
        //显示配置
        dict: {
          cache: true,
          isTree: true,
          url: "/api/system/dept/all_dept/",
          value: "id", // 数据字典中value字段的属性名
          label: "name", // 数据字典中label字段的属性名
        },
        form: {
          rules: [
            // 表单校验规则
            {
              required: true,
              message: "必填项",
            },
          ],
          itemProps: {
            class: { yxtInput: true },
          },
          component: {
            span: 12,
            pagination: true,
            props: { multiple: false },
          },
        },
        component: {
          name: "foreignKey",
          valueBinding: "dept_name",
        },
      },
      //视频文件名称
      {
        title: "文件名称",
        key: "name",
        search: {
          disabled: false,
        },
        width: 160,
        type: "input",
        form: {
          component: {
            placeholder: "请输入文件名称",
          },
        },
      },
      //视频文件
      {
        title: "文件",
        key: "file",
        disabled: true,
        search: {
          disabled: true,
        },
        type: "file-uploader",
        width: 220,
        form: {
          component: {
            props: {
              btnSize: "small", // type=file-uploader时按钮的大小
              btnName: "选择文件", // type=file-uploader时按钮文字
              elProps: {
                // 与el-uploader配置一致
                limit: 0, // 限制上传文件数量
                autoUpload: false,
                httpRequest: () => {
                  return;
                },
                multiple: false,
                onChange: (value) => {
                  //可以拿到二进制文件对象
                  fileContent = value;
                  console.log(
                    value,
                    "django-vue-admin\\web\\src\\views\\system\\video\\crud.js",
                    fileContent
                  );
                },
              },
              uploader: {
                custom: {}, //自定义参数，可以在获取token、sts时传入不同的参数给后端
              },
            },
          },
          itemProps: {
            class: { yxtInput: true },
          },
          rules: [
            // 表单校验规则
            {
              required: false,
              message: "必填项",
            },
          ],
        },
      },
      //直播参数地址
      {
        title: "直播参数地址",
        key: "live_parameter_url",
        search: {
          disabled: true,
        },
        width: 300,
        type: "input",
        form: {
          disabled: true,
        },
      },
      //直播流地址
      {
        title: "直播流地址",
        key: "live_url",
        form: {
          disabled: true,
        },
      },
      //视频文件文件md5
      {
        title: "MD5",
        key: "md5sum",
        width: 200,
        search: {
          disabled: true,
        },
        form: {
          disabled: true,
        },
      },
      //创建者
      {
        title: "创建者",
        key: "creator",
        disabled: "true",
        //排序方式
        sortable: "custom",
        //最小宽度
        minWidth: 90,
        //查找权限
        search: {
          disabled: false,
        },
        form: {
          disabled: true,
        },
      },
      //描述
      {
        title: "描述",
        key: "description",
        show: false,
        search: {
          disabled: true,
        },
        type: "textarea",
        form: {
          component: {
            placeholder: "请输入内容",
            showWordLimit: true,
            maxlength: "200",
            props: {
              type: "textarea",
            },
          },
        },
      },
      //修改者
      {
        title: "修改者",
        show: false,
        width: 100,
        key: "modifier_name",
        form: {
          disabled: true,
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

//定义配置方法
export const crudOptions = (vm, type = "nr") => {
  // util.filterParams(vm, ['dept_name', 'role_info{name}', 'dept_name_all'])
  let columns = [];
  //无参考配置
  const nrColumns = [
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
    //任务ID
    {
      title: "任务ID",
      key: "task",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //结果ID
    {
      title: "结果ID",
      key: "id",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //时间戳
    {
      title: "时间戳",
      key: "timestamp",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //流畅度
    {
      title: "流畅度",
      key: "shutter",
      search: {
        disabled: false,
      },
      minWidth: 120,
    },
    //花帧
    {
      title: "花帧",
      key: "tearing",
      search: {
        disabled: false,
      },
      width: 120,
      type: "input",
    },
    //饱和度
    {
      title: "饱和度",
      key: "saturation",
      search: {
        disabled: true,
      },
      width: 120,
    },
    //模糊
    {
      title: "模糊",
      key: "blur",
      search: {
        disabled: true,
      },
      width: 120,
      type: "input",
      form: {
        disabled: true,
      },
    },
    //失焦
    {
      title: "失焦",
      key: "unfocused",
      form: {
        disabled: true,
      },
    },
    //噪点
    {
      title: "噪点",
      key: "noise",
      form: {
        disabled: true,
      },
    },
    //锯齿
    {
      title: "锯齿",
      key: "aliasing",
      form: {
        disabled: true,
      },
    },
    //马赛克
    {
      title: "马赛克",
      key: "blockness",
      width: 120,
      search: {
        disabled: true,
      },
      form: {
        disabled: true,
      },
    },
    //评分
    {
      title: "评分",
      key: "nr_score",
      width: 120,
      search: {
        disabled: true,
      },
      form: {
        disabled: true,
      },
    },
  ];
  //有参考配置
  const refcolumns = [
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
    //任务ID
    {
      title: "任务ID",
      key: "task",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //结果ID
    {
      title: "结果ID",
      key: "id",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //时间戳
    {
      title: "时间戳",
      key: "timestamp",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //PSNR
    {
      title: "PSNR",
      key: "psnr",
      search: {
        disabled: false,
      },
      minWidth: 120,
    },
    //SSIM
    {
      title: "SSIM",
      key: "ssim",
      search: {
        disabled: false,
      },
      width: 120,
      type: "input",
    },
    //VMAF
    {
      title: "VMAF",
      key: "vmaf",
      search: {
        disabled: true,
      },
      width: 120,
    },
    //评分
    {
      title: "评分",
      key: "nr_score",
      width: 120,
      search: {
        disabled: true,
      },
      form: {
        disabled: true,
      },
    },
  ];
  //全部参考配置
  const allcolumns = [
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
    //任务ID
    {
      title: "任务ID",
      key: "task",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //结果ID
    {
      title: "结果ID",
      key: "id",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //时间戳
    {
      title: "时间戳",
      key: "timestamp",
      disabled: false,
      form: {
        disabled: true,
      },
    },
    //流畅度
    {
      title: "流畅度",
      key: "shutter",
      search: {
        disabled: false,
      },
      minWidth: 120,
      valueBuilder(row, key) {
        row.shutter = row.shutter === null ? "/" : row.shutter;
      },
    },
    //花帧
    {
      title: "花帧",
      key: "tearing",
      search: {
        disabled: false,
      },
      width: 120,
      type: "input",
      valueBuilder(row, key) {
        row.tearing = row.tearing === null ? "/" : row.tearing;
      },
    },
    //饱和度
    {
      title: "饱和度",
      key: "saturation",
      search: {
        disabled: true,
      },
      width: 120,
      valueBuilder(row, key) {
        row.saturation = row.saturation === null ? "/" : row.saturation;
      },
    },
    //模糊
    {
      title: "模糊",
      key: "blur",
      search: {
        disabled: true,
      },
      width: 120,
      type: "input",
      form: {
        disabled: true,
      },
      valueBuilder(row, key) {
        row.blur = row.blur === null ? "/" : row.blur;
      },
    },
    //失焦
    {
      title: "失焦",
      key: "unfocused",
      form: {
        disabled: true,
      },
      valueBuilder(row, key) {
        row.unfocused = row.unfocused === null ? "/" : row.unfocused;
      },
    },
    //噪点
    {
      title: "噪点",
      key: "noise",
      form: {
        disabled: true,
      },
      valueBuilder(row, key) {
        row.noise = row.noise === null ? "/" : row.noise;
      },
    },
    //锯齿
    {
      title: "锯齿",
      key: "aliasing",
      form: {
        disabled: true,
      },
      valueBuilder(row, key) {
        row.aliasing = row.aliasing === null ? "/" : row.aliasing;
      },
    },
    //马赛克
    {
      title: "马赛克",
      key: "blockness",
      width: 120,
      search: {
        disabled: true,
      },
      form: {
        disabled: true,
      },
      valueBuilder(row, key) {
        row.blockness = row.blockness === null ? "/" : row.blockness;
      },
    },
    //PSNR
    {
      title: "PSNR",
      key: "psnr",
      search: {
        disabled: false,
      },
      minWidth: 120,
      valueBuilder(row, key) {
        row.psnr = row.psnr === null ? "/" : row.psnr;
      },
    },
    //SSIM
    {
      title: "SSIM",
      key: "ssim",
      search: {
        disabled: false,
      },
      width: 120,
      type: "input",
      valueBuilder(row, key) {
        row.ssim = row.ssim === null ? "/" : row.ssim;
      },
    },
    //VMAF
    {
      title: "VMAF",
      key: "vmaf",
      search: {
        disabled: true,
      },
      width: 120,
      valueBuilder(row, key) {
        row.vmaf = row.vmaf === null ? "/" : row.vmaf;
      },
    },
    //评分
    {
      title: "评分",
      key: "nr_score",
      width: 120,
      search: {
        disabled: true,
      },
      form: {
        disabled: true,
      },
    },
  ];
  //动态分流
  type === "nr"
    ? (columns = nrColumns)
    : type === "ref"
    ? (columns = refcolumns)
    : (columns = allcolumns);
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
      edit: {
        thin: true,
        text: "",
        show: false,
        disabled() {
          return !vm.hasPermissions("Update");
        },
      },
      remove: {
        thin: true,
        text: "",
        show: false,
        disabled() {
          return !vm.hasPermissions("Delete");
        },
      },
      custom: [
        {
          text: "片段导出",
          show(index, row) {
            if (row.url && row.id) {
              return true;
            }
            return false;
          },
          disabled() {
            //判断菜单按钮权限
            return true;
          },
          type: "warning",
          size: "small",
          emit: "output",
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
    columns: columns,
  };
};

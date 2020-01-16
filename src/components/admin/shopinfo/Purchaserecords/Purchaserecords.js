import { Api } from "../../../../APi/WEBPC/index";
export default {
  data: function() {
    return {
      DialogVisible: false, // 遮罩
      form: {
        // 遮罩表单
        name: "",
        date1: "",
        date2: "",
        type: []
      },
      addproduclist: [], //获取添加购卡记录的所有活动数据
      By_vip_card: [], //购卡记录选择后的展示数组
      flag: false, // 新增购卡记录数组为空时的判断字符
      pickerOptions2: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              // start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近两周",
            onClick(picker) {
              const end = new Date();
              const start = new Date();

              start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
              picker.$emit("pick", [start, end]);
            }
          },
          {
            text: "最近一个月",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
              picker.$emit("pick", [start, end]);
            }
          }
        ]
      },
      timenum: "", //   日期操作对象
      limit: 15, //   默认第一页数据
      county: "", //   省份
      city: "", //   城市
      type: "", //   类型
      isLoading: false, //   加载
      productlist: [], //   表格数据列表
      starttime: "", //   开始时间
      endtime: "", //   结束时间
      keyword: "", //   模糊检索
      multipleSelection: [], //   复选框操作数组
      // 分页
      currentPage: 1,
      page: 1,
      total: 0,
      pagesize: 10,
      tmpNum: ""
    };
  },
  directives: {
    // 自定义组件 v-focus
    focus: {
      inserted: function(el) {
        el.focus();
      }
    }
  },

  methods: {
    Sub_find_add() {
      // 添加热门商家
      this.keyword = this.form.date1;
      if (this.keyword.indexOf(" ") != -1) {
        this.$message.info("您的检索条件含有空格！！");
        return;
      }
      this.keyword.replace(/\s/g, ""); // 清除字符串空格
      this.isbig = 0;
      this.page = 1;
      this.flag = true;
      this.getlist();
    },
    addSubs(id) {
      if (this.By_vip_card != "") {
        if (this.By_vip_card[0].id == id) {
          this.$message.success("您已选择该商家!");
          return;
        } else {
          this.By_vip_card.splice(0, 1);
          this.addproduclist.forEach(ele => {
            if (ele.id == id) {
              this.By_vip_card.push(ele);
            }
          });
          return;
        }
      }
      this.addproduclist.forEach(ele => {
        if (ele.id == id) {
          this.By_vip_card.push(ele);
        }
      });
      this.flag = false;
    },
    del() {
      this.By_vip_card.splice(0, 1);
    },
    Sethot() {
      // 设置大牌商家
      if (this.By_vip_card != "") {
        Api.Set_merchant({
          merchid: this.By_vip_card[0].id
        })
          .then(res => {
            this.$message.success(res.data.message);
          })
          .catch(err => {
            this.$message.error(err.data.message);
          });
        this.ishot = 1;
        setTimeout(this.getlist, 500);
        this.DialogVisible = false;
      }
      
    },
    // 获取列表
    getlist() {
      this.isLoading = true;
      Api.Buy_card_record({
        limit: this.limit,
        page: this.currentPage,
        keyword: this.keyword,
        starttime: this.starttime,
        endtime: this.endtime
      })
        .then(res => {
          console.log('购卡记录',res)
          this.isLoading = false;
          if (res.data.result.list != "") {
            this.productlist = res.data.result.list;
          }else{
            this.productlist = [];
          }
          this.total = parseInt(res.data.result.total);
        })
        .catch(err => {
          console.log(err.data);
        });
    },
    // 搜索
    searchfood() {
      this.currentPage = 1;
      this.getlist();
    },
    // 状态选择
    typechange(val) {
      this.currentPage = 1;
      this.type = val;
      this.getlist();
    },
    // 日期选择
    timechange() {
      if (this.timenum) {
        this.starttime = this.timenum[0];
        this.endtime = this.timenum[1];
      } else {
        this.starttime = "";
        this.endtime = "";
      }
      this.getlist();
    },
    // 表格前面选择
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },

    handleCurrentChange(val) {
      //   console.log('当前页面',val)
      this.currentPage = val;
      this.getlist();
    },
    // 获得焦点
    celltrigger(row, column, cell, event) {
      if (
        column.property == "code" ||
        column.property == "price" ||
        column.property == "goodsname" ||
        column.property == "repertory"
      ) {
        row[column.property]["focus"] = true;
        row[column.property]["state"] = true;

        this.tmpNum = row[column.property].value;
        // console.log('获得焦点',this.tableData)
      } else {
        // this.$message("只有数量栏可以进行手动编辑");
        return false;
      }
    }
  },
  created() {
    this.getlist();
    // this.gettype()
  },
  filters: {
    numtofixed: function(value) {
      // console.log(value)
      return Number(value).toFixed(2);
    }
  }
};

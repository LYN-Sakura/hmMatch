import { Api } from "../../../../APi/WEBPC/index.js";
export default {
  data: function() {
    return {
      // isDisabled:false,
      centerDialogVisible: false, // 遮罩
      form: {
        // 遮罩表单
        name: "",
        date1: "",
        date2: "",
        type: []
      },
      typelist: [
        {
          value: "1",
          label: "启用"
        },
        {
          value: "0",
          label: "禁用"
        }
      ],
      type: "", //是否启用热门活动的值
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
      timenum: "",
      county: "", // 省份
      countylist: [], // 省份数组
      city: "", // 市区
      citylist: [], // 市区数组
      code: "", // 省份状态码
      codes: "", // 城市状态码
      isLoading: true,
      ishot: 1, // 是否热门活动
      delFoodID: "", // 删除iD
      productlist: [], // 表格数据
      addproduclist: [], //获取添加热门活动的所有活动数据
      By_hot_active: [], //热门活动选择后的展示数组
      flag: false, // 新增热门活动数组为空时的判断字符
      starttime: "", // 开始时间
      endtime: "", // 结束时间
      keyword: "", // 模糊检索
      multipleSelection: [], // 回收id数组
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
    timechange() {
      // 日期筛选
      if (this.timenum) {
        this.starttime = this.timenum[0];
        this.endtime = this.timenum[1];
      } else {
        this.starttime = "";
        this.endtime = "";
      }
      this.getlist();
    },
    // 获取热门活动列表，ishot固定为1
    getlist() {
      this.isLoading = true;
      Api.Activelist({
        limit: this.limit,
        page: this.page,
        keyword: this.keyword,
        ishot: this.ishot,
        starttime: this.starttime,
        endtime: this.endtime,
        province: this.code,
        city: this.codes,
        status: this.type
      }).then(res => {
        this.isLoading = false;
        console.log('热门活动',res)
        if (res.data.result.list != "") {
          if (this.ishot == 1) {
            this.productlist = res.data.result.list;
          } else {
            this.addproduclist = res.data.result.list;
          }
        } else {
          if (this.centerDialogVisible) {
            // 遮罩弹框中搜索不是热门活动的活动列表
            this.$message.info("非常抱歉，您的检索条件下数据为空!");
          } else {
            this.productlist = []; // 清空原表格列表数据
          }
        }
        this.total = parseInt(res.data.result.total);
      });
    },
    // 搜索
    searchfood() {
      this.currentPage = 1;
      this.getlist();
    },
    active_find_add() {
      // 添加热门活动
      this.keyword = this.form.date1;
      if (this.keyword.indexOf(" ") != -1) {
        this.$message.info("您的检索条件含有空格！！");
        return;
      }
      this.keyword.replace(/\s/g, ""); // 清除字符串空格
      this.ishot = 0;
      this.page = 1;
      this.flag = true;
      this.getlist();
    },
    addactive(id) {
      if (this.By_hot_active != "") {
        if (this.By_hot_active[0].id == id) {
          this.$message.success("您已选择该活动!");
          return;
        } else {
          this.By_hot_active.splice(0, 1);
          this.addproduclist.forEach(ele => {
            if (ele.id == id) {
              this.By_hot_active.push(ele);
            }
          });
          return;
        }
      }
      this.addproduclist.forEach(ele => {
        if (ele.id == id) {
          this.By_hot_active.push(ele);
        }
      });
      this.flag = false;
    },
    del() {
      this.By_hot_active.splice(0, 1);
    },
    Sethot() {
      Api.Set_hot_active({
        activeid: this.By_hot_active[0].id
      })
        .then(res => {
          this.$message.success(res.data.message);
        })
        .catch(err => {
          this.$message.error(err.data.message);
        });
      this.ishot = 1;
      setTimeout(this.getlist, 500);
      this.centerDialogVisible = false;
    },
    // 状态选择
    typechange(val) {
      this.currentPage = 1;
      this.type = val;
      this.getlist();
    },
    // 操作删除
    deleteFood(all, row) {
      this.$confirm("商品将被放入回收站, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      }).then(() => {
        let deleteid = "";
        if (all == "isall") {
          if (this.multipleSelection.length == 0) {
            this.$message.warning("请先选择需要放入回收站的活动!");
            return;
          }
          let tmplist = [];
          this.multipleSelection.forEach(item => {
            tmplist.push(item.id);
          });
          tmplist = tmplist.join(",");
          deleteid = tmplist;
        } else if (all == "notall") {
          deleteid = row.id;
        }
        Api.Del_hot_active({
          activeid: deleteid
        })
          .then(res => {
            this.$message.success(res.data.message);
          })
          .catch(err => {
            console.log(err.data);
          });
        this.currentPage = 1;
        setTimeout(this.getlist, 500);
      });
    },
    statusupdate(all, status, row) {
      let ids = []; // 状态更改数组;
      // 状态更改
      if (all == "isall") {
        if (this.multipleSelection.length == 0) {
          this.$message.warning("请先选择需要更改状态的活动");
          return;
        }
        this.multipleSelection.forEach(item => {
          if (this.productlist.indexOf(item) != -1) {
            if (status == 1) {
              // 显示
              item.status_text = "启用";
            } else if (status == 0) {
              // 隐藏
              item.status_text = "隐藏";
            }
            ids.push(item.id);
          }
        });
        if (status == 1) {
          // 显示
          this.staupdate(ids, 0);
        } else {
          // 隐藏
          this.staupdate(ids, 1);
        }
      } else if (all == "notall") {
        this.productlist.forEach(element => {
          if (element.id == row.id) {
            ids.push(element.id);
            if (element.status_text == "启用") {
              element.status_text = "隐藏";
              this.staupdate(ids, 1);
            } else {
              element.status_text = "启用";
              this.staupdate(ids, 0);
            }
          }
        });
      }
    },
    staupdate(ids, status) {
      Api.Update_hot_active({
        id: ids,
        status: status
      })
        .then(res => {
          this.$message.success(res.data.message);
          this.getlist();
        })
        .catch(err => {
          this.$message.error(err.data.message);
        });
    },
    // 复选框操作情况;
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格数据前后页
    handleCurrentChange(val) {
      this.currentPage = val;
      this.getlist();
    },
    handleCurrentChange1(val) {
      this.page = val;
    },

    handleMouseEnter: function(row, column, cell, event) {
      //   alert(1111)
      // console.log(column, "likai");
      // row[row.column.property]['isShow'] = false
      // opts.row[opts.column.property]['state'] = false;
      //   cell.children[0].children[1].style.color="black";
    },
    // 单元格点击事件
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
        // console.log(this.tmpNum, "ggggg");
        // console.log('获得焦点',this.tableData)
      } else {
        // this.$message("只有数量栏可以进行手动编辑");
        return false;
      }
    },
    address(val) {
      // 省级获取数据
      let that = this;
      if (this.countylist != "") {
        this.countylist.forEach(element => {
          if (element.name == val) {
            that.code = element.code;
          }
        });
      }
      this.$http
        .post(Api.url + "admin/index/get_lower_address", {
          code: that.code
        })
        .then(res => {
          this.city = "";
          if (this.countylist != "") {
            this.citylist = res.data.result.list;
          } else {
            this.countylist = res.data.result.list;
          }
        })
        .catch(err => {
          this.$message.error(err.data.message);
        });
    },
    addresschange(val) {
      // 市级获取数据
      let that = this;
      if (this.citylist != "") {
        this.citylist.forEach(element => {
          if (element.name == val) {
            that.codes = element.code;
          }
        });
      }
    }
  },
  created() {
    this.getlist();
    this.address();
    // this.gettype()
  },
  filters: {
    numtofixed: function(value) {
      // console.log(value)
      return Number(value).toFixed(2);
    }
  }
};

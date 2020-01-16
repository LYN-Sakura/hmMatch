import { Api } from "../../../../APi/WEBPC/index";
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
      timenum: "", // 日期数组
      county: "", // 省份
      countylist: [], // 省份数组
      city: "", // 市区
      citylist: [], // 市区数组
      code: "", // 省份状态码
      codes: "", // 城市状态码
      isbig: 1, // 是否热门商家
      type: "", // 查询热门活动是否启用的数据列表
      isLoading: false, // 数据加载中
      productlist: [], // 表格数据数组
      addproduclist: [], //获取添加热门活动的所有活动数据
      By_hot_sub: [], //热门活动选择后的展示数组
      flag: false, // 新增热门活动数组为空时的判断字符
      starttime: "", // 开始时间
      endtime: "", // 结束时间
      keyword: "", // 模糊检索
      multipleSelection: [], // 放入回收站的数据数组
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
      // 日期查询
      if (this.timenum) {
        this.starttime = this.timenum[0];
        this.endtime = this.timenum[1];
      } else {
        this.starttime = "";
        this.endtime = "";
      }
      this.getlist();
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
              item.enabled = true;
            } else if (status == 0) {
              item.enabled = false;
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
            if (element.enabled) {
              element.enabled = true;
              this.staupdate(ids, 0);
            } else {
              element.enabled = false;
              this.staupdate(ids, 1);
            }
          }
        });
      }
    },
    staupdate(ids, status) {
      Api.Update_big_merchant({
        merchid: ids,
        enabled: status
      })
        .then(res => {
          this.$message.success(res.data.message);
          this.getlist();
        })
        .catch(err => {
          this.$message.error(err.data.message);
        });
    },
    // 获取列表
    getlist() {
      this.isLoading = true;
      Api.Show_merchant_list({
        limit: this.limit,
        page: this.page,
        keyword: this.keyword,
        isbig: this.isbig,
        starttime: this.starttime,
        endtime: this.endtime,
        province: this.code,
        city: this.codes,
        enabled: this.type
      }).then(res => {
        this.isLoading = false;
        if (res.data.result.list != "") {
          if (this.isbig == 1) {
            this.productlist = res.data.result.list;
          } else {
            this.addproduclist = res.data.result.list;
          }
        } else {
          if (this.centerDialogVisible) {
            this.$message.info("非常抱歉，您的检索条件下数据为空!");
          } else {
            this.productlist = [];
          }
        }
        this.productlist.forEach(element => {
          if (element.enabled == 1) {
            element.enabled = true;
          } else {
            element.enabled = false;
          }
        });
        this.total = parseInt(res.data.result.total);
      });
    },
    // 搜索
    searchfood() {
      this.currentPage = 1;
      this.getlist();
    },
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
      if (this.By_hot_sub != "") {
        if (this.By_hot_sub[0].id == id) {
          this.$message.success("您已选择该商家!");
          return;
        } else {
          this.By_hot_sub.splice(0, 1);
          this.addproduclist.forEach(ele => {
            if (ele.id == id) {
              this.By_hot_sub.push(ele);
            }
          });
          return;
        }
      }
      this.addproduclist.forEach(ele => {
        if (ele.id == id) {
          this.By_hot_sub.push(ele);
        }
      });
      this.flag = false;
    },
    del() {
      this.By_hot_sub.splice(0, 1);
    },
    Sethot() {
      // 设置大牌商家
      Api.Set_merchant({
        merchid: this.By_hot_sub[0].id
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
            this.$message.warning("请先选择需要放入回收站的商品!");
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
        Api.Del_merchant({
          id: deleteid
        })
          .then(res => {
            this.$message.success(res.data.message);
          })
          .catch(err => {
            this.$message.error(err.data.message);
          });
        this.currentPage = 1;
        setTimeout(this.getlist, 500);
      });
    },
    foodHide() {
      // 隐藏
    },
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    // 复选框操作情况
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格数据前后页
    handleCurrentChange(val) {
      //   console.log('当前页面',val)
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
    // 获得焦点
    celltrigger(row, column, cell, event) {
      // console.log('获得焦点',row, column, cell, event);
      // console.log(column,'11111')
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
            that.code = element.code;
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

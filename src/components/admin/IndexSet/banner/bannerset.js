import { Api } from "../../../../APi/WEBPC/index";
export default {
  data: function() {
    return {
      // isDisabled:false,
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
      type: "",
      limit: "", // 限制
      isLoading: false,
      productlist: [], // 表格数据数组
      keyword: "", // 模糊检索
      multipleSelection: [], // 回收站数组
      // 分页
      currentPage: 1,
      page: 1,
      total: 0,
      pagesize: 10,
      idstr: "",
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.isLoading = true;
      Api.Slide_list({
        limit: this.limit,
        page: this.page,
        isshow:this.type,
        keyword: this.keyword
      })
        .then(res => {
          this.isLoading = false;
          if (res.data.result.list != "") {
            this.productlist = res.data.result.list;
            this.productlist.forEach(element => {
              if (element.isshow == 1) {
                element.isshow = true;
              } else {
                element.isshow = false;
              }
            });
          }else{
            this.productlist = [];
          }
          this.total = parseInt(res.data.result.total);
        })
        .catch(err => {
          this.$message.error(err.data.message);
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
        Api.Del_assign_slide({
          id:deleteid
        }).then(res=>{
          this.$message.success(res.data.message);
          this.getlist();
        }).catch(err=>{
          this.$message.success(err.data.message);
        })
      });
    },
    // 点击编辑
    editFood(rows) {
      this.$router.push({
        path:'/addppt',
        query:{
          pid:rows.id
        }
      });
    },
    // 复选框修改Id数组
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 表格前后页选择
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
    // 跳转添加页面
    toaddlevel() {
      this.$router.push("/addppt");
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
              // 审核通过
              item.isshow = true;
            } else if (status == 0) {
              // 未审核
              item.isshow = false;
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
            if (element.isshow) {
              element.isshow = true;
              this.staupdate(ids, 0);
            } else {
              element.isshow = false;
              this.staupdate(ids, 1);
            }
          }
        });
      }
    },
    staupdate(ids, status) {
      Api.Is_use_slide({
        id: ids,
        isshow: status
      })
        .then(res => {
          this.$message.success(res.data.message);
          this.getlist();
        })
        .catch(err => {
          this.$message.error(err.data.message);
        });
    },
  },
  created() {
    this.getlist();
  },
  filters: {
    numtofixed: function(value) {
      return Number(value).toFixed(2);
    }
  }
};

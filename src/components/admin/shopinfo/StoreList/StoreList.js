import "../../../../APi/WEBPC/index";
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
      pickerOptions2: {
        shortcuts: [
          {
            text: "今天",
            onClick(picker) {
              const end = new Date();
              const start = new Date();
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
      county: "",
      city: "",
      type: "",
      isLoading: false,
      delFoodID: "",
      productlist: [],
      starttime: "",
      endtime: "",
      keyword: "",
      multipleSelection: [],
      input5: "",
      select: "",
      // 分页
      currentPage: 1,
      page: 1,
      limit:10,
      total: 0,
      pagesize: 10,
      idstr: "",
      tmpNum: "",
    };
  },
  methods: {
    // 获取列表
    getlist() {
      this.isLoading = true;
      // 非必填参数limit:每页显示记录数，page:当前页数,keyword:模糊检索标题,starttime:开始时间,endtime:结束时间
      Api.Vip_card_list({
        limit: this.pagesize,
        page: this.currentPage,
        keyword: this.keyword,
        starttime: this.starttime,
        endtime: this.endtime
      })
        .then(res => {
          console.log(res.data);
          this.isLoading = false;
          this.productlist = res.data.result.list;
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
    timechange() {  // 日期选择
      if (this.timenum) {
        this.starttime = this.timenum[0];
        this.endtime = this.timenum[1];
      } else {
        this.starttime = "";
        this.endtime = "";
      }
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
        this.$http
          .post(this.api + "/admin/goods/delgoods", {
            is_delete: 1,
            idstr: deleteid
          })
          .then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.message);
            } else {
              this.$message.error(res.data.message);
            }
            this.currentPage = 1;
            this.getlist();
          });
      });
    },
    /**
     * @name: qw
     * @test:
     * @msg: 链接分享
     * @param {type}
     * @return:
     */
    shareFood(rows) {},
    statusupdate(all,status,row) {
      // 状态更改
      if (all == "isall") {
        if (this.multipleSelection.length == 0) {
          this.$message.warning("请先选择需要更改状态的活动");
          return;
        }
        this.multipleSelection.forEach(item => {
          if(this.productlist.indexOf(item)!=-1){
            if(status==1){  // 显示
              item.status = '启用'
            }else if(status==0){  // 隐藏
              item.status = '隐藏'
            }
          }
        });
      }else if (all == "notall") {
        this.productlist.forEach(element => {
          if (element.id==row.id) {
            if (element.status == "启用") {
                element.status = "隐藏";
              } else {
                element.status = "启用";
              }
            }
        });
      }   
    },
    // 点击编辑
    editFood(rows) {
      this.$router.push({
        path:'/nosingcard',
        query:{
          pid:rows.id
        }
      });
    },
    // 复选框操作情况
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection);
    },
    // 表格上下页选择
    handleCurrentChange(val) {
      //   console.log('当前页面',val)
      this.currentPage = val;
      this.getlist();
    },
    // handleCurrentChange1(val) {
    //   this.page = val;
    // },
    handleMouseEnter: function(row, column, cell, event) {
      //   alert(1111)
      // console.log(column, "likai");
      // row[row.column.property]['isShow'] = false
      // opts.row[opts.column.property]['state'] = false;
      //   cell.children[0].children[1].style.color="black";
    },
    // 跳转添加页面
    toaddlevel() {
      this.$router.push("/nosingcard");
    },
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

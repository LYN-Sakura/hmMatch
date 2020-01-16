import { Api } from "../../../../APi/WEBPC/index";
export default {
  data() {
    return {
      value1: "",
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
      currentPage: 1,
      tableData: [], // 列表数据
      total: 0, // 列表数据总条目数
      limit: 10, // 每页数据
      page: 1, // 当前页
      keyword: "" // 模糊检索
    };
  },
  methods: {
    // 搜索查询
    search() {
      this.getlist();
    },
    // 表格上下页选择
    handleCurrentChange(val) {
      //   console.log('当前页面',val)
      this.currentPage = val;
      this.getlist();
    },
    // 状态选择
    typechange(val) {
      this.currentPage = 1;
      this.type = val;
      this.getlist();
    },
    //   列表数据
    getlist() {
      Api.Sub_class({
        limit: this.limit,
        page: this.page,
        keyword: this.keyword,
        isshow:this.type
      })
        .then(res => {
          if (res.data.result.list != "") {
            this.tableData = res.data.result.list;
            this.tableData.forEach(el => {
              if (el.isshow == 1) {
                el.isshow = true;
              } else {
                el.isshow = false;
              }
            });
          }
          this.total = parseInt(res.data.result.total);
        })
        .catch(err => {
          console.log(err.data);
        });
    },
    // 状态更改
    statusupdate(row) {
      let ids = []; // 状态更改数组;
      // 状态更改
      this.tableData.forEach(element => {
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
    },
    staupdate(ids, status) {
      Api.Update_assign_class({
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
    // 编辑修改
    editFood(row){  
      this.$router.push({
        path:'/addshopclass',
        query:{
          pid:row.id
        }
      });
    }
  },
  created() {
    this.getlist();
  }
};

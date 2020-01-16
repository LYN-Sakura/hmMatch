<template>
  <div class="ccia">
    <div class="ccia_top">
      <button @click="toaddlevel">创建支付方式</button>
    </div>
    <div class="ccia_contentbox">
      <div class="ccia_content clearfix">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
        >
          <el-table-column label="序号" type="index" width="100"></el-table-column>
          <el-table-column label="支付方式">
            <template slot-scope="scope">
              <span v-if="scope.row.paytype==1">支付宝支付</span>
              <span v-if="scope.row.paytype==2">微信app支付</span>
              <span v-if="scope.row.paytype==3">微信H5公众号支付</span>
              <span v-if="scope.row.paytype==4">微信小程序支付</span>
            </template>
          </el-table-column>
          <el-table-column prop="createtime_show" label="创建时间"></el-table-column>

          <el-table-column fixed="right" label="操作">
            <template slot-scope="scope">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <span class="edit" @click="toedit(scope.row)">
                  <i class="el-icon-edit"></i>
                </span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="删除" placement="top">
                <span class="edit" @click="deletelevel('notall',scope.row)">
                  <i class="el-icon-delete"></i>
                </span>
              </el-tooltip>
            </template>
          </el-table-column>
        </el-table>
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="10"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import { Api } from "../../../../APi/WEBPC/index.js";
export default {
  data() {
    return {
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
      keyword: "",
      //表格
      tableData: [],
      multipleSelection: [],
      // 分页
      currentPage: 1,
      limit: 10,
      total: 0
    };
  },
  methods: {
    // 获取列表
    getlist() {
      Api.Pay_set_list({
        
      }).then(res => {
        console.log(res,111);
        if (res.data.status == 1) {
          this.tableData = res.data.result.list;
          this.total = Number(res.data.result.list.length);
        } else {
          this.tableData = [];
          this.total = 0;
        }
      });
    },
    // 状态选择
    // typechange(val){
    //     console.log(val)
    //     this.currentPage = 1
    //     this.type = val
    //     this.getlist()
    // },
    search() {
      this.currentPage = 1;
      this.getlist();
    },
    // 跳转添加页面
    toaddlevel() {
      this.$router.push("/addpayset");
    },
    toedit(row) {
      this.$router.push({
        path: "/addpayset",
        query: {
          id: row.paytype
        }
      });
    },
    // 选中事件
    handleSelectionChange(val) {
      this.multipleSelection = val;
      // console.log(this.multipleSelection)
    },
    // 换页
    handleCurrentChange(val) {
      // console.log(`当前页: ${val}`);
      this.currentPage = val;
      this.getlist();
    },
    // 删除按钮
    deletelevel(all, row) {
      this.$confirm("此操作将永久删除, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          let deleteid = "";
          if (all == "isall") {
            if (this.multipleSelection.length == 0) {
              this.$message.warning("请先选择需要删除的内容!");
              return;
            }
            let tmplist = [];
            this.multipleSelection.forEach(item => {
              tmplist.push(item.id);
            });
            tmplist = tmplist.join(",");
            // console.log(tmplist)
            deleteid = tmplist;
          } else if (all == "notall") {
            deleteid = row.id;
          }

          this.$http
            .post(this.api + "admin/payset/delete", {
              id: deleteid
            })
            .then(res => {
              // console.log('删除',res)
              if (res.data.status == 1) {
                this.$message.success("删除成功!");
                this.getlist();
              } else {
                this.$message.error(res.data.result.message);
              }
            });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },
  mounted() {
    this.getlist();
  }
};
</script>
<style lang="less" scoped>
.ccia {
  .ccia_top {
    button {
      // width: 100px;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      color: #ffffff;
      border: 0;
      font-size: 12px;
      border-radius: 2px;
      background: linear-gradient(
        90deg,
        rgba(203, 163, 99, 1) 0%,
        rgba(225, 196, 147, 1) 100%
      );
      outline: none;
      cursor: pointer;
      float: left;
    }
    > div {
      float: right;
      width: 60%;
      button {
        border-radius: 0;
        padding: 0 16px;
        float: right;
      }
    }
    .el-select {
      float: right;
      width: 100px;
      border-radius: 0;
    }
    .el-input {
      float: right;
      width: 70%;
      border-radius: 0;
    }
    /deep/ .el-input__inner {
      border-radius: 0;
    }
  }
}
.edit {
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 2px;
  border: 1px solid #eff0f0;
  // border: 1px solid red;
  text-align: center;
  cursor: pointer;
  i {
    line-height: 22px;
    font-size: 13px;
  }
}
.edit:hover {
  border: 1px solid #28b7a3;
  i {
    color: #28b7a3;
  }
}
</style>



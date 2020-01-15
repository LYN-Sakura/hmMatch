<template>
  <div class="note">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread_mbx">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <span class="pur_sp">采购单编号</span>
          <el-input v-model="input" class="pur_inp"></el-input>
          <span class="pur_sp">状态</span>
          <el-input v-model="input1" class="pur_inpu"></el-input>
          <span class="pur_sp">创建日期</span>
          <el-date-picker v-model="value" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"> </el-date-picker>
        </el-col>
        <el-col>
          <span class="pur_sp">预计到店日期</span>
          <el-date-picker v-model="value1" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"> </el-date-picker>
          <el-button type="primar" icon="el-icon-refresh-left">重置</el-button>
          <el-button type="primary" icon="el-icon-search">查询</el-button>
        </el-col>
      </el-row>
    </el-card>

    <!-- 主体内容区域 -->
    <el-card>
      <el-row>
        <!-- 数据区域 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="bianhao" label="退货单编号"> </el-table-column>
          <el-table-column prop="date" label="创建日期"> </el-table-column>
          <el-table-column prop="xiangnum" label="订购品项数"> </el-table-column>
          <el-table-column prop="dingnum" label="订购总数"> </el-table-column>
          <el-table-column prop="backmoney" label="退货总金额"> </el-table-column>
          <el-table-column label="订单状态">
            <template slot-scope="scope">
              <el-switch v-model="scope.row.state" active-text="已处理" inactive-text="未处理"></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" class="read">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="xiu(scope.row.id)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="shan(scope.row.id)"></el-button>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pur_pagi">
          <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000"> </el-pagination>
        </div>
      </el-row>
    </el-card>
    <!-- 修改弹出框 -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <span class="wode">退货单编号</span>
      <el-input v-model="form.bianhao" disabled></el-input>
      <span class="wode">创建日期</span>
      <el-input v-model="form.date" disabled> </el-input>
      <span class="wode">订购品项数</span>
      <el-input v-model="form.xiangnum"> </el-input>
      <span class="wode">订购总数</span>
      <el-input v-model="form.dingnum"> </el-input>
      <span class="wode">退货总金额</span>
      <el-input v-model="form.backmoney"> </el-input>
      <span slot="footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="querenxiugai">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: 'second',
      input: '',
      input1: '',
      value: '',
      value1: '',
      // 修改框显隐
      dialogVisible: false,
      tableData: [
        { id: 0, bianhao: '4258795415856', date: '2020.1.14', xiangnum: 5, dingnum: 200, backmoney: 1350, state: true },
        {
          id: 2,
          bianhao: '4258795415856',
          date: '2020.1.14',
          xiangnum: 5,
          dingnum: 200,
          backmoney: 1350,
          state: false
        },
        { id: 3, bianhao: '4258795415856', date: '2020.1.14', xiangnum: 5, dingnum: 200, backmoney: 1350, state: true }
      ],
      // 修改找到的数据
      form: {}
    }
  },
  methods: {
    shan(id) {
      this.$confirm('此操作将永久删除该采购单，是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
          var index = this.tableData.findIndex(res => {
            return res.id === id
          })
          console.log(index)
          this.tableData.splice(index, 1)
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    xiu(id) {
      var index = this.tableData.findIndex(res => {
        return res.id === id
      })
      console.log(index)
      this.index = index
      window.localStorage.setItem('index', index)
      this.form = this.tableData[this.index]
      this.dialogVisible = true
    },
    querenxiugai() {
      console.log(this.form)
      var index = window.localStorage.getItem('index')
      this.tableData[index] = this.form
      this.dialogVisible = false
    }
  }
}
</script>

<style>
.pur_pagi .btn-prev {
  border: 1px solid#4c4c4c;
  margin-left: 5px !important;
  border-radius: 5px !important;
}
.pur_pagi .btn-next {
  border: 1px solid#4c4c4c;
  margin-left: 5px !important;
  border-radius: 5px !important;
}
.pur_pagi .number {
  border: 1px solid#4c4c4c;
  margin: 0 5px !important;
  border-radius: 5px !important;
}
.cell {
  text-align: center;
}
</style>

<style lang="less" scoped>
.bread_mbx {
  margin: 40px 10px 30px 60px;
}
.el-card {
  width: 1500px;
  margin-left: 60px;
  margin-bottom: 30px;
}
.pur_sp {
  font-size: 14px;
  margin: 50px 20px 47px 60px;
}
.pur_inp {
  width: 264px;
  height: 30px;
  margin: 40px 0 30px 0;
}
.pur_inpu {
  width: 110px;
  height: 30px;
}
.el-button {
}

.el-button--primary {
  color: #fff;
  background-color: #48bbc2;
  border-color: #48bbc2;
}
.el-button--primary:hover {
  color: #fff;
  background-color: #48bbc2 !important;
  border-color: #48bbc6 !important;
}
.el-button--primary:focus {
  background-color: #48bbc2;
  border-color: #48bbc2;
}
.el-button--primar {
  color: #333333;
}
.el-button--primar:hover {
  color: #333333;
}
.el-button--primar:focus {
  color: #333333;
}

// 分页样式
.el-pagination {
  float: right;
  margin-top: 30px;
}
span.wode {
  display: block;
  margin: 10px 0;
}
</style>

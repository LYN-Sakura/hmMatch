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
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="date" label="退货单编号" width="180"> </el-table-column>
          <el-table-column prop="name" label="创建日期" width="180"> </el-table-column>
          <el-table-column prop="address" label="订购品项数"> </el-table-column>
          <el-table-column prop="address" label="订购总数"> </el-table-column>
          <el-table-column prop="address" label="退货总金额"> </el-table-column>
          <el-table-column prop="address" label="订单状态"> </el-table-column>
          <el-table-column label="操作" class="read">
            <span style="color: #47bac2;"> 查看</span>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pur_pagi">
          <el-pagination   :page-size="100" layout="prev, pager, next, jumper" :total="1000">
          </el-pagination>
        </div>
      </el-row>
    </el-card>
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
      tableData: [
        {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        },
        {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        },
        {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        },
        {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }
      ]
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
  width: 100px;
  border-radius: 50px !important;
  float: right;
  margin-left: 20px;
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
</style>

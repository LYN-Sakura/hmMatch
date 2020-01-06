<template>
  <div class="note">
    <!-- 面包屑导航区域 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="bread_mbx">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
    </el-breadcrumb>

    <!-- 卡片视图区域 -->
    <el-card>
      <el-row>
        <el-col>
          <span class="pur_sp">订单编号:</span>
          <span class="pur_spa">20180516001</span>
          <span class="pur_sp">订购品项数:</span>
          <span class="pur_spa">50</span>
          <span class="pur_sp">订购总数:</span>
          <span class="pur_spa">2000</span>
          <span class="pur_sp">订单总金额:</span>
          <span class="pur_spa">154050.1120</span>
        </el-col>
        <el-col>
          <span class="pur_sp">创建日期:</span>
          <span class="pur_spa">2018-05-17</span>
          <span class="pur_sp">预计到店日期:</span>
          <span class="pur_spa">2018-05-17</span>
        </el-col>
      </el-row>
    </el-card>

    <!-- 主体内容区域 -->
    <el-card>
      <el-row>
        <!-- 数据区域 -->
        <el-table :data="tableData" style="width: 100%">
          <el-table-column type="selection" width="55"> </el-table-column>
          <el-table-column prop="date" label="货号" width="180"> </el-table-column>
          <el-table-column prop="name" label="国际条码" width="180"> </el-table-column>
          <el-table-column prop="address" label="品名"> </el-table-column>
          <el-table-column prop="address" label="规格"> </el-table-column>
          <el-table-column prop="address" label="单位"> </el-table-column>
          <el-table-column prop="address" label="商品进价"> </el-table-column>
          <el-table-column prop="address" label="保质期"> </el-table-column>
          <el-table-column prop="address" label="温层"> </el-table-column>
          <el-table-column prop="address" label="订购总数"> </el-table-column>
          <el-table-column prop="address" label="订购总金额"> </el-table-column>
          <el-table-column prop="address" label="实际发货数"> </el-table-column>
          <el-table-column prop="address" label="实际收货数"> </el-table-column>
        </el-table>
        <!-- 分页 -->
        <div class="pur_pagi">
          <el-pagination :page-size="100" layout="prev, pager, next, jumper" :total="1000"> </el-pagination>
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
  margin: 50px 20px 60px 20px;
}
.pur_spa {
  font-size: 14px;
  margin: 50px 20px 60px 0;
}
.el-col  {
  margin: 30px 0;
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

<template>
  <div class="boay">
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      <el-breadcrumb-item>采购单管理</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 头部退货区域  -->
    <el-card class="card_f">
      <el-form :inline="true" v-model="form" label-width="1500" border :inline-message="true" :data="form">
        <el-form-item label="创建日期" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="退货单编号" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="门店" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="退货状态" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item class="btnBox">
          <el-button round class="btn" size="mini">
            <img src="../../../public/uploads/middle_return.png" class="img" alt="" />
            返回</el-button
          >
        </el-form-item>
        <el-form-item label="退货品项数" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="退货总数" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="退货总金额" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="审核意见" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 退货body -->
    <el-card class="card_b">
      <!-- <el-table :data="tableData" header-cell-style="background-color:#f1f1f1;" cell-style="background-color:#f1f1f1;"> -->
      <el-table :data="tableData" :header-cell-class-name="headerStyle" :cell-style="cellStyle">
        <el-table-column type="index" label="序号" width="55"> </el-table-column>
        <el-table-column prop="date" label="门店" width="180"> </el-table-column>
        <el-table-column prop="name" label="叫货编号" width="180"> </el-table-column>
        <el-table-column prop="address" label="订购总数"> </el-table-column>
        <el-table-column prop="address" label="订购总金额"> </el-table-column>
        <el-table-column prop="address" label="实际发货数"> </el-table-column>
        <el-table-column prop="address" label="实际收货数"> </el-table-column>
        <el-table-column prop="address" label="差异值"> </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>
<script>
export default {
  data() {
    return {
      form: {
        name: '',
        region: '',
        date1: '',
        date2: '',
        delivery: false,
        type: [],
        resource: '',
        desc: ''
      },
      value: '',
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
  },
  created() {},
  methods: {
    headerStyle({ row, rowIndex }) {
      return 'table-th'
    },
    cellStyle({ row, col, rowIndex, colIndex }) {
      return ' background-color: #f1f1f1 !important; text-align:center;color: #333; border-bottom: 1px solid #dedede !important;'
    }
  }
}
</script>
<style lang="less" scoped>
.el-breadcrumb__inner {
  color: #666 !important;
}
.el-breadcrumb {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-left: 62px;
  background-color: #f1f1f1;
}
.el-card {
  border-radius: 10px !important;
}
.card_f {
  height: 160px;
  width: 1500px;
  border: 0;
  padding-top: 20px;
  margin-bottom: 30px;
  margin-left: 62px;
}
.card_b {
  width: 1500px;
  margin-left: 62px;
  background-color: #fff;
  padding: 20px 30px;
  box-sizing: border-box;
  color: #333 !important;
}
.boay {
  background-color: #f1f1f1;
}
.serch {
  background-color: #47bac2 !important;
  color: #fff !important;
  margin-left: 30px !important;
}
.btn {
  margin-top: 20px;
}
.el-table__body-wrapper table {
  background-color: #ff0;
}
.el-table th {
  background: #f00;
}
.el-pager li.active,
.el-pager li:hover,
.el-pagination button:hover {
  border: none;
  color: #fff !important;
  background-color: #47bac2;
}
.table-th {
  background-color: #f1f1f1 !important;
  text-align: center !important;
  height: 60px;
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #333;
  border-bottom: 1px solid #dedede !important;
}
.el-checkbox__inner {
  border: 1px solid #323232 !important;
}
.el-form-item__label {
  color: #666 !important;
}
.el-input__inner,
.el-checkbox__inner,
.el-textarea__inner {
  border: none !important;
}
.btnBox {
  float: right;
  margin-top: 20px !important;
  padding: 0 !important;
  width: 213px;
  height: 23px;
}
.el-form-item el-form-item--mini {
  width: 250px;
}
.btn {
  position: absolute;
  right: -170px;
  top: -25px;
  width: 94px;
  height: 29px;
  font-size: 14px !important;
  margin-bottom: 30px !important;
}
.img {
  vertical-align: middle;
  margin-top: -3px;
}
</style>

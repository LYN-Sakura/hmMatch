<template>
  <div class="boay">
    <!-- 面包屑导航 -->
    <crumbs class="crumbs" nav1="订单管理" nav2="退货单管理"></crumbs>
    <!-- 头部退货区域  -->
    <el-card class="card_f">
      <el-form :inline="true" v-model="form" label-width="1500" border :inline-message="true" :data="form">
        <el-form-item label="配送单编号" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="配送方" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="配送方联系电话 " size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="关联采购单编号" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="验收状态" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="验收日期" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="配送品项数" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="配送总数量" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="配送总金额(元)" size="mini">
          <el-input v-model="form.name"></el-input>
        </el-form-item>
      </el-form>
    </el-card>
    <!-- 退货body -->
    <el-card class="card_b">
      <!-- <el-table :data="tableData" header-cell-style="background-color:#f1f1f1;" cell-style="background-color:#f1f1f1;"> -->
      <el-table :data="tableData" :header-cell-class-name="headerStyle" :cell-style="cellStyle">
        <el-table-column prop="date" label="货号"> </el-table-column>
        <el-table-column prop="name" label="国际条码"> </el-table-column>
        <el-table-column prop="address" label="品名"> </el-table-column>
        <el-table-column prop="address" label="规格"> </el-table-column>
        <el-table-column prop="address" label="单位"> </el-table-column>
        <el-table-column prop="address" label="温层"> </el-table-column>
        <el-table-column prop="address" label="保质期"> </el-table-column>
        <el-table-column prop="address" label="订购总数"> </el-table-column>
        <el-table-column prop="address" label="实际发货数"> </el-table-column>
        <el-table-column prop="address" label="实际收货数"> </el-table-column>
        <el-table-column prop="address" label="缺货数"> </el-table-column>
        <el-table-column prop="address" label="拒收数"> </el-table-column>
        <el-table-column prop="address" label="拒收原因"> </el-table-column>
        <el-table-column prop="address" label="操作"> </el-table-column>
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
      return ' background-color: #f1f1f1 !important; text-align:center;color: #333;'
    }
  }
}
</script>
/*
<style lang="less">
.table-th {
  background-color: #f1f1f1 !important;
  text-align: center !important;
  height: 60px;
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #333;
}
.el-checkbox__inner {
  border: 1px solid #323232 !important;
}
.el-form-item__label {
  color: #666 !important;
}
.el-pagination .btn-prev {
  border: 1px solid#4c4c4c;
  margin-left: 5px !important;
  border-radius: 5px !important;
}
.el-pagination .btn-next {
  border: 1px solid#4c4c4c;
  margin-left: 5px !important;
  border-radius: 5px !important;
}
.number {
  border: 1px solid#4c4c4c;
  margin-left: 10px !important;
  border-radius: 5px !important;
}
.el-pagination {
  float: right;
  margin-top: 29px;
}
</style>

<style lang="less" scoped>
.crumbs {
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
/* .table-th {
  background-color: #f1f1f1 !important;
  text-align: center !important;
  height: 60px;
  font-size: 16px !important;
  font-weight: 500 !important;
  color: #333;
} */
/* .el-checkbox__inner {
  border: 1px solid #323232 !important;
} */
.el-form-item__label {
  color: #666 !important;
}
.el-pagination .btn-prev {
  border: 1px solid#4c4c4c;
  margin-left: 5px !important;
  border-radius: 5px !important;
}
.el-pagination .btn-next {
  border: 1px solid#4c4c4c;
  margin-left: 5px !important;
  border-radius: 5px !important;
}
.number {
  border: 1px solid#4c4c4c;
  margin-left: 10px !important;
  border-radius: 5px !important;
}
.el-pagination {
  float: right;
  margin-top: 29px;
}
</style>

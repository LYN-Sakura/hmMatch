<template>
  <div class="boay">
    <div class="poBox">
      <!-- 面包屑导航 -->
      <crumbs class="crumbs" nav1="订单管理" nav2="配送单管理"></crumbs>
      <!-- 返回小按钮 -->
      <el-button round class="ret" size="mini">返回</el-button>
    </div>
    <!-- 头部退货区域  -->
    <el-card class="card_f">
      <el-form :inline="true" label-width="1500" border :inline-message="true" :data="form">
        <el-row>
          <el-form-item label="货号" size="mini">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
          <el-col :span="5">
            <el-form-item label="国际条码" size="mini">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="品名" size="mini">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end" type="flex">
          <el-col :span="4" :offset="20">
            <el-form-item size="mini" class="btn">
              <el-button size="mini" round icon="el-icon-search" class="serch">搜索</el-button>
              <el-button size="mini" round icon="el-icon-refresh">重置</el-button>
              <el-button size="mini" round class="serch sure">确认配送</el-button>
            </el-form-item>
          </el-col>
        </el-row>
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
        <el-table-column prop="address" label="商品进价"> </el-table-column>
        <el-table-column prop="address" label="保质期"> </el-table-column>
        <el-table-column prop="address" label="温层"> </el-table-column>
        <el-table-column prop="address" label="订购总数"> </el-table-column>
        <el-table-column prop="address" label="订购总金额"> </el-table-column>
        <el-table-column prop="address" label="库存数量"> </el-table-column>
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
<style lang="less" scoped>
.ret {
  position: absolute;
  right: 90px;
  top: 20px;
  height: 24px;
  width: 59px;
  font-size: 14px;
  line-height: 2px;
}
.poBox {
  position: relative;
}
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
  width: 80px;
}
.btn {
  position: relative !important;
}
.btn:first-child {
  position: absolute !important;
  top: -46px !important;
  right: 27px !important;
}
.sure {
  position: absolute !important;
  top: 50px !important;
  right: 81px;
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
  background-color: #0bc467;
}
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

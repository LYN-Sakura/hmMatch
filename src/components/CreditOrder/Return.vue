<template>
  <div class="boay">
    <!-- 面包屑导航 -->
    <crumbs class="crumbs" nav1="订单管理" nav2="退货单管理"></crumbs>
    <!-- 头部退货区域  -->
    <el-card class="card_f">
      <el-form :inline="true" label-width="1500" border :inline-message="true" :data="form">
        <el-row>
          <el-col :span="8" class="return">
            <el-form-item label="退货时间" size="mini">
              <el-date-picker v-model="value" type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"> </el-date-picker>
            </el-form-item>
          </el-col>
          <el-col :span="6">
            <el-form-item label="退货单编号" size="mini">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="门店编号" size="mini">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="门店名称" size="mini">
              <el-input v-model="form.name"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row justify="end" type="flex">
          <el-col :span="4" :offset="20">
            <el-form-item size="mini" class="btn">
              <el-button size="mini" round icon="el-icon-search" class="serch">搜索</el-button>
              <el-button size="mini" round icon="el-icon-refresh">重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <!-- 退货body -->
    <el-card class="card_b">
      <!-- <el-table :data="tableData" header-cell-style="background-color:#f1f1f1;" cell-style="background-color:#f1f1f1;"> -->
      <el-table :data="tableData" :header-cell-class-name="headerStyle" :cell-style="cellStyle">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column prop="date" label="退货单编号" width="180"> </el-table-column>
        <el-table-column prop="name" label="创建日期" width="180"> </el-table-column>
        <el-table-column prop="address" label="门店"> </el-table-column>
        <el-table-column prop="address" label="退货品项数"> </el-table-column>
        <el-table-column prop="address" label="退货总数"> </el-table-column>
        <el-table-column prop="address" label="退货总金额"> </el-table-column>
        <el-table-column label="操作" class="read">
          <span style="color: #47bac2;"> 查看</span>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="prev, pager, next" :total="1000"> </el-pagination>
      </div>
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
<style lang="less">
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
  color: #18ab8f;
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
</style>

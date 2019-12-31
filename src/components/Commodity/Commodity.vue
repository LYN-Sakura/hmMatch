<template>
  <div>
    <!-- 面包屑导航栏 -->
    <crumbs class="crumbs"
            nav1="商品管理"></crumbs>

    <!-- 卡片视图 -->
    <el-card class="serial">
      <!-- input框 -->
      <span v-for='item in inputData'
           :key='item.id' class="inputBox">
        <span class="spanHeight">{{item.name}}</span>
        <input type="text" class="inputTab">
      </span>
      <!-- 搜索按钮 -->
      <el-row>
        <el-button round class="search_btn" icon="el-icon-search">查询</el-button>
        <el-button round icon="el-icon-refresh">重置</el-button>
      </el-row>
    </el-card>

    <!-- 订单信息 -->
    <el-card class="card_info">
        <el-table
          ref="multipleTable"
          :data="commodityInfo"
          tooltip-effect="dark"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            label="货号"
            width="120">
            <template slot-scope="scope">{{ scope.row.art }}</template>
          </el-table-column>
          <el-table-column
            prop="artNumber"
            label="品名"
            width="120">
          </el-table-column>

          <el-table-column
            prop="unit"
            label="单位"
            width="120">
          </el-table-column>

          <el-table-column
            prop="layer"
            label="温层"
            width="120">
          </el-table-column>

          <el-table-column
            prop="specification"
            label="规格"
            width="120">
          </el-table-column>

          <el-table-column
            prop="date"
            label="保质期"
            width="120">
          </el-table-column>

          <el-table-column
            prop="price"
            label="进价"
            width="120">
          </el-table-column>

          <el-table-column
            prop="unitNumber"
            label="基本订购单位"
            width="120">
          </el-table-column>

          <el-table-column
            prop="minPrice"
            label="最小订购倍数"
            width="160">
          </el-table-column>

          <el-table-column class='red'
            prop="operator"
            label="操作"
            width="120">
          </el-table-column>
        </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // input框
      inputData: [{
        name: '货号',
        id: 1
      }, {
        name: '国际条码',
        id: 2
      }, {
        name: '品名',
        id: 3
      }],
      // 订单信息列表
      commodityInfo: [
        {
          flag: true,
          art: 10000,
          artNumber: 10010,
          unit: '瓶',
          layer: '冷藏',
          specification: '300ML',
          date: '3个月',
          price: 34.00,
          unitNumber: 1,
          minPrice: 34.00,
          operator: '查看'
        }
      ]
    }
  },
  created () { },
  methods: {
    handleSelectionChange() { }
  }
}
</script>

<style lang="less" scoped>
// 面包屑导航栏
.crumbs {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-left: 62px;
  background-color: #f1f1f1;
}
// input卡片视图
/deep/.serial {
  height: 162px;
}

.el-card {
  border-radius: 10px;
  margin: 0 64px 30px 64px;
  background-color: #fff;
}
// input父盒子
.inputBox{
  margin-left: 89px;
  font-size:14px;
  color: #333333;
}
.inputTab {
  margin-left: 15px;
  border-radius: 5px;
  border: 1px solid #eee;
  height: 30px;
  width: 110px;
}
.spanHeight {
  line-height: 20px;
}

// 搜索按钮
.el-row {
  position: absolute;
  top: 286px;
  right: -200px;
    .el-button {
    width: 90px;
    height: 30px;
    text-align: center;
    line-height: 5px;
  }
}
.search_btn {
  background-color: #47bac2;
  color: #fff;
}
/deep/[class^=el-icon-] {
  line-height: 0;
}

// 订单信息
.card_info{
  height: 674px;
  padding: 56px;
  box-sizing: border-box;
}
/deep/.el-table .cell {
  text-align: center;
}
/deep/tbody .el-table_1_column_11 {
  color: #47bac2;
}
/deep/.el-table tr {
  background-color: #f9f9f9;
}
/deep/.el-table th, .el-table tr {
  background-color: #f9f9f9;
}
/deep/.el-table td, .el-table th.is-leaf{
  border-bottom: 1px solid #e1e1e1;
}
</style>

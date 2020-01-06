<template>
  <div class="main">
    <crumbs nav1="订单管理" nav2="修正单管理"></crumbs>
    <el-card class="query">
      <!--  :model="form" 带绑定数据 -->
      <el-form size="mini" ref="form" label-width="80px">
        <el-row>
          <el-col :span="7">
            <!-- v-model="form.region" 未绑定 -->
            <el-form-item label-width="90px" label="修正单类型">
              <el-select placeholder="请选择修正单类型">
                <el-option label="区域一" value="shanghai"></el-option>
                <el-option label="区域二" value="beijing"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="7">
            <!-- v-model="form.region" 未绑定 -->
            <el-form-item label-width="90px" label="修正单状态">
              <el-select placeholder="请选择修正单状态">
                <el-option label="激活" value="0"></el-option>
                <el-option label="未激活" value="1"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <!-- 编号 -->
            <el-form-item label="审批人">
              <!-- v-model="formInline.user" -->
              <el-input placeholder="审批人"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="审批人"><el-input placeholder="审批人"></el-input></el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <!-- 创建日期 -->
            <el-form-item label="创建日期">
              <!-- v-model="form.date1"   v-model="form.date2" 未绑定数据 -->
              <el-col :span="11"><el-date-picker type="date" placeholder="选择日期" style="width: 100%;"></el-date-picker></el-col>
              <el-col class="line" :span="2">-</el-col>
              <el-col :span="11"><el-time-picker placeholder="选择时间" style="width: 100%;"></el-time-picker></el-col>
            </el-form-item>
          </el-col>
          <el-col :span="5" :offset="11">
            <el-form-item>
              <!-- @click="onSubmit" 未绑定按钮事件 -->
              <el-button type="primary">查询</el-button>
              <el-button>重置</el-button>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </el-card>
    <el-card class="card2">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column prop="date" label="修正单编号" width="180"></el-table-column>
        <el-table-column prop="date" label="修正单类型" width="180"></el-table-column>
        <el-table-column prop="name" label="修正数量" width="180"></el-table-column>
        <el-table-column prop="" label="门店"></el-table-column>
        <el-table-column prop="" label="修正单状态"></el-table-column>
        <el-table-column prop="" label="创建日期 "></el-table-column>
        <el-table-column prop="" label="配送单编号"></el-table-column>
        <el-table-column prop="" label="操作"></el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
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

<style lang="less" scoped>
.main {
  padding-top: 17px;
  padding-left: 40px;
}
.query {
  margin-top: 40px;
  height: 150px;
}
.el-form-item .el-button {
  width: 100px;
  height: 30px;
  border-radius: 15px;
}
.el-form-item .el-button:first-of-type {
  background-color: #47bac2;
}
.card2 {
  margin-top: 40px;
}
</style>

<template>
  <div>
    <!-- 今日订单 -->
    <el-card class="info">
      <i class="el-icon-bell"></i>
      今日订单
    </el-card>
    <el-row class="todayOrder" :gutter="30">
      <el-col :span="8">
        <el-card shadow="never">
          <div class="floorOne">您今天有采购单</div>
          <div @click="gotoCaigou" class="floorTwo">
            168
            <span>张</span>
          </div>
          <div class="floorThree">
            待确认
            <i class="el-icon-warning-outline"></i>
          </div>
          <div class="floorFour">请您尽快处理！！！</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <div class="floorOne">您今天有采购单</div>
          <div @click="gotoCaigou" class="floorTwo">
            168
            <span>张</span>
          </div>
          <div class="floorThree">
            已发货
            <i class="el-icon-s-promotion"></i>
          </div>
          <div class="floorFour">请您悉知！！！</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <div class="floorOne">您今天有采购单</div>
          <div @click="gotoCaigou" class="floorTwo">
            168
            <span>张</span>
          </div>
          <div class="floorThree">
            已完成
            <i class="el-icon-s-flag"></i>
          </div>
          <div class="floorFour">请您悉知！！！</div>
        </el-card>
      </el-col>
    </el-row>
    <!-- 今日修正订单 -->
    <el-card class="info">
      <i class="el-icon-bell"></i>
      今日修正订单
    </el-card>
    <el-row class="todayRevisionOrder" :gutter="30">
      <el-col :span="8">
        <el-card shadow="never">
          <div class="floorOne">您今天有修正订单</div>
          <div class="floorTwo">
            168
            <span>张</span>
          </div>
          <div class="floorThree">
            审核未通过
            <i class="el-icon-warning-outline"></i>
          </div>
          <div class="floorFour">请您尽快处理！！！</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <div class="floorOne">您今天有修正订单</div>
          <div class="floorTwo">
            168
            <span>张</span>
          </div>
          <div class="floorThree">
            需要审核
            <i class="el-icon-warning-outline"></i>
          </div>
          <div class="floorFour">请您悉知！！！</div>
        </el-card>
      </el-col>
      <el-col :span="8">
        <el-card shadow="never">
          <div class="floorOne">您今天有修正订单</div>
          <div class="floorTwo">
            168
            <span>张</span>
          </div>
          <div class="floorThree">
            审核已通过
            <i class="el-icon-s-flag"></i>
          </div>
          <div class="floorFour">请您悉知！！！</div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {}
  },
  methods: {
    gotoCaigou() {
      console.log('1')
      this.$router.push('purchase')
    }
  }
}
</script>

<style lang="less" scoped>
.info {
  height: 80px;
  line-height: 40px;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  letter-spacing: 0px;
  color: #333333;
}
.el-card {
  border-radius: 10px;
}
.todayOrder {
  margin: 30px 0;
  .el-card {
    height: 380px;
  }
}
.todayRevisionOrder {
  margin: 30px 0;
  .el-card {
    height: 310px;
  }
}
.floorOne {
  margin: 50px auto;
  width: 160px;
  height: 20px;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 6px;
  letter-spacing: 0px;
  color: #333333;
}
.floorTwo {
  margin: 80px auto 0;
  width: 120px;
  height: 37px;
  font-family: ArialMT;
  font-size: 48px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 6px;
  letter-spacing: 0px;
  cursor: pointer;
}

.floorTwo span {
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  letter-spacing: 0px;
  color: #999999;
}
.floorThree {
  margin: 20px auto 0;
  width: 140px;
  height: 19px;
  text-align: center;
  font-family: MicrosoftYaHei;
  font-size: 20px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 6px;
  letter-spacing: 0px;
  color: #333333;
}
.floorFour {
  margin: 50px auto 0;
  width: 130px;
  height: 18px;
  font-family: MicrosoftYaHei;
  font-size: 18px;
  font-weight: normal;
  font-stretch: normal;
  line-height: 6px;
  letter-spacing: 0px;
  color: #333333;
}
.el-row .el-col:first-of-type .floorTwo {
  color: #e51436;
}
.el-row .el-col:first-of-type .floorFour {
  width: 165px;
}
</style>

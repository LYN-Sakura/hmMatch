<template>
  <div>
    <!-- 面包屑导航栏 -->
    <crumbs class="crumbs" nav1="修正单管理" nav2="审核不通过"></crumbs>

    <!-- 修正单卡片视图 -->
    <el-row class="el_row_card">
      <!-- 详情 -->
      <el-col :span="16">
        <el-card class="info_card1">
          <!-- 标题 -->
          <p class="titie_size">产品修正详情</p>
          <el-row>
            <!-- 修正信息详情 -->
            <el-col :span="11" class="el_col_box">
              <div class="input_box" v-for="(item, index) in infoAudit" :key="index">
                <span class="span_input">{{ item.name }}</span>
                <el-input class="el_input_box" placeholder="请输入内容" :value="item.aduitNum"></el-input>
              </div>
            </el-col>
            <!-- 修正日期 -->
            <el-col :span="13">
              <div class="input_box">
                <span class="span_input">创建日期</span>
                <el-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
              </div>
              <div class="input_box1">
                <span class="span_input">验收日期</span>
                <el-date-picker type="daterange" start-placeholder="开始日期" end-placeholder="结束日期" :default-time="['00:00:00', '23:59:59']"></el-date-picker>
              </div>
              <div class="input_box1">
                <span class="span_input">拒收总数</span>
                <el-input placeholder="2" class="input_box_span"></el-input>
              </div>
              <div class="input_box1">
                <span class="span_input">门店</span>
                <el-input placeholder="岳家嘴地铁店" class="input_box_span"></el-input>
              </div>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
      <!-- 图表 -->
      <el-col :span="8">
        <el-card class="info_card1">
          <!-- 标题 -->
          <p class="titie_size">产品修正流程</p>
          <!-- 动态图 -->
          <el-row>
            <el-col :span="16"><img src="../../assets/images/组-13.png" class="img_info" /></el-col>
            <el-col :span="8">
              <ul class="ul_info">
                <li>
                  <span class="round" style="background:#893DCB"></span>
                  创建
                </li>
                <li>
                  <span class="round" style="background:#E13EDF"></span>
                  供应商审核
                </li>
                <li>
                  <span class="round" style="background:#36D8DA"></span>
                  门店举证
                </li>
                <li>
                  <span class="round" style="background:#F6AC46"></span>
                  裁定数量
                </li>
                <li>
                  <span class="round" style="background:#5C92FF"></span>
                  结束
                </li>
              </ul>
            </el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>

    <!-- 产品表单 + 产品审核详情 卡片视图 -->
    <el-row class="el_row_father">
      <!-- 产品表单 -->
      <el-col :span="16">
        <!-- 产品表单 -->
        <el-card class="el_row_box1">
          <p class="titie_size marBottom">产品表单</p>
          <ul v-for="(item, index) in formMent" :key="index" class="mentInfo">
            <li>{{ item.infoName }}</li>
            <li>{{ item.infoNum }}</li>
            <li>{{ item.infoMessage }}</li>
          </ul>
        </el-card>
      </el-col>
      <!-- 产品审核 -->
      <el-col :span="8">
        <!-- 产品审核 -->
        <el-card class="el_row_box1">
          <p class="titie_size marBottom">产品审核详情</p>
          <!-- 审核流程 -->
          <p class="audit_title">岳家嘴地铁一店</p>
          <el-row class="audit">
            <el-col :span="5" class="audit_pass"><img src="../../assets/images/组-21.png" alt="" /></el-col>
            <el-col :span="10">
              <h4>上传证据</h4>
              <span class="el_col_span">详见证据所示请领导裁决</span>
            </el-col>
            <el-col :span="9"><p class="el_col_span_p">2019-02-04 12:22:22</p></el-col>
          </el-row>
          <!-- 审核流程 -->
          <p class="audit_title">总部</p>
          <el-row class="audit">
            <el-col :span="5" class="audit_pass"><img src="../../assets/images/图层-4.png" alt="" /></el-col>
            <el-col :span="10">
              <h4>审核通过</h4>
              <span class="el_col_span">门店举证材料属实</span>
            </el-col>
            <el-col :span="9"><p class="el_col_span_p">2019-02-04 12:22:22</p></el-col>
          </el-row>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 产品修正单数据
      infoAudit: [
        {
          name: '修正单编号',
          aduitNum: 1232
        },
        {
          name: '原配送单编号',
          aduitNum: 1232
        },
        {
          name: '拒收品项总数',
          aduitNum: 1232
        },
        {
          name: '配送方',
          aduitNum: 1232
        }
      ],
      // 退货单数据
      formMent: [
        {
          infoName: '货号',
          infoNum: 123123,
          infoMessage: 123213
        },
        {
          infoName: '货号',
          infoNum: 123123,
          infoMessage: 123213
        },
        {
          infoName: '货号',
          infoNum: 123123,
          infoMessage: 123213
        },
        {
          infoName: '货号',
          infoNum: 123123,
          infoMessage: 123213
        }
      ]
    }
  }
}
</script>

<style lang="less" scoped>
.crumbs {
  padding-top: 30px;
  padding-bottom: 30px;
  margin-left: 62px;
  background-color: #f1f1f1;
}
.el_row_card {
  height: 355px;
  margin-left: 62px;
}
.info_card1 {
  height: 355px;
  margin-right: 30px;
  border-radius: 10px;
  padding: 30px 40px 40px 40px;
  box-sizing: border-box;
}
.titie_size {
  margin: 0;
  font-weight: 700;
}
.el_input_box {
  width: 265px;
  height: 30px;
}
.span_input {
  display: inline-block;
  width: 105px;
  outline: none;
}
.input_box {
  margin-top: 30px;
  display: inline-block;
}
/deep/.data_input {
  width: 140px;
}
.input_box1 {
  margin-top: 20px;
}
/deep/.input_box_span {
  width: 350px;
}
.img_info {
  padding-top: 20px;
}
.ul_info {
  list-style: none;
  margin: 0;
  padding: 0;
  margin-top: 80px;
  margin-left: 23px;
}
.round {
  display: inline-block;
  border-radius: 50%;
  height: 10px;
  width: 10px;
}
// 产品表单+审核
.el_row_father {
  height: 485px;
  margin-left: 62px;
  background-color: #f1f1f1;
  margin-top: 30px;
}
.el_row_box1 {
  height: 485px;
  margin-right: 30px;
  border-radius: 10px;
  padding: 30px 40px 40px 40px;
  box-sizing: border-box;
}
ul {
  list-style: none;
}
.mentInfo {
  border-bottom: 1px solid #eeeeee;
  height: 52px;
  line-height: 52px;
  color: #938a8a;
  margin: 0;
  padding: 0;
}
.mentInfo li {
  float: left;
  width: 33%;
  padding: 0;
  margin: 0;
}
.mentInfo li:nth-child(1) {
  color: #333333;
}
.marBottom {
  margin-bottom: 30px;
}
// 审核流程
.audit_title {
  margin: 0;
  font-weight: 700;
  margin-bottom: 20px;
}
.audit {
  height: 80px;
  .el-col {
    height: 100%;
  }
}
h4 {
  margin: 0;
  margin: 4px 0 10px 0;
  font-size: 14px;
}
.el_col_span {
  font-size: 13px;
  color: #999;
}
.el_col_span_p {
  margin: 0;
  font-size: 12px;
  color: #c9c9c9;
  margin-top: 37px;
  margin-left: 10px;
}
</style>

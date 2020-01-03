<template>
  <div>
    <!-- 面包屑导航栏 -->
    <crumbs class="crumbs"
            nav1="订单管理"
            nav2="采购单管理"></crumbs>

    <!-- 修正单卡片视图 -->
    <el-row class="el_row_card">
      <!-- 详情 -->
      <el-col :span="16">
        <el-card class="info_card1">
          <!-- 标题 -->
          <p class="titie_size">产品修正详情</p>
          <el-row>
            <!-- 修正信息详情 -->
            <el-col :span="11"
                    class="el_col_box">
              <div class="input_box"
                   v-for='(item,index) in infoAudit'
                   :key='index'>
                <span class="span_input">{{item.name}}</span>
                <el-input class="el_input_box"
                          placeholder="请输入内容"
                          :value="item.aduitNum"></el-input>
              </div>
            </el-col>
            <!-- 修正日期 -->
            <el-col :span="13">
              <div class="input_box">
                <span class="span_input">创建日期</span>
                <el-date-picker type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']"></el-date-picker>
              </div>
              <div class="input_box1">
                <span class="span_input">验收日期</span>
                <el-date-picker type="daterange"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                :default-time="['00:00:00', '23:59:59']"></el-date-picker>
              </div>
              <div class="input_box1">
                <span class="span_input">拒收总数</span>
                <el-input placeholder="2"
                          class="input_box_span"></el-input>
              </div>
              <div class="input_box1">
                <span class="span_input">门店</span>
                <el-input placeholder="岳家嘴地铁店"
                          class="input_box_span"></el-input>
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
            <el-col :span='16'>
              <img src="../../assets/images/组-13.png"
                   class="img_info">
            </el-col>
            <el-col :span='8'>
              <ul class="ul_info" >
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
      <el-col :span="16">
        <!-- 产品表单 -->
        <el-card class="el_row_box1">
          <p class="titie_size marBottom">产品表单</p>
          <ul v-for="(item,index) in formMent" :key="index" class="mentInfo">
            <li>{{item.infoName}}</li>
            <li>{{item.infoNum}}</li>
            <li>{{item.infoMessage}}</li>
          </ul>
        </el-card>
      </el-col>
      <el-col :span="8">
        <!-- 产品审核 -->
        <el-card class="el_row_box1">
          <p class="titie_size marBottom">产品审核详情</p>
          <textarea maxlength="100"></textarea>
          <div style="height:20px">
            <span class="span_Card">0/100字</span>
          </div>
          <el-button class="btn_css" style="background-color:#5DF3AB">审核通过</el-button>
          <el-button class="btn_css" style="background-color:#7AA3F7">审核不通过</el-button>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 产品修真单数据
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
  box-sizing: border-box
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
.mentInfo li{
  float: left;
  width: 33%;
  padding: 0;
  margin: 0;
}
.mentInfo li:nth-child(1) {
  color: #333333;
}
textarea {
  width: 100%;
  height: 150px;
  background-color: #F5F5F5;
  border-radius: 10px;
  border: 1px solid #F5F5F5;
  resize:none;
  outline: none;
}
.span_Card {
  float: right;
  color: #A8A8A8;
  font-size: 12px;
}
.marBottom {
  margin-bottom: 30px;
}
/deep/.el-button+.el-button {
  margin-left: 0;
  margin-left: 65px;
}
/deep/.btn_css {
  width: 240px;
  height: 60px;
  margin-top: 30px;
  text-align: center;
  margin-left: 65px;
}
</style>

<template>
  <!-- 背景图片 -->
  <div class="note">
    <!-- 登录框 -->
    <div class="login_box">
      <!-- tab栏 -->
      <el-tabs v-model="activeName" class="login_tabs">
        <el-tab-pane label="供应商" name="first">
          <!-- 输入框 -->
          <el-input v-model="input" placeholder="供应商编号" prefix-icon="el-icon-user-solid"></el-input>
          <el-input placeholder="登录密码" v-model="input1" show-password prefix-icon="el-icon-s-cooperation"></el-input>
          <el-button type="primary" round>登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="门店" name="second">
          <el-input v-model="input" placeholder="门店编号" prefix-icon="el-icon-user-solid"></el-input>
          <el-input placeholder="登录密码" v-model="input1" show-password prefix-icon="el-icon-s-cooperation"></el-input>
          <el-button type="primary" round>登录</el-button>
        </el-tab-pane>
        <el-tab-pane label="运营后台" name="third">
          <el-input v-model="input" placeholder="运营后台编号" prefix-icon="el-icon-user-solid"></el-input>
          <el-input placeholder="登录密码" v-model="input1" show-password prefix-icon="el-icon-s-cooperation"></el-input>
          <el-button type="primary" round>登录</el-button>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      activeName: 'second',
      input: '',
      input1: ''
    }
  }
}
</script>

<style lang="less" scoped>
.note {
  height: 1080px;
  background-image: url(../assets/images/dly_tp.png);
}
.login_box {
  width: 400px;
  height: 360px;
  background-color: #fff;
  box-shadow: 3px 3px 100px rgb(224, 224, 224);
  border-radius: 6px;
  position: absolute;
  left: 75%;
  top: 56%;
  transform: translate(-50%, -50%);
}
.el-input {
  width: 340px !important;
  margin: 30px 30px 0 30px;
  border-bottom: 1px solid #d2d2d2 !important;
  outline: none;
  box-shadow: none;
}
.el-button {
  width: 340px;
  margin: 50px 30px 20px 30px;
  box-shadow: 0 3px 15px #8bafb3;
}

.el-button--primary {
  color: #fff;
  background-color: #48bbc2;
  border-color: #48bbc2;
}
.el-button--primary:hover {
  color: #fff;
  background-color: #48bbc2 !important;
  border-color: #48bbc2 !important;
}
.el-button--primary:focus {
  background-color: #48bbc2;
  border-color: #48bbc2;
}
</style>

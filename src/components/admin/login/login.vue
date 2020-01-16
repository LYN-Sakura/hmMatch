<template>
  <div class="admin_login">
    <!-- <img src="../../../../static/images/AdminSystem/admin_login_logo.png" alt> -->
    <div class="login_bg">
      <form class="login_form_box" @submit.prevent="submitForm(ruleForm)">
        <h3>用户登录</h3>
        <input type="text" placeholder="请输入用户名" v-model="ruleForm.username" required>
        <input type="password" placeholder="请输入密码" maxlength='13' v-model="ruleForm.password" required @keyup.enter="submitForm('ruleForm')">
        <input type="submit" value="登录">
        <p>
          <input type="checkbox">
          <span>记住密码</span>
        </p>
      </form>
      <div class="login_form_box1"></div>
      <div class="login_form_box2"></div>
    </div>
  </div>
</template>

<script>
import login from "./login.js";
export default login;
</script>
<style lang="less" scoped>
@import url('./login.less');
</style>


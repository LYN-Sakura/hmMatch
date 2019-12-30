<template>
  <el-container>
    <el-aside>
      <div class="logo"><img src="../assets/images/left_logo.png" alt="logo" /></div>
      <div class="info">
        <h2>食品数据平台管理系统</h2>
        <p>FOOD DATA PLATFORM MANAGEMENT SYSTEM</p>
        <div class="list">
          <div class="listTop">
            <i class="iconfont icon-home"></i>
            首页
          </div>
          <el-menu default-active="2" class="el-menu-vertical-demo" background-color="#313743" text-color="#d1d2d4" active-text-color="#ffd04b">
            <el-submenu index="1">
              <template slot="title">
                <i class="el-icon-location"></i>
                <span>导航一</span>
              </template>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-submenu>
          </el-menu>
        </div>
      </div>
    </el-aside>
    <el-container>
      <el-header height="90px">
        <div class="company">
          <h1>武汉食品供应有限公司</h1>
          <div class="setImg"><img src="../assets/images/up_set.png" alt="setting" /></div>
        </div>
      </el-header>
      <el-main><router-view></router-view></el-main>
    </el-container>
  </el-container>
</template>

<script></script>

<style lang="less" scoped>
header.el-header {
  background-color: #313743;
}
.el-aside {
  height: 1080px;
  background-color: #313743;
}
.logo {
  margin: 30px auto;
  text-align: center;
}
.info {
  color: white;
  text-align: center;
  h2 {
    font-size: 16px;
    margin: 0 auto 10px !important;
  }

  p {
    color: #a6a8ab;
    font-size: 10px;
  }
}
.company {
  display: flex;
  align-items: center;
  height: 90px;
  float: right;
  color: white;
  h1 {
    margin: 0 40px;
  }
  div {
    margin-right: 60px;
  }
}
.list {
  margin-top: 80px;
  text-align: left;
  color: #d1d2d4;
  .listTop {
    margin-bottom: 10px;
    i {
      font-size: 21px;
      margin: 0 20px 0 40px;
    }
  }
}
.el-menu {
  padding-left: 40px;
  border-right: none;
  .el-menu-item {
    text-indent: 2em;
  }
}

</style>

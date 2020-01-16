<template>
  <div class="ccia">
    <div class="ccia_top clearfix">
      <div class="ccia_top_left">
        <el-date-picker
          v-model="timenum"
          type="datetimerange"
          @change="timechange"
          :picker-options="pickerOptions2"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          align="right"
          :default-time="['12:00:00', '08:00:00']"
          prefix-icon="el-icon-date"
        ></el-date-picker>
      </div>
      <div class="ccia_top_right">
        <!-- <button @click="searchfood" style="margin-left:20px;">导出</button> -->
        <button @click="searchfood">搜索</button>
        <el-input v-model="keyword" placeholder="请输入会员信息" clearable></el-input>
      </div>
    </div>
    <div class="ccia_contentbox">
      <div class="ccia_contenttop clearfix">
        <!-- <button @click="DialogVisible = true">
          <i>+</i>&nbsp;添加购卡记录
        </button> -->
        <div>
          <h6>会员卡销量：{{total}}</h6>
          <!-- <h6>金额：520000.56</h6> -->
        </div>
      </div>
      <div class="ccia_content clearfix">
        <el-table
          ref="multipleTable"
          v-loading="isLoading"
          :data="productlist"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange"
          @cell-click="celltrigger"
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="会员" width="300">
            <template slot-scope="scope">
              <img v-lazy="{src:scope.row.avatar, loading:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1345330011,1082178654&fm=26&gp=0.jpg',error: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2978335771,143699289&fm=26&gp=0.jpg'}" alt="">
              <div class="img_txt">
                <span>{{scope.row.nickname}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="会员信息" prop="id" width="300">
            <template slot-scope="scope">
              <p>{{scope.row.realname}}</p>
              <p>{{scope.row.mobile}}</p>
            </template>
          </el-table-column>
          <el-table-column label="免单卡名称" prop="title" width="300"></el-table-column>
          <el-table-column label="开始时间" prop="createtime"></el-table-column>
          <el-table-column label="操作" prop="repertory" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch
                @change="deleterow(scope.row)"
                v-model="scope.row.status"
                active-color="#28b7a3"
                inactive-color="#ff4949"
              ></el-switch>
            </template>
          </el-table-column>
        </el-table>
        <!-- 分页 -->
        <el-pagination
          background
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-size="pagesize"
          layout="total, prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <el-dialog title="添加购卡记录" :visible.sync="DialogVisible" top="25vh">
      <el-form :model="form" @submit.native.prevent>
        <el-form-item>
          <el-input
            style="margin:30px auto 0px;float:unset;"
            placeholder="请输入内容"
            v-model="form.date1"
            autocomplete="off"
            :rules="[
                { required: true, message: '检索条件不能为空'},
              ]"
            @keyup.native="Sub_find_add"
          >
            <el-button slot="append" @click="Sub_find_add">+</el-button>
          </el-input>
          <transition>
            <div v-if="flag" class="addproarr">
              <ul>
                <li v-for="(item,index) in addproduclist" :key="index">
                  <!-- 活动名 -->
                  <div>{{item.title}}</div>
                  <!-- 城市地址 -->
                  <div>{{item.province}}</div>
                  <!-- 选择 -->
                  <div @click.stop="addSubs(item.id)">选择</div>
                </li>
              </ul>
            </div>
          </transition>
        </el-form-item>
        <el-form-item>
          <ul class="show_hot_list">
            <li v-for="(item,index) in By_vip_card" :key="index">
              <div>
                <span>{{item.title}}</span>
                <small>{{item.province}}</small>
              </div>
              <button @click="del()">删除</button>
            </li>
          </ul>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="Sethot()">保存</el-button>
        <el-button @click="DialogVisible  = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import Purchaserecords from "./Purchaserecords.js";
export default Purchaserecords;
</script>
<style lang="less" scoped>
@import url("./Purchaserecords.less");
</style>



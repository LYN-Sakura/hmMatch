<template>
  <div class="ccia">
    <div class="ccia_top">
      <button @click="toaddlevel">
        <i>+</i>&nbsp;添加商家
      </button>
      <div>
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
          value-format='yyyy-MM-dd'
          prefix-icon="el-icon-date"
        ></el-date-picker>
        <button @click="searchfood">搜索</button>
        <el-input v-model="keyword" placeholder="请输入关键词" clearable></el-input>
        <el-select
          style="width:80px;"
          v-model="enabled"
          clearable
          placeholder="状态"
          @change="typechange"
        >
          <el-option
            v-for="item in typelist"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="ccia_contentbox">
      <div class="ccia_contenttop">
        <button @click="statusupdate('isall',1)">
          <img src="../../../../static/images/showImg.png" alt>显示
        </button>
        <button @click="statusupdate('isall',0)">
          <img src="../../../../static/images/hideImg.png" alt>隐藏
        </button>
        <!-- <button @click="deleteFood('isall')">
          <i class="el-icon-delete"></i> 删除
        </button> -->
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
          <el-table-column label="ID" type="index" ></el-table-column>
          <el-table-column label="商家" prop="subtitle" width="250">
            <template slot-scope="scope">
              <!-- <img v-lazy="{src:scope.row.thumb, loading:'https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1345330011,1082178654&fm=26&gp=0.jpg',error: 'https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2978335771,143699289&fm=26&gp=0.jpg'}" alt="">
              <div class="img_txt"> -->
              <img :src="scope.row.thumb" alt="">
              <div class="img_txt">
                <span>{{scope.row.title}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="mobile" label="联系人/手机号" width="150"></el-table-column>
          <el-table-column label="商家地址" prop="address" ></el-table-column>
          <el-table-column label="状态" prop="enabled" width="100" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch
                @change="statusupdate('notall',2,scope.row)"
                v-model="scope.row.enabled"
                active-color="#CBA361"
                inactive-color="#CCCCCC"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="审核情况" prop="status_text" width='180'></el-table-column>
          <el-table-column label="创建时间" prop="createtime" width='280'></el-table-column>
          <el-table-column label="操作" width='180'>
            <template slot-scope="scope4">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <span class="edit" @click="editFood(scope4.row)">
                  <i class="el-icon-edit"></i>
                </span>
              </el-tooltip>
              <!-- <el-tooltip class="item" effect="dark" content="放入回收站" placement="top">
                <span class="edit" @click="deleteFood('notall',scope4.row)">
                  <i class="el-icon-delete"></i>
                </span>
              </el-tooltip> -->
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
  </div>
</template>

<script>
import shop from "./shop.js";
export default shop;
</script>

<style lang="less" scoped>
@import url("./shop.less");
</style>



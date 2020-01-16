<template>
  <div class="ccia">
    <div class="ccia_top">
      <button @click="toaddlevel">
        <i>+</i>&nbsp;新增免单卡
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
          prefix-icon="el-icon-date"
          value-format="yyyy-MM-dd"
        ></el-date-picker>
        <button @click="searchfood">搜索</button>
        <el-input v-model="keyword" placeholder="请输入ID/名称/商家名称" clearable></el-input>
        <!-- <el-select
          style="width:80px;"
          v-model="type"
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
        </el-select> -->
      </div>
    </div>
    <div class="ccia_contentbox">
      <!-- <div class="ccia_contenttop">
        <button @click="statusupdate('isall',1)">
          <img src="../../../../../static/images/showImg.png" alt>显示
        </button>
        <button @click="statusupdate('isall',0)">
          <img src="../../../../../static/images/hideImg.png" alt>隐藏
        </button>
        <button @click="deleteFood('isall')">
          <i class="el-icon-delete"></i> 删除
        </button>
      </div> -->
      <div class="ccia_content clearfix">
        <el-table
          ref="multipleTable"
          v-loading="isLoading"
          :data="productlist"
          tooltip-effect="dark"
          style="width: 100%"
        >
        <!-- @selection-change="handleSelectionChange" 
        <el-table-column type="selection"></el-table-column> -->
          <el-table-column label="ID" type="index"></el-table-column>
          <el-table-column label="免单卡信息" prop="title" width="450">
            <template slot-scope="scope">
              <img v-lazy="scope.row.thumb" alt>
              <div class="img_txt">
                <span>{{scope.row.title}}</span>
              </div>
            </template>
          </el-table-column>
          <el-table-column prop="active" label="活动名称" width="150"></el-table-column>
          <el-table-column prop="price" label="价格" width="150"></el-table-column>
          <el-table-column label="销量" prop="sales" width="150"></el-table-column>
          <!-- <el-table-column label="状态" prop="status" show-overflow-tooltip width="150">
            <template slot-scope="scope">
              <el-button class="niu" style="padding:0px;">
                <span
                  class="niu"
                  :class="scope.row.status === '启用' ? 'info' : 'warning'"
                  @click="statusupdate('notall',2,scope.row)"
                >{{scope.row.status}}</span>
              </el-button>
            </template>
          </el-table-column> -->
          <el-table-column label="创建时间" prop="createtime" show-overflow-tooltip></el-table-column>
          <el-table-column label="操作" width="140">
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
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="链接" placement="top">
                <span class="edit" @click="shareFood('notall',scope4.row)">
                  <i class="el-icon-share"></i>
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
import StoreList from "./StoreList.js";
export default StoreList;
</script>

<style lang="less" scoped>
@import url("./StoreList.less");
</style>



<template>
  <div class="ccia">
    <div class="act_top">
      <el-row>
        <el-col :span="4">
          <div class="act_topL">
            <router-link to="/addshopclass">
              <el-button>
                <i class="el-icon-plus"></i>添加新分类
              </el-button>
            </router-link>
          </div>
        </el-col>
        <el-col :span="20">
          <div class="act_topR">
            <div class="selbox">
              <el-select v-model="type" clearable placeholder="状态" @change="typechange">
                <el-option
                  v-for="item in typelist"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                ></el-option>
              </el-select>
            </div>
            <div class="searchinputbox">
              <el-input v-model="keyword" placeholder="请输入ID/名称/商家名称" class="searchinput"></el-input>
            </div>
            <button @click="search">搜索</button>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="act_con">
      <el-table :data="tableData" style="width: 100%">
        <el-table-column type="selection"></el-table-column>
        <el-table-column label="ID" prop="id" width="120"></el-table-column>
        <el-table-column label="分类名" prop="cate_name"></el-table-column>
        <el-table-column label="状态" width="400" prop="isshow" show-overflow-tooltip current-row-key>
          <template slot-scope="scope">
            <el-switch
              @change="statusupdate(scope.row)"
              v-model="scope.row.isshow"
              active-color="#CBA361"
              inactive-color="#CCCCCC"
            ></el-switch>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope4">
            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
              <span class="edit" @click="editFood(scope4.row)">
                <i class="el-icon-edit"></i>
              </span>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
        background
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="limit"
        layout="total, prev, pager, next, jumper"
        :total="total"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
import shopclass from "./shopclass.js";
export default shopclass;
</script>
<style lang="less" scoped>
@import url('./shopclass.less');
</style>
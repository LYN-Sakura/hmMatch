<template>
  <div class="ccia">
    <div class="ccia_top">
      <button @click="centerDialogVisible = true">
        <i>+</i>&nbsp;添加热门活动
      </button>
      <el-dialog title="添加热门活动" :visible.sync="centerDialogVisible" top="25vh">
        <el-form :model="form" @submit.native.prevent >
          <el-form-item>
            <el-input
              style="margin:30px auto 0px;float:unset;"
              placeholder="输入活动名称添加热门活动，最多可上传2个活动"
              v-model="form.date1"
              autocomplete="off"
              :rules="[
                { required: true, message: '检索条件不能为空'},
              ]"
              @keyup.native="active_find_add"
            >
              <el-button slot="append" @click="active_find_add">+</el-button>
            </el-input>
            <transition>
                <div v-if='flag' class="addproarr">
                  <ul>
                    <li v-for="(item,index) in addproduclist" :key="index">
                      <!-- 活动名 -->
                      <div>{{item.title}}</div>
                      <!-- 城市地址 -->
                      <div>{{item.province}}</div>
                      <!-- 选择 -->
                      <div @click.stop="addactive(item.id)">选择</div>
                    </li>
                  </ul>
                </div>
            </transition>
          </el-form-item>
          <el-form-item>
            <ul class="show_hot_list">
              <li v-for="(item,index) in By_hot_active" :key="index">
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
          <el-button @click="centerDialogVisible  = false">取消</el-button>
        </div>
      </el-dialog>
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
          :default-time="['12:00:00','08:00:00']"
          value-format='yyyy-MM-dd'
          prefix-icon="el-icon-date"
        ></el-date-picker>
        <button @click="searchfood">搜索</button>
        <el-input v-model="keyword" placeholder="请输入关键词" clearable></el-input>
        <el-select
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
        </el-select>
        <el-select v-model="city" placeholder="请选择城市" @change="addresschange">
          <el-option
            v-for="item in citylist"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-select v-model="county" placeholder="请选择省区" @change="address">
          <el-option
            v-for="item in countylist"
            :key="item.code"
            :label="item.name"
            :value="item.name"
          ></el-option>
        </el-select>
      </div>
    </div>
    <div class="ccia_contentbox">
      <div class="ccia_contenttop">
        <button @click="statusupdate('isall',1)">
          <img src="../../../../../static/images/showImg.png" alt>显示
        </button>
        <button @click="statusupdate('isall',0)">
          <img src="../../../../../static/images/hideImg.png" alt>隐藏
        </button>
        <button @click="deleteFood('isall')">
          <i class="el-icon-delete"></i> 删除
        </button>
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
          <el-table-column label="ID" type="index"></el-table-column>
          <el-table-column label="城市" prop="city"></el-table-column>
          <el-table-column label="热推活动" prop="subtitle" width="380"></el-table-column>
          <el-table-column label="状态" prop="status_text" show-overflow-tooltip current-row-key>
            <template slot-scope="scope">
              <el-button class="niu">
                <span class="niu" :class="scope.row.status_text === '启用' ? 'info' : 'warning'"  @click="statusupdate('notall',2,scope.row)">{{scope.row.status_text}}</span>
              </el-button>
            </template>
          </el-table-column>
          <el-table-column label="开启时间" prop="starttime"></el-table-column>
          <el-table-column label="结束时间" prop="endtime"></el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope4">
              <el-tooltip class="item" effect="dark" content="添加活动" placement="top">
                <span class="edit" @click="centerDialogVisible = true">
                  <i class="el-icon-edit"></i>
                </span>
              </el-tooltip>
              <el-tooltip class="item" effect="dark" content="放入回收站" placement="top">
                <span class="edit" @click="deleteFood('notall',scope4.row)">
                  <i class="el-icon-delete"></i>
                </span>
              </el-tooltip>
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
import Activeset from './Activeset.js'
export default Activeset
</script>

<style lang="less" scoped>
@import url('./Activeset.less');
</style>



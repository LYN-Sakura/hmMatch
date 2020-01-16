<template>
  <div class="ccia">
    <div class="ccia_top">
      <button @click="toaddlevel">
        <i>+</i>&nbsp;添加幻灯片
      </button>
      <div>
        <button @click="searchfood">搜索</button>
        <el-input v-model="keyword" placeholder="请输入关键词" clearable></el-input>
        <el-select v-model="type" clearable placeholder="状态" @change="typechange">
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
          <img src="../../../../../static/images/showImg.png" alt>显示
        </button>
        <button @click="statusupdate('isall',0)">
          <img src="../../../../../static/images/hideImg.png" alt>隐藏
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
        >
          <el-table-column type="selection"></el-table-column>
          <el-table-column label="顺序" type="index"></el-table-column>
          <el-table-column label="标题" prop="title"></el-table-column>
          <el-table-column prop="url" label="链接" width="380"></el-table-column>
          <el-table-column label="是否启用" prop="isshow" show-overflow-tooltip>
            <template slot-scope="scope">
              <el-switch
                @change="statusupdate('notall',2,scope.row)"
                v-model="scope.row.isshow"
                active-color="#CBA361"
                inactive-color="#CCCCCC"
              ></el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="140">
            <template slot-scope="scope4">
              <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                <span class="edit" @click="editFood(scope4.row)">
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
import bannerset from './bannerset.js'
export default bannerset
</script>

<style lang="less" scoped>
.ccia {
  .ccia_top {
    > button {
      > i {
        font-weight: 600;
      }
      width: 100px;
      height: 32px;
      line-height: 32px;
      color: #ffffff;
      border: 0;
      font-size: 14px;
      border-radius: 2px;
      background-color: #cba361;
      outline: none;
      cursor: pointer;
      float: left;
    }
    > div {
      float: right;
      width: 60%;
      button {
        border-radius: 0;
        padding: 0 16px;
        float: right;
        width: 60px;
        height: 32px;
        line-height: 32px;
        background-color: #cba361;
        color: #ffffff;
        border: 0;
        cursor: pointer;
      }
    }
    .el-select {
      float: right;
      width: 100px;
      border-radius: 0;
    }
    .el-input {
      float: right;
      width: 70%;
      border-radius: 0;
    }
    /deep/ .el-input__inner {
      border-radius: 0;
    }
  }
  .ccia_contenttop {
    line-height: 44px;
    text-align: left;
    button {
      width: 60px;
      height: 28px;
      line-height: 28px;
      text-align: center;
      color: #858585;
      font-size: 14px;
      border-radius: 2px;
      background: #fdfdfd;
      outline: #eaebec solid 1px;
      border: none;
      margin-right: 10px;
      cursor: pointer;
      img {
        width: 16px;
        height: 16px;
        margin-right: 5px;
        vertical-align: middle;
      }
    }
  }
  /deep/ .cell {
    > img {
      width: 80px;
      height: 80px;
    }
  }
}
/deep/ .el-dialog {
  overflow: hidden;
}
.edit {
  display: inline-block;
  width: 22px;
  height: 22px;
  border-radius: 2px;
  border: 1px solid #eff0f0;
  // border: 1px solid red;
  text-align: center;
  cursor: pointer;
  i {
    line-height: 22px;
    font-size: 13px;
  }
}
.edit:hover {
  border: 1px solid #cba361;
  i {
    color: #cba361;
  }
}
</style>



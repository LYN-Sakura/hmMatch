<template>
  <div class="ccia">
    <div class="ccia_top">
      <button>{{uid?'编辑幻灯片':'添加幻灯片'}}</button>
    </div>
    <div class="ccia_contentbox">
      <div class="ccia_content">
        <div class="content_top">
          <span>排序</span>
          <div>
            <el-input v-model="no" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="content_top">
          <span>是否启用</span>
          <el-radio-group v-model="enabled">
            <el-radio :label="1">启用</el-radio>
            <el-radio :label="0">禁用</el-radio>
          </el-radio-group>
        </div>
        <div class="content_top">
          <span>轮播图描述</span>
          <div>
            <el-input v-model="miaoshu" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="content_top content_toplogo">
          <span>轮播图图片</span>
          <div>
            <el-upload
              :action="baseurl+'admin/index/imgbase64'"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :before-remove="beforeRemove"
              :on-remove="handleRemove"
              :file-list="img_list"
              :on-success="uploadSuccess"
              :before-upload="beforeAvatarUpload"
              :limit="1"
              :on-exceed="onexceed"
            >
            <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="dialogVisible">
              <img width="100%" :src="dialogImageUrl" alt>
            </el-dialog>
          </div>
        </div>
        <div class="tips">
          <p>推荐尺寸: (270X148)像素</p>
        </div>
        <div class="content_top">
          <span>跳转链接</span>
          <div>
            <el-input v-model="tzurl" placeholder="请输入内容"></el-input>
          </div>
        </div>
        <div class="submitbox">
          <button @click="submit">提交</button>
          <button @click="goback">返回列表</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import addppt from './addppt.js'
export default addppt
</script>
<style lang="less" scoped>
.ccia {
  text-align: left;
  padding: 0px 30px 20px 0px;
  .ccia_top {
    margin-left: 30px;
    button {
      width: 100px;
      height: 32px;
      line-height: 32px;
      padding: 0 10px;
      color: #ffffff;
      border: 0;
      font-size: 14px;
      border-radius: 2px;
      background-color: #cba361;
      outline: none;
      cursor: pointer;
      float: left;
    }
  }
  .ccia_contentbox {
    border-top: 1px solid #edecec;
    .ccia_content {
      overflow: hidden;
      .el-input {
        width: 50%;
      }
      .tips {
        margin-top: 5px;
        padding-left: 155px;
        color: #999;
        font-size: 13px;
      }
      .content_top {
        margin-top: 30px;
        > span:nth-of-type(1) {
          width: 130px;
          display: inline-block;
          text-align: right;
          margin-right: 20px;
          height: 32px;
          line-height: 32px;
          font-size: 13px;
        }
        > span:nth-of-type(2) {
          position: absolute;
          left: 155px;
          top: 40px;
          font-size: 12px;
          color: #999999;
          font-family: PingFang-SC-Medium;
          font-weight: 500;
        }
        .el-select {
          width: 100px;
          height: 32px;
        }
        > div {
          display: inline;
        }
      }

      div:last-child {
        button {
          // width: 100px;
          min-width: 58px;
          height: 32px;
          line-height: 32px;
          padding: 0 15px;
          color: #ffffff;
          border: 0;
          font-size: 14px;
          border-radius: 2px;
          background-color: #cba361;
          outline: none;
          cursor: pointer;
        }
        button:nth-of-type(1) {
          margin-left: 150px;
          margin-right: 10px;
        }
        button:nth-of-type(2) {
          color: #000;
          padding: 0 18px;
          background-color: #fff;
          font-size: 14px;
          border: 1px solid #efefef;
        }
      }
      .content_toplogo {
        margin-top: 48px;
        box-sizing: border-box;
        display: flex;
        align-items: center;
        > span {
          margin-top: 60px;
          margin-right: 25px !important;
        }
        > div {
          display: inline-block;
        }
      }
    }
  }
  .submitbox {
    margin-top: 25px;
    margin-left: 5px;
    > p {
      font-size: 14px;
      color: #999;
      padding-left: 169px;
      margin-top: 10px;
    }
  }
}
</style>


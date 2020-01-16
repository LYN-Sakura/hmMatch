<template>
  <div class="ccia">
    <div class="ccia_top">
      <div class="addBaseheader">
        <el-button type="primary" @click="goback">返回列表</el-button>
      </div>
    </div>
    <div class="ccia_contentbox">
      <div class="ccia_content">
        <el-tabs v-model="activeName" @tab-click="handleClick">
          <!-- 基本 -->
          <el-tab-pane label="基本" name="first">
            <div class="addBasic">
              <!-- 基本信息 -->
              <div class="basicItem">
                <div class="basicItem_r">
                  <el-form ref="form" label-width="130px">
                    <el-form-item label="排序">
                      <el-input
                        v-model="displayorder"
                        placeholder="请输入内容"
                        oninput="value=value.replace(/[^\d]/g,'')"
                      ></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="basicItem_r">
                  <el-form ref="form" label-width="130px">
                    <el-form-item label="免单卡名称">
                      <el-input v-model="title" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="basicItem_r">
                  <el-form ref="form" label-width="130px">
                    <el-form-item label="免单卡价格">
                      <el-input v-model="price" placeholder="请输入内容"></el-input>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="basicItem_r nosingimg">
                  <el-form ref="form" label-width="130px">
                    <el-form-item label="免单卡图片">
                      <el-input disabled>
                        <template slot="append">
                          <el-upload
                            class="avatar-uploader"
                            :action="baseurl+'admin/index/imgbase64'"
                            :show-file-list="false"
                            :before-upload="beforeAvatarUpload"
                            :limit="1"
                          >
                            <el-button size="small" type="primary">选择图片</el-button>
                          </el-upload>
                        </template>
                      </el-input>
                    </el-form-item>
                  </el-form>
                  <div class="img" v-show="imageUrl">
                    <img :src="imageUrl">
                    <span @click="handleRemove">X</span>
                  </div>
                </div>
                <!-- <div class="basicItem_r">
                  <el-form ref="form" :model="addFoodInfo" label-width="130px">
                    <el-form-item label="是否设置时间">
                      <el-radio-group v-model="addFoodInfo.isfre">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </div>
                <div class="basicItem_r">
                  <el-form ref="form" :model="addFoodInfo" label-width="130px">
                    <el-form-item label="免单卡上架时间">
                      <el-date-picker
                        v-model="value"
                        type="datetime"
                        placeholder="选择上架开始时间"
                        prefix-icon="el-icon-date"
                      ></el-date-picker>
                      <span style="margin:0px 5px;">至</span>
                      <el-date-picker
                        v-model="value1"
                        type="datetime"
                        placeholder="选择商家结束时间"
                        prefix-icon="el-icon-date"
                      ></el-date-picker>
                    </el-form-item>
                  </el-form>
                </div>-->
                <div class="basicItem_r">
                  <el-form ref="form" :model="addFoodInfo" label-width="130px">
                    <el-form-item label="是否上架">
                      <el-radio-group v-model="addFoodInfo.isfre">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                </div>
              </div>
            </div>
          </el-tab-pane>
          <!-- 分销 -->
          <el-tab-pane label="分销" name="distribute">
            <div class="addBasic">
              <!-- 基本信息 -->
              <div class="basicItem">
                <div class="basicItem_r">
                  <el-form ref="form" :model="hascommission" label-width="130px">
                    <el-form-item label="是否参与分销">
                      <el-radio-group v-model="hascommission.isfre">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                      </el-radio-group>
                    </el-form-item>
                  </el-form>
                  <span class="js">(如不参与分销，则不产生分享)</span>
                </div>
                <div class="basicItem_r independent">
                  <el-form ref="form" label-width="130px">
                    <el-form-item label="分销佣金" class="wyxx">
                      <el-checkbox v-model="checked">启用独立佣金比例</el-checkbox>
                    </el-form-item>
                  </el-form>
                  <span class="js">
                    (启用独立佣金设置,此商品拥有独立的佣金比例,不受分销商等级比例及默认设置限值:
                    (填写佣金规则,如果是数字(只能是纯数字),则是以固定金额给佣金,
                    例如1.就是按照卖一件,
                    <br>给分销商1元,如果上百分号,
                    例如1%,则是以支付商品金额的百分比给佣金。)
                  </span>
                </div>
                <div class="ratio">
                  <input v-model="bonus" oninput="value=value.replace(/[^\d]/g,'')">
                  <div>固定金额(元/%)</div>
                </div>
              </div>
            </div>
          </el-tab-pane>
        </el-tabs>
        <div class="addBaseFoot">
          <el-button type="primary" @click="addFoodSumbmit">保存</el-button>
          <el-button @click="goback">取消</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import nosingcard from "./nosingcard.js";
export default nosingcard;
</script>

<style lang="less" scoped>
@import url("./nosingcard.less");
</style>



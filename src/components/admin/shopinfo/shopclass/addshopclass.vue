<template>
  <div class="ccia">
    <div class="add_top">
      <router-link to="/shopclass">
        <div class="add_topBtn">
          <el-button type="primary">
            <i class="el-icon-arrow-left"></i>返回列表
          </el-button>
        </div>
      </router-link>
    </div>
    <div class="add_con">
      <el-form ref="form" :model="form" @submit.native.prevent>
        <el-form-item label="排序" class="add_conInp">
          <el-input type="text" v-model="form.displayorder"></el-input>
        </el-form-item>
        <el-form-item label="分类名称" class="add_conInp">
          <el-input type="text" v-model="form.name"></el-input>
        </el-form-item>
        <el-form-item label="是否启用">
          <el-radio-group v-model="form.isfre">
            <el-radio label="1">是</el-radio>
            <el-radio label="0">否</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" class="primaryBtn">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { Api } from "../../../../APi/WEBPC/index.js";
export default {
  data() {
    return {
      uid: "", // 判断新增修改字段
      form: {
        displayorder: "", // 排序
        name: "",
        isfre: "" //是否启用
      }
    };
  },
  methods: {
    onSubmit() {
      let k = 0;
      for (const e in this.form) {
        if (this.form[e] == "") {
          k = 1;
        }
      }
      if (k == 1) {
        this.$message.info("填写信息不完整");
      } else {
        if (this.uid) {
          Api.Save_update_class({
            id:this.uid,
            cate_name: this.form.name,
            isshow: this.form.isfre,
            displayorder: this.form.displayorder
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.message);
              this.$router.go(-1);
            }
          });
        } else {
          Api.Add_sub_class({
            cate_name: this.form.name,
            isshow: this.form.isfre,
            displayorder: this.form.displayorder
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.message);
              this.$router.go(-1);
            }
          });
        }
      }
    },
    getinfo(pid) {
      Api.Show_editor_class({
        id: pid
      }).then(res => {
        if (res.data.status == 1) {
          console.log(res.data);
          this.form.name = res.data.result.info.cate_name;
          this.form.displayorder = res.data.result.info.displayorder;
          this.form.isfre = res.data.result.info.isshow;
        }
      });
    }
  },

  components: {},

  computed: {},

  created() {
    this.uid = this.$route.query.pid;
    if (this.uid) {
      this.getinfo(this.uid);
    }
  },

  mounted() {},

  watch: {}
};
</script>
<style lang='less' scoped>
.ccia {
  padding: 0 10px 39px 0;
  .add_top {
    padding: 20px 0;
    border-bottom: 1px solid #edecec;
    .add_topBtn {
      text-align: left;
      padding-left: 41px;
      /deep/ .el-button {
        color: #ffffff;
        font-size: 14px;
        cursor: pointer;
        i {
          margin-right: 3px;
        }
      }
    }
  }
  .add_con {
    padding-top: 42px;
    width: 100%;
    /deep/ .el-form-item__label {
      width: 150px;
      font-size: 16px;
      color: #000000;
      padding: 0 20px 0 0;
    }
    /deep/ .el-form-item__content {
      margin-left: 0;
      float: left;
      .el-input__inner {
        width: 300px;
        height: 40px;
        line-height: 40px;
      }
    }
    .add_conInp {
      width: 100%;
      /deep/ .el-input__inner {
        float: left;
        width: 1100px;
      }
      p {
        text-align: left;
        color: #666666;
        font-size: 12px;
      }
    }
    .primaryBtn {
      margin-left: 150px;
    }
  }
}
</style>
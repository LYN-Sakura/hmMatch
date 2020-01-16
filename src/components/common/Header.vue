<template>
  <div class="header" style="background-color:#1A293C">
    <div class="logo" style="padding: 0 21px;background-color:#1E222B">
      <img src="../../../static/images/AdminSystem/admin_login_logo.png" alt="" style="width:100%">
    </div>
    <div>
      <el-menu
        :default-active="index"
        class="el-menu-demo"
        mode="horizontal"
        @select="handleSelect"
        background-color="#1E222B"
        text-color="#fff"
        router
      >
        <el-menu-item index="/index">
          
          <span>首页</span>
        </el-menu-item>
        <el-menu-item index="/memberlist">
       
          <span>会员</span>
        </el-menu-item>
        <el-menu-item index="/StoreList">
       
          <span>会员卡</span>
        </el-menu-item>
        <el-menu-item index="/active">
         
          <span>活动</span>
        </el-menu-item>
        <el-menu-item index="/shop">
         
          <span>商家</span>
        </el-menu-item>
        <el-menu-item index="/afterCoupon">         
          <span>优惠券</span>
        </el-menu-item>        
        <el-menu-item index="/money">
          
          <span>财务</span>
        </el-menu-item>
        <el-menu-item index="/paysetlist">
         
          <span>设置</span>
        </el-menu-item>
      </el-menu>
    </div>
    <div class="dropdowm">
      <img :src="userImg" alt="" style="float:left;width:30px;height:30px;border-radius:50%;">
      <el-dropdown trigger="click" style="float:left;line-height:30px;margin-left:12px">
        <span class="el-dropdown-link">
          {{aduser?aduser:'暂无昵称'}}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <!-- <el-dropdown-item @click.native="toqxgl">权限管理</el-dropdown-item> -->
          <el-dropdown-item @click.native="changeper">修改信息</el-dropdown-item>
          <el-dropdown-item @click.native="backlogin">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
    <div>
      <el-dialog title="修改信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="手机号" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="头像" :label-width="formLabelWidth">
            <el-upload
              class="avatar-uploader"
              :action="baseurl + 'index/index/uploadimg'"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload"
            >
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="昵称" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" :label-width="formLabelWidth">
            <el-input v-model="form.real_name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="邮箱" :label-width="formLabelWidth">
            <el-input v-model="form.email" autocomplete="off"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button type="primary" @click="submit">确 定</el-button>
          <el-button @click="dialogFormVisible = false">取 消</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      indexarr: ["index"],
      shoparr: ["shop"],
      memberlist: ["memberlist"],
      activearr: ["actiove"],
      fenxiaoarr: ["fenxiao"],
      moneyarr: ["money"], 
      setarr: ["paysetlist"],
      couponarr: ["afterCoupon"],
      membercardarr: ["StoreList"],
      index: "",
      dialogFormVisible: false,
      form: {},
      formLabelWidth: "120px",
      imageUrl: "",
      baseurl: this.api,
      ms_id: sessionStorage.getItem("ms_id"),
      aduser: sessionStorage.getItem("ms_username"),
      userImg: sessionStorage.getItem("ms_userImg"),
    };
  },
  created() {
   
    this.index = `/${sessionStorage.getItem("openindex")}`;
    // this.getlist()
  },
  watch: {
    $route(to, from) {
      if (this.indexarr.includes(to.name)) {
        this.index = "/index";
      } else if (this.shoparr.includes(to.name)) {
        this.index = "/shop";
      } else if (this.memberlist.includes(to.name)) {
        this.index = "/memberlist";
      } else if (this.activearr.includes(to.name)) {
        this.index = "/active";
      } else if (this.fenxiaoarr.includes(to.name)) {
        this.index = "/fenxiao";
      } else if (this.moneyarr.includes(to.name)) {
        this.index = "/money";
      } else if (this.setarr.includes(to.name)) {
        this.index = "/paysetlist";
      } else if(this.couponarr.includes(to.name)) {
        this.index = "/afterCoupon"
      } else if(this.membercardarr.includes(to.name)) {
        this.index = "/StoreList"
      }
    }
  },
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);
    },
    toqxgl() {
      // this.$router.push('/power')
    },
    changeper() {
      // this.$router.push('/changeper')
      this.dialogFormVisible = true;
      // this.getlist()
    },
    getlist() {
      //   this.$http.post(this.api+'admin/admin/info',{
      //       id:this.ms_id
      //   }).then(res=>{
      //     //   console.log(res)
      //       if(res.data.status==1){
      //           this.form=res.data.result
      //           this.imageUrl = this.form.admin_img
      //           this.form.password=''
      //       }
      //   })
    },
    handleAvatarSuccess(res, file) {
      // this.imageUrl = URL.createObjectURL(file.raw);
    },
    beforeAvatarUpload(file) {
      // let image_base64;
      // let that = this
      // if (!/image\/\w+/.test(file.type)) {
      //     that.$message("请确保文件为图像类型");
      //     return false;
      // } else {
      //     let reader = new FileReader();
      //     reader.readAsDataURL(file);
      //     reader.onload = function(e) {
      //         image_base64 = this.result.split(",")[1];
      //         var params = {
      //             imgdata: image_base64
      //         };
      //         that.$http
      //             .post(that.api + "index/index/uploadimg", params)
      //             .then(res => {
      //                    console.log(res)
      //                 if (res.data.status == 1) {
      //                     that.imageUrl = res.data.result.url
      //                     that.$message.success(res.data.message);
      //                 } else if (res.data.status == 0) {
      //                     this.$message.error(res.data.message);
      //                 }
      //             });
      //     };
      // }
    },
    submit() {
      //   this.$http.post(this.api + 'admin/admin/myadmin_update',{
      //     mobile:this.form.mobile	,
      //     password:this.form.password,
      //     username:this.form.username,
      //     real_name:this.form.real_name,
      //     admin_img:this.imageUrl,
      //     email:this.form.email,
      //   }).then(res=>{
      //       if(res.data.status==1){
      //         this.dialogFormVisible = false
      //         this.form.password=''
      //         this.$message.success(res.data.message)
      //         this.backlogin()
      //       }else{
      //         this.$message.error(res.data.message)
      //       }
      //   })
    },
    backlogin() {
     
      sessionStorage.removeItem("ms_username", "");
      sessionStorage.removeItem("ms_moblie");
      // sessionStorage.removeItem('ms_username')
      this.$router.push("/login");
    }
  }
};
</script>
<style lang="less" scoped>

.header {
  background-color: #1a293c;
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 64px;
  background: #fff; /* 头部背景色 */
  .el-menu {
    li{
      span{
        font-size: 15px;
        color: #FFD186;
        width: 29px;
      } 
    }
    li.is-active {
      color: #FFD186!important;
      border-bottom: 0px!important;
      opacity:1;
      position: relative;
    }
    li.is-active::after{
        content:'';
        position: absolute;
        bottom: 11px;
        width: 28px;
        height: 2px;
        background: #FFD186;
        left: 50%;
        transform: translateX(-50%);
      }
    
  }
  .el-menu-item {
    font-size: 15px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    line-height: 0;
    padding: 0 30px;
   

    
  }
  .logo {
    width: 177px;
    height: 64px;
    float: left;
    // color: white;
    background-color: #1a293c;
    text-align: center;
    img {
      margin-top: 20px;
    }
  }
  ul {
    height: 64px;
    margin-left: 177px;
    li {
      height: 100%;
      line-height: 64px;
      opacity:0.5;
      background-color: #1a293c;
    }
  }
  .dropdowm {
    position: absolute;
    right: 25px;
    cursor: pointer;
    top: 17px;
    .el-dropdown-link {
      color: white;
    }
  }
  /deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  /deep/ .avatar-uploader .el-upload:hover {
    border-color: #1a293c;
  }
  /deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  /deep/ .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
}
/deep/ .el-menu.el-menu--horizontal{
  border-bottom:0;
}
</style>



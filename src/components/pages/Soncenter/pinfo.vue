<template>
  <div class="Pinfo_cont">
    <Header :show="1">
      <span slot="top_text">个人信息</span>
    </Header>
    <div class="Pinfo_bot">
      <form action @submit.prevent="forminfo()">
        <p>
          <span>头像</span>
          <span class="ico">
            <Upload
              ref="upload"
              :show-upload-list="false"
              :on-success="handleSuccess"
              :format="['jpg','jpeg','png']"
              :max-size="2048"
              :on-format-error="handleFormatError"
              :on-exceeded-size="handleMaxSize"
              :before-upload="handleBeforeUpload"
              type="drag"
              :action="uploadadress"
              style="display: inline-block;width:24px;"
            >
              <img v-if="uploadadimg!=''" :src="uploadadimg" alt>
              <img
                v-else
                src="https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1345330011,1082178654&fm=26&gp=0.jpg"
                alt
              >
            </Upload>
          </span>
        </p>
        <p @click.stop="changename()">
          <span>昵称</span>
          <input type="text" maxlength="11" v-model="nicheng">
        </p>
        <p @click.stop="changePhone()">
          <span>手机号码</span>
          <input type="text" maxlength="11" v-model="Mobiel_phone">
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import { Api } from "../../../APi/WEBMb/index.js";
import Header from "../../component/header";
export default {
  name: "",
  props: [""],
  data() {
    return {
      userinfo: {}, // 用户信息
      nicheng: "", // 用户昵称
      Mobiel_phone: "", //  手机号展示
      phone:"", // 真实手机号
      userimg: "", // 用户头像
      uploadadress: "", // 上传地址
      uploadadimg: "", //   上传图像
      avatar: ""
    };
  },

  components: {
    Header
  },

  computed: {},

  created() {
    this.uploadadress = Api.baseurl + `mobile/index/uploadimgbase64`;
  },
  activated() {
    if (this.$route.meta.isUseCache) {
      // 判断路由信息中isUseCache是否为真，为true时刷新数据，为false时不刷新数据
      this.userinfo = {}; // 清空原有数据
      this.datainfo(); // 这是我们获取数据的函数
      this.$route.meta.isUseCache = true; // 前进这个页面的话，将isUseCache改为true，若后退到这个页面的话，在后退的那个页面中添加beforeRouteLeave (to, from, next)钩子函数，判断进入页面是否为本页面，若为真，则将isUseCache改为false，这样isUseCache的值，就可以灵活更改，且进入本页面中进入else使用缓存数据
    } else {
    }
  },

  mounted() {},

  methods: {
    forminfo() {
      return false;
    },
    datainfo() {
      Api.Mobile_Soncenter({})
        .then(res => {
          if (res.data.status == 1) {
            this.userinfo = res.data.result.info;
            this.uploadadimg = this.userinfo.avatar;
            this.nicheng = this.userinfo.nickname;
            this.phone = this.userinfo.mobile;
            this.Mobiel_phone = this.phone.substr(0,3)+'****'+this.phone.substr(7);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleMaxSize() {
      this.$Message.info({
        content: "超出大小,最大2M"
      });
    },
    handleBeforeUpload(file) {
      let that = this;
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function(e) {
        that.$http
          .post(that.uploadadress, {
            imgdata: this.result.split(",")[1]
          })
          .then(res => {
            if (res.data.status == 1) {
              that.uploadadimg = res.data.result.url;
              that.avatar = res.data.result.imgurl;
              that.$nextTick(function() {
                that.update();
              });
            }
          });
      };
      return false;
    },
    handleFormatError() {
      this.$Message.info({
        content: "格式错误"
      });
    },
    handleSuccess(file, response, fileList) {
      console.log(response);
    },
    update() {
      Api.Mobile_Son_info({
        avatar: this.avatar,
        type: 0
      }).then(res => {
        if (res.data.status == 1) {
          this.$Message.success({
            content: res.data.message
          });
        } else {
          this.$Message.error({
            content: res.data.message
          });
        }
      });
    },
    changename: function() {
      //  修改昵称
      this.$router.push("/upnickname");
    },
    changePhone: function() {
      // 修改手机号
      this.$router.push({
        path:"/upcell",
        query:{
          phone:this.Mobiel_phone
        }
      });
    }
  },
  watch: {}
};
</script>
<style lang='' scoped>
.Pinfo_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.Pinfo_bot {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 0.625rem 1rem;
  box-sizing: border-box;
}
.Pinfo_bot p {
  width: 100%;
  height: 2.8125rem;
  line-height: 2.8125rem;
  border-bottom: 1px solid #e8e8e8;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Pinfo_bot p span {
  color: #333333;
  font-size: 0.875rem;
  text-indent: 0.8125rem;
}
.Pinfo_bot p img {
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  float: left;
}
.Pinfo_bot p input {
  height: 2.8125rem;
  position: absolute;
  border: none;
  color: #898888;
  font-size: 0.875rem;
  text-align: right;
  right: 0px;
  top: 0px;
  border-bottom: 1px solid #e8e8e8;
}
.ico {
  position: absolute;
  width: 2rem;
  height: 2rem;
  overflow: hidden;
  right: 0px;
}
.ico /deep/ .ivu-upload-drag {
  border: none;
  position: absolute;
  left: 0px;
  right: 0px;
  top: 0px;
  bottom: 0px;
  margin: auto;
  text-align: unset;
  overflow: unset;
}
.ico /deep/ .ivu-icon-ios-arrow-forward:before {
  content: "\F11F";
  position: absolute;
  left: -0.5rem;
  top: 5px;
  bottom: 0px;
  margin: auto;
}
.ico:after {
  content: ".";
  width: 0;
  height: 0;
  visibility: hidden;
  clear: both;
  display: block;
}
</style>
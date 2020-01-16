<template>
  <div class="forget_cont">
    <Header :show="1">
      <span slot="top_text">设置密码</span>
    </Header>
    <div class="forget_bot">
      <form @submit.native.prevent>
        <p>
          <i></i>
          <input type="password" v-model="newpass" placeholder="设置新密码" maxlength="10" required>
        </p>
        <p>
          <i></i>
          <input type="password" v-model="renewpass" placeholder="再次输入确认密码" maxlength="10" required>
        </p>
      </form>
      <input type="submit" value="注册完成" @click.prevent="sub()">
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
      newpass: "", // 新密码
      renewpass: "" // 确认密码
    };
  },

  components: {
    Header
  },

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {},

  methods: {
    sub: function() {
      if (this.newpass != this.renewpass) {
        this.$Message.error({
          content: "两次密码不一致"
        });
      } else {
        let phone = this.$route.query.phone;
        let verify = this.$route.query.verify;
        Api.Mobile_register({
          mobile: phone,
          password: this.newpass,
          code: verify
        })
          .then(res => {
            // console.log("注册",res)
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
              localStorage.setItem("ms_userinfo", res.data.result.userinfo);
              this.$router.push("/mobile_index");
            }else{
              this.$Message.error(res.data.message);
            }
          })
          .catch(err => {
            console.log(err.data);
          });
      }
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
.forget_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.forget_bot {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 1rem 3rem;
  box-sizing: border-box;
}
.forget_bot p {
  margin-top: 1rem;
  height: 2.8125rem;
  line-height: 2.8125rem;
  border-bottom: 1px solid #caac75;
  position: relative;
  text-align: left;
}
.forget_bot p:nth-child(1) i {
  background: url(../../../../static/images/LogOrRig/rig9.png) 0.5rem center
    no-repeat;
  background-size: 1.25rem 1.25rem;
}
.forget_bot p:nth-child(2) i {
  background: url(../../../../static/images/LogOrRig/rig8.png) 0.5rem center
    no-repeat;
  background-size: 1.25rem 1.25rem;
}
.forget_bot p i {
  display: inline-block;
  height: 100%;
  width: 3rem;
  float: left;
}
.forget_bot p input:first-of-type {
  height: 100%;
  width: 60%;
  float: left;
}
::-webkit-input-placeholder {
  color: #b3b3b3;
  font-size: 0.875rem;
}
.forget_bot p::after {
  content: ".";
  width: 0;
  height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.forget_bot > input[type="submit"] {
  position: absolute;
  left: 50%;
  top: 12rem;
  width: 85%;
  height: 2.75rem;
  line-height: 2.75rem;
  transform: translateX(-50%);
  background: linear-gradient(to left, #c4a46c, #dbc18c);
  color: white;
  font-size: 1rem;
  border-radius: 1.375rem;
}
</style>
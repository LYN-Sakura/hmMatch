<template>
  <div class="forget_cont">
    <Header :show="1">
      <span slot="top_text">忘记密码</span>
    </Header>
    <div class="forget_bot">
      <form @submit.native.prevent>
        <p>
          <i></i>
          <input type="text" v-model="phone" placeholder="请输入手机号码" maxlength="11" required>
        </p>
        <p>
          <i></i>
          <input v-model="verfica" placeholder="请输入手机验证码" maxlength="4" required>
          <input
            type="text"
            :disabled="diable"
            readonly
            href="javascript:;"
            @click="verifica()"
            v-model="count"
          >
        </p>
        <p>
          <i></i>
          <input type="password" v-model="newpass" placeholder="设置新密码" maxlength="10" required>
        </p>
        <p>
          <i></i>
          <input
            type="password"
            v-model="renewpass"
            @change="repass"
            placeholder="再次输入确认密码"
            maxlength="10"
            required
          >
        </p>
      </form>
      <input type="submit" value="立即提交" @click.prevent="sub()">
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
      phone: "", // 手机号
      verfica: "", // 验证码
      diable: false, // 禁止重复点击发送验证码
      newpass: "", // 新密码
      renewpass: "", // 确认密码
      count: "发送验证码" //倒计时
    };
  },

  components: {
    Header
  },
  created() {},

  mounted() {},

  methods: {
    //发送验证码
    verifica: function() {
      if (/^[1][1,3,4,5,6,7,8,9][0-9]{9}$/gi.test(this.phone)) {
        //验证手机号输入是否正确，可发送验证码
        let that = this;
        this.$Message.success({
          content: "发送成功"
        });
        this.diable = true;
        let cont = 60;
        function times() {
          that.count = cont + " s";
          if (cont <= -1) {
            (that.count = "获取验证码"), (this.diable = false);
            // 关闭定时器，清空状态码，需重新发送验证码
            this.data = "";
            clearInterval(countdown);
          }
          cont--;
        }
        let countdown = setInterval(times, 1000);
        Api.Mobile_verify({
          mobile: this.phone,
          code: this.verfica
        })
          .then(res => {
            if (res.data.status == 1) {
              // 验证码无误
              this.$router.push("/index");
            }
          })
          .catch(err => {
            console.log(err.data);
          });
      } else {
        this.$Message.error({
          content: "手机号格式输入错误"
        });
      }
    },
    // 重复密码
    repass: function() {
      if (this.newpass != this.renewpass) {
        this.$Message.info({
          content: "两次密码输入不一致"
        });
      }
    },
    // 提交
    sub: function() {
      if (/^[1][1,3,4,5,6,7,8,9][0-9]{9}$/gi.test(this.phone)) {
        Api.Mobile_verification({
          mobile: this.phone,
          code: this.verfica
        })
          .then(res => {
            if (res.data.status == 1) {
              // 验证码无误
              if (this.newpass != this.renewpass) {
                this.$Message.info({
                  content: "两次密码输入不一致"
                });
              } else {
                // 两次密码相同,发送请求修改密码
                this.Update_pass();
              }
            }
          })
          .catch(err => {
            console.log(err.data);
          });
      }
    },
    // 修改密码
    Update_pass() {
      Api.Mobile_forgetpass({
        mobile: this.phone,
        password: this.newpass,
        code: this.verfica
      }).then(res => {
        if (res.data.status == 1) {
          this.$Message.success({
            content: res.data.message
          });
          localStorage.setItem("ms_userinfo", res.data.result.userinfo);
          this.$router.push('/mobile_index');
        }
      });
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
  background: url(../../../../static/images/LogOrRig/rig7.png) 0.5rem center
    no-repeat;
  background-size: 1.25rem 1.25rem;
}
.forget_bot p:nth-child(2) i {
  background: url(../../../../static/images/LogOrRig/rig8.png) 0.5rem center
    no-repeat;
  background-size: 1.25rem 1.25rem;
}
.forget_bot p:nth-child(3) i,
.forget_bot p:nth-child(4) i {
  background: url(../../../../static/images/LogOrRig/rig9.png) 0.5rem center
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
.forget_bot p:nth-child(2) input:last-of-type {
  position: absolute;
  right: 0;
  width: 5.625rem;
  height: 1.875rem;
  line-height: 1.875rem;
  top: 50%;
  transform: translateY(-0.9375rem);
  text-align: center;
  background: linear-gradient(to right, #c4a46c, #dbc18c);
  color: white;
  font-size: 0.75rem;
  border-radius: 0.9375rem;
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
  top: 20rem;
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
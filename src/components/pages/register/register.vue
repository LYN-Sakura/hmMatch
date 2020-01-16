<template>
  <div class="Login_cont">
    <div class="login_top">
      <div class="login_bg"></div>
      <div class="form">
        <form @submit.prevent="register()">
          <p>
            <i></i>
            <input type="text" placeholder="请输入手机号" v-model="phone" maxlength="11">
          </p>
          <p>
            <i></i>
            <input type="text" placeholder="请输入手机验证码" v-model="verify" maxlength="4">
            <input
              type="text"
              readonly
              :disabled="diable"
              href="javascript:;"
              @click="verifica()"
              v-model="count"
            >
          </p>
          <!-- 手机号为空的话，禁止点击完成 -->
          <input type="submit" value="下一步" :disabled="phone==''?status:!status">
        </form>
        <div>
          <a href="javascript:;" @click="forgetpass()">忘记密码?</a>
          <span></span>
          <a href="javascript:;" @click="tologin()">
            已注册,
            <i>去登录</i>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "../../../APi/WEBMb/index.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      status: true,
      diable: false, // 禁止重复点击发送验证码
      phone: "", //手机号输入框
      datas: "", //接收请求回的状态码
      verify: "", // 验证码输入框
      count: "发送验证码" //倒计时
    };
  },

  components: {},

  computed: {},
  created() {
    // localStorage.removeItem('initdate');    // 清除时间戳测试
    // return false;
    this.$http.post('/mobile/index/index',{}).then(res=>{
      if(res.data.status == -102){
        console.log(1111111111)
        localStorage.setItem('wxurl',this.api+'#'+this.$route.path)
        window.location.href=res.data.result[0].url
      }
    })
  },
  mounted() {},
  methods: {
    //发送验证码
    verifica: function() {
      if (/^[1][1,3,4,5,6,7,8,9][0-9]{9}$/gi.test(this.phone)) {
        //验证手机号输入是否正确，可发送验证码
        let that = this;
        this.diable = true;
        let cont = 60;
        function times() {
          that.count = cont + " s";
          if (cont <= -1) {
            that.count = "获取验证码";
            this.diable = false;
            // 关闭定时器，清空状态码，需重新发送验证码
            this.datas = "";
            clearInterval(countdown);
          }
          cont--;
        }
        let countdown = setInterval(times, 1000);
        Api.Mobile_verify({
          // 得到短信验证码
          mobile: this.phone
        })
          .then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
            }
          })
          .catch(err => {
            console.log(err.data);
          });
      } else {
        this.$Message.error("手机号格式输入错误");
      }
    },
    // 登录页
    tologin: function() {
      this.$router.push("/mobile_login");
    },
    // 忘记密码
    forgetpass: function() {
      this.$router.push("/forgetpass");
    },
    // 下一步
    register: function() {
      if (/^[1][1,3,4,5,6,7,8,9][0-9]{9}$/gi.test(this.phone)) {
        // 手机号无误 ，发请求做验证码验证
        Api.Mobile_verification({
          mobile: this.phone,
          code: this.verify
        })
          .then(res => {
            if (res.data.status == 1) {
              this.$Message.success(res.data.message);
              // 验证码无误,进入设置密码页
              this.$router.push({
                path:'/repass',
                query:{
                  phone:this.phone,
                  verify:this.verify
                }
              });
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
<style scoped>
.Login_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar {
  display: none;
}
.login_top {
  width: 100%;
  height: 100%;
  background: white;
  overflow-y: hidden;
}
::-webkit-scrollbar {
  display: none;
}
.login_bg {
  width: 100%;
  height: 13.5625rem;
  background: url(../../../../static/images/LogOrRig/rig2.png) no-repeat;
  background-size: 100% 100%;
}

.login_top img {
  width: 100%;
  height: 100%;
}
.form {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  top: 13.5625rem;
  margin: auto;
}
.form > form {
  width: 18.75rem;
  height: 16.5rem;
  border-radius: 0.3125rem;
  box-sizing: border-box;
  background: white;
  padding: 1.0625rem 0rem;
  position: relative;
  margin: 0px auto;
  z-index: 55;
}
.form > form input[type="text"] {
  border: none;
  color: #000;
  font-size: 0.875rem;
  outline: none;
  width: 70%;
  line-height: 1.5rem;
  margin-left: 1rem;
}
::-webkit-input-placeholder {
  /* placeholder颜色  */
  color: #b3b3b3;
  /* placeholder字体大小  */
  font-size: 0.875rem;
  /* placeholder位置  */
  text-align: left;
}
.form > form p {
  border-bottom: 0.0625rem solid #caac75;
  display: block;
  height: 3.125rem;
  line-height: 3.125rem;
  box-sizing: border-box;
  text-align: left;
  margin: 0.625rem auto 0rem;
  width: 90%;
}
.form > form p i {
  display: inline-block;
  width: 1.05rem;
  height: 1.0625rem;
  vertical-align: middle;
}
.form > form p:first-of-type i {
  background: url(../../../../static/images/LogOrRig/rig7.png) no-repeat;
  background-size: 100% 100%;
}
.form > form p:nth-child(2) i {
  background: url(../../../../static/images/LogOrRig/rig8.png) no-repeat;
  background-size: 100% 100%;
}
.form > form p:nth-child(2) {
  position: relative;
}
.form > form p:nth-child(2) input:last-of-type {
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
.form > form p input[readonly] {
  position: absolute;
  right: 0;
  width: 4.1rem;
  color: #3399ff;
  font-size: 0.75rem;
  text-decoration: none;
  line-height: 1.5rem;
  text-align: right;
}
input[type="submit"] {
  background: linear-gradient(to left, #c4a46c, #dbc18c);
  height: 2.75rem;
  line-height: 2.75rem;
  display: inline-block;
  width: 100%;
  border-radius: 1.375rem;
  text-align: center;
  border: none;
  margin-top: 1.25rem;
  color: white;
  font-size: 1rem;
  letter-spacing: 0.125rem;
}
.form > div {
  width: 60%;
  height: 2rem;
  line-height: 2rem;
  margin: 2rem auto;
  font-size: 0.875rem;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.form > div a {
  display: inline-block;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #999;
}
.form > div span {
  display: inline-block;
  width: 0.125rem;
  height: 0.8125rem;
  background-color: #999;
}
.form > div a i {
  font-style: normal;
  color: #caac75;
}
@media all and (max-width: 321px) {
  .form {
    width: 17.75rem;
  }
  .form > form {
    width: 17.75rem;
  }
  .form > div {
    width: 70%;
    margin: 0rem auto;
  }
}
@media all and (max-width: 321px) and (max-height: 481px) {
  .form > form {
    height: 13.5rem;
  }
  .form > div {
    width: 70%;
    margin: 0rem auto;
  }
}
</style>
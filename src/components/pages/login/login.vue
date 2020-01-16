<template>
  <div class="Login_cont">
    <div class="login_top">
      <div class="login_bg"></div>
      <div class="form">
        <form @submit.prevent="login()">
          <p>
            <i></i>
            <input type="text" placeholder="手机号" required v-model="phone" maxlength="11">
          </p>
          <p>
            <i></i>
            <input type="password" placeholder="请输入登录密码" required v-model="pass" maxlength="12">
          </p>
          <!-- 手机号为空的话，禁止点击完成 -->
          <input type="submit" value="登录" :disabled="phone==''?status:!status">
        </form>
        <div>
          <a href="javascript:;" @click="forgetpass()">忘记密码?</a>
          <span></span>
          <a href="javascript:;" @click="toregin()">现在注册</a>
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
      phone: "", // 账号
      pass: "", // 密码
      datas: "", // 接收请求回的状态码
      // is_xcx : false
    };
  },

  components: {},

  computed: {},
  created() {
    // console.log('判断微信')
    // let that = this
    // wx.miniProgram.getEnv(function(res) { 
    //   // console.log(res.miniprogram)
    //   if(res.miniprogram) {
    //       console.log('小程序')
    //       that.is_xcx = true
    //       this.login()
    //   }else {
    //       console.log('非小程序')
    //       that.is_xcx = false
    //       this.login()
    //   }
    // })
    // let hxurl=localStorage.getItem('hxurl')
    // console.log('wojineu',hxurl)
    // if(hxurl){
      
    //   window.location.href = hxurl
    // }else{
    //   let loginress = localStorage.getItem("initdate");
    //   if (loginress != "" && loginress != null && loginress != undefined) {
    //     this.$router.push("/mobile_index");
    //   }
    // }
    
    // localStorage.removeItem('initdate');    // 清除时间戳测试
    // return false;
    this.$http.post('/mobile/index/index',{}).then(res=>{
      if(res.data.status == -102){
        console.log(1111111111)
        localStorage.setItem('wxurl',this.api+'#'+this.$route.path)
        window.location.href=res.data.result[0].url
      }
    })
    // localStorage.setItem('hxurl',this.api+'#'+this.$route.path)
    // console.log('url',url)
    // if(url){
    //   window.location.href=url
    // }
    // console.log(this.api+'#'+this.$route.path)
  },
  mounted() {},
  methods: {
    // getxcx(){
    //     console.log('判断微信')
    //     let that = this
    //     wx.miniProgram.getEnv(function(res) { 
    //     // console.log(res.miniprogram)
    //     if(res.miniprogram) {
    //         console.log('小程序')
    //         that.is_xcx = true
    //         // this.slogin()
    //     }else {
    //         console.log('非小程序')
    //         that.is_xcx = false
    //     }
    //     })
    // },
    // slogin: function() {
    //   this.$http.post('mobile/index/home',{

    //   }).then(res=>{
      
    //   })
    // },
    //提交登录
    login: function() {
      if (/^[1][1,3,4,5,6,7,8,9][0-9]{9}$/gi.test(this.phone)) {
        //验证手机号输入是否正确
        Api.Mobile_login({
            mobile:this.phone,
            password:this.pass
        }).then(res=>{
            if(res.data.status==1){
                this.$Message.success({
                    content:res.data.message
                })
                sessionStorage.setItem('ms_token',res.data.result.userinfo.token);
                localStorage.setItem('ms_userinfo',res.data.result.userinfo);
                let hxurl=sessionStorage.getItem("hxurl")
                let posurl=sessionStorage.getItem("posurl")
                if(hxurl){
                  window.location.href=hxurl
                }else{
                  this.$router.push('/mobile_index');
                }
                if(posurl){
                  window.location.href=posurl
                }else{
                  this.$router.push('/mobile_index');
                }
            }else{
                this.$Message.info({
                    content:res.data.message+',请去注册'
                })
            }
        }).catch(err=>{
            console.log(err.data);
        })
      }else{
          this.$Message.error({
              content:'手机号输入错误'
          })
      }
    },
    toregin: function() {
      this.$router.push("/register");
    },
    forgetpass: function() {
      this.$router.push("/forgetpass");
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
  overflow: hidden;
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
.form > form input[type="text"],
.form > form input[type="password"] {
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
  -webkit-box-sizing: border-box;
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
  background: url(../../../../static/images/LogOrRig/rig9.png) no-repeat;
  background-size: 100% 100%;
}
.form > form p:nth-child(2) {
  position: relative;
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
  display: flex;
  align-items: center;
  height: 2rem;
  margin: 2rem auto;
  font-size: 0.875rem;
  position: relative;
}
.form > div a {
  flex: 1;
  height: 2rem;
  line-height: 2rem;
  text-align: center;
  color: #999;
}
.form > div span {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 0.125rem;
  height: 0.8125rem;
  transform: translate(-0.0625rem, -0.40625rem);
  background-color: #999;
}
</style>
<template>
  <div class="upcell_cont">
    <Header :show="1">
      <span slot="top_text">修改手机号</span>
    </Header>
    <div class="upcell_bot">
      <p>更换手机号，下次登录可使用新手机号登录</p>
      <ul>
        <li>
          <p>
            <input type="text" v-model="Moble_phone" max-length="11" @change="update">
            <small></small>
          </p>
        </li>
        <li>
          <p>
            <input type="text" v-model="verify" maxlength="4">
            <input
              type="text"
              :disabled="diable"
              readonly
              href="javascript:;"
              @click="verifica()"
              v-model="count"
            >
          </p>
        </li>
      </ul>
      <button @click="verify_change">确认更换</button>
    </div>
  </div>
</template>

<script>
import Header from "../../component/header";
import { MessageBox } from "mint-ui";
import { Api } from "../../../APi/WEBMb/index.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      usertoken: "", // 用户信息
      Moble_phone: "", // 手机展示号
      phone: "", // 真实手机号
      verify: "", // 验证码输入
      count: "发送验证码", //倒计时
      diable: false // 禁止重复点击发送验证码
    };
  },

  components: {
    Header
  },

  created() {
    this.phone = this.$route.query.phone;
    this.Moble_phone = this.phone.substr(0, 3) + "****" + this.phone.substr(7);
  },

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
              this.$Message.success({
                content: "发送成功"
              });
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
    // 更改手机号
    update() {
      this.phone = this.Moble_phone;
      this.Moble_phone =
        this.phone.substr(0, 3) + "****" + this.phone.substr(7);
    },
    // 确认更换
    verify_change() {
      if (this.verify != "") {
        MessageBox.confirm("确定更换手机号?")
          .then(action => {
            Api.Mobile_verification({
              mobile: this.phone,
              code: this.verify
            }).then(res => {
              if (res.data.status == 1) {
                Api.Mobile_Son_info({
                  mobile: this.phone,
                  code: this.verify,
                  type: 2
                }).then(res => {
                  if (res.data.status == 1) {
                    this.$Message.success({
                      content: res.data.message
                    });
                    setTimeout(this.$router.push("/Soncenter")(), 500);
                  } else {
                    this.$Message.info({
                      content: res.data.message
                    });
                  }
                });
              } else {
                this.$Message.info({
                  content: res.data.message
                });
              }
            });
          })
          .catch(err => {});
      } else {
        this.$Message.info({
          content: "请输入验证码"
        });
      }
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
.upcell_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.upcell_bot {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 0.625rem 0.8125rem;
  box-sizing: border-box;
}
.upcell_bot > p {
  color: #999;
  font-size: 0.75rem;
  text-align: left;
  line-height: 2rem;
}
.upcell_bot ul {
  width: 100%;
  height: auto;
  max-height: 20rem;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar {
  display: none;
}
.upcell_bot ul li {
  margin: 0 auto 0.25rem;
  border-bottom: 0.0625rem solid #ccc;
}
.upcell_bot ul li p {
  width: 100%;
  height: 2.8125rem;
  line-height: 2.8125rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.upcell_bot ul li p input {
  color: #333;
  flex: 1;
  font-size: 0.875rem;
}
.upcell_bot ul li:last-of-type p input:last-of-type {
  width: 5.625rem;
  height: 1.875rem;
  background: linear-gradient(#c4a46c, #dbc18c);
  color: white;
  font-size: 0.75rem;
  flex: unset;
  text-align: center;
  border-radius: 0.9375rem;
}
.upcell_bot > button {
  width: 100%;
  text-align: center;
  margin-top: 2.375rem;
  height: 2.5625rem;
  line-height: 2.5625rem;
  background: linear-gradient(to right, #c5a46d, #d9bd87);
  color: white;
  font-size: 0.875rem;
  letter-spacing: 0.1rem;
  border-radius: 0.3125rem;
}
</style>
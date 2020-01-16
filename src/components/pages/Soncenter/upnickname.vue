<template>
  <div class="Nickname_cont">
    <Header :show="1">
      <span slot="top_text">修改呢称</span>
    </Header>
    <div class="Nickname_bot">
      <ul>
        <li>
          <p>
            <input type="text" v-model="nicheng">
            <small></small>
          </p>
        </li>
      </ul>
      <button @click="confirm_update">确定</button>
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
      nicheng: "" // 用户昵称
    };
  },

  components: {
    Header
  },

  computed: {},

  created() {
    this.datainfo();
  },

  beforeMount() {},

  mounted() {},

  methods: {
    datainfo() {
      Api.Mobile_Soncenter({})
        .then(res => {
          if (res.data.status == 1) {
            this.userinfo = res.data.result.info;
            this.nicheng = this.userinfo.nickname;
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    confirm_update() {
      if (this.nicheng == this.userinfo.nickname) {
        this.$Message.info("您好，用户昵称未改动！");
      } else {
        Api.Mobile_Son_info({
          nickname: this.nicheng,
          type: 1
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
      }
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
.Nickname_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.Nickname_bot {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  padding: 0.625rem 0.8125rem;
  box-sizing: border-box;
}
.Nickname_bot ul {
  width: 100%;
  height: auto;
  max-height: 20rem;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar {
  display: none;
}
.Nickname_bot ul li {
  border-bottom: 0.0625rem solid #ccc;
}
.Nickname_bot ul li p {
  width: 100%;
  height: 2.8125rem;
  line-height: 2.8125rem;
  position: relative;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Nickname_bot ul li p input {
  color: #333;
  font-size: 0.875rem;
}
.Nickname_bot > button {
  width: 100%;
  text-align: center;
  margin-top: 2.375rem;
  height: 2.5625rem;
  line-height: 2.5625rem;
  background: linear-gradient(to right, #c5a46d, #d9bd87);
  color: white;
  font-size: 0.875rem;
  border-radius: 0.3125rem;
}
@media all and (min-height: 600px) {
  .Nickname_bot ul {
    max-height: 30rem;
  }
}
@media all and (max-width: 425px) and (min-width: 376px) {
  .Nickname_bot ul {
    max-height: 33rem;
  }
}
@media all and (min-height: 750px) {
  .Nickname_bot ul {
    max-height: 40rem;
  }
}
</style>
<template>
  <div class="Draw_cont">
    <Header :show="1">
      <span slot="top_text">提现明细</span>
    </Header>
    <div class="Draw_bot">
      <div class="Draw_bot_top">
        <a href="javascript:;">去赚更多</a>
      </div>
      <div class="Draw_bot_bot">
        <h4>提现明细</h4>
        <ul v-if="infos!=''">
          <li v-for="(item,index) in infos" :key="index">
            <div>
              <img v-if="item.applytype==0" class="card" src="../../../../static/images/Redpack/pack12.png" alt>
              <img v-else-if="item.applytype==1" class="card" src="../../../../static/images/Redpack/pack10.png" alt>
            </div>
            <div>
              <div>
                <small>提现到{{item.typestr}}</small>
                <p>{{item.createtime}}</p>
              </div>
              <span>-{{item.realmoney}}</span>
            </div>
          </li>
          <!-- <li>
            <div>
              <img src="../../../../static/images/Redpack/pack10.png" alt>
            </div>
            <div>
              <div>
                <small>猪，你的鼻子有两个孔!</small>
                <p>2018-10-10&nbsp;00:32</p>
              </div>
              <span>+3500</span>
            </div>
          </li> -->
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
import Header from "../../component/header";
import { Api } from "../../../APi/WEBMb/index.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      infos:[], // 提现明细列表
      Withdraw:''
    };
  },

  components: {
    Header
  },

  computed: {},

  created() {
    this.infolist();
  },

  mounted() {},

  methods: {
    infolist() {
      Api.Mobile_Draw_Detail({}).then(res => {
        // console.log("22222",res)
        if (res.data.status == 1) {
          this.infos = res.data.result.list;
        }
      });
    }
  },
  beforeRouteLeave(to, from, next) {
    if (to.name == "redpack") {
      to.meta.isUseCache = false;
    }
    next();
  },

  watch: {}
};
</script>
<style lang='' scoped>
.Draw_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.Draw_bot {
  position: absolute;
  top: 2.75rem;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar {
  display: none;
}
.Draw_bot_top {
  width: 100%;
  height: 11.0625rem;
  background: url(../../../../static/images/Redpack/pack9.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.Draw_bot_top a {
  position: absolute;
  display: block;
  width: 5.25rem;
  height: 1.5rem;
  line-height: 1.5rem;
  color: white;
  font-size: 0.875rem;
  text-align: center;
  left: 50%;
  transform: translateX(-2.625rem);
  top: 5.1875rem;
  background: url(../../../../static/images/Redpack/pack14.png) no-repeat;
  background-size: 100% 100%;
}
.Draw_bot_bot {
  width: 92%;
  height: auto;
  margin: -2.875rem auto 0rem;
  background: white;
  border-radius: 0.3125rem;
  position: relative;
  z-index: 22;
}
.Draw_bot_bot h4 {
  height: 2.8075rem;
  line-height: 2.8075rem;
  font-size: 1rem;
  color: #333;
  text-align: left;
  padding-left: 1.375rem;
  box-sizing: border-box;
  letter-spacing: 0.0625rem;
  border-bottom: 0.0625rem solid #e8e8e8;
}
.Draw_bot_bot ul {
  width: 100%;
  height: auto;
}
.Draw_bot_bot ul li {
  width: 100%;
  height: 3.5rem;
  position: relative;
  /* height: 3.4375rem; */
  /* border-bottom: .0625rem solid #e8e8e8; */
}
.Draw_bot_bot ul li > div:first-of-type {
  width: 3.875rem;
  height: 100%;
  float: left;
  position: relative;
}
.Draw_bot_bot ul li > div:first-of-type img {
  height: 1.875rem;
  width: 1.875rem;
  position: absolute;
  right: 0.625rem;
  top: 50%;
  transform: translateY(-0.9375rem);
}
.Draw_bot_bot ul li > div:first-of-type img.card {
  width: 2.1875rem;
  height: unset;
}
.Draw_bot_bot ul li > div:last-of-type {
  position: absolute;
  right: 0;
  left: 3.875rem;
  height: 3.4375rem;
  border-bottom: 0.0625rem solid #e8e8e8;
  display: flex;
  padding-right: 1.3125rem;
  box-sizing: border-box;
  justify-content: space-between;
  align-items: center;
}
.Draw_bot_bot ul li > div:last-of-type div {
  text-align: left;
}
.Draw_bot_bot ul li > div:last-of-type div small {
  color: #666666;
  font-size: 0.875rem;
}
.Draw_bot_bot ul li > div:last-of-type div p {
  color: #999;
  font-size: 0.75rem;
  line-height: 1rem;
}
.Draw_bot_bot ul li > div:last-of-type span {
  color: #ff5c54;
  font-size: 0.875rem;
}
</style>
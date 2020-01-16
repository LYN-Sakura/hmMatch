<template>
  <div class="pack_cont">
    <Header :show="1">
      <span slot="top_text">红包</span>
    </Header>
    <div class="pack_bot">
      <div class="pack_user clearfix">
        <img v-if="redpack.avatar!=''" v-lazy="redpack.avatar" alt>
        <img
          v-else
          src="https://ss1.bdstatic.com/70cFuXSh_Q1YnxGkpoWK1HF6hhy/it/u=3345170949,877478330&fm=200&gp=0.jpg"
          alt
        >
        <div>
          <h4>{{redpack.name}}</h4>
          <span>推荐人：{{redpack.agentname}}</span>
        </div>
        <span></span>
      </div>
      <div class="pack_card">
        <div class="bigcard">
          <p>可提现奖励(元)</p>
          <h3>{{redpack.credit}}</h3>
          <p>
            累计提现(元)
            <span>{{redpack.apply}}</span>
          </p>
          <img @click="draw()" src="../../../../static/images/Redpack/pack4.png" alt>
        </div>
        <ul>
          <li>
            <router-link to="/recommen">
              <div>
                <h2>推荐奖励</h2>
                <p>推荐好友领好礼</p>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/drawdepose">
              <div>
                <h2>提现明细</h2>
                <p>交易尽在掌握</p>
              </div>
            </router-link>
          </li>
          <li>
            <router-link to="/friend">
              <div>
                <h2>我的好友</h2>
                <p>好礼领不停</p>
              </div>
            </router-link>
          </li>
          <li>
            <a :href="'tel:'+tel">
              <div>
                  <h2>联系客服</h2>
                  <p>疑惑点这里</p>
              </div>
            </a>
          </li>
        </ul>
      </div>
      <router-view/>
    </div>
    <div class="footer">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import { Api } from "../../../APi/WEBMb/index.js";
import Header from "../../component/header";
import Tabbar from "../../component/Tabbar";
export default {
  name: "",
  props: [""],
  data() {
    return {
      redpack: {}, // 数据信息
      tel:''
    };
  },

  components: {
    Header,
    Tabbar
  },

  computed: {},

  activated() {
    if (this.$route.meta.isUseCache) {
      // 判断路由信息中isUseCache是否为真，为true时刷新数据，为false时不刷新数据
      this.redpack = []; // 清空原有数据
      this.datainfo(); // 这是我们获取数据的函数
      this.$route.meta.isUseCache = true; // 前进这个页面的话，将isUseCache改为true，若后退到这个页面的话，在后退的那个页面中添加beforeRouteLeave (to, from, next)钩子函数，判断进入页面是否为本页面，若为真，则将isUseCache改为false，这样isUseCache的值，就可以灵活更改，且进入本页面中进入else使用缓存数据
    } else {
        
    }
  },
  beforeMount() {},

  mounted() {},

  methods: {
    draw() {
      this.$router.push("/Drawmoney");
    },
    datainfo() {
      Api.Mobile_Com_center({}).then(res => {
        // console.log('红包',res)
        if (res.data.status == 1) {
          this.redpack = res.data.result.info;
          this.tel=res.data.result.tel;
          for (const key in this.redpack) {
            if (key == "apply" || key == "credit"|| key == "total") {
              this.redpack[key] = parseInt(this.redpack[key]).toFixed(2);
            }
          }
        }
      });
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
.pack_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.pack_bot {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 3rem;
  padding: 0rem 0.75rem 1rem;
  box-sizing: border-box;
  margin: auto;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar {
  display: none;
}
.pack_user {
  width: 100%;
  height: 3rem;
  margin: 0.6875rem 0rem;
}
.pack_user > img {
  float: left;
  width: 3rem;
  height: 3rem;
  border-radius: 50%;
}
.pack_user > div {
  float: left;
  margin-left: 0.75rem;
  text-align: left;
}
.pack_user > div h4 {
  color: #333;
  font-size: 0.9375rem;
  margin: 0.25rem 0rem;
}
.pack_user > div span {
  color: #999;
  font-size: 0.75rem;
}
.pack_user > span {
  float: right;
  display: block;
  width: 1rem;
  height: 100%;
  background: url(../../../../static/images/Redpack/pack2.png) center no-repeat;
  background-size: 0.4375rem 0.8125rem;
}
.pack_card {
  width: 100%;
  height: auto;
}
.bigcard {
  width: 100%;
  height: 8.25rem;
  background: url(../../../../static/images/Redpack/pack3.png) no-repeat;
  background-size: 100% 100%;
  border-radius: 0.3125rem;
  padding: 1.4375rem 1.625rem;
  box-sizing: border-box;
  text-align: left;
  color: white;
  font-size: 0.8125rem;
  position: relative;
}
.bigcard h3 {
  margin: 0.4rem auto 0.8rem;
  font-size: 2.25rem;
}
.bigcard img {
  position: absolute;
  right: -0.25rem;
  top: 2.5rem;
  width: 6.125rem;
}
.pack_card ul {
  width: 100%;
  height: auto;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
}

.pack_card ul li:nth-child(1) {
  background: url(../../../../static/images/Redpack/pack5.png) no-repeat;
  background-size: 100% 100%;
}
.pack_card ul li:nth-child(2) {
  background: url(../../../../static/images/Redpack/pack6.png) no-repeat;
  background-size: 100% 100%;
}
.pack_card ul li:nth-child(3) {
  background: url(../../../../static/images/Redpack/pack1.png) no-repeat;
  background-size: 100% 100%;
}
.pack_card ul li:nth-child(4) {
  background: url(../../../../static/images/Redpack/pack7.png) no-repeat;
  background-size: 100% 100%;
}
.pack_card ul li {
  width: 48%;
  height: 5.875rem;
  box-sizing: border-box;
  border-radius: 0.3125rem;
  margin: 0.75rem 0px 0px;
  text-align: left;
}
.pack_card ul li a {
  color: white;
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 1.0625rem 1rem;
}
.pack_card ul li h2 {
  font-size: 1.125rem;
}
.pack_card ul li p {
  font-size: 0.6875rem;
  line-height: 2rem;
}
</style>
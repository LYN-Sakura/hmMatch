<template>
  <div class="commen_cont">
    <Header :show="1">
      <span slot="top_text">推荐奖励</span>
    </Header>
    <div class="commen_bot">
      <div class="commen_bot_top">
        <a href="javascript:;">去赚更多</a>
      </div>
      <div class="commen_bot_bot">
        <h4>奖励明细</h4>
        <ul v-if="infoList!=''">
          <li v-for="(item,index) in infoList" :key="index">
            <div>
              <img :src="item.avatar" alt>
            </div>
            <div>
              <div>
                <small>{{item.realname}}</small>
                <p>{{item.createtime}}</p>
              </div>
              <span>+{{item.money}}</span>
            </div>
          </li>
          <!-- <li>
            <div>
              <img src="http://img5.imgtn.bdimg.com/it/u=139349211,2867042474&fm=26&gp=0.jpg" alt>
            </div>
            <div>
              <div>
                <small>猪，你的鼻子有两个孔!</small>
                <p>2018-10-10</p>
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
import { Api } from "../../../APi/WEBMb/index.js";
import Header from "../../component/header";
export default {
  name: "",
  props: [""],
  data() {
    return {
      infoList: [], // 列表信息
      limit: 10, // 数据限制条数
      page: 1 // 当前页
    };
  },

  components: {
    Header
  },

  computed: {},

  created() {
    this.datainfo();
  },

  mounted() {},

  methods: {
    datainfo() {
      Api.Mobile_Com_award({
        limit: this.limit,
        page: this.page
      }).then(res => {
        // console.log("推荐奖励",res)
        if (res.data.status == 1) {
          this.infoList = res.data.result.info;
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
.commen_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.commen_bot {
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
.commen_bot_top {
  width: 100%;
  height: 11.0625rem;
  background: url(../../../../static/images/Redpack/pack8.png) no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.commen_bot_top a {
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
  background: url(../../../../static/images/Redpack/pack13.png) no-repeat;
  background-size: 100% 100%;
}
.commen_bot_bot {
  width: 92%;
  height: auto;
  margin: -2.875rem auto 0rem;
  background: white;
  border-radius: 0.3125rem;
  position: relative;
  z-index: 22;
}
.commen_bot_bot h4 {
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
.commen_bot_bot ul {
  width: 100%;
  height: auto;
}
.commen_bot_bot ul li {
  width: 100%;
  height: 3.5rem;
  position: relative;
  /* height: 3.4375rem; */
  /* border-bottom: .0625rem solid #e8e8e8; */
}
.commen_bot_bot ul li > div:first-of-type {
  width: 3.875rem;
  height: 100%;
  float: left;
  position: relative;
}
.commen_bot_bot ul li > div:first-of-type img {
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
  position: absolute;
  right: 0.625rem;
  top: 40%;
  transform: translateY(-0.9375rem);
}
.commen_bot_bot ul li > div:last-of-type {
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
.commen_bot_bot ul li > div:last-of-type div {
  text-align: left;
}
.commen_bot_bot ul li > div:last-of-type div small {
  color: #666666;
  font-size: 0.875rem;
}
.commen_bot_bot ul li > div:last-of-type div p {
  color: #999;
  font-size: 0.75rem;
  line-height: 1rem;
}
.commen_bot_bot ul li > div:last-of-type span {
  color: #ff5c54;
  font-size: 0.875rem;
}
</style>
<template>
  <div class="subcp_cont">
    <div class="subcp_card clearfix" @click="getfavo(favoid)">
      <div class="subcp_left">
        <slot name="thumb"></slot>
        <p>优惠券总价值：</p>
        <slot name="money"></slot>
      </div>
      <div class="subcp_mid">
        <slot name="title"></slot>
        <p>优惠包含：</p>
        <slot name="content"></slot>
        <slot name="endtime"></slot>
      </div>
      <div class="subcp_rig">
        <slot name="getstatus"></slot>
      </div>
    </div>
    <div class="sub_enter" @click="getActive(activeId)">
      <slot name="atitle"></slot>
      <a class="clearfix" href="javascript:;">
        <span>前往活动</span>
        <i></i>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "",
  props: ["favoid","activeId"],
  data() {
    return {};
  },

  components: {},

  computed: {},

  created() {},

  beforeMount() {},

  mounted() {
    
  },

  methods: {
    // 领取优惠券
    getfavo(pid){
      // console.log('优惠券1111',pid)
      this.$emit('goDetail',pid);
    },
    // 前往活动详情
    getActive(pid){
      this.$emit('goActive',pid);
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
.subcp_cont {
  width: 100%;
  height: 10.75rem;
  padding-top: .9375rem;
  color: white;
}
.subcp_card {
  width: 100%;
  height: 7.5rem;
  background: url(../../../static/images/Redpack/coupon4.png) no-repeat;
  background-size: 100% 100%;
}
.subcp_left {
  width: 30.7%;
  height: 100%;
  float: left;
}
.subcp_left img {
  width: 3.0625rem;
  height: 3.0625rem;
  border: 0.0625rem solid white;
  border-radius: 50%;
  margin: 0.75rem auto 0rem;
}
.subcp_left p {
  font-size: 0.75rem;
}
.subcp_left h2 {
  font-size: 2.1875rem;
}
.subcp_left h2 i {
  font-style: normal;
  font-size: 1.3125rem;
}
.subcp_mid {
  width: 55%;
  height: 100%;
  float: left;
  text-align: left;
  padding: 1.0625rem 0.5625rem 0.9375rem 0.625rem;
  box-sizing: border-box;
}
.subcp_mid h5 {
  font-size: 0.9375rem;
  margin-bottom: 0.5rem;
}
.subcp_mid p {
  font-size: 0.75rem;
  line-height: 0.9rem;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}
.subcp_mid p:last-of-type{height: 1.8rem;}
.subcp_mid small {
  font-size: 0.6875rem;
  color: #e5ceb3;
  margin-top: 0.5rem;
  display: block;
}
.subcp_rig {
  width: 14.3%;
  height: 100%;
  float: right;
  position: relative;
}
.subcp_rig p {
  width: 1rem;
  height: 4rem;
  position: absolute;
  top: 50%;
  left: 50%;
  font-size: 0.9375rem;
  transform: translate(-0.5rem, -2rem);
  text-align: center;
  /* writing-mode: vertical-lr;从左向右 从右向左是 writing-mode: vertical-rl;*/
  /* writing-mode: tb-lr;IE浏览器的从左向右 从右向左是 writing-mode: tb-rl；*/
}
.sub_enter {
  width: 100%;
  height: 2.3125rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.sub_enter p {
  flex: 3.5;
  color: #565656;
  text-align: left;
  font-size: 0.9375rem;
}
.sub_enter a {
  flex: 1.5;
  font-size: 0.8125rem;
  color: #ae8339;
  text-indent: 1rem;
}
.sub_enter a span {
  float: left;
}
.sub_enter a i {
  display: block;
  width: 0.625rem;
  height: 0.75rem;
  background: url(../../../static/images/Redpack/coupon1.png) center no-repeat;
  background-size: 100% 100%;
  float: right;
  margin-right: 0.5rem;
}
</style>
<template>
  <div class="pay_status">
    <Header :show='1'>
        <span slot="top_text">{{payText}}</span>
    </Header>
    <div class="pay_bot">
        <img src="../../../static/images/payment/paystatus1.png" alt="">
        <!-- ~(^o^)~成功 -->
        <div v-show="status">
            <img src="../../../static/images/payment/paystatus2.png" alt="">
            <h2>{{payText}}</h2>
            <p>专享优惠券已自动发放至个人账户</p>
            <a href="javascript:;" @click.prevent="lookCoupon">查看我的优惠券</a>
        </div>
        <!-- ~(^o^)~失败-->
        <div v-show="!status">
            <img src="../../../static/images/payment/paystatus4.png" alt="">
            <h2>{{payText}}</h2>
            <p>很抱歉！订单支付失败啦~</p>
            <a href="javascript:;" @click.prevent="goIndex">返回首页</a>
        </div>
    </div>
  </div>
</template>

<script>
import Header from '../component/header'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          status:false,    // 支付状态
          payText:'',     //支付成功失败文字
      };
    },
    methods: {
        lookCoupon(){
            this.$router.push("/discoupon")
        },
        goIndex(){
            this.$router.push("/mobile_index")
        }
    },
    components: {
        Header
    },

    computed: {},

    created() {
        this.status = this.$route.query.status;
        if(this.status==1){
            this.status = true;
            this.payText= "支付成功"
        }else{
            this.status = false;
            this.payText= "支付失败"
        }
    },

    mounted() {},

    watch: {}

  }

</script>
<style lang='' scoped>
.pay_status{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
.pay_bot{
    position: absolute;
    top: 2.75rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
.pay_bot>img{
    width: 100%;
}
.pay_bot>div{
    margin: 1rem auto 0px;
    width: 100%;
}
.pay_bot>div img{
    height: 7.8125rem;
}
.pay_bot>div h2{
    margin: 1.1875rem auto .6875rem;
    color: #B7975E;
    font-size: 1.75rem;
}
.pay_bot>div p{
    font-size: .8125rem;
    color: #999;
}
.pay_bot>div a{
    display: inline-block;
    height: 3.1875rem;
    width: 14.125rem;
    line-height: 3.1875rem;
    text-align: center;
    background: linear-gradient(to right,#D0AF6A,#E2C17C);
    border-radius: 1.5625rem;
    color: white;
    font-size: 1.0625rem;
    letter-spacing: .0625rem;
    margin: 2.9375rem auto 0rem;
    box-shadow: 0px 0rem .1875rem rgba(193, 148, 61, 0.6);
}
</style>
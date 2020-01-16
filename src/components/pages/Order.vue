<template>
  <div class="Order_cont">
    <Header :show="1">
      <span slot="top_text">支付成功</span>
    </Header>
    <div class="Order_bot">
      <div class="Order_bot_top">
        <h3>{{Orderinfo.atitle}}</h3>
        <div>
          <h3>{{Orderinfo.title}}</h3>
          <p>吃喝玩乐学&nbsp;一卡在手&nbsp;畅想我有</p>
          <div>
            <!-- <span>查看详情</span> -->
            <small>￥{{Orderinfo.price}}/张</small>
          </div>
        </div>
        <ul>
          <li>
            <p>
              <span>姓名</span>
              <input type="text" placeholder="请输入用户名" v-model="username">
            </p>
          </li>
          <li>
            <p>
              <span>手机号</span>
              <input
                oninput="value=value.replace(/[^\d]/g,'')"
                type="text"
                placeholder="请输入手机号"
                v-model="user_mobile"
              >
            </p>
          </li>
          <li>
            <p>
              <span>数量</span>
              <input type="text" value="1" disabled>
            </p>
          </li>
          <li>
            <p>
              <span>邀请码</span>
              <input type="text" placeholder="请输入邀请码(选填)" v-model="invite_code">
            </p>
          </li>
        </ul>
      </div>
      <div class="Order_bot_bot">
        <span>￥{{Orderinfo.price}}</span>
        <button @click.prevent="creatOrder">确认订单</button>
      </div>
    </div>
  </div>
</template>

<script>
import { Api } from "../../APi/WEBMb/index.js";
import Header from "../component/header";
export default {
  props: [],
  data() {
    return {
      Orderinfo:{}, // 订单信息
      goodsId: "1", // 商品Id
      OrderID: "", // 订单编号
      username: "", // 用户名
      user_mobile: "", // 用户手机号
      invite_code: "" // 邀请码
    };
  },

  components: {
    Header
  },

  computed: {},

  created() {
      // this.goodsId = this.$route.query.pid;
      if(this.goodsId){
        this.getinfo(this.goodsId)
      }
  },

  methods: {
    // 得到免单卡信息
    getinfo(goodsid){
      console.log(goodsid)
      Api.Mobile_Sub_detail({
        goodsid:goodsid
      }).then(res=>{
        if(res.data.status==1){
          this.Orderinfo = res.data.result;
        }else{
          this.$Message.info({
            content:res.data.message
          })
        }
      })
    },
    // 创建订单
    creatOrder() {
      if (/^[1][1,3,4,5,6,7,8,9][0-9]{9}$/gi.test(this.user_mobile)) {
        Api.Mobile_Order_create({
          goodsid: this.goodsId,
          goodsnum: 1,
          realname: this.username,
          mobile: this.user_mobile,
          code: this.invite_code
        }).then(res => {
          
            this.$router.push({
              path:'/paymentway',
              query:{
                // Ordercard:res.data.result.ordersn,
                Ordercard:"SH20190424093722119433",
                price:"20",
                createTime:"2019-04-24 09:37",
                // price:res.data.result.price,
                // createTime:res.data.result.createtime
              }

          // if (res.data.status == 1) {
          //   this.$Message.success({
          //     content: res.data.message
          //   });
          //   this.$router.push({
          //     path:'/paymentway',
          //     query:{
          //       Ordercard:res.data.result.ordersn,
          //       price:res.data.result.price,
          //       createTime:res.data.result.createtime
          //     }
          //   });
          // } else {
          //   this.$Message.info({
          //     content: res.data.message
          //   });
          })
        });
      } else {
          this.$Message.error({
            content:'手机号格式错误!'
          })
      }
    },
    
  },

  watch: {}
};
</script>
<style lang='' scoped>
.Order_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.Order_bot {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.Order_bot_top {
  position: absolute;
  top: 0;
  bottom: 3.0625rem;
  left: 0;
  right: 0;
  margin: auto;
  padding: 1.0625rem 0.5rem;
  box-sizing: border-box;
  overflow: scroll;
  text-align: left;
  -webkit-overflow-scrolling: touch;
}
.Order_bot_top > h3 {
  color: #333333;
  font-size: 1.0625rem;
  height: 1.0625rem;
}
.Order_bot_top > div {
  width: 22.4375rem;
  height: 9.4375rem;
  background: url(../../../static/images/Scenter/scenter14.png) no-repeat;
  background-size: 100% 100%;
  padding: 1.9375rem 1.75rem 1.9375rem 1.93745rem;
  box-sizing: border-box;
}
.Order_bot_top > div > h3 {
  color: #ffffff;
  font-size: 1.125rem;
  height: 1.0625rem;
}
.Order_bot_top > div > p {
  color: white;
  font-size: 0.75rem;
  margin: 0.75rem auto 1.375rem;
}
.Order_bot_top > div > div {
  width: 100%;
  height: 1.375rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.Order_bot_top > div > div span {
  display: inline-block;
  height: 1.3025rem;
  width: 4rem;
  text-align: center;
  line-height: 1.3025rem;
  border: 0.0625rem solid white;
  border-radius: 0.6875rem;
  color: white;
  font-size: 0.75rem;
}
.Order_bot_top > div > div small {
  color: #ffffff;
  font-size: 1.125rem;
}
.Order_bot_top ul {
  width: 100%;
  height: auto;
}
.Order_bot_top ul li p {
  width: 100%;
  display: flex;
  height: 2.75rem;
  border-bottom: 0.0625rem solid #e8e8e8;
  justify-content: space-between;
}
.Order_bot_top ul li span {
  display: inline-block;
  flex: 1;
  height: 2.75rem;
  line-height: 2.75rem;
  text-align: left;
  color: #999999;
  font-size: 0.9375rem;
}
.Order_bot_top ul li input {
  flex: 5;
  color: #333333;
  background-color: white;
  font-size: 0.9375rem;
}
.Order_bot_bot {
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 3.0625rem;
  line-height: 3.0625rem;
  display: flex;
  justify-content: space-between;
}
.Order_bot_bot span {
  flex: 2;
  background: rgba(51, 51, 51, 1);
  font-size: 1.125rem;
  color: #e2b870;
  text-align: left;
  text-indent: 1rem;
}
.Order_bot_bot button {
  flex: 1;
  background: linear-gradient(to right, #d7bc85, #d7b172);
  color: white;
  font-size: 1rem;
  letter-spacing: 0.0625rem;
}
</style>
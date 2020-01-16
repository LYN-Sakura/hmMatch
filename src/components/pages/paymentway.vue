<template>
  <div class="cont_pay" id="cont_pay">
    <Header :show="1">
      <span slot="top_text">付款方式</span>
    </Header>
    <div class="pay_cont">
      <div>
        <h4>订单信息</h4>
        <ul>
          <li>
            <p>
              <span>订单编号</span>
              <small>{{Ordersn}}</small>
            </p>
          </li>
          <li>
            <p>
              <span>创建时间</span>
              <small>{{Ordertime}}</small>
            </p>
          </li>
          <li>
            <p>
              <span>
                订单金额
                <i>￥{{Orderprice}}</i>
              </span>
            </p>
          </li>
        </ul>
      </div>
      <div>
        <h4>付款方式</h4>
        <ul class="way_pay">
          <li v-for="(item,index) in way" :key="index">
            <p>
              <img :src="item.img" alt>
              <span>{{item.txt}}</span>
              <input
                type="checkbox"
                name="sex"
                :code="item.pid"
                :checked="item.bol==1?true:false"
                :id="`xx`+index"
              >
              <label :for="`xx`+index" @click.stop="chioce(index)"></label>
            </p>
          </li>
        </ul>
      </div>
      <button @click.prevent="pay()">立即支付</button>
    </div>
    <!-- <div v-html="disce"></div> -->
  </div>
</template>

<script>
import wx from 'weixin-js-sdk' 
import Header from "../component/header";
import { Api } from "../../APi/WEBMb";
export default {
  name: "",
  props: [""],
  data() {
    return {
      token:sessionStorage.getItem("ms_token"),
      code: "", // 支付类型
      user: "", // 用户信息
      Ordersn: "", // 订单编号
      Ordertime: "", // 创建时间
      Orderprice: "", // 订单价格
      appId:'',
      nonceStr:'',
      package:"",
      paySign:"",
      signType:'',
      timeStamp:'',
      way: [
        {
          txt: "支付宝支付",
          img: "../../../static/images/payment/pay_icon9.png",
          bol: 0,
          pid: 1
        },
        {
          txt: "微信支付",
          img: "../../../static/images/payment/pay_icon5.png",
          bol: 0,
          pid: 2
        },
        {
          txt: "余额支付",
          img: "../../../static/images/payment/pay_icon8.png",
          bol: 1,
          pid: 5
        }
      ],
      mes: ""
    };
  },

  components: {
    Header
  },

  computed: {},

  created() {
    this.Ordersn = this.$route.query.Ordercard;
    this.Ordertime = this.$route.query.createTime;
    this.Orderprice = this.$route.query.price;
    console.log("支付宝参数",this.Ordersn)
  },

  beforeMount() {},

  mounted() {},

  methods: {
    chioce: function(pid) {
      this.way.forEach(element => {
        element.bol = 0;
      });
      this.way[pid].bol = 1;
    },
    // 微信h5支付
    onBridgeReady(){
        let that = this
        WeixinJSBridge.invoke(
            'getBrandWCPayRequest', {
                "appId":that.appId,     //公众号名称，由商户传入     
                "timeStamp":that.timeStamp,         //时间戳，自1970年以来的秒数     
                "nonceStr":that.nonceStr, //随机串     
                "package":that.package,     
                "signType":that.signType,         //微信签名方式：     
                "paySign":that.paySign //微信签名 
                
            },
            function(res){
            if(res.err_msg == "get_brand_wcpay_request:ok" ){
                // 使用以上方式判断前端返回,微信团队郑重提示：
                //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                that.$router.push('/paywait?ordersn='+ that.Ordersn) 
            } else{
                that.$router.push('/paywait?ordersn='+that.Ordersn)
            }
        }); 
    },
    // 支付状态
    pay() {
      let params = {
        ordersn: this.Ordersn,
        paytype: "",
        return_url: "",
        code: ""
      };
      this.way.forEach(el => {
        if (el.bol == 1) {
          // 选中状态
          if (el.pid == 5) {
            // 余额支付
            params.paytype = el.pid;
            Api.Mobile_Order_pay(params).then(res => {
              //console.log("余额支付",res)
              if(res.data.status=="1"){
                this.$Message.success({
                  content:res.data.message
                });
              }else{
                //console.log("余额支付","res")
                this.$Message.info({
                  content:res.data.message
                });
              }
              this.$router.push({
                path:'/paystatus',
                query:{
                  status:res.data.status
                }
              });
            });
          } else if (el.pid == 1) {
            // 支付宝支付
            let hturl =
              Api.baseurl +"#/paywait?ordersn=" +this.Ordersn +"&token=" +this.token;
                  // ordersn	字符串	必填	-	-	需支付订单号
                  // paytype	字符串	必填	-	-	支付方式1-支付宝2-微信app3-H5|公众号支付4-微信小程序支付5-余额
                  // return_url	字符串	非必填	-	-	支付回跳地址
                  // code	字符串	非必填	-	-	小程序支付必填
            let params={ 
              ordersn:this.Ordersn,
              paytype:el.pid,
              return_url:hturl,
            };
            // console.log('支付宝支付',hturl)
            Api.Mobile_Order_pay(params).then(res => {
              // console.log('支付宝支付',res)
              if (res.data.status == 1) {
                window.location.href = Api.baseurl + "mobile/index/alipay?ordersn=" + this.Ordersn;
              } else {
                this.$Message.info({
                  content: res.data.message
                });
              }
            });
          } else {
            console.log('进微信支付')
            let that=this
            // 微信支付
            let ua = window.navigator.userAgent.toLowerCase();
            if (ua.match(/MicroMessenger/i) == "micromessenger") {
              //判断是否是微信环境
              //微信环境
              wx.miniProgram.getEnv(function(res) {
                if (res.miniprogram) {
                  // 小程序环境下逻辑
                  // wx.miniProgram.navigateTo({
                  //   url:
                  //     "/pages/pay/pay?ordersn=" +
                  //     that.Ordersn +
                  //     "&token=" +
                  //     that.token
                  // });
                  this.$Message.info({
                    content: "暂未开通小程序的支付服务"
                  });
                } else {
                  console.log('进微信公众号支付')
                  console.log('this.Ordersn',that.Ordersn)
                  // this.$Message.info({
                  //   content: "暂未开通小程序外的支付服务"
                  // });
                  //非小程序环境下逻辑,读cookie，pay_openid存在否
                  let cooks = function (name) {
                      var arr;
                      var reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
                      if (arr = document.cookie.match(reg)){
                          return unescape(arr[2]);
                      }else{
                          return null;
                      }
                  };
                  let pay_openid = cooks('ov_openid');
                  let hturl =Api.baseurl +"#/paywait?ordersn=" +that.Ordersn;
                  let params={ 
                    ordersn:that.Ordersn,
                    paytype:3,
                    return_url:hturl,
                  };
                  if(pay_openid!=null){   // 存在pay_openid
                  console.log('ov_openid存在')
                      Api.Mobile_Order_pay(params).then(res=>{
                          console.log(res.data)
                          if(res.data.status==1){
                              console.log('成功')
                            var vm= that;
                            that.appId=res.data.result.wxpay.appId
                            that.nonceStr=res.data.result.wxpay.nonceStr
                            that.package=res.data.result.wxpay.package
                            that.paySign=res.data.result.wxpay.paySign
                            that.signType=res.data.result.wxpay.signType
                            that.timeStamp=res.data.result.wxpay.timeStamp
                            if (typeof WeixinJSBridge == "undefined"){
                              console.log('123')
                              if( document.addEventListener ){
                                  document.addEventListener('WeixinJSBridgeReady', vm.onBridgeReady, false);
                              }else if (document.attachEvent){
                                  document.attachEvent('WeixinJSBridgeReady', vm.onBridgeReady); 
                                  document.attachEvent('onWeixinJSBridgeReady', vm.onBridgeReady);
                              }
                          }else{
                              // console.log('执行了支付哦')
                              // console.log('appId',this.appId)
                              // console.log('timeStamp',this.timeStamp)
                              // console.log('nonceStr',this.nonceStr)
                              // console.log('package',this.package)
                              // console.log('paySign',this.paySign)
                              vm.onBridgeReady();
                          }
                          }else{
                              console.log('失败')
                          }
                      })
                  }else{  // 不存在
                      this.$Message.info({
                          content:'未读到cookie'
                      })
                  }
                }
              });
            } else {
              //非微信环境逻辑
              this.$Message.info({
                content: "请在微信浏览器中打开"
              });
            }
          }
        }
      });
    },
    
  },
  watch: {}
};
</script>
<style lang='' scoped>
.cont_pay {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.pay_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  padding: 4rem 1rem 0px;
  box-sizing: border-box;
}
.pay_cont div {
  text-align: left;
  margin-top: 0.8125rem;
}
.pay_cont div h4 {
  width: 6rem;
  color: #444444;
  font-size: 0.9375rem;
  margin-bottom: 0.5rem;
  height: 0.75rem;
  line-height: 0.75rem;
}
.pay_cont div:first-of-type ul {
  margin-top: 1rem;
}
.pay_cont div:first-of-type ul li {
  line-height: 2rem;
}
.pay_cont div:first-of-type ul li p {
  color: #999999;
}
.pay_cont div:last-of-type {
  margin-top: 3rem;
}
.pay_cont div ul li p {
  width: 100%;
  text-indent: 0.775rem;
  font-size: 0.9375rem;
  color: #333333;
  position: relative;
}
.pay_cont div ul li small {
  color: #333333;
  padding-left: 0.85rem;
  font-size: 0.9375rem;
}
.pay_cont div ul li i {
  font-style: normal;
  color: #ff5c54;
  padding-left: 0.85rem;
}
input[type="checkbox"] {
  display: none;
}
input + label {
  background-color: white;
  border: 1px solid #cecdcd;
  width: 1.125rem;
  height: 1.125rem;
  display: inline-block;
  text-align: center;
  vertical-align: middle;
  border-radius: 50%;
  position: absolute;
  right: 6%;
  top: 50%;
  transform: translateY(-0.5625rem);
}
input:checked + label {
  border: 0.0625rem solid #eeb875;
}
input:checked + label:after {
  width: 1.0625rem;
  height: 1.0625rem;
  background: url(../../../static/images/payment/pay_icon1.png) center no-repeat;
  background-size: 100% 100%;
  content: "";
  display: inline-block;
  position: absolute;
  top: 0px;
  left: 0px;
}
.way_pay li {
  line-height: 3rem;
}
.way_pay li img {
  width: 1.5rem;
  height: 1.5rem;
  margin: 0px 0.5rem;
  vertical-align: middle;
}
.pay_cont > button {
  position: absolute;
  width: 90%;
  text-align: center;
  height: 2.8125rem;
  line-height: 2.8125rem;
  border: none;
  outline: none;
  background: linear-gradient(to right, #d7bc85, #c6a56f);
  border-radius: 0.3125rem;
  color: white;
  transform: translateX(-50%);
  bottom: 1.5rem;
}
</style>
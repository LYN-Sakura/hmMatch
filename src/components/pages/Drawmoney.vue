<template>
  <div class="Draw_cont">
    <Header :show="1">
      <span slot="top_text">提现</span>
    </Header>
    <div class="draw_top">
      <span>提现金额</span>
      <p>
        <i>￥</i>
        <input
          type="text"
          placeholder="0.00"
          v-model="price"
          maxlength="15"
          @keyup="price=price.replace(/[^\d{1,}\.\d{1,}|\d{1,}]/g,'')"
          @change="updatePrice()"
        >
        <small @click.stop="Allwithdraw()">全部提现</small>
      </p>
    </div>
    <div class="procedure">
      <div class="pro_left">
        <span>手续费：</span>
        <i>￥{{service.toFixed(2)}}</i>
      </div>
      <div class="pro_rig">
        <span>可提现金额：</span>
        <i>￥{{deposit}}</i>
      </div>
    </div>
    <p>请填写需要提现的基本信息</p>
    <div class="draw_way">
      <p>
        <span>提现方式</span>
        <select name id v-model="sel">
          <option v-for="(item,index) in result.type" :key="index" :value="item.title" :label="item.title"></option>
          <!-- <option value="支付宝提现">支付宝提现</option> -->
        </select>
      </p>
      <ul v-if="sel=='提现到银行卡'">
        <li>
          <p>
            <span>开户行</span>
            <input type="text" v-model="Openbank" placeholder="请输入开户行">
          </p>
        </li>
        <li>
          <p>
            <span>银行卡号</span>
            <input
              type="text"
              v-model="bankcard"
              onkeyup="this.value =this.value.replace(/\s/g,'').replace(/[^\d]/g,'').replace(/(\d{4})(?=\d)/g,'$1 ');"
              maxlength="19"
              placeholder="请输入银行卡号"
            >
          </p>
        </li>
        <li>
          <p>
            <span>开户名</span>
            <input type="text" placeholder="请输入开户行姓名" v-model="bankname">
          </p>
        </li>
      </ul>
      <ul v-else-if="sel=='提现到支付宝'">
        <li>
          <p>
            <span>支付宝账号</span>
            <input type="text" v-model="phone" placeholder="请输入支付宝帐号">
          </p>
        </li>
        <li>
          <p>
            <span>支付宝用户名</span>
            <input type="text" placeholder="请输入支付宝帐号的用户名" v-model="username">
          </p>
        </li>
      </ul>
    </div>
    <button @click.prevent="Withdraw()">确认提现</button>
    <transition name="slide-fade">
      <div v-show="show==1" class="hint">
        <span>请输入提现金额</span>
      </div>
    </transition>
    <transition name="slide-fade">
      <div v-show="show==2" class="hint">
        <span>可提现金额不足</span>
      </div>
    </transition>
  </div>
</template>

<script>
import Header from "../component/header";
import {Api} from "../../APi/WEBMb/index.js";

export default {
  name: "",
  props: [""],
  data() {
    return {
      user: "", // 用户信息
      price: "", // 金额
      deposit: "", // 可取款
      service: 0, // 手续费
      show: 0,
      sel: "提现到银行卡",
      applytype:0,
      Openbank: "", // 银行开户行
      bankcard: "", //银行卡号
      bankname: "", // 银行开户名
      phone: "", // 支付宝手机号
      username: "", // 用户名
      
      result:{
        credit:"",//可提现金额
        applymoney:"",//已申请提现金额
        type:"",//提现方式
        bank:"",//银行列表
        lastapply:"",//最近一次的申请信息
        charge:"",//手续费费率百分比
      }
    };
  },
  methods: {
    Phonereg: function() {
      // 支付宝提现
    },
    updatePrice: function() {
      // 更改提现金额
      let money = (Number(this.result.charge) / 100) * Number(this.price);
      // this.service = (Math.floor(money * 100) / 100).toFixed(2);
      this.service = Math.floor(money * 100) / 100;
    },
    Allwithdraw: function() {
      // 全部提现
      this.price = this.result.credit;
      let money = (Number(this.result.charge) / 100) * Number(this.price);
      this.service = Math.floor(money * 100) / 100;
    },
    Withdraw: function() {
      // Withdrawid	活动ID
      // money	      提现金额
      // realname	  姓名 bankname/username
      // bankname	  银行 Openbank
      // bankcard	  卡号 bankcard
      // bankcard1	  确认卡号
      // alipay	    支付宝帐号  phone
      // alipay1	    确认支付宝帐号 
      // applytype	  提现方式(如果选0，则填写银行信息，若1，则填写支付宝账号)
      // 确认提现按钮
      if (this.price == "") {
        this.show = 1;
        setTimeout(() => {
          this.show = 0;
        }, 2000);
      } else {
        if (Number(this.price) > Number(this.deposit)) {
          this.show = 2;
          setTimeout(() => {
            this.show = 0;
          }, 2000);
        }else{
          if(this.sel=='提现到银行卡'){
            if(this.Openbank!=""&&this.bankcard!=""&&this.bankname!=""){
              //console.log("提现到银行卡",this.price,this.service,this.Openbank,this.bankcard,this.bankname,this.applytype)
              Api.Mobile_Draw_submit({
                money:this.price*1,
                bankname:this.Openbank,
                bankcard:this.bankcard,
                bankcard1:this.bankcard,
                realname:this.bankname, 
                applytype:this.applytype,
              }).then(res=>{
                  // console.log("提现到银行卡",res)
                if(res.data.status==1){
                  this.$Message.success({
                    content:res.data.message
                  })
                  this.$router.go(-1)
                }else{
                  this.$Message.error({
                    content:res.data.message
                  })
                }
              })
            }else{
              this.$Message.info("信息不够完整")
            }
          }else if(this.sel=='提现到支付宝'){
            this.applytype=1
            if(this.phone!=""&&this.username!=""){
              Api.Mobile_Draw_submit({
                money:this.price*1,
                alipay:this.phone,
                alipay1:this.phone,
                realname:this.username,
                applytype:this.applytype,
              }).then(res=>{
                  // console.log("提现到支付宝",res)
                if(res.data.status==1){
                  this.$Message.success({
                    content:res.data.message
                  })
                  this.$router.go(-1)
                }else{
                  this.$Message.error({
                    content:res.data.message
                  })
                }
              })
            }else{
              this.$Message.info("信息不够完整")
            }
          }
        }
      }
    }
  },
  components: {
    Header
  },

  computed: {},

  created() {
    this.user =localStorage.getItem("ms_userinfo");
    if(this.user != "" && this.user != undefined && this.user != null)
    Api.Mobile_Draw_info({}).then(res=>{
      if(res.data.status==1){
        // console.log("全部提现",res)
        this.result=res.data.result
        this.deposit=(Math.floor(this.result.credit* 100) / 100).toFixed(2);
      }else{
        this.$Message.error({
          content:res.data.message
        })
      }
      
    })
  },

  beforeMount() {},

  mounted() {},
  updated() {},
 

  watch: {}
};
</script>
<style lang='' scoped>
@import url(../../assets/css/Drawmoney.css);
</style>
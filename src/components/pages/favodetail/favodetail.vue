<template>
  <div class="favo_cont">
    <Header :show="1">
      <span slot="top_text">优惠券详情</span>
    </Header>
    <div class="favo_bot">
      <div class="favo_bot_box">
        <img src="../../../../static/images/payment/favo4.png" alt>
        <!-- `(^o^)`  核销状态 -->
        <div class="verification">
          <!-- `(^o^)`  详情介绍 -->
          <div class="verify_detail" v-show="cancel_status==1">
            <span>优惠详情及相关说明：</span>
            <p v-html="favoinfo.content"></p>
          </div>
          <!-- `(^o^)`  待核销 -->
          <div class="verify_wait" v-show="cancel_status==2">
            <div>
              <div>
                <p>您的核销码</p>
                <h2>{{cancelInfo.code}}</h2>
                <button>{{cancelInfo.status_show}}</button>
                <p>领取时间</p>
                <span>{{cancelInfo.createtime}}</span>
              </div>
              <div>
                <div>
                  <i></i>
                  <span>{{cancelInfo.nickname}}</span>
                </div>
                <div>
                  <i></i>
                  <span>{{cancelInfo.mobile}}</span>
                </div>
              </div>
            </div>
            <div>
              <div><img :src="cancelInfo.qrcode" alt="" style="width:150px;height:150px;"></div>
              <p>请将核销码出示给店员进行核销</p>
            </div>
          </div>
          <!-- `(^o^)`  核销成功 -->
          <div class="verify_suc" v-show="cancel_status==3">
            <h2>恭喜您核销成功</h2>
            <img src="../../../../static/images/payment/favo6.png" alt>
            <p>
              即将跳转到我的卡包&nbsp;
              <i>跳转中...</i>
            </p>
          </div>
          <!-- `(^o^)`  核销失败 -->
          <div class="verify_error" v-show="cancel_status==4">
            <h2>核销失败啦！</h2>
            <img src="../../../../static/images/payment/favo7.png" alt>
            <p>
              即将跳转到我的卡包&nbsp;
              <i>跳转中...</i>
            </p>
          </div>
        </div>
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
      cancel_status: 3, // 页面展示状态
      uid: "", // 优惠券id
      clid:"",//优惠券核销id
      favoinfo: {}, // 详情数据
      cancelInfo:"",//优惠券核销信息
    };
  },

  components: {
    Header
  },

  computed: {},

  created() {
    this.uid = this.$route.query.pid;
    let status = this.$route.query.getstatus; // 优惠券领取状态
    if (this.uid) {
      // console.log('status',status)
      if (status == "已领取") {
        // console.log('进来了已领取',status)
        this.cancel_status = 2;
        this.getcancel(this.uid);
      } else if (status == "未领取") {
        this.cancel_status = 1;
        this.getinfo(this.uid);
      }else if(status == undefined){
        this.cancel_status = 1;
        this.getinfo(this.uid);
      }else if(status == 1){
        this.cancel_status = 3;
        setTimeout(this.$router.push('/discoupon'), 3000);
      }else if(status == 0){
        this.cancel_status = 4;
        setTimeout(this.$router.push('/discoupon'), 3000);
      }
    }
  },

  beforeMount() {},

  mounted() {},

  methods: {
    // 得到优惠券详细信息
    getinfo(pid) {
      Api.Mobile_favo_detail({
        id: pid
      }).then(res => {
        // console.log("121212121",res)
        if (res.data.status == 1) {
          this.favoinfo = res.data.result.info;
        } else {
          this.$Message.error({
            content: res.data.message
          });
        }
      });
    },
    // 得到核销优惠券详情
    getcancel(pid){
      Api.Mobile_cancel_detail({
        id: pid,
        url:this.api+'#/hexiaowait?pid='+pid
      }).then(res => {
        // console.log("9999",res)
        if (res.data.status == 1) {
          // localStorage.setItem('hxurl',this.api+'#/hexiaowait?pid='+pid)
          this.cancelInfo = res.data.result.info;
        } else {
          this.$Message.error({
            content: res.data.message
          });
        }
      });
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
@import url(../../../assets/css/favodetail.css);
</style>
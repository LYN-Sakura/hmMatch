<template>
  <div class="activityDetail_cont">
    <Header :show="1">
      <span slot="top_text">活动详情</span>
    </Header>
    <div class="actDet_cont" id="actDet_conts">
      <!-- 音乐标签 -->
      <div class="actDetAudio">
        <div class="actDetAudio-l">
          <div class="swiper-container" id="swiper1" >
            <div class="swiper-wrapper" >
                <div class="swiper-slide topBanner" v-for="(item,index) in info.screen" :key="index">
                    <img :src="item.avatar" alt>
                    <span>{{item.content}}</span>
                </div> 
                <!-- <div class="swiper-slide topBanner" >
                    <img src="../../../../static/images/activityDetail/pro.png" alt>
                    <span>恭喜啊&nbsp;[我是明月啊]&nbsp;获得200元奖励</span>
                </div> 
                <div class="swiper-slide topBanner" >
                    <img src="../../../../static/images/activityDetail/pro.png" alt>
                    <span>恭喜啊&nbsp;[我是明月啊]&nbsp;获得200元奖励</span>
                </div>  -->
                
            </div>
          </div>
        </div>
        <div class="actDetAudio-r">
          <img v-if="info.audio=''" src="../../../../static/images/activityDetail/xncnrorr2.png" alt>
          <img v-else src="../../../../static/images/activityDetail/xncnrorr1.png" alt>
          <audio
            v-if="info.audio!=''"
            class="avatar"
            controls="controls"
            autoplay="autoplay"
            :src="info.audio"
            >您的浏览器不支持播放</audio>
        </div>
      </div>
      <!-- 头部活动海报及活动查看详情-->
      <div class="actDetActive-top">
        <!-- <img src="../../../../static/images/activityDetail/xncnrorr4.png" alt> -->
        <img :src="info.thumb" alt>
        <div class="actDetActive-event">
          <div
            class="actDetActive-eventDetail"
            :style="{'background':'url('+`../../../../static/images/actStyle${info.style}.png`+')'}"
          >
            <p>{{info.title}}</p>
            <P>
              <span>查看活动详情</span>
            </P>
          </div>
        </div>
      </div>
      <!-- 霸王免单卡 -->
      <div class="actDetActive-card">
        <p class="actDetCardName">
          <img src="../../../../static/images/activityDetail/xncnrorr7.png" alt>
        </p>
        <div class="actDetCardB">
          <a id="actDetCardB">
            <p>
              <a href="javascript:;" @click="goRulestate()">使用说明</a>
            </p>
            <p>
              <a href="javascript:;" @click="goOrder()">立即办卡</a>
            </p>
            <div class="actDetCardBSale">
              <span>
                ￥
                <span>{{info.price}}</span>
              </span>
              <span style="font-size: 0.6rem;color:#F5E1C1;display: block;margin-top: 0.2rem;padding-left:0.4rem;">限时抢购</span>
            </div>
          </a>
        </div>
      </div>
      <!-- 距离活动结束时间 -->
      <div class="actDetActive-end">
        <p class="actDetCardEnd-top">
          <img src="../../../../static/images/activityDetail/xncnrorr9.png" alt>
        </p>
        <div class="actDetCardEnd-bottom">
          <p>
            <span v-if="dd>=100" class="firstspan">{{dd}}</span>
            <span v-else class="firstspan1">{{dd}}</span>天
            <span>{{hh}}</span>时
            <span>{{mm}}</span>分
            <span>{{ss}}</span>秒
          </p>
        </div>
      </div>
      <!-- 活动商家 -->
      <div class="EventStore">
        <div class="EventStoreT">
          <p>
            <img src="../../../../static/images/activityDetail/xncnrorr11.png" alt>
          </p>
          <p>
            <span @click="moreStore">查看更多</span>
            <img src="../../../../static/images/activityDetail/xncnrorr12.png" alt>
          </p>
        </div>
        <!-- 活动商家轮播 -->
        <div class="eventStoreZ">
          <div class="swiper-container eventStoreBanner">
            <div class="swiper-wrapper">
              <div class="swiper-slide active" v-for="(item,index) in info.merchlist" :key="index" :data-href="see(item.id)">
                <div class="activeT">
                  <div class="activeT-l">
                    <img :src="item.thumb" alt>
                  </div>
                  <div class="activeT-r">
                    <p>
                      <img src="../../../../static/images/index/adffg23.png" alt>
                      <span>{{item.title}}</span>
                    </p>
                    <p style="margin-top: -0.3rem">
                      <img src="../../../../static/images/index/adffg24.png" alt>
                      <span>{{item.mobile}}</span>
                    </p>
                    <p style="margin-top: -0.2rem">
                      <img src="../../../../static/images/index/adffg25.png" alt>
                      <span>{{item.address}}</span>
                    </p>
                  </div>
                </div>
                <div class="activeB">
                  <p>商家描述:</p>
                  <p>{{item.subtitle}}</p>
                </div>
                <div class="seeDetailBtn" >
                  查看详情
                </div>
              </div>
              <!-- <div class="swiper-slide active">
                                <EventStoreBan>

                                </EventStoreBan>
              </div>-->
              <!-- <div class="swiper-slide active">
                                <EventStoreBan></EventStoreBan>
                            </div>
                            <div class="swiper-slide active">
                                <EventStoreBan></EventStoreBan>
              </div>-->
            </div>
            <div class="eventStoreZ-huadong">
              <img class="indexSwp-prev" src="../../../../static/images/index/adffg29.png" alt>
              <p class="indexSwp-hint">左右滑动查看更多商家</p>
              <img class="indexSwp-next" src="../../../../static/images/index/adffg30.png" alt>
            </div>
          </div>
        </div>
      </div>
      <!-- 专享优惠券 -->
      <div class="coupon">
        <p class="couponT">
          专享优惠券
          <span>FREE</span>
        </p>
        <ul>
            <li class="cardbox" v-for="(item,index) in info.couplist" :key="index">
                <div class="couponL" @click.prevent="goStoreDetail(item.merchid)">
                    <img :src="item.thumb" alt="">
                    <p class="couponL-worth">优惠卷总价值:</p>
                    <span>￥<p>{{item.money}}</p></span>
                </div>
                <div class="couponZ" @click.prevent="detail(item.id)">
                    <p class="couponZname">{{item.title}}</p>
                    <div class="couponZinfo">
                        <p>优惠包含:</p>
                        <p v-html="item.content"></p>
                    </div>
                    <p class="couponZtime">有效期:{{item.starttime}}至{{item.endtime}}</p>
                </div>
                <div class="couponR">
                    <a href="javascript:;" @click.prevent="detail(item.clid,wylq)" >{{wylq}}</a>
                </div>
            </li>
        </ul>
        <div class="allCard">
          <p>全部优惠卷</p>
          <img src="../../../../static/images/activityDetail/xncnrorr12.png" alt>
        </div>
      </div>
    </div>
    <!-- 分享办卡 -->
    <div class="actDet_btn">
      <p>
        <a href="javascript:;" @click="goShare()" style="color: #E2B870;">分享挣钱</a>
      </p>
      <p>
        <a href="javascript:;" @click="goConorder()" style="color: #FFFFFF;">{{ljbk}}</a>
      </p>
    </div>
  </div>
</template>

<script>
import {MessageBox} from 'mint-ui'
import swiper from "../../../../static/swiper/js/swiper.js";
import Header from "../../component/header";
// import EventStoreBan from '../../component/eventStoreBan'
// import CouponList from "../../component/couponList";
export default {
  data() {
    return {
      token:'',
      user: "", //用户信息
      cid: this.$route.query.cid, //活动id
      thumb1: "", //图片1
      thumb2: "", //图片2
      info: {
        //活动详情
        id: "", //活动ID
        title: "", //活动标题
        thumb: "", //背景图片
        // audio: "",//音乐
        goodsid: "", //活动商品ID
        endtime: "", //活动结束时间
        timeing: "", //活动剩余时间(秒)
        style: "", //活动风格
        merchlist: [
            {
                //活动商家
                id: "", //商家ID
                thumb: "", //商家图片
                title: "", //商家标题
                mobile: "", //商家联系方式
                address: "", //商家地址
                subtitle: "" //商家简介
            }
        ],
        screen: [
            {
                //活动弹幕
                avatar: "", //用户头像
                content: "" //弹幕内容
            }
        ],
        couplist:[
            {
                activeid: "",
                content: "",
                endtime: "",
                id: "",
                money: "",
                starttime: "",
                title: "",
                thumb:"",
            }
        ]
      },
      endtime: "", //结束时间
      dd: "00",
      hh: "00",
      mm: "00",
      ss: "00",
      wylq:'',
      ljbk:''
    };
  },
  name: "",
  props: [""],
  components: {
    Header,
    // EventStoreBan,
    // CouponList
  },
  methods: {
    goRulestate: function() {
      if(this.token){
        this.$router.push("/Rulestate");
      }else{
        this.$router.push("/mobile_login");
      }
    },
    goRegCard: function() {
      if(this.token){
        this.$router.push("/allActivity");
      }else{
        this.$router.push("/mobile_login");
      }
      
    },
    goShare: function() {
      if(this.token){
        this.$router.push({
          path:"/sharePoster",
          query:{
            cid:this.cid
          }
        });
      }else{
        MessageBox.confirm('检测到您未登录，是否跳转登录页面').then(action => {
          this.$router.push("/mobile_login");
        }).catch();
      }
      
    },
    goOrder: function() {
      if(this.token){
        if(this.info.isbuy=='1'){
          this.$Message.success({
            content:"您已购买！！！"
          })

        }else{
          let pid = this.info.goodsid;
          this.$router.push({
            path: "/Order",
            query: {
              pid: pid
            }
          });
        }
      }else{
        MessageBox.confirm('检测到您未登录，是否跳转登录页面').then(action => {
          this.$router.push("/mobile_login");
        }).catch();
      }
    },
    moreStore(){
      if(this.token){
        this.$router.push({
          path:'/storeClassify',
          query:{
            cid:this.cid
          }
        })
      }else{
        MessageBox.confirm('检测到您未登录，是否跳转登录页面').then(action => {
          this.$router.push("/mobile_login");
        }).catch();
      }
    },
    see(e){
        return JSON.stringify(e)
    },
    //跳转商家详情
    goStoreDetail(sid){
      if(this.token){
        this.$router.push({
          path:'./storeDetail',
          query:{
              sid:sid,
          }
        })
      }else{
        this.$router.push("/mobile_login");
      }
    },
    //跳转优惠券详情
    detail(id,statu){
      if(this.token){
        if(this.info.isbuy=='1'){
          this.info.couplist.forEach(el => {
            if (el.id == id) {
              this.$router.push({
                path: "/favodetail",
                query: {
                  pid: id,
                  getstatus: statu
                }
              });
            }
          });

        }else{
          document.getElementById("actDet_conts").scrollTop = 350;
          // this.message.
          this.$Message.info({
              content:'请去购买霸王卡'
          })
        }
      }else{
        this.$router.push("/mobile_login");
      }
      
    },
    //立即办卡
    goConorder: function() {
      if(this.token){
        if(this.info.isbuy=='1'){
          this.$Message.success({
              content:'您已购买！！！'
          })
        }else{
          // document.getElementById("actDet_conts").scrollTop = 350;
          // this.message.
          // this.$Message.info({
          //     content:'请去购买霸王卡'
          // })
          let pid = this.info.goodsid;
          this.$router.push({
            path: "/Order",
            query: {
              pid: pid
            }
          });
        }
      }else{
        MessageBox.confirm('检测到您未登录，是否跳转登录页面').then(action => {
          this.$router.push("/mobile_login");
        }).catch();
      }
    }
    
  },
  created() {
    this.user = localStorage.getItem("ms_userinfo");
    this.token=sessionStorage.getItem("ms_token")
    console.log("token",this.token)
    // if (this.user != "" && this.user != undefined && this.user != null) {
      this.$http
        .post("/mobile/active/details", {
          id: this.cid
        })
        .then(res => {
          // console.log("活动详情", res);
          // console.log("活动详情中的音乐", res.data.result.info.audio);
          this.thumb1 = res.data.result.thumb1;
          this.thumb2 = res.data.result.thumb2;
          this.info = res.data.result.info;
          console.log("详情", this.info);
          if(this.info.isbuy=='1'){
            // alert("加油")
            this.ljbk="已办卡"
            this.wylq="已领取"
          }else{
            this.ljbk="立即办卡"
            this.wylq="我要领劵"
          }
          this.$nextTick(function() {
            this.topSwiper.init();
            this.EventStoreSwiper.init();

          });
        });
    // }
  },
  mounted() {
    // 头部轮播
    this.topSwiper = new Swiper("#swiper1", {
      direction: "vertical", // 切换选项
      loop: true, // 循环模式选项
      autoplay: true, // 自动轮播
      speed: 3000,
      //autoplayDisableOnInteraction: false  //滑动后才能自动轮播
      //observer:true,                  //修改swiper自己或子元素时，自动初始化swiper
      //observeParents:true,                //修改swiper的父元素时，自动初始化swiper

    });
    let that=this;
    // 活动商家轮播
    this.EventStoreSwiper = new Swiper(".eventStoreBanner", {
      loop: true,
      autoplay: 2000,
      effect: "coverflow",
      // grabCursor: true,  //为true,鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
      centeredSlides: true,
      slidesPerView: "auto",
      touchRatio: 1,
      coverflow: {
        rotate: 0, // 旋转的角度
        stretch: -18, // 拉伸   图片间左右的间距和密集度
        depth: 100, // 深度   切换图片间上下的间距和密集度
        modifier: 2.2, // 修正值 该值越大前面的效果越明显
        slideShadows: false // 页面阴影效果
      },
      prevButton: ".indexSwp-prev",
      nextButton: ".indexSwp-next",
      onClick:function(swiper){
          var x=JSON.parse(swiper.clickedSlide.attributes["data-href"].nodeValue)
          // console.log(x)
          // that.$router.push({
          //     path:'./storeDetail',
          //     query:{
          //         sid:x,
          //     }
          // })
          if(that.token){
            that.$router.push({
              path:'./storeDetail',
              query:{
                  sid:x,
              }
            })
          }else{
            that.$router.push("/mobile_login");
          }
      }
    });

    let timer = setInterval(() => {
      let aaa = parseInt(this.info.endtime * 1000);
      let bbb = new Date().getTime();
      let rightTime = aaa - bbb;
      if (rightTime > 0) {
        let dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
        let hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
        let mm = Math.floor((rightTime / 1000 / 60) % 60);
        let ss = Math.floor((rightTime / 1000) % 60);
        this.dd = dd < 10 ? "0" + dd : dd;
        this.hh = hh < 10 ? "0" + hh : hh;
        this.mm = mm < 10 ? "0" + mm : mm;
        this.ss = ss < 10 ? "0" + ss : ss;
        
      } else {
        //clearInterval(timer);
      }
    }, 1000);
  }
};
</script>
<style lang="" scoped>
@import url("../../../../static/swiper/css/swiper.css");
@import url("../../../assets/css/activityDetail.css");
.activityDetail_cont {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
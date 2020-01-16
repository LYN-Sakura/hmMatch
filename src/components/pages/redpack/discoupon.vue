<template>
  <div class="coupon_cont">
    <Header :show="1">
      <span slot="top_text">优惠券</span>
    </Header>
    <div class="coupon_bot">
      <div class="coupon_bot_top">
        <p>
          <i></i>
          <input type="search" v-model="keyword" @keyup="search" placeholder="输入关键字搜索优惠券">
        </p>
      </div>
      <div class="coupon_choice">
        <div>
          <span @click="classify()" :class="choice==1?'active':''">商家分类</span>
          <span @click="getstatus()" :class="choice==2?'active':''">领取状态</span>
        </div>
        <div class="classify">
          <div v-show="choice==1" class="swiper-container container1">
            <div class="swiper-wrapper">
              <div
                class="swiper-slide"
                v-for="(item,index) in Cosmetics"
                :key="index"
                @click="infolist(item.id,index)"
              >
                <a href="javascript:;" :class="indexid==index?'active':''">
                  <p>{{ item.cate_name}}</p>
                  <span></span>
                </a>
              </div>
            </div>
          </div>
          <div v-show="choice==2" class="status_class container1">
            <div
              v-for="(item,index) in favostatus"
              :key="index"
              @click="infolist(item.id,index,item.type)"
            >
              <a href="javascript:;" :class="indexid==index?'active':''">
                <p>{{ item.cate_name}}</p>
                <span></span>
              </a>
            </div>
          </div>
        </div>
      </div>
      <div class="coupon_data" ref="wrapper" :style="{ height: (wrapperHeight-5) + 'px' }">
        <mt-loadmore
          ref="loadmore"
          :top-method="loadTop"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          :autoFill="isAutoFill"
        >
          <ul>
            <li v-for="(item,index) in info" :key="index">
              <subcon
                :favoid="item.clid==0?item.id:item.clid"
                :activeId="item.activeid"
                @goDetail="detail"
                @goActive="Active"
              >
                <img slot="thumb" v-lazy="item.thumb" alt>
                <h2 slot="money">
                  <i>￥</i>
                  {{item.money}}
                </h2>
                <h5 slot="title">{{item.title}}</h5>
                <p slot="content" v-html="item.content"></p>
                <small slot="endtime">有效期:&nbsp;{{item.starttime}}至{{item.endtime}}</small>
                <p slot="getstatus">{{item.clidtext}}</p>
                <p slot="atitle">{{item.atitle}}</p>
              </subcon>
            </li>
          </ul>
        </mt-loadmore>
      </div>
    </div>
  </div>
</template>

<script>
import swiper from "../../../../static/swiper/js/swiper.js";
import Header from "../../component/header";
import subcon from "../../component/subcoupon";
import { Api } from "../../../APi/WEBMb/index.js";
export default {
  name: "",
  props: [""],
  data() {
    return {
      page: 1, // 页码
      limit: 10, // 每页显示记录数
      keyword: "", // 检索条件
      info: [], // 数据列表
      cate: "", // 商家分类ID
      status: "", //优惠券领取状态
      indexid: 0, // 商家分类样式
      Cosmetics: [], // 商户分类列表
      favostatus: [
        { id: "", type: "", cate_name: "全部" },
        { id: "", type: 1, cate_name: "已领取" },
        { id: "", type: 2, cate_name: "未领取" },
        { id: "", type: 3, cate_name: "未核销" },
        { id: "", type: 4, cate_name: "已核销" },
      ], // 领取状态列表
      choice: 1, // 优惠券类别，1分类/2状态
      allLoaded: false, // 可以进行上拉
      isAutoFill: false, // 是否自动触发上拉函数
      wrapperHeight: 0 // 上拉父级控件的高度
    };
  },

  components: {
    Header,
    subcon
  },

  computed: {},

  activated() {
    if (this.$route.meta.isUseCache) {
      // 判断路由信息中isUseCache是否为真，为true时刷新数据，为false时不刷新数据
      this.Cosmetics = []; // 清空原有数据
      this.info = []; // 清空原有数据
      this.classifylist();
      this.classify(); // 这是我们获取数据的函数
      this.$route.meta.isUseCache = true; // 前进这个页面的话，将isUseCache改为true，若后退到这个页面的话，在后退的那个页面中添加beforeRouteLeave (to, from, next)钩子函数，判断进入页面是否为本页面，若为真，则将isUseCache改为false，这样isUseCache的值，就可以灵活更改，且进入本页面中进入else使用缓存数据
    } else {
    }
  },

  beforeMount() {},

  mounted() {
    // 父控件要加上高度，否则会出现上拉不动的情况
    this.wrapperHeight =
      document.documentElement.clientHeight -
      this.$refs.wrapper.getBoundingClientRect().top;
  },
  methods: {
    // 滑块
    category() {
      if (this.Cosmetics.length >= 5) {
        var swiper = new Swiper(".container1", {
          slidesPerView: 4.5,
          spaceBetween: 10
        });
      } else {
        var swiper = new Swiper(".container1", {
          slidesPerView: this.Cosmetics.length,
          spaceBetween: 10
        });
      }
    },
    // 商家分类
    classify: function() {
      this.page = 1;
      this.cate = ""; // 点击分类时，清除商家分类id字段
      this.choice = 1;
      this.indexid = 0; // 默认样式，选择第一个
      this.infolist();
    },
    // 领取状态
    getstatus() {
      this.page = 1;
      this.choice = 2;
      this.indexid = 0; // 默认样式，选择已领取
      this.infolist();
    },
    // 商户分类列表
    classifylist() {
      Api.Mobile_classify_list({}).then(res => {
        if (res.data.status == 1) {
          if (res.data.result.list != "") {
            this.Cosmetics = res.data.result.list;
            this.$nextTick(function() {
              this.category();
            });
          }
        }
      });
    },
    // 下拉刷新加载
    loadTop() {
      this.page = 1;
      if (this.choice == 1) {
        this.infolist();
      } else {
        this.infolist();
      }
    },
    // 上拉加载更多
    loadBottom() {
      this.loadMore();
    },
    // 数据列表
    infolist(cate, pid, status) {
      this.page = 1;
      // cate:分类id，pid：样式选择id，status：领取状态的值
      if (cate) {
        this.cate = cate;
      }
      if (pid >= 0) {
        this.indexid = pid;
      }
      if (status) {
        this.status = status;
      }
      // cate：商家分类ID，status优惠券领取状态
      Api.Mobile_favo_list({
        page: this.page,
        limit: this.limit,
        cate: this.cate,
        keyword: this.keyword,
        type: this.status
      }).then(res => {
        // console.log("121.",res)
        if (res.data.status == 1) {
          if (res.data.result.list != "") {
            this.info = res.data.result.list;
            this.info.forEach(el => {
              el.money = parseInt(el.money) * 1;
              el.clidtext = el.clid == 0 ? "未领取" : "已领取";
            });
            this.allLoaded = false; // 可以进行上拉
            this.$refs.loadmore.onTopLoaded();
          } else {
            this.info = [];
            this.$Message.info({
            content:"暂无更多数据"
          })
          }
        }else{
          
        }
      });
    },
    // 加载更多
    loadMore() {
      this.page++;
      Api.Mobile_favo_list({
        page: this.page,
        limit: this.limit,
        cate: this.cate,
        keyword: this.keyword,
        type: this.status
      }).then(res => {
        if (res.data.status == 1) {
          if (res.data.result.list != "") {
            this.info = this.info.concat(res.data.result.list);
            this.info.forEach(el => {
              el.money = parseInt(el.money) * 1;
              el.clidtext = el.clid == 0 ? "未领取" : "已领取";
            });
          } else {
            // 若数据已全部获取完毕
            this.allLoaded = true;
            this.$Message.info({
              content: "数据加载完毕"
            });
            this.$refs.loadmore.onBottomLoaded();
          }
        }
      });
    },
    // 检索
    search() {
      this.infolist();
    },
    // 跳转优惠券详情
    detail(v) {
      // console.log('v',v)
      this.info.forEach(el => {
        if (el.id == v) {
          this.$router.push({
            path: "/favodetail",
            query: {
              pid: v,
              getstatus: el.clidtext
            }
          });
        }else if(el.clid == v){
          this.$router.push({
            path: "/favodetail",
            query: {
              pid: v,
              getstatus: el.clidtext
            }
          });
        }
      });
    },
    // 跳转活动详情
    Active(v) {
      let key = 0;
      this.info.forEach(el => {
        if (el.activeid == v) {
          if (v == 0) {
            key = 1;
          } else {
            this.$router.push({
              path: "/activityDetail",
              query: {
                cid: v
              }
            });
          }
        }
      });
      if (key == 1) {
        this.$Message.info({
          content: "活动已结束或已关闭"
        });
      }
    }
  },

  watch: {}
};
</script>
<style lang='' scoped>
@import url(../../../../static/swiper/css/swiper.css);
@import url(../../../assets/css/discoupon.css);
</style>
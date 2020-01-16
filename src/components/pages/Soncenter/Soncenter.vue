<template>
  <div class="Scenter_cont">
    <Header show='1'>
        <span slot="top_text">个人中心</span>
    </Header>
    <div class="Scenter_bot">
        <!-- 个人信息 -->
        <div class="Scenter_bot_top">
            <div class="bot_top_div">
                <div>
                    <div>
                        <img :src='userinfo.avatar' alt="">
                    </div>
                    <div>
                        <h3>{{userinfo.nickname}}</h3>
                        <p>推荐人：{{userinfo.agentname}}</p>
                    </div>
                    <div @click="changeuser()">
                        <img src="../../../../static/images/Scenter/scenter3.png" alt="">
                    </div>
                </div>
                <div>霸王免单卡限时抢购</div>
            </div>
        </div>
        <!-- 商品类别 -->
        <div class="Scenter_bot_class">
            <ul>
                <li v-for="(item,index) in classification" :key="index">
                    <router-link :to='item.rel'>
                        <div>
                            <img :src="item.img" alt="">
                            <p>{{item.txt}}</p>
                        </div>
                    </router-link>
                </li>
            </ul>
        </div>
        <!-- 卡片轮播 -->
        <div class="Scenter_bot_mid">
            <div class="swiper-container container2">
                <div class="swiper-wrapper">
                    <div class="swiper-slide" v-for="(item,index) in lunboList" :key='index'>
                        <img style="width:100%;height:100%;" :src="item" alt="">
                    </div>
                    <!-- <div class="swiper-slide">
                        2
                    </div>
                    <div class="swiper-slide">
                        3
                    </div> -->
                </div>
                <div class="swiper-pagination" ></div>
            </div>
        </div>
        <!-- 免单卡 -->
        <div class="Scenter_bot_singcard">
            <p class="clearfix"><span></span><small>霸王免单卡</small></p>
            <div>
                <h3>霸王免单卡</h3>
                <p>吃喝玩乐学&nbsp;一卡在手&nbsp;畅想我有</p>
                <div>
                    <span>规则说明</span>
                    <small>￥99/张</small>
                </div>
            </div>
        </div>
        <!-- 清缓存、更换账号 -->
        <div class="Scenter_bot_bot" @click="logout()">
            <ul>
                <!-- <li>
                    <div>
                        <img src="../../../../static/images/Scenter/scenter16.png" alt="">
                        <p><span>清除缓存</span><i></i></p>
                    </div>
                </li> -->
                <li>
                    <div>
                        <img src="../../../../static/images/Scenter/scenter17.png" alt="">
                        <p><span>切换账号</span><i></i></p>
                    </div>
                </li>
            </ul>
        </div>
        <router-view></router-view>
    </div>
    <div class="footer">
        <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import Header from '../../component/header'
import Tabbar from '../../component/Tabbar'
import swiper from '../../../../static/swiper/js/swiper.js'
import {Api} from '../../../APi/WEBMb/index.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
            classification:[    // 商品类别
                {img:'../../../../static/images/Scenter/scenter18.png',txt:'我的活动',rel:'/joinActivity'},
                {img:'../../../../static/images/Scenter/scenter19.png',txt:'商家加盟',rel:'/busjoin'},
                {img:'../../../../static/images/Scenter/scenter6.png',txt:'优惠卡券',rel:'/discoupon'},
                {img:'../../../../static/images/Scenter/scenter7.png',txt:'核销记录',rel:'/MbcancelRecord'},
            ],
            userinfo:{},    // 用户基础信息
            lunboList:'',  //轮播数据
      };
    },

    components: {
        Header,
        Tabbar
    },

    computed: {},

    mounted() {
        this.cardslide();
        this.swiper = new Swiper('.container2', {
            autoplay : 2000,        // 自动轮播速度
            autoplayDisableOnInteraction:false,//手动后继续滑动
            loop : true,            // 循环轮播
            speed:2000,             // 切换速度
            pagination : '.swiper-pagination',
        });
    },
    activated(){
        if(this.$route.meta.isUseCache){   // 判断路由信息中isUseCache是否为真，为true时刷新数据，为false时不刷新数据
            this.userinfo = {}; // 清空原有数据
            this.datainfo(); // 这是我们获取数据的函数
            this.$route.meta.isUseCache = true; // 前进这个页面的话，将isUseCache改为true，若后退到这个页面的话，在后退的那个页面中添加beforeRouteLeave (to, from, next)钩子函数，判断进入页面是否为本页面，若为真，则将isUseCache改为false，这样isUseCache的值，就可以灵活更改，且进入本页面中进入else使用缓存数据
        }else{
            
        }
    },
    methods: {
        datainfo(){
            Api.Mobile_Soncenter({

            }).then(res=>{
                if(res.data.status==1){
                    // console.log("个人中心数据",res)
                    this.userinfo = res.data.result.info;
                    this.lunboList=res.data.result.adv;
                    // console.log("个人中心数据轮播",this.lunboList)
                }
                this.$nextTick(function () {
                    this.swiper.init()
                })
            }).catch(err=>{
                this.$Message.error(res.data.message)
            })
        },
        cardslide:function(){
            
        },
        changeuser:function(){  // 切换账号
            this.$router.push('/pinfo');
        },
        logout:function(){  // 注销
            sessionStorage.removeItem('ms_token');
            localStorage.removeItem('ccity')
            localStorage.removeItem('ccode')
            localStorage.removeItem('center')
            localStorage.removeItem('city')
            localStorage.removeItem('citycode')
            localStorage.removeItem('ismobile')
            localStorage.removeItem('lat')
            localStorage.removeItem('lng')
            localStorage.removeItem('ms_userinfo')
            this.$router.push('/mobile_login');
        }
    },
    

    watch: {}

  }

</script>
<style lang='' scoped>
@import url(../../../../static/swiper/css/swiper.css);
@import url(../../../assets/css/Soncenter.css);
</style>
<template>
    <div class="storeDetail_cont">
        <Header :show='1'>
            <span slot="top_text">商家详情</span>
        </Header>
        <div class="storeDetailContent">
            <!-- 头部轮播图及商家详情 -->
            <div class="storeDetail_top">
                <!-- 头部轮播图 -->
                <!-- <div class="swiper-container storeDetail_Banner">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide storeDetailTopBan"> 
                            <img src="../../../static/images/Subdetail/detail2.png" alt="">
                        </div> 
                        <div class="swiper-slide storeDetailTopBan"> 
                            <img src="../../../static/images/Subdetail/detail2.png" alt="">
                        </div>  
                    </div>
                    <div class="swiper-pagination"></div>
                </div> -->
                <div class="mySwiper">
                    <mt-swipe :auto="4000">
                        <mt-swipe-item v-for="item in info.thumbs_url" :key="item"><img :src="item" alt=""></mt-swipe-item>
                    </mt-swipe>
                </div>
                
                <!-- 商家详情地址 -->
                <div class="storeDetail_info">
                    <div class="DetailInfoT">
                        <div class="DetailInfoT-l">
                            <p>{{info.title}}</p>
                            <p>{{info.subtitle}}</p>
                        </div>
                        <div class="DetailInfoT-r">
                            <p><a :href="'tel:'+info.mobile" style='color:white!important'>联系商家</a></p>
                        </div>
                    </div>
                    <div class="DetailInfoZ" @click.prevent="goAct(info.id)">
                        <div class="DetailInfoZ-l">
                            <img src="../../../static/images/Subdetail/detail5.png" alt="">
                            <p>该商家正在参与{{info.actnum}}个免单活动</p>
                        </div>
                        <div class="DetailInfoZ-r">
                            <p>更多</p>
                            <img src="../../../static/images/Subdetail/detail6.png" alt="">
                        </div>
                    </div>
                    <div class="DetailInfoB">
                        <a :href="['https://uri.amap.com/marker?position='+info.lng+','+info.lat+'&name='+info.title]">
                            <div class="DetailInfoB-l">
                                <img src="../../../static/images/Subdetail/detail7.png" alt="">
                                <p>{{info.address}}</p>
                            </div>
                            <div class="DetailInfoB-r">
                                <p>地图</p>
                                <img src="../../../static/images/Subdetail/detail6.png" alt="">
                            </div>
                        </a>
                    </div>
                </div>
            </div>
            <!-- 优惠券轮播图 -->
            <div class="storeDetailDiscount">
                <div class="storeDetailDis_top">
                    <img src="../../../static/images/Subdetail/detail8.png" alt="">
                </div>
                <div class="swiper-container storeDetailDis_Banner" v-if="info.couplist !=''">
                    <div class="swiper-wrapper">
                        <div class="swiper-slide storeDetailDisBan" v-for="(item,index) in info.couplist" :key="index"> 
                            <p class="storeDetailDis-worth">
                                <span>￥</span>
                                <span>{{item.money}}</span>
                            </p>
                            <p class="storeDetailDis-useTime">
                                有效期：{{item.starttime}}至{{item.endtime}}
                            </p>
                            <p class="storeDetailDis-useTitle">
                                优惠包含：
                            </p>
                            <p class="storeDetailDis-useInfo" v-html="item.content">
                                
                            </p>
                            <p class="storeDetailDis-useBtn" @click="relatedAct(item.activeid)">查看专项活动</p>
                        </div>  
                    </div>
                    
                </div>
                <div class="storeDetailDis_bottom">
                    <img src="../../../static/images/Subdetail/detail11.png" alt="">
                    <p>左右滑动查看更多活动</p>
                    <img src="../../../static/images/Subdetail/detail12.png" alt="">
                </div>
            </div>
            <!-- 西餐介绍 -->
            <div class="storeDetailWesFood">
                <div class="storeDetailWf_top">
                    <img src="../../../static/images/Subdetail/detail13.png" alt="">
                </div>
                <div class="storeDetailWf_info">
                    <p class="storeDetailWf_infoTextT" v-html="info.content"></p>
                    <!-- <div class="storeDetailWf_infoImg" v-if="info">
                        <img src="../../../static/images/Subdetail/detail14.png" alt="">
                    </div> -->
                    <!-- <p class="storeDetailWf_infoTextB">
                        西餐的主要特点是主料突出，形色美观，口味鲜美，营养丰富，供应方便等。对于西餐，走在时尚前沿的人士对此应该.应该有很多人喜欢吃吧或者怎么样
                    </p> -->
                    <!-- <div class="storeDetailWf_InfoBtn">
                        <span>展开更多详细</span>
                        <img src="../../../static/images/Subdetail/detail16.png" alt="">
                    </div> -->
                </div>
            </div>
            <!-- 视频宣传 -->
            <div class="storeDetailVideo">
                <div class="storeDetailVideo_top">
                    <img src="../../../static/images/Subdetail/detail18.png" alt="">
                </div>
                <div class="storeDetailVideo_info" v-if="info.video !=''">
                    <!-- <video src="//vdse.bdstatic.com//0ce574b077682f7525f666fd9700f088?authorization=bce-auth-v1/fb297a5cc0fb434c971b8fa103e8dd7b/2017-05-11T09:02:31Z/-1//d2ed31351b2f374a92f888d18bfeaf7e7ad7594a2dc2a1e18ca5f91384a20a22" controls="controls" >
                        您的浏览器不支持 video 标签。
                    </video> -->
                    <video
                    v-if="info.video !=''"
                    class="avatar"
                    controls="controls"
                    :src="info.video"
                    >您的浏览器不支持播放</video>
                </div>
            </div> 
            <!-- 用户评论 -->
            <div class="storeDetailComment">
                <div class="storeDetCom_top">
                    <div class="storeDetCom_topL">
                        <img src="../../../static/images/Subdetail/detail20.png" alt="">
                    </div>
                    <div class="storeDetCom_topR" @click="goStoreCla">
                        <img class="storeDetCom_topR1" src="../../../static/images/Subdetail/detail21.png" alt="">
                        <p><a href="javascript:;" style="color: #999999;">写评论</a></p>
                        <img class="storeDetCom_topR2" src="../../../static/images/Subdetail/detail22.png" alt="">
                    </div>
                </div>
                <div class="storeDetCom_bottom">
                    <ul>
                        <li class="storeDetCom" v-for="(item,index) in list" :key="index">
                            <div class="storeDetComT">
                                <img :src="item.avatar" alt="">
                                <div class="storeDetComT_name">
                                    <p>{{item.nickname}}</p>
                                    <P>
                                        <img src="../../../static/images/Subdetail/detail23.png" alt="" v-for="item in item.score*1">
                                        <!-- <img src="../../../static/images/Subdetail/detail23.png" alt="">
                                        <img src="../../../static/images/Subdetail/detail23.png" alt=""> -->
                                        <img src="../../../static/images/Subdetail/detail24.png" alt="" v-for="starF1 in 5-item.score*1">
                                        <!-- <img src="../../../static/images/Subdetail/detail24.png" alt=""> -->
                                    </P>
                                </div>
                                <div class="storeDetComT_time">
                                <p>{{item.createtime}}</p>
                                </div>
                            </div>
                            <div class="storeDetComB">
                                <p class="storeDetComBp1">
                                    {{item.content}}
                                </p>
                                <!-- <p v-if="storeDetp2Status" @click="storeDetComBCheck">全文</p> -->
                                <div class="storeDetComB_img">
                                    <li v-for="(th,index) in item.thumbs" :key="index">
                                        <img :src="th" alt="">
                                    </li>
                                </div>
                            </div>
                        </li>
                    </ul>
                    <div class="storeDetComBtn" @click="getmoreEval">
                        <span>查看评论（{{total}}）</span>
                        <img src="../../../static/images/Subdetail/detail22.png" alt="">
                    </div>
                </div>
            </div>
        </div>
        
    </div>
</template>

<script>
import swiper from '../../../static/swiper/js/swiper.js'
import Header from '../component/header'
export default{
    name:'',
    props:[''],
    components: {
        Header,
    },
    data(){
        return { 
            user:'',//用户信息
            sid:this.$route.query.sid,//商户id
            info:{//商家信息
                id:"",//商家ID
                title:"",//商家标题
                thumbs:[],//'图片1','图片2','图片3'
                thumbs_url:[],//'图片1','图片2','图片3'
                subtitle:"",//商家简介
                mobile:"",//联系电话
                address:"",//商家地址
                content:"",//商家详情
                video:"",//商家视屏
                lat:"",//纬度
                lng:"",//经度
                couplist:[{//优惠券列表
                    id:"",//优惠券ID
                    title:"",//优惠券标题
                    starttime:"",//优惠券开始时间
                    endtime:"",//优惠券结束时间
                    content:"",//优惠券内容
                    activeid:"",//优惠券对应活动ID
                    money:"",//优惠券金额
                }]
            },
            list:[{//评论列表
                id:"",//评论ID
                content:"",//评论内容
                thumbs:"",//['图片1','图片2','图片3']
                thumbs_url:"",//['图片1','图片2','图片3']
                createtime:"",//评论时间
                avatar:"",//用户头像
                nickname:"",//用户昵称
                score:"",//评论分数
            }],
            total:"",//评论列表总数
            page:1,
            storeDetStatus:false, 
            storeDetp2Status:false, 
            curHeight:0,
            storeDetComBHeight:55,
        }
    },
    methods: {
        lunbo(){
             // 头部轮播
            var topSwiper = new Swiper ('.storeDetail_Banner', {
                direction: 'horizontal', // 切换选项
                loop: true, // 循环模式选项
                autoplay : true, // 自动轮播
                speed:3000,
                autoplayDisableOnInteraction:false,
                
                // 如果需要分页器
                pagination: {
                    el: '.swiper-pagination',
                },
                
                // 如果需要前进后退按钮
                // navigation: {
                //   nextEl: '.swiper-button-next',
                //   prevEl: '.swiper-button-prev',
                // },
                
                // // 如果需要滚动条
                // scrollbar: {
                //   el: '.swiper-scrollbar',
                // },
            })  
        },
        //参与活动更多跳转
        goAct(id){
           this.$router.push({
                path:'./joinActivity',
                query:{
                    id:id
                }
            }) 
        },
        //优惠券相关活动
        relatedAct(id){
            this.$router.push({
                path:'./activityDetail',
                query:{
                    cid:id
                }
            })
        },
        goStoreCla(){
            this.$router.push({
                path:'./score',
                query:{
                    sid:this.sid
                }
            })
        },
        //查看更多评论
        getmoreEval(){
            this.page++;
            // console.log("商户评论当前页",this.page)
            this.$http.post("/mobile/discuss/merchdiscuss",{
                merchid:this.sid,
                limit:4,
                page:this.page
            }).then(res=>{
                let moreList=res.data.result.list
                // console.log("商户评论++++",res)
                if(moreList!=""){
                    // this.$Message.info("数据加载完毕！");
                    moreList.forEach(item=>{
                        this.list.push(item)
                    })
                    if(moreList.length<=4){
                        this.$Message.info("数据加载完毕！");
                    }
                }else{
                    moreList=[]
                }
            })
        },
        // storeDetComBCheck(){
        //     this.storeDetStatus=!this.storeDetStatus
        //     this.storeDetp2Status = false
        // },
        // contentToggle(){
        //     this.curHeight=this.$refs.storeDetComB.offsetHeight
        //     //console.log(this.curHeight)
        //     //console.log(this.pinglun.length)
        //     if(this.curHeight>=this.storeDetComBHeight){
        //         if(this.list.content.length<70){
        //             this.storeDetStatus=true;
        //             this.storeDetp2Status = false
        //         }else{
        //             this.storeDetStatus=false;
        //             this.storeDetp2Status = true
        //         }
                
        //         //console.log("111")
        //     }else{
        //         this.storeDetStatus=false;
        //         this.storeDetp2Status = false
        //         //console.log("222")
        //     }
        // },
    },
    created(){
        this.user=localStorage.getItem("ms_userinfo");
        if(this.user!=''&&this.user!=undefined&&this.user!=null){
            this.$http.post("/mobile/merch/details",{
                id:this.sid
            }).then(res=>{
                // console.log("商户信息",res)
                if(res.data.status==1){
                    this.info=res.data.result.info
                    this.$Message.success("数据加载成功！");
                }else{
                    this.$Message.error({
                        content:res.data.message
                    });
                }
                this.$nextTick(function () {
                    this.EventStoreSwiper.init()
                })
            })
            this.$http.post("/mobile/discuss/merchdiscuss",{
                merchid:this.sid,
                limit:4,
                page:this.page
            }).then(res=>{
                // console.log("商户评论",res)
                this.list=res.data.result.list
                this.total=res.data.result.total
            })
        }
    },
    mounted() {
        // 优惠券轮播
        this.EventStoreSwiper = new Swiper('.storeDetailDis_Banner', {  
            loop : true,  
            autoplay:3000,
            effect: 'coverflow',  
            // grabCursor: true,  //为true,鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
            centeredSlides: true,   
            slidesPerView: 'auto',  
            touchRatio :1,
            coverflow: {  
                rotate: 0,// 旋转的角度  
                stretch: -15,// 拉伸   图片间左右的间距和密集度  
                depth: 100,// 深度   切换图片间上下的间距和密集度  
                modifier: 2.2,// 修正值 该值越大前面的效果越明显  
                slideShadows : false,// 页面阴影效果  
            } 
        }) 
        // this.$nextTick(()=>{
        //     this.contentToggle();
        // })
        
    },

}  
</script>
<style lang="" scoped>
@import url('../../../static/swiper/css/swiper.css');
@import url('../../assets/css/storeDetail.css');
.storeDetail_cont{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}

</style>
<template>
    <div class="storeClassify_cont">
        <Header :show='1'>
            <span slot="top_text">商家分类</span>
        </Header>
        <!-- 头部搜索 -->
        <div class="topSearch">
            <div class="searchInp">
                <img src="../../../static/images/index/rhyjuj1.png" alt="">
                <input type="find" placeholder="请输入关键字搜索商家" v-model="defaultinp" @change="find">
            </div>
        </div>
        <!-- 选择商家 -->
        <div class="choiceStore">
            <div class="choiceStore-r">
                <ul>
                    <li v-for="(tabsN,index) in shopSortList" :key='index' :class="tabsN.isShow==1?'storeActive':''" @click="sel(index,tabsN.id)">
                        {{tabsN.cate_name}}
                    </li>
                </ul>
            </div>
            <div class="choiceStore-l">
                <ul v-infinite-scroll="loadMore" infinite-scroll-distance="20" infinite-scroll-disabled="loading">
                    <li v-for="(tabsC,index) in shopList" :key='index' @click="goStoreDetail(tabsC.id,tabsC.title)">
                        <div class="choiceStoreImg">
                            <img :src="tabsC.thumb" alt="">
                        </div>
                        <div class="choiceStoreInfo">
                            <p class="choiceStoreName">{{tabsC.title}}</p>
                            <p class="choiceStoreInt">商户简介：{{tabsC.subtitle}}</p>
                        </div>
                        <div class="choiceStoreSeat">
                            <img src="../../../static/images/index/rhyjuj2.png" alt="">
                            <p>{{tabsC.distance}}km</p>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../component/header'
export default{
    name:'',
    props:[''],
    data(){
        return{
            user:'',//用户信息
            cid:'',//活动Id
            lng:'',//当前位置
            lat:'',
            ccode:'',
            defaultinp:"",//搜索字段
            shopSortList:[{//左侧导航数组
                id:"",//分类ID
                cate_name:"",//分类名称
            }],
            shopList:[],//同种分类商家的数组
            shopSortId:'',//选中当前分类id
            pages:1,
            datastatus:0,   // 数据加载状态，加载完毕为1
            loading:false,
        }
        
    },
    components: {
        Header
    },
    methods: {
        find(){
            this.pages=1;
            this.datastatus=0;
            if(this.defaultinp!=''){
                this.$http.post("/mobile/merch/getlist",{
                    cate:this.shopSortId,
                    keyword:this.defaultinp,
                    limit:6,
                    lng:this.lng,
                    lat:this.lat,
                    area:this.ccode,
                }).then(res=>{
                    console.log("000000",res)
                    if(res.data.status==1){
                        this.shopList=res.data.result.list
                        // this.shopList.forEach(item=>{
                        //     // if(item.id==this.)
                        // })
                    }else{
                        this.$Message.info({
                            content:res.data.message
                        })
                    }
                })
            }
        },
        sel(index,id){
            this.defaultinp=''
            this.shopSortId=id
            //console.log(index,id)
            this.datastatus = 0
            this.pages=1
            for (const iterator of this.shopSortList) { //es6遍历数组，遍历结果为对象
                iterator.isShow = 0;
            }
            this.shopSortList[index].isShow=1;
            //console.log("4",this.shopSortList)
            this.shopSortList = Object.assign([],this.shopSortList)
            this.$http.post("/mobile/merch/getlist",{
                cate:id,
                limit:6,
                page:this.pages,
                lng:this.lng,
                lat:this.lat,
                area:this.ccode,
            }).then(res=>{
                if(res.data.status==1){
                    // console.log("1111",res)
                    // this.shopList=res.data.result.list
                    if(this.defaultinp!=''){
                        this.find()
                    }else{
                       this.shopList=res.data.result.list 
                    }
                }else{
                    this.$message.info({
                        content:res.data.message
                    })
                }
            
            })
        },
        //跳转商家详情
        goStoreDetail(sid,sname){
            this.$router.push({
                path:'./storeDetail',
                query:{
                    sid:sid,
                }
            })
        },
        loadMore(){
            this.loading=true;
            if(this.datastatus==1){ // 加载完毕，不发送请求
                return false;
            }else{
                if(this.shopSortId!=undefined){
                    this.pages++;          
                    this.$http.post("/mobile/merch/getlist",{
                        limit:6,
                        page:this.pages,
                        cateid:this.shopSortId,
                        lng:this.lng,
                        lat:this.lat,
                        area:this.ccode,
                    }).then(res=>{
                        console.log(res.data);
                        if(res.data.status==1){
                            let jsArr = res.data.result.list;
                            console.log("2",jsArr)
                            if(this.shopList!=''){
                                if(jsArr==''){  //数据已加载完毕
                                    this.$Message.info({
                                        content:'该类商家已加载完'
                                    })
                                    this.datastatus = 1;
                                    this.loading = false;
                                    return false;
                                    
                                }
                                jsArr.forEach(element => {
                                    this.shopList.push(element)
                                });
                            }
                        }else{
                            this.$Message.info({
                                content:res.data.message
                            })

                        }
                        
                    }); 
                }else{
                    this.pages++;          
                    this.$http.post("/mobile/merch/getlist",{
                        limit:6,
                        page:this.pages,
                        lng:this.lng,
                        lat:this.lat,
                        area:this.ccode,
                    }).then(res=>{
                        console.log(res.data);
                        if(res.data.status==1){
                            let jsArr = res.data.result.list;
                            if(jsArr==''){  //数据已加载完毕
                                this.$Message.info({
                                    content:'该类商品已加载完'
                                })
                                this.datastatus = 1;
                                this.loading = false;
                                return false;
                            }
                            jsArr.forEach(element => {
                                this.shopList.push(element)
                            });
                        }else{
                            this.$Message.info({
                                content:res.data.message
                            })
                        }
                    });
                }
            }   
        }
    },
    created(){
        this.user=localStorage.getItem('ms_userinfo')
        this.cid=this.$route.query.cid
        this.lng=localStorage.getItem('lng')
        this.lat=localStorage.getItem('lat')
        this.ccode=localStorage.getItem('ccode')
        console.log('8888',this.defaultinp)
        if(this.user!=null&&this.user!=''&&this.user!=undefined){
            this.$http.post("/mobile/merchcate/getlist",{
                lng:this.lng,
                lat:this.lat,
                area:this.ccode,
            }).then(res=>{
                if(res.data.status==1){
                    this.shopSortList=res.data.result.list
                    for (const iterator of this.shopSortList) { //es6遍历数组，遍历结果为对象
                        iterator.isShow = 0 ;
                    }
                    console.log("3",this.shopSortList)
                    if(this.cid){
                        this.$http.post("mobile/merch/getlist",{
                            activityid:this.cid,
                            lng:this.lng,
                            lat:this.lat,
                        }).then(res=>{
                            if(res.data.status==1){
                                this.shopList=res.data.result.list
                                console.log("有ID",res)
                            }else{
                                this.$Message.info({
                                    content:res.data.message
                                })
                            }
                        })
                    }else{
                        this.shopSortList[0].isShow=1;
                        this.shopSortId=this.shopSortList[0].id
                        this.$http.post("/mobile/merch/getlist",{
                            cate:this.shopSortId,
                            lng:this.lng,
                            lat:this.lat,
                            area:this.ccode,
                        }).then(res=>{
                            if(res.data.status==1){
                                this.shopList=res.data.result.list
                                console.log("555",res)
                            }else{
                                this.$Message.info({
                                    content:res.data.message
                                })
                            }
                        })
                    }
                }else{
                    this.$Message.info({
                        content:res.data.message
                    })
                }
            
            })
        }
    },
    mounted() {
        

    },

}  
</script>
<style lang="" scoped>
@import url('../../assets/css/storeClassify.css');
.storeClassify_cont{
    width: 100%;
    height: 100%;
    background-color: #F3F5F7;
    position: relative;
    overflow: hidden;
}

</style>
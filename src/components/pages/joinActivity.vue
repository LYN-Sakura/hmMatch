<template>
    <div class="allActivity_cont">
        <Header :show='1'>
            <span slot="top_text">参与活动</span>
        </Header>
        <!-- 头部搜索 -->
        <div class="allActSearch">
            <div class="allActSearchInp">
                <img src="../../../static/images/allActivity/cnopps2.png" alt="">
                <input type="text" placeholder="请输入关键字搜索商家" v-model='inps' @keyup="searchInp">
            </div>
        </div>
        <div class="allActivity">
            <!-- xx霸王免单活动 -->
            <div class="allActHotEvent">
                <ul>
                    <li v-for="(item,index) in allActList" :key="index">
                        <div class="allActEventT" :style="{'background':'url('+`../../../../static/images/actStyle${item.style}.png`+')'}" >
                            <p>{{item.title}}</p>
                            <P><span @click.prevent="goCardDetail(item.id,item.title)">查看活动详情</span></P>
                        </div>
                        <div class="allActEventB">
                            <span>{{item.city_text}}</span>
                            <span>剩余时间:{{ item.djs }}</span>
                        </div>
                    </li>
                </ul>
                <!-- 展开更多 -->
                <!-- <div class="allActEvent-btn">
                    <span @click="getMore">{{loadtext}}</span>
                    <img :src="loadtext=='展开更多'?'../../../static/images/allActivity/cnopps8.png':''" alt="">
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../component/header'
export default{
    name:'',
    props:[''],
    data() {
        return{
            id:this.$route.query.id,  //商家ID
            allActList:[],//所有活动的列表
            limit:4,//显示默认条数
            page:1,//显示默认页数
            loadtext:'展开更多',
            inps:''
        }
    },
    components: {
        Header,
    },
    methods: {
        getallActList(){
            //获取所有活动的列表
            if(this.id){
                this.$http.post("/mobile/active/listing",{
                    merchid:this.id,
                    keyword:this.inps
                }).then(res=>{
                    // console.log("商家参与的活动",res)
                    if(res.data.status==1){
                        if(res.data.result.list!=""){
                            this.allActList=res.data.result.list
                            console.log(this.allActList)
                        }else{
                            this.allActList=[]  //没有找到为空
                            this.$Message.info("未找到相关活动");
                        }
                    }else{
                        this.$Message.error(res.data.message)
                    }
                })
            }else{
                this.$http.post("/mobile/cardlog/mylog",{
                    keyword:this.inps
                }).then(res=>{
                    // console.log("会员参与的活动",res)
                    if(res.data.status==1){
                        if(res.data.result.list!=""){
                            this.allActList=res.data.result.list
                            console.log(this.allActList)
                        }else{
                            this.allActList=[]  //没有找到为空
                            this.$Message.info("未找到相关活动");
                        }
                    }else{
                        this.$Message.error(res.data.message)
                    }
                })
            }
            
            
            
        },
        //头部搜索
        searchInp(){
            this.getallActList()
        },
        //跳转活动详情
        goCardDetail(cid,cname){
            this.$router.push({
                path:'./activityDetail',
                query:{
                    cid:cid
                }
            })
        },
        //加载更多
        // getMore(){
        //     this.page++;
        //     this.$http.post("/mobile/active/listing",{
        //         limit:this.limit,
        //         page:this.page,
        //         city:localStorage.getItem("ccode")
        //     }).then(res=>{
        //         let thisactList=res.data.result.list
        //         console.log(thisactList)
        //         if(thisactList!=""||thisactList!=null){
        //             // this.$Message.info("数据加载完毕！");
        //             thisactList.forEach(item=>{
        //                 this.allActList.push(item)
        //             })
        //             if(thisactList.length<=4){
        //                 this.$Message.info("数据加载完毕！");
        //                 this.loadtext="数据已全部加载"
        //             }
        //         }else{
                    
        //         }
        //     }).catch(err => {
        //         this.$Message.error(err.data.message);
        //     })
        // },
    },
    created(){
        this.getallActList()
    },
    mounted() {
        setInterval( ()=> {
            for (var key in this.allActList) {
                let aaa = parseInt( this.allActList[key]["endtime"]*1000 );
                let bbb = new Date().getTime();
                let rightTime = aaa - bbb;
                //console.log('rightTime',rightTime)
                if (rightTime > 0) {
                    let dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
                    let hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
                    let mm = Math.floor((rightTime / 1000 / 60) % 60);
                    let ss = Math.floor((rightTime / 1000) % 60);
                    dd=dd<10 ? '0' + dd : dd;
                    hh=hh<10 ? '0' + hh : hh;
                    mm=mm<10 ? '0' + mm : mm;
                    ss=ss<10 ? '0' + ss : ss;
                    // this.list[key]["djs"] = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
                    this.$set(this.allActList[key],'djs',dd + "天" + hh + "小时" + mm + "分" + ss + "秒")
                }else{
                    // this.list[key]["djs"]="已结束"
                    this.$set(this.allActList[key],'djs','已结束')
                }
                
            }
        }, 1000);
        
    },

}  
</script>
<style lang="" scoped>
* {
    list-style: none;
    vertical-align:middle;
    outline: none;
}
.allActivity_cont{
    width: 100%;
    height: 100%;
    background-color: #F3F5F7;
    position: relative;
    overflow: hidden;
}
.allActSearch{
    width: 100%;
    padding: 0 1rem;
    height: 3.2rem;
    background-color: #EBECEC;
    position: absolute;
    left: 0;
    top: 2.7rem;
    display: flex;
    /* justify-content: center; */
    align-items: center;
    /* z-index: 2; */
}
.allActSearch p{
    font-size: 1rem;
}
.allActSearchImg1{
    width: 0.8rem;
    height: 0.4rem;
    margin-left: 0.4rem;
    margin-bottom: 0.4rem;
}
.allActSearchImg1 img{
    width:100%;
    height:100%;
}
.allActSearchInp{
    width: 100%;
    height: 2rem;
    border-radius: 1rem;
    background-color: #ffffff;
}
.allActSearchInp img{
    margin-top: 0.3rem;
    width: 1rem;
    height: 1rem;
}
.allActSearchInp input{
    font-size: 0.9rem;
    margin-top: 0.3rem;
    width: 85%;
    height: 1.5rem;
}
.allActivity{
    width: 100%;
    height: 100%;
    margin-top: 5.9rem;
    padding-bottom: 0;
    overflow: scroll;
    -webkit-overflow-scrolling:touch;
}::-webkit-scrollbar{
    display: none;
}
/* xx霸王免单活动 */
.allActHotEvent{

    width: 100%;
    background-color: #FFFFFF;
}
.allActHotEvent ul{
    padding: 0.2rem 0 1.3rem 0;
    border-bottom:1px solid #EFEFF4; 
}
.allActHotEvent ul li{
    width: 100%;
    margin-top: 0.6rem;
}
.allActEventT{
    width: 100%;
    height: 8rem;
    /* background: url("../../../static/images/allActivity/cnopps4.png"); */
    background-size:100% 100%!important;
    border-radius:10px;
}
.allActEventT p:nth-child(1){
    /* line-height: 4rem; */
    font-size:1.5rem;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:#FFFFFF;
    padding-top: 1.75rem;
    text-align: center;  
}
.allActEventT p:nth-child(2){
    text-align: center;
    margin-top: 0.625rem;  
}
.allActEventT p:nth-child(2) span{
    font-size:0.55rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:#FFFFFF;
    padding: 0.3rem 1.3rem;
    background-color: #000000;
    border-radius:10px 0 10px 0;
}
.allActEventB{
    overflow: hidden;
}
.allActEventB span:nth-child(1){
    font-size:0.6rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    float: left;
    margin-left: 0.75rem;
    color: #AE8339;
}
.allActEventB span:nth-child(2){
    font-size:0.65rem;
    float: right;
    margin-right: 0.75rem;
}
.allActEventT-two{
    width: 100%;
    height: 7rem;
    background: url("../../../static/images/allActivity/cnopps5.png");
    background-size:100% 100%;
    border-radius:10px;
}
.allActEventT-two p:nth-child(1){
    /* line-height: 4rem; */
    font-size:1.5rem;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:#FFFFFF;
    padding-top: 1.75rem;
    text-align: center;  
}
.allActEventT-two p:nth-child(2){
    text-align: center;
    margin-top: 0.625rem;  
}
.allActEventT-two p:nth-child(2) span{
    font-size:0.55rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:#FFFFFF;
    padding: 0.3rem 1.3rem;
    background-color: #000000;
    border-radius:10px 0 10px 0;
}
.allActEventT-three{
    width: 100%;
    height: 7rem;
    background: url("../../../static/images/allActivity/cnopps6.png");
    background-size:100% 100%;
    border-radius:10px;
}
.allActEventT-three p:nth-child(1){
    /* line-height: 4rem; */
    font-size:1.5rem;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:#FFFFFF;
    padding-top: 1.75rem;
    text-align: center;  
}
.allActEventT-three p:nth-child(2){
    text-align: center;
    margin-top: 0.625rem;  
}
.allActEventT-three p:nth-child(2) span{
    font-size:0.55rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:#FFFFFF;
    padding: 0.3rem 1.3rem;
    background-color: #000000;
    border-radius:10px 0 10px 0;
}
.allActEventT-four{
    width: 100%;
    height: 7rem;
    background: url("../../../static/images/allActivity/cnopps7.png");
    background-size:100% 100%;
    border-radius:10px;
}
.allActEventT-four p:nth-child(1){
    /* line-height: 4rem; */
    font-size:1.5rem;
    font-family:PingFang-SC-Heavy;
    font-weight:800;
    color:#FFFFFF;
    padding-top: 1.75rem;
    text-align: center;  
}
.allActEventT-four p:nth-child(2){
    text-align: center;
    margin-top: 0.625rem;  
}
.allActEventT-four p:nth-child(2) span{
    font-size:0.55rem;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:#FFFFFF;
    padding: 0.3rem 1.3rem;
    background-color: #000000;
    border-radius:10px 0 10px 0;
}
/* .allActEvent-btn{
    width: 100%;
    height: 2.5rem;
    display: flex;
    justify-content: center;
    align-items: center;
}
.allActEvent-btn span{
    font-size: 0.8rem;
    margin-right: 0.5rem;
}
.allActEvent-btn img{
    width: 0.7rem;
    height: 0.3rem;
} */
</style>
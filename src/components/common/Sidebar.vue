<template>
    <div class="sidebarleft" style="background-color:#1E222B">
        <el-menu v-show="noindex" :collapse="collapse" :default-active="$route.path" :default-openeds="subindexarr"
        class="el-menu-vertical-demo sidebar-el-menu" 
        background-color="#1E222B" text-color="#fff" @open="opensub" @close="closesub" active-text-color="red" unique-opened router>
            <template v-for="item in items">
                <template v-if="item.subs">
                    <el-submenu :index="item.index" :key="item.index">
                        <template slot="title">
                            <i :class="item.icon">
                                <img style="margin-bottom:3px" :src="item.img" alt="" v-if="(item.index != openindex)||(item.index == closeindex)">
                                <img style="margin-bottom:3px" :src="item.img1" alt="" v-if="(item.index == openindex)&&(item.index!= closeindex)">
                            </i>
                            <!-- <i class="Open" v-if="(item.index == openindex)&&(item.index!= closeindex)"><img src="../../../static/img/下拉icon.png" alt=""></i> -->
                            <!-- <i class="Close" v-if="(item.index != openindex)||(item.index == closeindex)"><img src="../../../static/img/下拉icon2.png" alt=""></i> -->

                            <span slot="title" class="title_span" :class="(item.index == openindex)&&(item.index!= closeindex)? color_green :''">{{ item.title }}</span>
                        </template>
                        <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" @click="slideclick(item,subItem)">
                            {{subItem.title}}
                        </el-menu-item>
                    </el-submenu>
                </template>
                <template v-else>
                    <el-menu-item :index="item.index" :key="item.index">
                        <!-- <i :class="item.icon"></i> -->
                        <span slot="title">{{ item.title }}</span>
                    </el-menu-item>
                </template>
            </template>
        </el-menu>
    </div>
</template>
<script>
import bus from './bus.js'
export default {
    data() {
        return {
            collapse: false,
            usertype: "",
            openindex: "",
            closeindex: "",
            color_green: "color_green",
            items:[],
            noindex:true,
            subindexarr:[],
            ms_menu:'',
            indextab:[
                {
                    img: "",
                    img1:"",
                    index: "/index",
                    title: "数据概况",
                },
                // {
                //     img: "",
                //     img1:"",
                //     index: "/bannerset",
                //     title: "轮播图设置",
                // },
                // {
                //     img: "",
                //     img1:"",
                //     index: "/Activeset",
                //     title: "热门活动设置",
                // },
                // {
                //     img: "",
                //     img1:"",
                //     index: "/bigBusSet",
                //     title: "大牌商家设置",
                // }, 
                ],
           
            shoptab:[{
                img: "",
                img1:"",
                index: "/shop",
                title: "商户列表",
            },
            // {
            //     img: "",
            //     img1:"",
            //     index: "/shopclass",
            //     title: "商家分类",
            // }
            ],
            
            //会员页
            membertab:[
                {
                    img: "",
                    img1:"",
                    index: "/memberlist",
                    title: "会员列表",
                }
            ],
            //会员卡
            membercardtab: [
                {
                    img: "",
                    img1:"",
                    index: "/StoreList",
                    title: "免单卡列表",
                },
                {
                    img: "",
                    img1:"",
                    index: "/Purchaserecords",
                    title: "购卡记录",
                },
            ],
            //优惠券
            coupontab:[
                {
                    img: "",
                    img1:"",
                    index: "/afterCoupon",
                    title: "优惠券列表",
                },
                {
                    img: "",
                    img1:"",
                    index: "/getCoupon",
                    title: "优惠券领取记录",
                },
            ],
            //活动页
            activetab:[
                {
                    img: "",
                    img1:"",
                    index: "/active",
                    title: "活动列表",
                },
                // {
                //     img: "",
                //     img1:"",
                //     index: "/couponSort",
                //     title: "优惠券种类",
                // }
            ],
            
            moneytab:[
                {
                    img: "",
                    img1:"",
                    index: "/money",
                    title: "余额明细",
                },
                {
                    img: "",
                    img1:"",
                    index: "/outlog",
                    title: "提现记录",
                }
            ],
            settab:[
                {
                    img: "",
                    img1:"",
                    index: "/paysetlist",
                    title: "支付设置",
                },
                // {
                //     img: "",
                //     img1:"",
                //     index: "/lunbolist",
                //     title: "轮播图设置",
                // },
                {
                    img: "",
                    img1:"",
                    index: "/allset",
                    title: "综合设置",
                },
                {
                    img: "",
                    img1:"",
                    index: "/manager",
                    title: "管理员设置",
                },
            ],

            defaultitems:[],
            // indexarr:['index','bannerset','Activeset','bigBusSet'],
            indexarr:['index'],
            shoparr:['shop'],
            moneyarr:['money','outlog'],
            setarr:['paysetlist','lunbolist','allset','manager'],
            activearr:['active',],
            memberarr:['memberlist'],
            couponarr:['afterCoupon','getCoupon',],
            membercardarr: ['StoreList','Purchaserecords'],
        }
    },
    methods: {
        opensub(key, keyPath) {
            // console.log('open',key, keyPath);
            this.openindex = key;
            this.closeindex = "";
        },
        closesub(key, keyPath) {
            // console.log('close',key, keyPath);
            this.closeindex = key;
            this.openindex = "";
        },
        slideclick(item, sub) {
            // this.$router.push(sub.index);
            // console.log(sub);
        },
        watchroute(){
            this.items = JSON.parse(localStorage.getItem('ms_tab')) 
            // console.log(this.items,888)
            //  if(this.items[0].index=='/index'){
            //         // this.noindex = false
            //     }else{
            //         this.noindex = true
            //     }
            this.$emit('noIndex',this.noindex)
        }
    },
    watch: {
    //监听路由变化
        $route(to, from) {
            //路由的name
            // console.log(to,from)
            if(this.indexarr.includes(to.name)){
                this.openindex="index"
                let ms_tabstr = JSON.stringify(this.indextab)
                localStorage.setItem('ms_tab',ms_tabstr)
            }else if(this.shoparr.includes(to.name)){
                this.openindex="shop"
                let ms_tabstr = JSON.stringify(this.shoptab)
                localStorage.setItem('ms_tab',ms_tabstr)
            }else if(this.moneyarr.includes(to.name)){
                this.openindex="money"
                let ms_tabstr = JSON.stringify(this.moneytab)
                localStorage.setItem('ms_tab',ms_tabstr)
            }else if(this.activearr.includes(to.name)){
                this.openindex="active"
                let ms_tabstr = JSON.stringify(this.activetab)
                localStorage.setItem('ms_tab',ms_tabstr)
            }else if(this.memberarr.includes(to.name)){
                this.openindex="memberlist"
                let ms_tabstr = JSON.stringify(this.membertab)
                localStorage.setItem('ms_tab',ms_tabstr)
            }
            else if(this.setarr.includes(to.name)){
                this.openindex="paysetlist"
                let ms_tabstr = JSON.stringify(this.settab)
                localStorage.setItem('ms_tab',ms_tabstr)
            }else if(this.couponarr.includes(to.name)){
                this.openindex="afterCoupon"
                let ms_tabstr = JSON.stringify(this.coupontab)
                localStorage.setItem('ms_tab',ms_tabstr)
            }else if(this.membercardarr.includes(to.name)){
                this.openindex="StoreList"
                let ms_tabstr = JSON.stringify(this.membercardtab)
                localStorage.setItem('ms_tab',ms_tabstr)
            }
            
            sessionStorage.setItem('openindex',this.openindex)
            sessionStorage.setItem('now_index',this.now_index)
            this.watchroute()

        }
    },
    created(){
        this.openindex = sessionStorage.getItem('openindex')
        this.watchroute()
    },
};
</script>
<style lang="less">
@import "./less/app";
.sidebarleft {
    float: left;
    position: absolute;
    top: 60px;
    bottom: 0;
    overflow-y: scroll;
    padding-top: 11px;
    .el-menu{
        /deep/ li.is-active div{
            // background-color: green !important;
            color: #FE4A8B;
        }
    }
    // .color_green {
    //     color: red !important;
    //     background-color: green;
    // }
    .el-menu{
        border-right: none;
    }
    &::-webkit-scrollbar {
        width: 0;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width:177px; /* 左侧公共侧边栏的宽度 */
    }

    .title_span {
        margin-left: 5px;
        // overflow-y: scroll;
    }
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 177px !important; /* 左侧公共侧边栏的宽度 */
    }
    & > ul {
        background-color: #1A293C;
        height: 100%;
    }
    /* 二级目录 */
    .el-menu-item {
       
        box-sizing: border-box;
        font-size: 14px;
        height: 48px;
        line-height: 48px;
        text-align: center;
        color:#FFFFFF;
        opacity:0.5;
    }
    .el-menu-item.is-active {
        color: #1E222B!important;
        opacity:1;
       background:linear-gradient(90deg,rgba(203,163,99,1) 0%,rgba(225,196,147,1) 100%); 
    }
    .el-menu-item i {
        margin-right: 30px;
    }
    .is-active {
        color: white !important;
        /* border: 1px #FE7D6F solid; */
    }
    .el-submenu /deep/ .el-submenu__title {
        padding-left: 35px !important;
        font-size: 14px;
        color: #fff !important;
    }
    .el-submenu /deep/ .el-submenu__icon-arrow {
        // right:40px;
        // font-size:16px;
        color: white;
        // background-image: url('../../../static/img/index/icon_childOpen.png');
        // display: none;
    }
}
</style>


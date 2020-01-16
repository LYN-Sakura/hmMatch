<template>
    <div class="sidebarright" :class="close_menu?'':'close_menu'">
        <div class="collapse" @click="collapsebtn()">
            <img src="" alt="">
        </div>
        <div class="sidemenu_box">
            <!-- :default-active="$route.path" -->
            <el-menu class="el-menu-vertical-demo sidebar-el-menu"  background-color="#fff" text-color="#333" active-text-color="#333" unique-opened router>
                <template v-for="item in items" >
                    <template v-if="item.subs">
                        <el-submenu :index="item.index" :key="item.index">
                            <template slot="title">
                                <!-- <i :class="item.icon">
                                    <img style="margin-bottom:3px" :src="item.img" alt="" v-if="(item.index != openindex)||(item.index == closeindex)">
                                    <img style="margin-bottom:3px" :src="item.img1" alt="" v-if="(item.index == openindex)&&(item.index!= closeindex)">
                                </i> -->
                                <img :src="item.img">
                                <!-- <span slot="title" class="title_span" :class="(item.index == openindex)&&(item.index!= closeindex)? color_Orange :''">{{ item.title }}</span> -->
                                <span slot="title" class="title_span">{{ item.title }}</span>
                                <!-- <span class="Open" v-if="(item.index == openindex)&&(item.index!= closeindex)"><img src="../../../static/img/下拉icon.png" alt=""></span>
                                <span class="Close" v-if="(item.index != openindex)||(item.index == closeindex)"><img src="../../../static/img/下拉icon2.png" alt=""></span> -->
                            </template>
                            <el-menu-item v-for="(subItem,i) in item.subs" :key="i" :index="subItem.index" @click="slideclick(item,subItem)">
                                <i class="subitemnum">（{{subItem.num}}）</i>{{subItem.title}} 
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

    </div>
</template>
<script>
export default {
    data() {
        return {
            close_menu: false,
            isOpen: false,
            ms_open: false,
            ms_level:sessionStorage.getItem("ms_level"),
            items:[],
            items1: [
                {
                    img: "",
                    index: "ordermsg",
                    title: "订单消息",
                    subs: [
                        {
                            title: "待发货订单",
                            index: "/toSendgoods",
                            num: 8
                        },
                        {
                            title: "待付款订单",
                            index: "/obligation",
                            num: 8
                        },
                        {
                            title: "维权待审核订单",
                            index: "/legalapply",
                            num: 8
                        },
                    ]
                },
                {
                    img: "",
                    index: "noticelist",
                    title: "内部公告",
                    subs: [
                        {
                            title: "公告",
                            index: "/noticelist",
                            num: 1
                        }
                    ]
                },
                {
                    img: "",
                    index: "storeevaluate",
                    title: "评价",
                    subs: [
                        {
                            title: "商品评价",
                            index: "/productlist",
                            num: 0
                        }
                    ]
                }
            ],
            items3: [
                {
                    img: "",
                    index: "ordermsg",
                    title: "订单消息",
                    subs: [
                        {
                            title: "待发货订单",
                            index: "/toSendgoods",
                            num: 8
                        },
                        {
                            title: "待付款订单",
                            index: "/obligation",
                            num: 8
                        },
                    ]
                },
                {
                    img: "",
                    index: "storeevaluate",
                    title: "评价",
                    subs: [
                        {
                            title: "商品评价",
                            index: "/productlist",
                            num: 0
                        }
                    ]
                }
            ],
            items2: [
                {
                    img: "",
                    index: "ordermsg",
                    title: "订单消息",
                    subs: [
                        {
                            title: "待发货订单",
                            index: "/toSendgoods",
                            num: 8
                        },
                        {
                            title: "待付款订单",
                            index: "/obligation",
                            num: 8
                        },
                        {
                            title: "维权待审核订单",
                            index: "/legalapply",
                            num: 8
                        },
                    ]
                },
                {
                    img: "",
                    index: "storeevaluate",
                    title: "评价",
                    subs: [
                        {
                            title: "商品评价",
                            index: "/productlist",
                            num: 0
                        }
                    ]
                }
            ],
            
        };
    },
    methods: {
        handleOpen(key, keyPath) {
            // console.log(key, keyPath);
        },
        handleClose(key, keyPath) {
            // console.log(key, keyPath);
        },
        collapsebtn() {
            this.ms_open = JSON.parse(sessionStorage.getItem("ms_open"));
            sessionStorage.setItem("ms_open", !this.ms_open);
            this.close_menu = !this.ms_open;
            this.isopen();
            this.getorder()
        },
        slideclick(item, sub) {
            // this.$router.push(sub.index);
            // console.log(sub);
        },
        isopen() {
            this.ms_open = JSON.parse(sessionStorage.getItem("ms_open"));
            console.log(this.ms_open)
            
            if (this.ms_open == false) {
                this.isOpen = false;
            } else {
                this.isOpen = true;
            }
            // console.log('this.isOpen',this.isOpen)
            // return
            this.$emit("isopen", this.isOpen);
        },
        getorder(){
            // this.$http.post(this.api + 'admin/system/homenumber',{}).then(res=>{
            //     if(res.data.status==1){
            //         if(this.ms_level==0||this.ms_level==0){
            //             this.items[0].subs[0].num=+res.data.result.dfhorders
            //             this.items[0].subs[1].num=+res.data.result.dfkorders
            //             this.items[0].subs[2].num=+res.data.result.dshorders
            //             this.items[1].subs[0].num=+res.data.result.notice
            //             this.items[2].subs[0].num=+res.data.result.evaluate
            //         }else if(this.ms_level==2){
            //             this.items[0].subs[0].num=+res.data.result.dfhorders
            //             this.items[0].subs[1].num=+res.data.result.dfkorders
            //             this.items[0].subs[2].num=+res.data.result.dshorders
            //             this.items[1].subs[0].num=+res.data.result.evaluate
            //         }else{
            //             this.items[0].subs[0].num=+res.data.result.dfhorders
            //             this.items[0].subs[1].num=+res.data.result.dfkorders
            //             this.items[1].subs[0].num=+res.data.result.evaluate
            //         }
            //     }
            // })
        }
    },
    watch: {
        //监听路由变化
        $route(to, from) {}
    },
    created() {
        // this.isopen();
        // this.ms_level==sessionStorage.getItem("ms_level")
        // if(this.ms_level==3){
        //     this.items=this.items3
        // }else if(this.ms_level==2){
        //     this.items=this.items2
        // }else{
        //      this.items=this.items1
        // }
        // this.getorder()
    }
};
</script>
<style lang="less">
.sidebarright {
    position: absolute;
    right: 0;
    top: 60px;
    bottom: 0;
    background-color: #fff;
    width: 260px;
    .sidebar-el-menu:not(.el-menu--collapse) {
        width: 260px !important; /* 左侧公共侧边栏的宽度 */
    }
    .sidemenu_box {
        height: 100%;
        width: 260px;
        float: right;
        overflow-y: scroll;
        overflow-x: hidden;
        transition: all 0.5s ease-in-out;
        .el-submenu__title:hover {
            // background-color: rgba(40, 183, 163,.1) !important;
            background-color: #fff !important;
            // padding-right: 30px !important;
        }
        li {
            background-color: #e8e8e8 !important;
            img{
                margin:0px 5px 0 5px;
            }
            .subitemnum {
                float: right;
                color: #28b7a3;
                margin-right: 0px;
            }
        }
    }
    ::-webkit-scrollbar {
        /* 滚动条整体部分 */
        display: none;
    }
    .collapse {
        cursor: pointer;
        width: 26px;
        height: 100px;
        background-color: white;
        border-radius: 10px 0 0 10px;
        position: absolute;
        line-height: 100px;
        text-align: center;
        left: -27px;
        z-index: 99;
        top: 40%;
        transition: left 0.5s ease-in-out;
        img {
            transition: all 0.5s ease-in-out;
        }
    }
}
.close_menu {
    position: absolute;
    // right: -200px;
    top: 60px;
    bottom: 0;
    .collapse {
        position: absolute;
        transition: left 0.5s ease-in-out;
        left: 233px;
        img {
            transform: rotate(180deg);
        }
    }
    .sidemenu_box {
        transition: all 0.5s ease-in-out;
        width: 0px;
    }
}
</style>
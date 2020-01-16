import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);
//requireAuth:true  设置meta中，用于路由拦截钩子判断该页面组件是否需要登录获取进入权限
export default new Router({
  // mode:'history',
  routes: [
    //pc端
    {
      path: "/"
    },
    {
      path: "/login",
      name: "login",
      component: resolve =>
        require(["../components/admin/login/login.vue"], resolve),
      meta: {
        title: "登录"
      }
    },
    {
      path: "/",
      component: resolve => require(["../components/common/Home.vue"], resolve),
      meta: {
        title: "文件"
      },
      children: [
        // 首页模块
        {
          path: "/index",
          name: "index",
          component: resolve =>
            require(["../components/admin/index/index.vue"], resolve),
          meta: {
            title: "数据概况"
          }
        },
        {
          path: "/bannerset",
          name: "bannerset",
          component: resolve =>
            require([
              "../components/admin/IndexSet/banner/bannerset.vue"
            ], resolve),
          meta: {
            title: "轮播图设置"
          }
        },
        {
          path: "/addppt",
          name: "addppt",
          component: resolve =>
            require([
              "../components/admin/IndexSet/banner/addppt.vue"
            ], resolve),
          meta: {
            title: "添加幻灯片"
          }
        },
        {
          path: "/Activeset",
          name: "Activeset",
          component: resolve =>
            require([
              "../components/admin/IndexSet/ActiveList/Activeset.vue"
            ], resolve),
          meta: {
            title: "热门活动设置"
          }
        },
        {
          path: "/bigBusSet",
          name: "bigBusSet",
          component: resolve =>
            require([
              "../components/admin/IndexSet/bigBus/bigBusSet.vue"
            ], resolve),
          meta: {
            title: "大牌商家设置"
          }
        },
        // 商家模块
        {
          path: "/shop",
          name: "shop",
          component: resolve =>
            require(["../components/admin/shop/shop.vue"], resolve),
          meta: {
            title: "商家列表"
          }
        },
        {
          path: "/addlevel",
          name: "addlevel",
          component: resolve =>
            require([
              "../components/admin/member/memberlevel/addlevel.vue"
            ], resolve),
          meta: {
            title: "商家 - 商家列表 - 新增商家"
          }
        },
        {
          path: "/StoreList",
          name: "StoreList",
          component: resolve =>
            require([
              "../components/admin/shopinfo/StoreList/StoreList.vue"
            ], resolve),
          meta: {
            title: "免单卡列表"
          }
        },
        {
          path: "/nosingcard",
          name: "nosingcard",
          component: resolve =>
            require([
              "../components/admin/shopinfo/nosingcard/nosingcard.vue"
            ], resolve),
          meta: {
            title: "商家 - 免单卡列表"
          }
        },
        {
          path: "/Purchaserecords",
          name: "Purchaserecords",
          component: resolve =>
            require([
              "../components/admin/shopinfo/Purchaserecords/Purchaserecords.vue"
            ], resolve),
          meta: {
            title: "购卡记录"
          }
        },
        {
          path: "/shopclass",
          name: "shopclass",
          component: resolve =>
            require([
              "../components/admin/shopinfo/shopclass/shopclass.vue"
            ], resolve),
          meta: {
            title: "商家分类"
          }
        },
        {
          path: "/addshopclass",
          name: "addshopclass",
          component: resolve =>
            require([
              "../components/admin/shopinfo/shopclass/addshopclass.vue"
            ], resolve),
          meta: {
            title: "添加商家分类"
          }
        },
        //会员模块
        {
          path: "/memberlist",
          name: "memberlist",
          component: resolve =>
            require(["../components/admin/member/memberList.vue"], resolve),
          meta: {
            title: "会员-会员列表"
          }
        },
        {
          path: "/memberInfo/:id",
          name: "memberInfo",
          component: resolve =>
            require(["../components/admin/member/memberInfo.vue"], resolve),
          meta: {
            title: "会员-会员列表"
          }
        },

        //活动
        {
          path: "/active",
          name: "active",
          component: resolve =>
            require(["../components/admin/active/active.vue"], resolve),
          meta: {
            title: "活动列表"
          }
        },
        {
          path: '/addProduct',
          name: 'addProduct',
          component: resolve => require(['../components/admin/active/addProduct.vue'], resolve),
          meta: {
            title: '活动-添加活动'
          }
        },
        {
          path: "/addProduct/:id",
          name: "addProduct",
          component: resolve =>
            require(["../components/admin/active/addProduct.vue"], resolve),
          meta: {
            title: "活动-修改活动"
          }
        },
        {
          path: "/afterCoupon",
          name: "afterCoupon",
          component: resolve =>
            require(["../components/admin/active/afterCoupon.vue"], resolve),
          meta: {
            title: "优惠券列表"
          }
        },
        {
          path: '/addCoupon',
          name: 'addCoupon',
          component: resolve => require(['../components/admin/active/addCoupon.vue'], resolve),
          meta: {
            title: '活动-添加优惠券'
          }
        },
        {
          path: "/addCoupon/:id",
          name: "addCoupon",
          component: resolve =>
            require(["../components/admin/active/addCoupon.vue"], resolve),
          meta: {
            title: "活动-修改优惠券"
          }
        },
        {
          path: "/getCoupon",
          name: "getCoupon",
          component: resolve =>
            require(["../components/admin/active/getCoupon.vue"], resolve),
          meta: {
            title: "优惠卷领取记录"
          }
        },
        {
          path: "/cancelRecord",
          name: "cancelRecord",
          component: resolve =>
            require(["../components/admin/active/cancelRecord.vue"], resolve),
          meta: {
            title: "活动-核销记录"
          }
        },
        // {
        //   path:'/couponSort',
        //   name:'couponSort',
        //   component: resolve => require(['../components/admin/active/couponSort.vue'], resolve),
        //   meta: {
        //     title: '优惠券种类'
        //   }
        // },
        // {
        //   path: '/addClassify',
        //   name: 'addClassify',
        //   component: resolve => require(['../components/admin/active/addClassify.vue'], resolve),
        //   meta: {
        //     title: '活动-添加新分类'
        //   }
        // },
        // {
        //   path: '/addClassify/:id',
        //   name: 'addClassify',
        //   component: resolve => require(['../components/admin/active/addClassify.vue'], resolve),
        //   meta: {
        //     title: '活动-添加新分类'
        //   }
        // },
        //优惠券
   
        //财务
        {
          path: "/money",
          name: "money",
          component: resolve =>
            require(["../components/admin/money/money.vue"], resolve),
          meta: {
            title: "余额明细"
          }
        },
        {
          path: "/outlog",
          name: "outlog",
          component: resolve =>
            require(["../components/admin/money/outlog.vue"], resolve),
          meta: {
            title: "提现记录"
          }
        },
        //设置
        
        {
          path: "/paysetlist",
          name: "paysetlist",
          component: resolve =>
            require(["../components/admin/set/paysetlist/paysetlist.vue"], resolve),
          meta: {
            title: "支付设置"
          }
        },
        {
          path: "/lunbolist",
          name: "lunbolist",
          component: resolve =>
            require(["../components/admin/set/lunbo/lunbolist.vue"], resolve),
          meta: {
            title: "轮播图设置"
          }
        },
        {
          path: "/allset",
          name: "allset",
          component: resolve =>
            require(["../components/admin/set/allset/allset.vue"], resolve),
          meta: {
            title: "综合设置"
          }
        },
        {
          path: "/manager",
          name: "manager",
          component: resolve =>
            require(["../components/admin/set/manager/manager.vue"], resolve),
          meta: {
            title: "管理员设置"
          }
        },
        {
          path: "/addpayset",
          name: "addpayset",
          component: resolve =>
            require(["../components/admin/set/paysetlist/addpayset.vue"], resolve),
          meta: {
            title: "添加支付设置"
          }
        },
        {
          path: '/addperson',
          name: 'addperson',
          component: resolve => require(['../components/admin/set/manager/addperson'], resolve),
          meta: {
            title: '添加管理员'
          }
        },
        {
          path: '/addperson/:id',
          name: 'addperson',
          component: resolve => require(['../components/admin/set/manager/addperson'], resolve),
          meta: {
            title: '编辑管理员'
          }
        },
      ]
    },
    // 手机端

    {
      path: "/mobile_login",
      name: "mobile_login",
      component: resolve =>
        require(["../components/pages/login/login.vue"], resolve),
      meta: { title: "登录页" }
    },
    {
      path: "/register",
      name: "register",
      component: resolve =>
        require(["../components/pages/register/register.vue"], resolve),
      meta: { title: "注册页" }
    },
    {
      path: "/forgetpass",
      name: "forgetpass",
      component: resolve =>
        require(["../components/pages/login/forgetpass.vue"], resolve),
      meta: { title: "忘记密码" }
    },
    {
      path: "/repass",
      name: "repass",
      component: resolve =>
        require(["../components/pages/login/repass.vue"], resolve),
      meta: { title: "设置密码" }
    },
    {
      path: "/mobile_index",
      name: "mobile_index",
      component: resolve =>
        require(["../components/pages/index/index.vue"], resolve),
      meta: { title: "首页",  }
    },
    {
      path: "/storeClassify",
      name: "storeClassify",
      component: resolve =>
        require(["../components/pages/storeClassify.vue"], resolve),
      meta: { title: "商家分类", keepAlive: false }
    },
    {
      path: "/allActivity",
      name: "allActivity",
      component: resolve =>
        require(["../components/pages/allActivity.vue"], resolve),
      meta: { title: "活动列表" }
    },
    {
      path: "/storeDetail",
      name: "storeDetail",
      component: resolve =>
        require(["../components/pages/storeDetail.vue"], resolve),
      meta: { title: "商家详情" }
    },
    {
      path: "/joinActivity",
      name: "joinActivity",
      component: resolve =>
        require(["../components/pages/joinActivity.vue"], resolve),
      meta: { title: "参与活动" }
    },
    {
      path: "/joinActivity",
      name: "joinActivity",
      component: resolve =>
        require(["../components/pages/joinActivity.vue"], resolve),
      meta: { title: "参与活动优惠券" }
    },
    {
      path: "/promotePoster",
      name: "promotePoster",
      component: resolve =>
        require(["../components/pages/promotePoster.vue"], resolve),
      meta: { title: "推广海报" }
    },
    {
      path: "/activityDetail",
      name: "activityDetail",
      component: resolve =>
        require(["../components/pages/index/activityDetail.vue"], resolve),
      meta: { title: "活动详情" }
    },
    {
      path: "/sharePoster",
      name: "/sharePoster",
      component: resolve =>
        require(["../components/pages/index/sharePoster.vue"], resolve),
      meta: { title: "分享海报" }
    },
    {
      path: "/MbcancelRecord",
      name: "MbcancelRecord",
      component: resolve =>
        require(["../components/pages/cancelRecord.vue"], resolve),
      meta: { title: "核销记录" }
    },
    {
      path: "/paymentway",
      name: "paymentway",
      component: resolve =>
        require(["../components/pages/paymentway.vue"], resolve),
      meta: { title: "付款方式" }
    },
    {
      path: "/paywait",
      name: "paywait",
      component: resolve =>
        require(["../components/pages/paywait.vue"], resolve),
      meta: { title: "付款成功查询" }
    },
    {
      path: "/busjoin",
      name: "busjoin",
      component: resolve =>
        require(["../components/pages/busjoin.vue"], resolve),
      meta: { title: "商家加盟" }
    },
    {
      path: "/redpack",
      name: "redpack",
      component: resolve =>
        require(["../components/pages/redpack/redpack.vue"], resolve),
      meta: {
        title: "红包",
        keepAlive: true, //  通过此字段判断是否需要缓存当前组件
        isUseCache: true //   在组件中isUseCache为true时刷新获取数据
      }
    },
    {
      path: "/recommen",
      name: "recommen",
      component: resolve =>
        require(["../components/pages/redpack/recommen.vue"], resolve),
      meta: { title: "推荐奖励" }
    },
    {
      path: "/drawdepose",
      name: "drawdepose",
      component: resolve =>
        require(["../components/pages/redpack/drawdepose.vue"], resolve),
      meta: { title: "提现明细" }
    },
    {
      path: "/discoupon",
      name: "discoupon",
      component: resolve =>
        require(["../components/pages/redpack/discoupon.vue"], resolve),
      meta: {
        title: "优惠券列表",
        keepAlive: true, //  通过此字段判断是否需要缓存当前组件
        isUseCache: true //   在组件中isUseCache为true时刷新获取数据
      }
    },
    {
      path: "/friend",
      name: "friend",
      component: resolve =>
        require(["../components/pages/redpack/friend.vue"], resolve),
      meta: { title: "我的好友" }
    },
    {
      path: "/shopposition",
      name: "/shopposition",
      component: resolve =>
        require(["../components/pages/map/shopposition.vue"], resolve),
      meta: { title: "商家分布" }
    },
    {
      path: "/cityselect",
      name: "cityselect",
      component: resolve =>
        require(["../components/pages/map/cityselect.vue"], resolve),
      meta: { title: "选择城市" }
    },
    {
      path: "/Soncenter",
      name: "Soncenter",
      component: resolve =>
        require(["../components/pages/Soncenter/Soncenter.vue"], resolve),
      meta: {
        title: "个人中心",
        keepAlive: true, //  通过此字段判断是否需要缓存当前组件
        isUseCache: true //   在组件中isUseCache为true时刷新获取数据
      }
    },
    {
      path: "/pinfo",
      name: "pinfo",
      component: resolve =>
        require(["../components/pages/Soncenter/pinfo.vue"], resolve),
      meta: {
        title: "个人信息",
        keepAlive: true, //  通过此字段判断是否需要缓存当前组件
        isUseCache: true //   在组件中isUseCache为true时刷新获取数据
      }
    },
    {
      path: "/upnickname",
      name: "upnickname",
      component: resolve =>
        require(["../components/pages/Soncenter/upnickname.vue"], resolve),
      meta: { title: "修改昵称" }
    },
    {
      path: "/upcell",
      name: "upcell",
      component: resolve =>
        require(["../components/pages/Soncenter/upcell.vue"], resolve),
      meta: { title: "修改手机号" }
    },
    {
      path: "/Drawmoney",
      name: "Drawmoney",
      component: resolve =>
        require(["../components/pages/Drawmoney.vue"], resolve),
      meta: { title: "提现" }
    },
    {
      path: "/Rulestate",
      name: "Rulestate",
      component: resolve =>
        require(["../components/pages/Rulestate.vue"], resolve),
      meta: { title: "规则说明" }
    },
    // {
    //   path: "/discuss",
    //   name: "discuss",
    //   component: resolve =>
    //     require(["../components/pages/discuss.vue"], resolve),
    //   meta: { title: "商家详情评论" }
    // },
    {
      path: "/score",
      name: "score",
      component: resolve =>
        require(["../components/pages/score.vue"], resolve),
      meta: { title: "商家详情评论" }
    },
    {
      path: "/favodetail",
      name: "favodetail",
      component: resolve =>
        require(["../components/pages/favodetail/favodetail.vue"], resolve),
      meta: { title: "优惠券详情" }
    },
    {
      path: "/hexiaowait",
      name: "hexiaowait",
      component: resolve =>
        require(["../components/pages/hexiaowait.vue"], resolve),
      meta: { title: "优惠券核销查询"}
    },
    {
      path: "/paystatus",
      name: "paystatus",
      component: resolve =>
        require(["../components/pages/paystatus.vue"], resolve),
      meta: { title: "支付状态" }
    },
    {
      path: "/Order",
      name: "Order",
      component: resolve => require(["../components/pages/Order.vue"], resolve),
      meta: { title: "确认订单" }
    }
  ]
});

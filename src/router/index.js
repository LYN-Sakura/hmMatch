import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登陆页面
import Login from '../components/Login.vue'
// 引入主页
import Home from '../components/Home.vue'
// 引入退货单
import Return from '../components/CreditOrder/Return.vue'
// 引入退货单详情
import ReDetails from '../components/CreditOrder/ReDetails.vue'
// 引入商品门店明细
import Outlet from '../components/outlet/Outlet.vue'
// 引入配送单管理
import Distribution from '../components/distribution/Distribution.vue'
// 引入配送单详情
import DisDetails from '../components/distribution/DisDetails.vue'
// 引入确认配送页面
import Sure from '../components/distribution/SureSend.vue'
// 引入首页
import HomePage from '../components/homePage/HomePage.vue'
// 引入修正订单管理
import AmendEdit from '../components/amend/AmendEdit.vue'
// 引入修正单-待核单
import Audit from '../components/Correcting/audit.vue'
// 引入修正单-审核通过
import Pass from '../components/Correcting/pass.vue'
// 引入修正单-审核不通过
import NoPass from '../components/Correcting/noPass.vue'
// 引入采购单管理
import Purchase from '../components/pzxiede/Purchase.vue'
// 引入订单管理
import Order from '../components/pzxiede/Order.vue'
Vue.use(VueRouter)

// 路由规则
const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
},
{
  path: '/home',
  component: Home,
  redirect: '/homePage',
  children: [{
    path: '/return',
    component: Return
  },
  {
    path: '/homePage',
    component: HomePage
  },
  {
    path: '/amendEdit',
    component: AmendEdit
  },
  {
    path: '/ReDetails',
    component: ReDetails
  },
  {
    path: '/Outlet',
    component: Outlet
  },
  {
    path: '/Distribution',
    component: Distribution
  },
  {
    path: '/DisDetails',
    component: DisDetails
  },
  {
    path: '/Sure',
    component: Sure
  }, {
    path: '/audit',
    component: Audit
  }, {
    path: '/pass',
    component: Pass
  },
  {
    path: '/nopass',
    component: NoPass
  },
  {
    path: '/purchase',
    component: Purchase
  }, {
    path: '/order',
    component: Order
  }
  ]
}
]
const router = new VueRouter({
  routes
})

export default router

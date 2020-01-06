import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登陆页面 2
import Login from '../components/Login.vue'
// 引入主页 9
import Home from '../components/Home.vue'
// 引入退货单 14
import Return from '../components/CreditOrder/Return.vue'
// 引入退货单详情 10
import ReDetails from '../components/CreditOrder/ReDetails.vue'
// 引入商品门店明细 8
import Outlet from '../components/outlet/Outlet.vue'
// 引入配送单管理 5
import Distribution from '../components/distribution/Distribution.vue'
// 引入配送单详情 4
import DisDetails from '../components/distribution/DisDetails.vue'
// 引入确认配送页面 6
import Sure from '../components/distribution/SureSend.vue'
// 引入首页 9
import HomePage from '../components/homePage/HomePage.vue'
// 引入修正订单管理 14
import AmendEdit from '../components/amend/AmendEdit.vue'
// 引入修正单-待核单 11
import Audit from '../components/Correcting/audit.vue'
// 引入修正单-审核通过 13
import Pass from '../components/Correcting/pass.vue'
// 引入修正单-审核不通过 12
import NoPass from '../components/Correcting/noPass.vue'
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
  }
  ]
}
]
const router = new VueRouter({
  routes
})

export default router

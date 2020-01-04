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
  children: [
    { path: '/return', component: Return },
    { path: '/ReDetails', component: ReDetails },
    { path: '/Outlet', component: Outlet },
    { path: '/Distribution', component: Distribution },
    { path: '/DisDetails', component: DisDetails },
    { path: '/Sure', component: Sure }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router

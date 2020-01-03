import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登陆页面
import Login from '../components/Login.vue'
// 引入主页
import Home from '../components/Home.vue'
// 引入退货单
import Return from '../components/CreditOrder/Return.vue'
// 引入修正单-待核单
import Audit from '../components/Correcting/audit.vue'
// 引入修正单-审核通过
import Pass from '../components/Correcting/pass.vue'
// 引入修正单-审核不通过
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
  children: [
    { path: '/return', component: Return },
    { path: '/audit', component: Audit },
    { path: '/pass', component: Pass },
    { path: '/nopass', component: NoPass }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router

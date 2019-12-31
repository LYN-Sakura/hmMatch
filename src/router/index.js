import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登陆页面
import Login from '../components/Login.vue'
// 引入主页
import Home from '../components/Home.vue'
// 引入退货单
import Return from '../components/CreditOrder/Return.vue'
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
    { path: '/return', component: Return }
  ]
}
]

const router = new VueRouter({
  routes
})

export default router

import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登陆页面
import Login from '../components/Login.vue'

Vue.use(VueRouter)

// 路由规则
const routes = [{
  path: '/',
  redirect: '/login'
},
{
  path: '/login',
  component: Login
}
]

const router = new VueRouter({
  routes
})

export default router

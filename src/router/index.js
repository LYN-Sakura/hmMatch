import Vue from 'vue'
import VueRouter from 'vue-router'
// 引入登陆页面
import Login from '../components/Login.vue'
// 引入主页
import Home from '../components/Home.vue'
// 引入退货单
import Return from '../components/CreditOrder/Return.vue'
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
  children: [{
    path: '/return',
    component: Return
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

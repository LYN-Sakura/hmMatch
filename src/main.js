// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import router from "./router";
import App from "./App";

import Element from "element-ui";
import { Message } from "element-ui";
// import 'element-ui/lib/theme-chalk/index.css';    // 默认主题
//import "element-ui/lib/element-gold/index.css"; // 金色
import 'element-ui/lib/theme-chalk/index.css';
import iview from "iview";

import "iview/dist/styles/iview.css";
import "./assets/font/iconfont";
import echarts from "echarts";
import { api, myAxios } from "./APi/Public";
Vue.prototype.$echarts = echarts;
Vue.prototype.api = api;
Vue.prototype.$axios = myAxios;
Vue.prototype.$http = myAxios;
Vue.config.productionTip = false; // 阻止启动生产消息

import Mint from "mint-ui";
import "mint-ui/lib/style.css"; // mintUi插件样式
Vue.use(Mint);
Vue.use(Element, { size: "small" });
Vue.use(iview);

import VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)

//地图
import VueAMap from "vue-amap";
Vue.use(VueAMap);
VueAMap.initAMapApiLoader({
  key: "0d162c2be5b14935d9c825a4e0220954",
  plugin: [
    "AMap.Autocomplete",
    "AMap.PlaceSearch",   //搜索
    "AMap.Scale",         //比例尺
    "AMap.OverView",      //鹰眼 
    "AMap.ToolBar",       //地图工具条
    "AMap.MapType",       //地图类型
    "AMap.PolyEditor",    //折线、多边形编辑插件
    "AMap.CircleEditor",  //圆编辑插件
    "AMap.Geolocation",   //自动定位
    "AMap.Geocoder"        //获取位置信息
  ],
  // 默认高德 sdk 版本为 1.4.4
  v: "1.4.5"
});


// Vue.use(VueLazyload, {
//   preLoad: 1.3, //预加载高度
//   attempt: 1, //尝试次数
//   error:
//     "https://ss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=2978335771,143699289&fm=26&gp=0.jpg",
//   loading:
//     "https://ss3.bdstatic.com/70cFv8Sh_Q1YnxGkpoWK1HF6hhy/it/u=1345330011,1082178654&fm=26&gp=0.jpg"
// });

let ismobile = localStorage.getItem("ismobile");
if (ismobile == null) {
  let flag = navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  );
  ismobile = flag ? 1 : 0;
}

myAxios.interceptors.request.use(
  // 请求拦截
  function(config) {
    // 将token给到一个前后台约定好的key中，作为请求发送
    let token;
    if (ismobile == 1) {
      token = sessionStorage.getItem("ms_token");
    } else {
      token = sessionStorage.getItem("ms_tokens");
    }
    if (token) {
      config.data["token"] = token;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
let that = this;
myAxios.interceptors.response.use(
  // 响应拦截
  res => {
    if (ismobile == 1) {
      if (res.data.status == -100) {
        // 未登录
        sessionStorage.setItem("ms_moblie", "");
        localStorage.removeItem("ms_userinfo");
        sessionStorage.removeItem("ms_tokens");
      } else if (res.data.status == -101) {
        // 无权限
      }
    } else {
      if (res.data.status == -100) {
        // 未登录
        Message.error({
          message: res.data.message,
          center: true
        });
        sessionStorage.setItem("ms_moblie", "");
        localStorage.removeItem("ms_userinfo");
         ;
      } else if (res.data.status == -101) {
        // 无权限
        Message.error({
          message: res.data.message,
          center: true
        });
        this.$router.push("/login");
      } else if (res.data.status == 0) {
        //操作失败
        Message.error({
          message: res.data.message,
          center: true
        });
      }
    }

    return res;
  },
  error => {
    return Promise.reject(error);
  }
);

// router.beforeEach((to, from, next) => {
//   const routes = ['index','Soncenter'];
//   if(routes.indexOf(to.name)>=0){ // 若找到当前则，跳到login
//     router.push({name: 'login'})
//   }
//   next()
// })
//  //判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//   if (to.matched.some(res => res.meta.requireAuth)) {// 判断是否需要登录权限
//     if (localStorage.getItem('username')) {// 判断是否登录
//       if (to.meta.title) {//在路由跳转时做相应的处理(替换title)
//         document.title = to.meta.title;
//       }
//       next()
//     } else {// 没登录则跳转到登录界面
//       next({
//         path: '/login',
//         query: {redirect: to.fullPath}
//       })
//     }
//   } else {
//     next()
//   }
// })

//使用钩子函数对路由进行权限跳转
router.beforeEach((to, from, next) => {
  // 电脑
  if (ismobile == 0) {
    // let role = localStorage.getItem("ms_userinfo"); // 得到登录页存储信息
    let role = sessionStorage.getItem("ms_tokens"); // 得到登录页存储信息
    if (!role && to.path == "/login") {
      next();
    } else if (!role) {
      // 未登录，返回登录页面
      next("/login");
    } else if (role && to.path == "/") {
      //  若获取PC端登录页面存储信息且未定义重定向页面，则跳转首页
      next("/index");
    } else {
      // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
      if (navigator.userAgent.indexOf("MSIE") > -1 && to.path === "/editor") {
        Vue.prototype.$alert(
          "vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看",
          "浏览器不兼容通知",
          {
            confirmButtonText: "确定"
          }
        );
      } else {
        next();
      }
    }
  }
  // 手机
  // let that=this
  if (ismobile == 1) {
    document.title = to.meta.title || '霸王免单'
    let role = sessionStorage.getItem("ms_token"); // 得到登录页存储信息
    const routes = ["mobile_login", "register", "404", "repass","activityDetail"]; // 不用登录的页面，放开拦截
    let wxurl=localStorage.getItem("wxurl")
    // let hxurl=localStorage.getItem("hxurl")
    // console.log("跳转路由",this.$route.path)
    // localStorage.setItem('hxurl',this.$route.path)
    if(wxurl){
      window.location.herf=wxurl
      localStorage.removeItem("wxurl")
    }
    
    if (!role && routes.indexOf(to.name) != -1) {
      // 未登录，进入登录页，不做拦截，直接跳转
      let url=window.location.href
      let hxurl=url+""
      if(hxurl.indexOf("hexiaowait")>1){
        // console.log("window.location.href",window.location.href)
        sessionStorage.setItem('hxurl',url)
      }else if(hxurl.indexOf("activityDetail")>1){
        sessionStorage.setItem('posurl',url)
        window.location.href=url
      }
      next();
    } else if (!role) {
      // 未登录，返回登录页面
      next("/mobile_login");
    } else if (role && to.path == "/") {
      //  若获取PC端登录页面存储信息且未定义重定向页面，则跳转首页
      next("/mobile_index");
    }else {
      // 简单的判断IE10及以下不进入富文本编辑器，该组件不兼容
      if (navigator.userAgent.indexOf("MSIE") > -1 && to.path === "/editor") {
        Vue.prototype.$alert(
          "vue-quill-editor组件不兼容IE10及以下浏览器，请使用更高版本的浏览器查看",
          "浏览器不兼容通知",
          {
            confirmButtonText: "确定"
          }
        );
      } else {
        next();
      }
    }
  }
});

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App)
}).$mount("#app");

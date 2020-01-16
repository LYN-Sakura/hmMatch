<template>
  <div id="app" @click="isDo()">
    <keep-alive>
      <router-view v-if="$route.meta.keepAlive&&isrouteralive"/>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive&&isrouteralive"/>
    <el-amap vid="amap" v-show="true" :plugin="plugin" class="amap-demo"></el-amap>
  </div>
</template>

<script>
// import './assets/js/mobile_css.js'
export default {
  name: "App",
  data() {
    let self = this;
    return {
      lastTime: null, //最后一次点击的时间
      currentTime: null, //当前点击的时间
      timeOut: 30 * 60 * 1000, //设置超时时间： 30分钟
      isrouteralive: true, //  给全局需要单页刷新用
      lng: "",
      lat: "",
      center: [121.59996, 31.197646],
      lng: 0,
      lat: 0,
      loaded: false,
      position: '',//
      plugin: [
        {
          enableHighAccuracy: false,
          convert: false, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
          showButton: false, //显示定位按钮，默认：true
          showMarker: false, //定位成功后在定位到的位置显示点标记，默认：true
          showCircle: false, //定位成功后用圆圈表示定位精度范围，默认：true
          panToLocation: false, //定位成功后将定位到的位置作为地图中心点，默认：true
          zoomToAccuracy: false, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认
          pName: "Geolocation",
          events: {
            init(o) {
              // o 是高德地图定位插件实例
              o.getCurrentPosition((status, result) => {
                console.log("自动定位", result);
                if (result && result.position) {
                  self.position = result.position.lng;
                  // self.lng = result.position.lng;
                  // self.lat = result.position.lat;
                  // self.center = [self.lng, self.lat];0
                  localStorage.setItem("lng", result.position.lng);
                  localStorage.setItem("lat", result.position.lat);
                  localStorage.setItem(
                    "center",
                    JSON.stringify([result.position.lng, result.position.lat])
                  );
                  localStorage.setItem("city", result.addressComponent.city);
                  self.getcitycode(result.addressComponent.city)
                  self.loaded = true;
                  self.$nextTick();
                }
              });
            }
          }
        }
      ]
    };
  },
  provide() {
    // 给深层次组件声明变量,然后inject注入
    return {
      reload: this.reload
    };
  },
  created() {
    this._isMobile();
    this.lastTime = new Date().getTime(); //网页第一次打开时，记录当前时间
  },
  methods: {
    isDo() {
      let flag = this._isMobile() ? 1 : 0; // 得到flag的值，判断PC端还是Mobile端,1是Mobile端，0是PC端
      this.currentTime = new Date().getTime(); //记录这次点击的时间
      if (this.currentTime - this.lastTime > this.timeOut) {
        //判断上次最后一次点击的时间和这次点击的时间间隔是否大于30分钟
        // 登录状态过期后，清空本地PC端和mobile端缓存信息
        localStorage.removeItem("ms_userinfo");
        sessionStorage.removeItem("ms_token");
      } else {
        this.lastTime = new Date().getTime(); //如果在30分钟内点击，则把这次点击的时间记录覆盖掉之前存的最后一次点击的时间
      }
    },
    reload() {
      // 页面数据变换时，手动更改view层的隐藏显示，实现刷新效果
      this.isrouteralive = false;
      this.$nextTick(() => {
        this.isrouteralive = true;
      });
    },
    _isMobile() {
      let flag = navigator.userAgent.match(
        /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
      );
      localStorage.setItem("ismobile", flag ? 1 : 0);
      return flag;
    },
    map() {
      let that = this;
      let map = new BMap.Map(this.$refs.allmap); // 创建Map实例
      var point = new BMap.Point(114.42671, 30.486372);
      map.centerAndZoom(point, 12); // 初始化地图,设置中心点坐标和地图级别
      var marker = new BMap.Marker(point); // 创建标注
      map.addOverlay(marker);
      var geolocation = new BMap.Geolocation();
      geolocation.getCurrentPosition(function(r) {
        if (this.getStatus() == BMAP_STATUS_SUCCESS) {
          var mk = new BMap.Marker(r.point);
          that.$store.state.cityL = r.address.city.slice(
            0,
            r.address.city.length - 1
          );
          that.$store.state.cityInfo = r.address;

          localStorage.setItem("lng", r.point.lng);
          localStorage.setItem("lat", r.point.lat);
          // map.addOverlay(mk);   //添加标注
          that.getcitycode(r.address.city);
          localStorage.setItem("city", r.address.city);
          // map.panTo(r.point);  //定位居中显示

          alert("您的位置：" + r.point.lng + "," + r.point.lat);
        } else {
          // alert('failed'+this.getStatus());
        }
      });
      // map.setCurrentCity("北京");// 设置地图显示的城市 此项是必须设置的
      map.enableScrollWheelZoom(true); //开启鼠标滚轮缩放
      // 获取定位城市
      let myCity = new BMap.LocalCity();
      myCity.get(function(result) {
        console.log("result", result);
        map.setCenter(result.name);
        that.$store.state.city = result.name.slice(0, result.name.length - 1);
        that.$store.state.cityLocal = result;
        localStorage.getItem("lng") ||
          localStorage.setItem("lng", result.center.lng);
        localStorage.getItem("lat") ||
          localStorage.setItem("lat", result.center.lat);
        // console.log(that.$store.state.cityInfo)
        that.getcitycode(result.name);
      });
      // map.addEventListener('click',(e)=>{
      //     console.log('e',e)
      // })
    },
    getcitycode(val) {
      this.$http.post('/mobile/index/citycode',{
          city:val,
      }).then(res=>{
          localStorage.setItem('citycode',res.data.result.code)
      })
    }
  },
  mounted() {
    // this.map()  //百度地图
    console.log(this.position)
  }
};
</script>

<style>
* {
  margin: 0px;
  padding: 0px;
}
a {
  text-decoration: none;
}
ul,
li {
  list-style: none;
}
html,
body {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
body {
  line-height: unset;
}
input,
button {
  border: none;
  outline: none;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  width: 100%;
  height: 100%;
  overflow: hidden;
  -webkit-overflow-scrolling: touch;
}
::-webkit-scrollbar {
  display: none;
}
.clearfix::after {
  content: ".";
  display: block;
  width: 0;
  height: 0;
  visibility: hidden;
  clear: both;
}
.clearfix {
  zoom: 1;
}
/* 底部导航栏 */
.footer {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 3rem;
}
</style>

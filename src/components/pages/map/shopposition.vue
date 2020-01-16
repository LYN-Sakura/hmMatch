<template>
  <div class="busjoin_cont">
    <Header :show='1'>
        <span slot="top_text">商家分布</span>
    </Header>
    <div class="busjoin_bot">
        <div class="amap-page-container">
            <div class="amap-container" >
                <el-amap vid="amapDemo0" :plugin="plugin" class="amap-demo" :zoom="zoom" :events="events" :center="center">
                    <el-amap-marker v-for="(marker, index) in markers" :position="marker.position" :key="index" :icon="marker.icon" :events="marker.events" :title="marker.title"  :vid="index" >
                    </el-amap-marker>
                    <el-amap-info-window
                        :position="currentWindow.position"
                        :isCustom=true
                        :autoMove=true
                        :closeWhenClickMap=true
                        :content="currentWindow.content"
                        :visible="currentWindow.visible">
                    </el-amap-info-window>
                </el-amap>
            </div>

      
        </div>
    </div>
  </div>
</template>

<script>
import Header from '../../component/header'
  export default {
    name:'',
    props:[''],
    data () {
      return {
            zoom: 14,
            lng:0,
            lat:0,
            loaded: false,
            center: [114.41727,30.49813],
            // center: [116.395132,39.908637],
            markers:[{
                position:[114.41727,30.49513],
                title:'测试地点1',
                events: {
                    click: () => {
                        this.clicktips(1)
                    },
                },
            },
            {
                position:[114.42727,30.59513],
                title:'测试地点2',
                events: {
                    click: () => {
                        this.clicktips(2)
                    },
                },
            },
            {
                position:[114.52727,30.49513],
                title:'测试地点3',
                events: {
                    click: () => {
                        this.clicktips(3)
                    },
                },
            },
            {
                position:[114.32727,30.39513],
                title:'测试地点4',
                events: {
                    click: () => {
                        this.clicktips(4)
                    },
                },
            }],
            windows:[{
                position:[114.41727,30.49813],
                id:1,
                content:"<div style='max-width:10rem;font-size:0.6rem;background-color:#fff;border-radius:10px;padding:7px;border:1px solid red'>测试文字1111111</div>",
                visible:true,
                offset:[100,50]
            },{
                 position:[114.42727,30.63513],
                id:2,
                content:"<div style='max-width:10rem;font-size:0.6rem;background-color:#fff;border-radius:10px;padding:7px'>测试文字222222</div>",
                visible:true
            },{
                position:[114.52727,30.53713],
                id:3,
                content:"<div style='max-width:10rem;font-size:0.6rem;background-color:#fff;border-radius:10px;padding:7px'>测试文字33333333</div>",
                visible:true
            },{
                position:[114.32727,30.44513],
                id:4,
                content:"<div style='max-width:10rem;font-size:0.6rem;background-color:#fff;border-radius:10px;padding:7px'>测试文字444444</div>",
                visible:true
            }],
            currentWindow: {
                position:[114.41727,30.49813],
                id:1,
                content:"<div style='max-width:10rem;font-size:0.6rem;background-color:#fff;border-radius:10px;padding:7px;border:1px solid red'>测试文字1111111</div>",
                visible:true,
                // offset:[0,100]
            },
            plugin: [{
                pName: 'Geolocation',
                events: {
                    init(o) {
                        // o 是高德地图定位插件实例
                        // o.getCurrentPosition((status, result) => {
                            // console.log('地图位置', result); //  能获取定位的所有信息
                            // if (result && result.position) {
                                // self.str = result.formattedAddress;
                        
                                // self.lng = result.position.lng;
                                // self.lat = result.position.lat;
                                // self.center = [114.41727,30.49513],
                                // self.loaded = true;
                                // console.log('执行了')
                                // self.$nextTick();
                                // sessionStorage.setItem('id', JSON.stringify(self.positions));
                            // }
                            
                        // });
                    }
                }
            }],
            events: {
                click(e) {
                    console.log('点击')
                    let {
                        lng,
                        lat
                    } = e.lnglat;
                    self.lng = lng;
                    self.lat = lat;
                    var geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    geocoder.getAddress([lng, lat], function (status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.regeocode) {
                                self.address = result.regeocode.formattedAddress;
                                console.log('lng', self.lng);
                                console.log('lat', self.lat);
                            }
                        }
                    });
                }
            },
      }
    },

    components: {
        Header
    },

    computed: {},

    created() {},

    beforeMount() {},

    mounted() {
        
    },

    methods: {
       clicktips(id){
           console.log('切换',id)
           this.currentWindow.visible = false;
           this.$nextTick(() => {
               let tpmwindow = this.windows.find(x=>x.id==id)
               console.log('tpmwindow',tpmwindow)
               this.currentWindow = tpmwindow
               tpmwindow.visible = true
           })
           
       }
    },

    watch: {}

  }

</script>
<style lang='' scoped>
.busjoin_cont{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
.busjoin_bot{
    position: absolute;
    top: 2.75rem;
    left: 0;
    right: 0;
    bottom: 0rem;
    margin: auto;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    /* border: 1px solid red; */
}::-webkit-scrollbar{display: none;}
.amap-page-container{
     height: 100%;
}
.amap-container{
     height: 100%;
}
.amap-demo {
      height: 100%;
    }
</style>
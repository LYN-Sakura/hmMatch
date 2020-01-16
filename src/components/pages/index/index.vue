<template>
  <div class="Index_cont">
    <div class="Index_content">
      <div>
        <div style="width:100%;height:100%;" v-for="(item,index) in head_image" :key="index" :data-href="see(item)">
          <a :href="item.jump_url">
            <img :src="item.image" alt="" style="width:100%;height:130px;display:block;">
          </a>
        </div>
      </div>
      <!-- 中间图片轮播 -->
      <div>
        <span style="font-size:1rem;margin-left:8rem;">佣金排行榜</span>
        <div class='arhar' v-for="(item,index) in rank_list" :key="index">
          <div><img :src="item.avatar" alt=""></div>
          <div style="margin-left:13rem;">
            {{item.nickname}}
          </div>
        </div>
      </div>
      <div>
        <div style="width:100%;height:100%;" v-for="(item,index) in foot_image" :key="index" :data-href="see(item)">
          <a @click="gotoUrl(item.jump_url)">
            <img :src="item.url" alt="" style="width:100%;height:130px;display:block;">
          </a>
        </div>
      </div>
    </div>
    <!-- 底部导航栏 -->
    <div class="footer">
      <Tabbar></Tabbar>
    </div>
  </div>

</template>

<script>
  import {
    MessageBox
  } from 'mint-ui'
  import swiper from '../../../../static/swiper/js/swiper.js'
  import Tabbar from '../../component/Tabbar'
  // import EventStoreBan from '../../component/eventStoreBan'
  import CouponList from '../../component/couponList'
  export default {
    data() {
      return {
        user: '',
        currentCityName: '', //默认为北京
        currentCityCode: '',
        head_image: [], //头部图片
        foot_image: [], //底部图片
        rank_list: [], //排行榜
        inps: '',

      }
    },
    name: '',
    props: [''],
    components: {
      Tabbar,
      // CouponList
      // EventStoreBan
    },
    methods: {
      find() {
        if (this.inps != "") {
          this.$router.push({
            path: "./storeClassify",
            query: {
              inps: this.inps
            }
          })
          this.inps = ''
        } else {
          this.$router.push({
            path: "./storeClassify",
          })
        }
      },
      setCity() {
        this.$router.push('/cityselect')
      },
      proPoster() {
        this.$router.push('/promotePoster')
      },
      goDis() {
        this.$router.push('/discoupon')
      },
      allSub: function () {
        this.$router.push('/storeClassify')
      },
      goActDet: function () {
        this.$router.push('/activityDetail')
      },
      goRulestate: function () {
        this.$router.push('/Rulestate')
      },
      goRegCard: function () {
        this.$router.push({
          path: './activityDetail',
          query: {
            cid: this.result.first_active.id
          }
        })
      },
      goStoreCla: function () {
        this.$router.push('/storeClassify')
      },
      goStoreDet: function () {
        this.$router.push('/storeDetail')
      },
      goActDet: function () {
        this.$router.push('/activityDetail')
      },
      goAllCou: function () {
        this.$router.push('/discoupon')
      },
      //跳转商家详情
      see1(e) {
        return JSON.stringify(e)
      },
      goStoreDetail(sid, sname) {
        this.$router.push({
          path: './storeDetail',
          query: {
            sid: sid,
          }
        })
      },
      //图片轮播跳转
      gotoUrl(url) {
        
        if (url != '') {
          window.location.href = url
        }
        //console.log(url)
      },
      see(e) {
        return JSON.stringify(e)
      },
      //跳转活动详情
      goCardDetail(cid, cname) {
        this.$router.push({
          path: './activityDetail',
          query: {
            cid: cid
          }
        })
      },
      //我要领劵
      goActDet(getcid) {
        this.$router.push({
          path: './activityDetail',
          query: {
            cid: getcid
          }
        })
      },
      // 验证定位于选择城市是否一致
      verifycity() {
        let ccity = localStorage.getItem('ccity')
        let city = localStorage.getItem('city')
        let citycode = localStorage.getItem('citycode')
        //console.log(city)
        if (city) {
          if (ccity !== city) {
            MessageBox.confirm('定位到您在' + city + '是否切换至该城市进行探索?').then(action => {
              // console.log('确认')
              localStorage.setItem('ccity', city)

              localStorage.setItem('ccode', citycode)
              this.currentCityName = city
              // this.currentCityName =city.split('市').join('')
            }).catch(action => {

            });
          }
        }
      },
      getlocation() {
        this.$http
          .post("/mobile/active/rank", {
            lng: localStorage.getItem("lng"),
            lat: localStorage.getItem("lat")
          })
          .then(res => {
            if (res.data.status == 1) {
              if (res.data.result.total != 0) {
                this.head_image = res.data.result.head_image;
                this.foot_image = res.data.result.foot_image;
                this.rank_list = res.data.result.list;
              } else {
                this.$Message.info("未找到相关活动");
              }
            } else {
              this.$Message.error(res.data.message);
            }
          });
      },
    },

    created() {
      this.lng = localStorage.getItem("lng");
      this.lat = localStorage.getItem("lat");
      this.getlocation();
    },
    mounted() {
      this.user = localStorage.getItem('ms_userinfo');
      if (this.user != '' && this.user != null && this.user != undefined) {
        // 商家轮播
        this.storeBanSwiper = new Swiper('#swiper2', {
          slidesPerView: 4,
          slidesPerColumn: 2,
          slidesPerColumnFill: 'row',
        })
        // 中间图片轮播
        this.topSwiper = new Swiper('#swiper1', {
          direction: 'horizontal', // 切换选项
          loop: true, // 循环模式选项
          autoplay: true, // 自动轮播
          speed: 5000,
          // autoplayDisableOnInteraction:false,  //滑动后才能自动轮播
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: true, //修改swiper的父元素时，自动初始化swiper

          // 如果需要分页器
          pagination: '.swiper-pagination',
          onClick: function (swiper) {
            var x = JSON.parse(swiper.clickedSlide.attributes["data-href"].nodeValue)
            window.location.href = x
          }

        })
        let that = this;
        // 活动商家轮播
        this.EventStoreSwiper = new Swiper('#swiper3', {
          loop: true,
          autoplay: 3000,
          effect: 'coverflow',
          // grabCursor: true,  //为true,鼠标覆盖Swiper时指针会变成手掌形状，拖动时指针会变成抓手形状
          centeredSlides: true,
          slidesPerView: 'auto',
          autoplayDisableOnInteraction: false, //手动后继续滑动  
          touchRatio: 1, //设置为0.5后slide滑动距离只有触摸距离的一半，变得难以滑动，缓慢拖动查看效果。
          observer: true, //修改swiper自己或子元素时，自动初始化swiper
          observeParents: false, //修改swiper的父元素时，自动初始化swiper
          coverflow: {
            rotate: 0, // 旋转的角度  
            stretch: -18, // 拉伸   图片间左右的间距和密集度  
            depth: 100, // 深度   切换图片间上下的间距和密集度  
            modifier: 3.5, // 修正值 该值越大前面的效果越明显  
            slideShadows: false, // 页面阴影效果  
          },
          prevButton: '.indexSwp-prev',
          nextButton: '.indexSwp-next',
          onClick: function (swiper) {
            var x = JSON.parse(swiper.clickedSlide.attributes["data-href1"].nodeValue)
            that.$router.push({
              path: './storeDetail',
              query: {
                sid: x,
              }
            })
          }
        })

        //this.currentCityName = localStorage.getItem('ccity').split('市').join('') || localStorage.getItem('city').split('市').join('')

        if (localStorage.getItem('ccity') && localStorage.getItem('ccode')) {
          this.currentCityName = localStorage.getItem('ccity')
        } else if (localStorage.getItem('city') && localStorage.getItem('citycode')) {
          this.currentCityName = localStorage.getItem('city')
          // this.currentCityCode=sessionStorage.getItem('citycode')
          // this.$http.post('/mobile/index/citycode',{
          //     city:this.currentCityName,
          // }).then(res=>{
          //     console.log("121212121",res)
          //     // this.currentCityCode=res.data.result.code
          //     localStorage.setItem('citycode',res.data.result.code)
          // })

        } else {
          this.currentCityName = '北京市'
          localStorage.setItem('ccity', '北京市')
          localStorage.setItem('ccode', 110100)
        }
        //let ccode=localStorage.getItem('ccode')
        let citycode = localStorage.getItem('citycode')
        if (citycode != "" && citycode != null) {
          this.verifycity()
        }
      }
    },

  }

</script>
<style lang="" scoped>
  @import url('../../../../static/swiper/css/swiper.css');
  @import url('../../../assets/css/index.css');

  .Index_cont {
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;

  }

  .arhar {
    display: flex;
    padding: 0.2rem 0.5rem 0 0.5rem;
    line-height: 2rem;
  }

  .arhar>div:nth-child(1) {
    flex: 1.5
  }

  .arhar>div:nth-child(1)>img {
    width: 2rem;
    height: 2rem;
    border-radius: 50%;
  }

  .arhar>div:nth-child(2) {
    flex: 8.5;
  }

</style>

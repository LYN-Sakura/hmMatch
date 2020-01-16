<template>
  <div class="header clearfix">
      <div class="header_left" @click.stop="revocation()">
          <img v-show="show==1" src="../../../static/images/icon.png" alt="">
          <!-- <img v-show="show==2" src="../../static/images/HaH2.png" alt="">
          <img v-show="show==3" src="../../static/images/pdd8.png" alt=""> -->
          <span><slot name="imgLeft"></slot></span>
      </div>
      <div class="header_mid">
          <!-- <span></span> -->
          <slot name="top_text"></slot>
      </div>
      <div class="header_rig">
          <!-- <span>管理</span> -->
          <!-- 评价提交 -->
          <span><slot name="top_rig"></slot></span>
      </div>
  </div>
</template>

<script>
  export default {
    name:'',
    props:['show','Pinfo','orderid'],    //提交评价信息,订单编号
    data () {
      return {
          user:'',  //用户信息
          imgarr:[],
      };
    },

    components: {},

    computed: {},

    created() {
        this.user = JSON.parse(localStorage.getItem('info'));
    },

    beforeMount() {},

    mounted() {},

    methods: {
        revocation:function(){
            this.$router.go(-1);
        },
    },

    watch: {}

  }

</script>
<style lang='' scoped>
.header{
    width: 100%;
    height: 2.75rem;
    background-color: white;
    padding: .675rem 1rem 0px;
    box-sizing: border-box;
    position: absolute;
    top: 0px;
    z-index: 1000;
}
.header_left img{
    width: 0.6875rem;
    height: 1.1875rem;
    float: left;
}
.header_mid{position: absolute;left: 50%;transform: translateX(-5rem);width: 10rem;text-align: center;}
.header_mid span{
    height: 1.1875rem;
    line-height: 1.1875rem;
    font-size: 1.0625rem;
    color: #000000;
    font-weight: bold;
    /* font-family: '微软雅黑'; */
    /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', cursive; */
    letter-spacing: .1rem;
}
.header_rig{
    float: right;
}
.header_rig span{
    height: 1.1875rem;
    line-height: 1.1875rem;
    font-size: 1.125rem;
    color: white;
    /* font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', cursive; */
}
</style>

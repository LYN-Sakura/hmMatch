<template>
  <div class="Rule_Cont">
    <Header :show='1'>
        <span slot="top_text">规则说明</span>
    </Header>
    <div class="Rule_bot">
      <ul>
        <li>
          <span>01</span>
          <p>这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单</p>
        </li>
        <li>
          <span>02</span>
          <p>这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单这里是霸王免单</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../component/header'
  export default {
    name:'',
    props:[''],
    data () {
      return {

      };
    },

    components: {
      Header
    },

    computed: {},

    created() {},

    beforeMount() {},

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='' scoped>
.Rule_Cont{
    width: 100%;
    height: 100%;
    overflow: hidden;
    position: relative;
}
.Rule_bot{
    position: absolute;
    top: 2.75rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}
.Rule_bot ul{
  width: 21.4375rem;
  margin: 1.8125rem auto;
  position: relative;
  height: auto;
  padding-top: 2rem;
}
.Rule_bot ul::after{
  position: absolute;
  content:'';
  width: 7.8125rem;
  height: 2rem;
  background: url(../../../static/images/rule.png) no-repeat;
  background-size: 100% 100%;
  top: -.5rem;
  left: 50%;
  transform: translateX(-3.90625rem);
}
.Rule_bot ul li span{
  display: block;
  color: white;
  width: 2rem;
  font-size: .875rem;
  height: 1.0625rem;
  text-align: center;
  line-height: 1.0625rem;
  border-radius: .5625rem;
  background: #C4A46D;
  position: relative;
  z-index: 88;
  box-shadow: .85rem 0rem 0rem 0rem #DABF89;
  margin: .6875rem 0px;
}
.Rule_bot ul li p{
  text-align: left;
  padding-left: 2rem;
  box-sizing: border-box;
  line-height: 1.0625rem;
  color: #555555;
  font-size: .8125rem;
}
</style>
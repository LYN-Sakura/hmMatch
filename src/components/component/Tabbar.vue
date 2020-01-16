<template>
  <div class="tabbarWrap">
    <Item txt="首页" mark="mobile_index"  :sel="select" @change="getVal">
      <img src="../../../static/images/Tabbar/jfhdn1.png" slot="imgItem"/>
      <img src="../../../static/images/Tabbar/jfhdn5.png" slot="imgItemRed"/>
    </Item>
    <Item txt="活动" mark="allActivity" :sel="select" @change="getVal"> 
      <img src="../../../static/images/Tabbar/jfhdn2.png" slot="imgItem"/>
      <img src="../../../static/images/Tabbar//jfhdn6.png" slot="imgItemRed"/>
    </Item>
    <Item txt="红包" mark="redpack" :sel="select" @change="getVal">
      <img src="../../../static/images/Tabbar/jfhdn3.png" slot="imgItem"/>
      <img src="../../../static/images/Tabbar/jfhdn7.png" slot="imgItemRed"/> 
    </Item>
    <Item txt="个人中心" mark="SonCenter" :sel="select" @change="getVal">
      <img src="../../../static/images/Tabbar/jfhdn4.png" slot="imgItem"/>
      <img src="../../../static/images/Tabbar/jfhdn8.png" slot="imgItemRed"/>
    </Item>
  </div>
</template>
<script>
import Item from './item'
  export default {
    name:'Tabbar',
    props:[''],
    data () {
      return {
        select:"home"
      };
    },

    components: {
        Item
    },

    computed: {},

    created() {
      let rel = this.$route.path;
      this.select = (rel.substring(rel.indexOf('/')+1,rel.length))
    },

    beforeMount() {},

    mounted() {},

    methods: {
        getVal:function(v){
          this.select = v
        }
    },

    watch: {
      '$route.path': function (newVal, oldVal) { 
        let route = ['/SonCenter','/redpack','/allActivity','/mobile_index'];
        // let route = ['/SonCenter','/redpack','/allActivity'];
        if(route.indexOf(newVal)!=-1){
          this.select = (newVal.substring(newVal.indexOf('/')+1,newVal.length));
        }
      }
    }

  }

</script>
<style scoped>
.tabbarWrap{
    width:100%;
    height:3rem;
    position:absolute;
    bottom:0;
    text-align: center;
    background: white;
}
/* .tabbarWrap li{
  float:left;
  list-style:none;
  margin:0px 30px;
} */
</style>
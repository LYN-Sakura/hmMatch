<template>
  <div class="friend_cont">
    <Header :show='1'>
        <span slot="top_text">我的好友</span>
    </Header>
    <div class="friend_bot">
      <ul v-if="infos!=''">
        <li v-for="(item,index) in infos" :key="index">
          <div>
            <img :src="item.avatar" alt="">
            <div>
              <span>{{item.name}}</span>
              <p>{{item.realname}}/{{item.mobile}}</p>
            </div>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import Header from '../../component/header'
import { Api } from "../../../APi/WEBMb/index.js";
  export default {
    name:'',
    props:[''],
    data () {
      return {
        infos:[], // 我的好友列表
      };
    },

    components: {
      Header
    },

    methods: {
      getFriends(){
        Api.Mobile_Com_Down({}).then(res => {
          // console.log("我的好友",res)
          if (res.data.status == 1) {
            this.infos = res.data.result.list;
          }
        });
      }
    },

    computed: {},

    created() {
      // Mobile_Com_Down
      this.getFriends()
      // Api.Mobile_Draw_Detail({}).then(res => {
      //   console.log("22222",res)
      //   if (res.data.status == 1) {
      //     this.infos = res.data.result.list;
      //   }
      // });
    },

    beforeMount() {},

    mounted() {},

    watch: {}

  }

</script>
<style lang='' scoped>
.friend_cont{
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
}
.friend_bot{
  position: absolute;
  top: 2.75rem;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
}
.friend_bot ul {
  width: 100%;
  height: auto;
  margin: 1rem auto 0rem;
}
.friend_bot ul li{
  width: 90%;
  margin: 1rem auto 0rem;
}
.friend_bot ul li>div{
  width: 100%;
  height: 2.75rem;
  display: flex;
  position: relative;
  justify-content: space-between;
}
.friend_bot ul li img{
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 50%;
}
.friend_bot ul li div>div{
  position: absolute;
  top: 0;
  left: 3rem;
  right: 0;
  bottom: .0625rem;
  border-bottom: .0625rem solid #7f7f7f;
  text-align: left;
}
.friend_bot ul li div>div span{
  font-size: 1rem;
  height: 50%;
  color: #333;
}
.friend_bot ul li div>div p{
  font-size: .75rem;
  height: 30%;
  color: #828380;
  margin-top: .45rem;
}
</style>
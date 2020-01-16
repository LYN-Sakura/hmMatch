<template>
  <div class="busjoin_cont">
    <Header :show='1'>
        <span slot="top_text">商家加盟</span>
    </Header>
    <div class="busjoin_bot">
        <div class="busjoin_bg">
            <form class="busjoin_form" @submit.prevent="league">
                <ul>
                    <li>
                        <p>
                            <i></i>
                            <input type="text" v-model="subname" placeholder="请输入商家名称">
                        </p>
                    </li>
                    <li>
                        <p>
                            <i></i>
                            <input type="text" v-model="linkman" placeholder="请输入联系人">
                        </p>
                    </li>
                    <li>
                        <p>
                            <i></i>
                            <input type="text" v-model="phone" placeholder="请输入手机号">
                        </p>
                    </li>
                    <li>
                        <p>
                            <i></i>
                            <input type="text" v-model="address" placeholder="请输入地址">
                        </p>
                    </li>
                </ul>
                <input type="submit" value="提交信息">
            </form>
            <div>
                <p>本次活动归XXXXX所有</p>
                <p>本次活动归XXXXX所有本次活动归XXXXX所有</p>
            </div>
        </div>  
    </div>
  </div>
</template>

<script>
import Header from '../component/header'
import {Api} from '../../APi/WEBMb/index.js'
  export default {
    name:'',
    props:[''],
    data () {
      return {
          subname:'',   // 商家名称
          linkman:'',   // 联系人
          phone:'',     // 手机号
          address:''    // 地址
      };
    },

    components: {
        Header
    },

    computed: {},

    created() {},

    beforeMount() {},

    mounted() {},

    methods: {
        league(){
            if(this.subname){
                if(this.linkman){
                    if(/^1[34578]\d{9}$/.test(this.phone)){
                        Api.Mobile_Sublink({
                            title:this.subname,
                            name:this.linkman,
                            mobile:this.phone,
                            address:this.address
                        }).then(res=>{
                            if(res.data.status==1){
                                this.$Message.success({
                                    content:res.data.message
                                })
                            }
                        })
                    }else{
                        this.$Message.error({
                            content:"请输入格式正确的手机号"
                        })
                    }
                }else{
                    this.$Message.error({
                        content:"请输入联系人"
                    })
                }
            }else{
                this.$Message.error({
                    content:"请输入商家名称"
                })
            }
            
        }
    },
    beforeRouteLeave (to, from, next){
        if(to.name=='Soncenter'){
            to.meta.isUseCache = false;
        }
        next();
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
}::-webkit-scrollbar{display: none;}
.busjoin_bg{
    width:100%;
    height: 100%;
    min-height: 41.625rem;
    background: url(../../../static/images/Busjoin/rig1.png) no-repeat;
    background-size: 100% 100%;
    position: relative;
}
.busjoin_form{
    width: 92.5%;
    height: 24.5625rem;
    background: white;
    position: absolute;
    border-radius: .1875rem;
    left: 50%;
    bottom: 5.25rem;
    padding: 2rem 1.5rem;
    box-sizing: border-box;
    transform: translateX(-50%);
}
.busjoin_form ul li{
    width: 100%;
    height: 3rem;
    border: .0625rem solid #E5BB89;
    margin-bottom: 1.0625rem;
    border-radius: .5rem;
}
.busjoin_form ul li p{
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    position: relative;
    justify-content: space-between;
}
.busjoin_form ul li i{flex: 1.5;display: block;height: 100%;}
.busjoin_form ul li:nth-child(1) i{
    background: url(../../../static/images/Busjoin/bus8.png) center no-repeat;
    background-size: 1.1875rem 1.1875rem;
}
.busjoin_form ul li:nth-child(2) i{
    background: url(../../../static/images/Busjoin/bus11.png) center no-repeat;
    background-size: 1.1875rem 1.1875rem;
}
.busjoin_form ul li:nth-child(3) i{
    background: url(../../../static/images/Busjoin/bus5.png) center no-repeat;
    background-size: 1.1875rem 1.1875rem;
}
.busjoin_form ul li:nth-child(4) i{
    background: url(../../../static/images/Busjoin/bus2.png) center no-repeat;
    background-size: 1.1875rem 1.1875rem;
}
.busjoin_form ul li input{
    flex: 8.5;
    height: 98%;
    border-top-right-radius: .5rem;
    font-size: 1.0625rem;
    border-bottom-right-radius: .5rem;}
::-webkit-input-placeholder{
    font-size: 1.0625rem;
    color: #B3B3B3;
}
.busjoin_form>input{
    width: 100%;
    background: linear-gradient(#ECC18E,#B79567);
    height: 3rem;
    line-height: 3rem;
    border-radius: .3125rem;
    color: white;
    font-size: 1.1875rem;
    text-shadow: 0rem .15rem #BA9769;
    text-align: center;
    font-weight: bold;
    letter-spacing: .125rem;
    box-shadow: 0px .0625rem 0rem 0rem #000;
}
.busjoin_bg>div{
    position: absolute;
    width: 80%;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    color: white;
    bottom: 1rem;
    flex-direction:column;
    font-size: .75rem;
    line-height: 1.25rem;
}
</style>
<template>
    <div class="promotePoster_cont">
        <Header :show='1'>
            <span slot="top_text">推广海报</span>
        </Header>
        <div class="promotePoster">
            <!-- 操作说明 -->
            <div class="promotePosterTop">
                <img src="../../../static/images/promotePoster/vvbjggnm12.png" alt="">
            </div>
            <!-- 海报logo及卡片 -->
            <div class="promotePosterBottom">
                <div class="promotePosterNav">
                    <img src="../../../static/images/promotePoster/vvbjggnm1.png" alt="">
                </div>
                <div class="promotePosterCard">
                    <ul>
                        <li>
                            <div class="promotePosterCard-one">
                                <p>xx霸王免单活动第一季</p>
                                <P>查看推广海报</P>
                            </div>
                        </li>
                        <li>
                            <div class="promotePosterCard-two">
                                <p>xx霸王免单活动第二季</p>
                                <P>查看推广海报</P>
                            </div>
                        </li>
                        <li>
                            <div class="promotePosterCard-three">
                                <p>xx霸王免单活动第二季</p>
                                <P>查看推广海报</P>
                            </div>
                        </li>
                    </ul>
                    <div class="promotePosterLabel">
                        -&nbsp; 霸王免单&nbsp; -
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import Header from '../component/header'
export default{
    name:'',
    props:[''],
    data () {
      return {
        //   usertoken:'',      // 用户信息
        //   nicheng:'毛绒丸子',   // 用户昵称
        //   userimg:'',   // 用户头像
        //   uploadadress:'',  // 上传地址
        //   uploadadimg:'',  //   上传图像
      };
    },
    components: {
        Header
    },
    methods: {
        
    },
    mounted(){
        
    },

}  
</script>
<style lang="" scoped>
@import url('../../assets/css/promotePoster.css');
.promotePoster_cont{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
</style>
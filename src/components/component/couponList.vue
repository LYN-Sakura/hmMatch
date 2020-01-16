<template>
    <div>
        <div class="couponL">
            <!-- <img src="../../../static/images/index/pro.png" alt="">
            <p class="couponL-worth">优惠卷总价值:</p>
            <span>￥<p>300</p></span> -->
            <slot name="shopimg"></slot>
            <p class="couponL-worth">优惠卷总价值:</p>
            <span>￥<slot name="coumoney"></slot></span>
        </div>
        <div class="couponZ">
            <!-- <p class="couponZname">万家小厨农家菜馆</p>
            <div class="couponZinfo">
                <p>优惠包含:</p>
                <p>1.新品凉菜1份;2.双人套餐豪华尊享4菜2汤米粉任意吃吧欢迎品尝;3.aaaaaaa</p>
            </div>
            <p class="couponZtime">有效期:2018-02-01至2019-01-30</p> -->
            <slot name="shopname"></slot>
            <div class="couponZinfo">
                <p>优惠包含:</p>
                <slot name="coucontent"></slot>
            </div>
            <slot class="couponZtime"  name="coupontime"></slot>
        </div>
        <div class="couponR">
            <a href="javascript:;" @click.prevent="goActDet()">我要领劵</a>
        </div>
    </div>
</template>
<script>
  export default {
    methods: {
        goActDet:function(){
            this.$router.push('/activityDetail')
        }
    },
    mounted() {
        
    },
  }
</script>
<style lang="" scoped>
.couponL{
    float: left;
    width: 30%;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding-top: 0.7rem;
}
.couponL img{
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 1.8rem;
    border: 2px solid #ffffff;
}
.couponL-worth{
    font-size:0.5rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    margin-top: 0.2rem;
}
.couponL>span{
    font-size:0.8rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
}
.couponL>span>p{
    display: inline-block;
    font-size:1.5rem;
}
.couponZ{
    width: 56%;
    float: left;
    display: flex;
    flex-direction: column;
    padding-left: 0.4rem;
    margin-top: 1rem;
}
.couponZname{
    width: 100%;
    font-size:0.9rem;
    text-align: left;
    font-family:PingFang-SC-Bold;
    font-weight:bold;
    color:rgba(255,255,255,1);
}
.couponZinfo{
    font-size:0.7rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(255,255,255,1);
    padding: 0.5rem 0;
    text-align: left;
}
.couponZinfo p:nth-child(1){
    
}
.couponZinfo p:nth-child(2){
    height: 2rem;
    line-height:1rem;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
}
.couponZtime{
    font-size:0.55rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    color:rgba(229,206,179,1);
    text-align: left;
}
.couponR{
    width: 14%;
    float: left;
    width:0.7rem;
    font-size:0.9rem;
    font-family:PingFang-SC-Medium;
    font-weight:500;
    margin: 1.4rem 0 0 1.1rem;
}
.couponR a{
    color:rgba(255,255,255,1);
}
</style>
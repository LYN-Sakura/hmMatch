<template>
    <div>
        <div class="activeT">
            <div class="activeT-l">
                <!-- <img src="../../../static/images/index/pro.png" alt=""> -->
                <slot name="img"></slot>
            </div>
            <div class="activeT-r">
                <p>
                    <img src="../../../static/images/index/adffg23.png" alt="">
                    <!-- <span>万家小厨农家菜</span> -->
                    <slot name="shopname"></slot>
                </p>
                <p style="margin-top: -0.3rem">
                    <img src="../../../static/images/index/adffg24.png" alt="">
                    <!-- <span>027-1234567</span> -->
                    <slot name="phone"></slot>
                </p>
                <p style="margin-top: -0.2rem">
                    <img src="../../../static/images/index/adffg25.png" alt="">
                    <!-- <span>湖北省武汉市洪山区光谷广场大洋百货</span> -->
                    <slot name="area"></slot>
                </p>
            </div>
        </div>
        <div class="activeB">
            <p>
                商家描述:
            </p>
            <slot name="content"></slot>
            <!-- <p>
                这里是商家描述可以修改文字或者啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊啊
            </p> -->
        </div>
        <div class="seeDetailBtn"><a href="javascript:;" @click="goStoreDet()" style="color:#000000;">查看详情</a></div>
    </div>
</template>
<script>
export default {
    name:'eventStoreBan',
    data(){
        return{
            
        }
    },
    methods: {
        goStoreDet:function(){
            this.$router.push('/storeDetail')
        },

    },
    
}
</script>
<style lang="" scoped>
/* .active{
    width: 85%;  
    height: 11rem;
    background: url("../../../static/images/index/adffg27.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
} */
.activeT{
    width: 100%;
    display: flex;
    align-items: center;
}
.activeT-l{
    margin-top: 0.3rem;
    margin-left: 1rem;
    width: 3.6rem;
    height: 3.6rem;
}
.activeT-l img{
    width: 100%;
    height: 100%;
    border-radius: 1.8rem;
}
.activeT-r{
    margin-left: 0.3rem;
    margin-top: 0.3rem;
    /* display: flex;
    flex-direction: column; */
}

.activeT-r>p>img{
    width: 0.8rem;
    height: 0.8rem;
}
.activeT-r>p{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    width: 13rem;
    color: #8F5A3A;
    text-align: left;
}
.activeT-r>p>span{
    font-size: 0.9rem;
    line-height: 1.3rem;
    padding-left: 0.2rem;
}
.activeB {
    color:#F2D6BA;
    margin-left: 1.3rem;
    margin-top: 1.6rem;
    text-align: left;
}
.activeB p:nth-child(1){
    font-size: 0.9rem;
}
.activeB p:nth-child(2){
    width: 11.5rem;
    font-size: 0.75rem;
    height:2rem;
    line-height: 1rem;
    margin-top: 0.1rem;
    overflow:hidden; 
    text-overflow:ellipsis;
    display:-webkit-box; 
    -webkit-box-orient:vertical;
    -webkit-line-clamp:2; 
}
.seeDetailBtn{
    position: absolute;
    bottom: 2rem;
    right: 1.4rem;
    padding: 0.1rem 0.3rem;
    border-radius: 0.6rem;
    font-size: 0.5rem;
    border: 1px solid #3E3E4A;
}
</style>
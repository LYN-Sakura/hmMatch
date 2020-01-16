<template>
<div style="background-color:#1E222B">
    <div class="tags">
        <div>
            <span>当前位置：{{nowtag}}</span> 
        </div>
    </div>
</div>
</template>
<style lang="less">
    .tags{
        background-color: #fff;
        height: 50px;
        min-width: 1540px; 
       
        div{
            margin-left: 15px;
            line-height: 50px;
            text-align: left;
            span{
                border-left: 2px solid #cba363;
                font-size: 14px;
                padding-left: 8px;
                color: #333;
            }
        }
    }
</style>
<script>
export default {
    data () {
        return {
            nowtag:'',
        }
    },
    methods: {
        
    },
    watch: {
        //监听路由变化
        $route(to, from) {
            // console.log(to,from)
            this.nowtag=to.meta.title
        }
    },
    created () {
        this.nowtag = this.$route.meta.title
    }
}
</script>



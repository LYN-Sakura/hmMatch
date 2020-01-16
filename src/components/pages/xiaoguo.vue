<template>
    <div class="xiaoguo_cont">
        <div class="bodyFont clearfloat" id="bodyFont" ref="bodyFont" :class="{bodyHeight:contentStatus}">
            <div v-html="content"></div>
        </div>
        <div class="contentToggle" v-if="contentStatus" @click="contentStatus=!contentStatus">阅读全文</div>    
    </div>
</template>

<script>
export default{
    data(){
        return { 
            contentStatus:false,  
            curHeight:0,
            bodyHeight:5000
        }
    },
    mounted(){
        setTimeout(()=>{
            this.contentToggle();
        },500)
    },
    methods:{
        contentToggle(){
            this.curHeight=this.$refs.bodyFont.offsetHeight;
            if(this.curHeight>this.bodyHeight){
                this.contentStatus=true;
            }else{
                this.contentStatus=false;
            }
        },
    }
}  
</script>
<style lang="" scoped>
.xiaoguo{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.bodyFont{
    font-size: 1rem;
    color: #333;
    text-align: left;
    line-height:3.625rem;
    word-break:break-all;
    word-wrap:break-word;
    padding-bottom: 1.875rem;
    height:auto;
    overflow: hidden;
    max-height: 100%;
    /* p{margin:16px 0 0 0;} */
  }
  .bodyHeight{
    height:5000px;
  }
  .contentToggle{
    height:60px;
    line-height:60px;
    text-align: center;
    color:red;
    border:1px solid red;
    border-radius: 5px;
    font-size: 1rem;
    margin-bottom:30px;
  }

</style>
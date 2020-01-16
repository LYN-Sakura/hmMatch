<template>
  <div class="discuss_cont">
    <Header :show='1'>
        <span slot="top_text">霸王免单</span>
    </Header>
    <div class="discuss_bot">
        <!-- `(^o^)`-->
        <div class="discuss_bot_top">
            <div class="clearfix">
                <span>打分</span>
                <ul>
                    <li v-for="(item,index) in cusnum.sum" :key="index">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-wujiaoxing"></use>
                        </svg>
                    </li>
                </ul>
            </div>
            <a href="#">力推</a>
        </div>
        <!-- `(^o^)` 评价-->
        <textarea name="" id="" placeholder="期待您的精彩评论哦~~"></textarea>
        <!-- `(^o^)` 上传-->
        <div class="discuss_bot_inp">
            <h6>上传图片</h6>
            <Upload
                ref="upload"
                :format="['jpg','jpeg','png']"
                :max-size="2048"
                multiple
                name='upload'
                :on-success='success'
                :on-error='err'
                :before-upload='bupload'
                :action="scadress"
                style="text-align:left;">
                <div style="width: 58px;height:58px;line-height: 58px;text-align:center;">
                    <Icon type="ios-camera" size="20"></Icon>
                </div>
            </Upload>
            <ul>
                <li v-for="(item,index) in content_imgarr" :key="index">
                    <img :src="item.url" alt="">
                </li>
            </ul>
        </div>
    </div>
    <!-- `(^o^)` 发布 -->
    <div class="discuss_issue">
        发布
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
          cusnum:{// 评分
              sum:5,
              num:4
          },   
          scadress:'file:///C:/Users/admin/Desktop',    // 上传地址
          content_imgarr:[  //图片数组

          ],    
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
        success(file,fileList){
            let that = this;
            this.$Message.success({
                content:'上传成功'
            })
            console.log(file);
        },
        err(file){
            this.$Message.error({
                content:'上传失败'
            })
        },
        bupload(){
            let that = this;
        },
    },

    watch: {}

  }

</script>
<style lang='' scoped>
.discuss_cont{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.discuss_bot{
    position: absolute;
    top: 2.75rem;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
}::-webkit-scrollbar{display: none;}
.discuss_bot_top{
    width: 100%;
    height: 3.125rem;
    display: flex;
    justify-content: space-between;
    padding: .9375rem 1rem;
}
.discuss_bot_top div{flex: 3}
.discuss_bot_top div span,.discuss_bot_top div ul{float: left;}
.discuss_bot_top div span{color: #4C4C4C;font-size: .9375rem;}
.discuss_bot_top div ul li{display: inline-block;margin-left: .85rem}
.discuss_bot_top a{
    flex: 1;
    color: #B08D46;
    font-size: .9375rem;
    text-align: right;
}
.discuss_bot textarea{
    width: 91.5%;
    height: 8.0625rem;
    margin: 0px auto;
    border: none;
    color: #333333;
    font-size: .875rem;
}::-webkit-input-placeholder{
    color: rgb(150, 148, 148);
}
.discuss_bot_inp{
    width: 100%;
    height: auto;
    padding: 1rem;
    text-align: left;
}
.discuss_bot_inp h6{
    color: #4C4C4C;
    font-size: .9375rem;
    font-weight: 300;
    margin-bottom: 1.625rem;
}
.discuss_bot_inp /deep/ .ivu-upload-select{
    outline: #E2E2E2 solid .0625rem;
}
.discuss_issue{
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    height: 3.25rem;
    line-height: 3.25rem;
    font-size: 1.0625rem;
    background: #CDCDCD;
    color: white;
}
.discuss_issue.active{
    background: #B89858;
}
</style>
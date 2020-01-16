<template>
    <div class="score_cont">
        <Header :show='1'>
            <span slot="top_text">商家评论</span>
        </Header>
        <div class="scoreInfo">
            <div class="scoreInfoT">
                <div class="scoreInfo_top">
                    <div class="scoreInfo_topL">
                        <p>给酒店评价</p>
                        <ul>
                            <li :class="{active:index<=score}" @click="isscore(index)" v-for="(item,index) in 5" :key="index"></li>
                            <!-- <li></li>
                            <li></li>
                            <li></li>
                            <li></li> -->
                        </ul>
                    </div>
                    <div class="scoreInfo_topR">{{eval}}</div>
                </div>
                <textarea placeholder="期待你的精彩评论哦~~" v-model="evalContent"></textarea>
            </div>
            <div class="scoreInfoB">
                <p>图片上传</p>
                <div class="uploadImg_t">
                    <ul>
                        <li v-for="(item,index) in images" :key="index">
                            <img :src="item" alt="">
                        </li>
                        <li v-show="images.length<9">
                            <img src="../../../static/images/dcvgb1.png" alt="">
                            <input type="file" @change="filechange">
                        </li>
                    </ul>
                </div>
            </div>
        </div>
        <div :class="score>=0?'scoreInfoBtnAct':'scoreInfoBtn'" @click="send">发布</div>
    </div>
</template>
<script>
import Header from '../component/header'
import { Toast } from 'mint-ui';
export default {
    name: "",
    props: [""],
    data() {
        return {
            shopId:this.$route.query.sid,  //商户Id
            score:-1,
            eval:"",//评价文字
            content:"",//评价内容
            evalContent:"",//输入内容
            images:[],
        }
    },
    components: {
        Header
    },
    methods: {
        //评价
        isscore(index) {
            this.score = index
            if(this.score==0){
                this.eval="一般"
            }else if(this.score==1){
                this.eval="还行"
            }else if(this.score==2){
                this.eval="差不多"
            }else if(this.score==3){
                this.eval="很好"
            }else if(this.score==4){
                this.eval="力荐"
            }
            console.log(index)
        },
        //上传图片
        filechange(e){
            console.log(e,'eeeeeeeeeeeeee')
            var that=this;
            var file = e.target.files[0];
            var imgSize=file.size/1024;
            if(imgSize>200000000){
                alert('请上传大小不要超过200KB的图片')
            }else{
                var reader = new FileReader();
                reader.readAsDataURL(file); // 读出 base64
                reader.onloadend = function () {
                    // 图片的 base64 格式, 可以直接当成 img 的 src 属性值        
                    let dataURL = reader.result.split(",")[1];;
                    // console.log(dataURL)
                    // 逻辑处理
                    that.$http.post('/mobile/index/uploadimgbase64',{
                        imgdata:dataURL
                    }).then(res=>{
                        console.log('上传',res)
                        Toast('上传成功!')
                        that.images.push(res.data.result.url)
                    })
                };
            }
        },
        send(){
            if(this.score>=0){
                console.log('score',this.score-0+1)
                console.log('content',this.eval)
                console.log('images',this.images)
                // return
                this.$http.post('/mobile/discuss/comment',{
                    merchid:this.shopId,
                    content:this.evalContent,
                    thumbs:this.images,
                    score:this.score-0+1
                }).then(res=>{
                    console.log('提交',res)
                    if(res){
                        Toast(res.data.message)
                        this.$router.go(-1)
                    }
                    
                })
            }else{
                Toast("评论后才可提交")
            }
        }
    },
    computed: {},
    watch: {},
    beforeMount() {},
    mounted() { },
}
</script>
<style lang="" scoped>
.score_cont{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
    
}
.scoreInfo{
    position: absolute;
    top: 2.75rem;
    left: 0;
    right: 0;
    bottom: 3rem;
    margin: auto;
    overflow: scroll;
    background-color: #F3F5F7;
    -webkit-overflow-scrolling: touch;
}::-webkit-scrollbar{display: none;}
.scoreInfoT{
    width:100%;
    background-color: #fff;
    padding:0 1rem ;
    border-top:1px solid #F3F5F7; 
    margin-bottom: 0.5rem;
}
.scoreInfo_top{
    width:100%;
    height: 2.4rem;
    line-height: 2.4rem;
    overflow: hidden;
    font-size: 0.9rem;
    
}
.scoreInfo_topL{
    float: left;
}
.scoreInfo_topL p{
    float: left;
    font-size: 1rem;
}
.scoreInfo_topL ul{
    display: flex;
    /* height: 3rem;
    line-height: 3rem; */
}
.scoreInfo_topL ul li{
    float: left;
    margin-top: 0.5rem;
    margin-left: 0.6rem;
    width: 1.1rem;
    height: 1.1rem;
    background-image: url('../../../static/images/Subdetail/detail24.png');
    background-size: cover;
    
}
.scoreInfo_topL .active{
    background-image: url('../../../static/images/Subdetail/detail23.png');
}
.scoreInfo_topR{
    float: right;
    color: #DCBA7F
}
textarea{
    padding-top: 0.5rem;
    outline: none;
    width: 100%;
    min-height: 8rem;
    border: 0;
    border-top: 1px solid #F3F5F7;
    font-size: 0.8rem;
    color: #999999;
}
.scoreInfoB{
    width: 100%;
    padding: 1rem;
    background-color: #fff;
}
.scoreInfoB p{
    text-align: left;
    font-size: 1rem;
    margin-bottom: 1rem;
}
.uploadImg_t{
    width: 100%
    
}
.uploadImg_t ul{
    width: 100%;
    /* border:1px solid red; */
    box-sizing: border-box;
    display: flex;
    flex-wrap: wrap;
    
}
.uploadImg_t  li{
    margin-right: 0.45rem;
    margin-bottom: 0.45rem;
    position: relative;
    width: 5rem;
    height: 5rem;
    
}
.uploadImg_t  li img{
    width: 5rem;
    height: 5rem;
}
.uploadImg_t  li input{
    width: 5rem;
    height: 5rem;
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
}
.scoreInfoBtn {
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3rem;
    background-color: #CDCDCD;
    text-align: center;
    line-height: 3rem;
    box-sizing: border-box;
    color: #fff;
    font-size: 1rem;
}
.scoreInfoBtnAct{
    width: 100%;
    position: absolute;
    left: 0;
    bottom: 0;
    height: 3rem;
    background-color: #B89858;
    text-align: center;
    line-height: 3rem;
    box-sizing: border-box;
    color: #fff;
    font-size: 1rem;
    
}
</style>
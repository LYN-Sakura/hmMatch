<template>
    <div class="sharePoster_cont">
        <Header :show='1'>
            <span slot="top_text">分享海报</span>
        </Header>
        <div class="sharePosConter">
            <div class="sharePos">
                <p>
                    <img :src="qrcode"  alt="">
                </p>
            </div>a
        </div>
    </div>
</template>

<script>
import Header from '../../component/header'
import { Api } from "../../../APi/WEBMb/index.js";
export default{
    name:'',
    props:[''],
    data(){
        return {
            imgs:'',
            cid: this.$route.query.cid, //活动id
            qrcode:"" //二维码
        }
    },
    components: {
        Header
    },
    methods: {
        
    },
    mounted() {
        console.log(this.cid)
       Api.Mobile_Ind_qrcode({
           id:this.cid,
           url:this.api+'#/activityDetail?cid='+this.cid
       }).then(res => {
            // console.log("55",res)
        if (res.data.status == 1) {
            this.qrcode=res.data.result.qrcode
        }else{
            this.$Message.error({
                content:"二维码格式错误"
            })
        }
      }); 
    },
    
}  
</script>
<style lang="" scoped>
.sharePoster_cont{
    width: 100%;
    height: 100%;
    position: relative;
    overflow: hidden;
}
.sharePosConter{
    width: 100%;
    height: 100%;
    padding-top: 2.7rem;
}
.sharePos{
    width: 100%;
    height: 100%;
    background: url('../../../../static/images/sharePoster/sharePoster1.png');
    background-size: 100% 100%;
}
.sharePos p{
    width: 100%;
}
.sharePos p img{
    width: 10rem;
    height: 10rem;
    margin-top: 4.8rem;
}
</style>
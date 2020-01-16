<template>
    <div class="visitbox">
        <div class="loading">
            <mt-spinner :size="100" color="#cba361" :type="3" class="yuan"></mt-spinner>
            <p>正在查询核销状态...</p>
        </div>
    </div>
</template>
<script>
import { Toast,MessageBox } from 'mint-ui';
export default {
    data(){
        return{
            pid:'',
            ordersn:'',
            token:'',
            user:'',
            isorder:false,
            iscz:false,
        }
    },
    methods:{
        gettype(){
            const waittype  = setInterval(()=>{
                this.$http.post('mobile/coupon/checkCoupon',{
                        couponid:this.pid,
                    }).then(res=>{
                        console.log('判断',res)
                        // res.data.status==1
                        // if(res.data.status==1){
                        //     Toast('支付成功!')
                        //     if(this.isorder){
                        //         //订单
                        //         this.$router.push('/paystatus?ordersn='+this.ordersn+'&status=1')
                        //     }else if(this.iscz){
                        //         //充值
                        //         // this.$router.push('/paywin?ordersn='+this.ordersn)
                        //         this.$router.push('/paystatus?ordersn='+this.ordersn+'&status=0')
                        //     }
                            
                        // }else if(res.data.status==-1){
                        //     this.$router.push('/paylose')
                        // }else if(res.data.status==-202){

                        //     // this.$router.push('/paywin?ordersn='+this.ordersn)
                        // }
                        if(res.data.status==1){
                            // Toast('核销成功!')
                            setTimeout(this.$router.push('/favodetail?getstatus=1&pid='+this.pid),1000)
                        }else{
                            this.$Message.error(res.data.message)
                            setTimeout(this.$router.push('/favodetail?getstatus=0&pid='+this.pid),1000)
                            
                        }
                    } )
            },3000)
            this.$once('hook:beforeDestroy', () => {      
                console.log('清除') 
                clearInterval(waittype);                                    
            })
        }
    },
    created(){
        //http://localhost:6868/#/paystatus?ordersn=SH20190226104409166644&status=1&token=5cb882df0618cce188183e9b2c266f49
        // http://localhost:6868/#/paywait?ordersn=SH20190226104409166644&token=5cb882df0618cce188183e9b2c266f49
        // http://overlord.hongbao19.net/#/paywait?ordersn=SH20190226104409166644&token=5cb882df0618cce188183e9b2c266f49

        this.pid = this.$route.query.pid
        this.gettype()
        // this.token=sessionStorage.getItem("ms_token") //sessionStorage.getItem("ms_token")
        // this.user=localStorage.getItem("ms_userinfo")
        // if(this.user != "" && this.user != undefined && this.user != null){
        //     this.gettype()
        // }else{
        //     let oldToken=sessionStorage.getItem("ms_token")
        //     if(oldToken != "" && oldToken != undefined && oldToken != null){
                
        //     }else{
        //         this.$http.post("mobile/index/tokenlogin",{
        //             token:this.token
        //         }).then(res=>{
        //             if(res.data.status==1){
        //                 this.$Message.success(res.data.message)
        //                 sessionStorage.setItem("ms_token",this.token)
        //                 sessionStorage.setItem("ms_moblie", 1);
        //                 localStorage.setItem('ms_userinfo',res.data.result.userinfo);

        //                 // this.gettype()
        //             }else{
        //                 this.$Message.error(res.data.message)
        //                 this.$router.push('/mobile_login')
        //             }
        //         })
                
        //         // 
        //     }
        // }
        // if(this.token!=''||this.token!=null){
        //     sessionStorage.setItem("ms_token",this.token);
        // }
        // if(this.ordersn.indexOf('SD')>=0){
        //     this.isorder = true
        // }else if(this.ordersn.indexOf('CZ')>=0){
        //     this.iscz = true
        // }
        // if(this.ordersn.indexOf('SD')>=0){
        //     this.isorder = true
        // }
        // console.log('ordersn',this.ordersn)
        
    },
}
</script>
<style lang="less" scoped>
.visitbox{
    box-sizing: border-box;
    overflow: hidden;
   .loading{
    //    border: 1px solid red;
       text-align: center;
       margin-top:5rem ;
       .yuan{
        //    border: 1px solid red;
           display: block;
           text-align: center;
           /deep/ div{
               margin: 0 auto;
           }
       }
   } 
}
</style>


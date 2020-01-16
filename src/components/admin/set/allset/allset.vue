<template>
    <div class="ccia">
        <div class="ccia_top">
            <button >
                综合设置
            </button>
        </div>
        
        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop"></div> -->
            <div class="ccia_content">
                    <div class="content_top">
                        <span>是否开启提现</span>
                        <div>
                            <el-radio-group v-model="withdraw">
                                <el-radio label="1">是</el-radio>
                                <el-radio label="0">否</el-radio>
                            </el-radio-group>
                        </div>
                    </div>
                     <div class="content_top" >
                        <span>提现方式</span>
                        <div>
                            <el-checkbox-group v-model="checkList" style="display:inline-block" @change="Change">
                                <!-- <el-checkbox label="0">银行卡</el-checkbox> -->
                                <el-checkbox label="1">支付宝</el-checkbox>
                            </el-checkbox-group>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>最小提现金额</span>
                        <div>
                            <el-input v-model="withdrawmoney" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>公共分销奖励金额</span>
                        <div>
                            <el-input v-model="bonusalone" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                     <!-- <div class="content_top">
                        <span>客服电话</span>
                        <div>
                            <el-input v-model="service_tel" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                     <div class="content_top">
                        <span>短信appkey</span>
                        <div>
                            <el-input v-model="appkey" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>短信模板id</span>
                        <div>
                            <el-input v-model="temid" placeholder="请输入内容"></el-input>
                        </div>
                    </div>
                    <div class="content_top">
                        <span>短信验证码变量</span>
                        <div>
                            <el-input v-model="code" placeholder="请输入内容"></el-input>
                        </div>
                    </div> -->
                     <!-- <div class="content_top" >
                        <span >首页活动</span>
                        <div>
                            <el-input v-model="first_active" placeholder="请选择活动商品"></el-input>  <el-button style="margin:0" size="small" type="primary" @click="xuanzhe">选择商品</el-button>
                        </div>
                    </div> -->
                     <!-- <div class="content_top" >
                        <span style="float:left">首页图片</span>
                        <div style="display:inline-block">
                            <el-upload
                           
                            :action="baseurl+'admin/index/imgbase64'"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview1"
                            :before-remove="beforeRemove1"
                            :on-remove="handleRemove1"
                            :file-list="imglist1"
                            :on-success="uploadSuccess1"
                            :before-upload="beforeAvatarUpload1"
                            :limit="1"
                            :on-exceed="onexceed1"
                            >
                            <i class="el-icon-plus"></i>
                            </el-upload>
                         <el-dialog :visible.sync="dialogVisible1">
                            <img
                           
                            width="100%"
                            :src="dialogImageUrl1"
                            alt=""
                            >
                        </el-dialog>
                          <p style="color:#666666">推荐尺寸: (375X667)</p>
                        </div>
                      
                    </div> -->
                     <!-- <div class="content_top" >
                        <span style="float:left">个人中心轮播图</span>
                        <div style="display:inline-block">
                            <el-upload
                           
                            :action="baseurl+'admin/index/imgbase64'"
                            list-type="picture-card"
                            :on-preview="handlePictureCardPreview2"
                            :before-remove="beforeRemove2"
                            :on-remove="handleRemove2"
                            :file-list="imglist2"
                            :on-success="uploadSuccess2"
                            :before-upload="beforeAvatarUpload2"
                            :on-exceed="onexceed2"
                            >
                            <i class="el-icon-plus"></i>
                            </el-upload>
                         <el-dialog :visible.sync="dialogVisible2">
                            <img
                           
                            width="100%"
                            :src="dialogImageUrl2"
                            alt=""
                            >
                        </el-dialog>
                        </div>
                      
                    </div> -->


                <div class="submitbox">  
                    <button @click="submit">提交</button>
                    <button @click="goback">返回列表</button>
                    <p>(提交会覆盖原综合设置)</p>
                </div>
            </div>
        </div>
        <!-- 选择商家弹出框-->
    <el-dialog
        title="选择参与商品"
        :visible.sync="dialogVisibleS"
        width="60%"
    >
        <el-input v-model="keyword">
        <el-button
            slot="append"
            icon="el-icon-search"
            @click="searchShop"
        ></el-button>
        </el-input>
        <el-table :data="choShopList">
             <el-table-column
            label="ID"
          
            prop="id"
        >
        </el-table-column>
        <el-table-column
            label="标题"
          
            prop="title"
        >
        </el-table-column>
        <el-table-column
            label="活动图片"
        
        >
        <template slot-scope="scope">
            <img :src="scope.row.thumb" alt="" style="width:50px;height:50px">
        </template>
       
        </el-table-column>
    
        <el-table-column label="操作">
            <template slot-scope="scope">
            <el-button
                @click="chooseShop(scope.row)"
                type="text"
                size="small"
            >选择</el-button>
            </template>
        </el-table-column>
        </el-table>
        <div class="clearfix">
        <el-pagination
            background
            @current-change="handleCurrentChangeS"
            :current-page="pageS"
            :page-size="limit"
            layout="total,prev,pager,next,jumper"
            :total="total"
        >
        </el-pagination>
        </div>
        <span
        slot="footer"
        class="dialog-footer"
        >
        <el-button @click="dialogVisibleS=false">取 消</el-button>
        </span>
    </el-dialog>
    </div>
</template>
<script>
import { Api } from "../../../../APi/WEBPC/index";
export default {
    data(){
        return{
            bonusalone:0,
            withdrawmoney:0,
            withdraw:'',
            withdrawcashcard	:'',
            withdrawcashalipay:'',
            first_active:'',
            appkey:'',
            temid:'',
            code:'',
            baseurl: "",

            imglist1: [], //上传图片文件夹
            dialogVisible1: false,
            dialogImageUrl1: "",

             imglist2: [], //上传图片文件夹
            dialogVisible2: false,
            dialogImageUrl2: "",

            first_thumb:'',
            pageadv:'',

            checkList:[],
            service_tel:'',

            limit: 5,
            pageS: 1,
            dialogVisibleS: false, //选择商家及免单卡弹框
            choShopList: [],
            total: 0,
            keyword: "",
        }
    },
    methods:{
        goback(){
            this.$router.go(-1)
        },
        // 提交
        submit(){
             let imgbmp1 = [];
              let imgbmp2 = [];
        //    console.log(this.imglist1,6666);
             console.log(this.imglist2,7777);
            this.imglist1.forEach(item => {
                imgbmp1.push(item.url);
            }); 
             this.imglist2.forEach(item => {
                imgbmp2.push(item.url);
            });
           this.first_thumb=imgbmp1.join(',')
            this.pageadv = imgbmp2.join(',')
            // console.log(imgbmp2,888);
            if(this.checkList.length==2){
               this.withdrawcashcard='1' 
               this.withdrawcashalipay='1'
             
            }else if(this.checkList.length==1&&this.checkList[0]=='0'){
                this.withdrawcashcard='1'
                this.withdrawcashalipay=''
                
            }else if(this.checkList.length==1&&this.checkList[0]=='1'){
              
                 this.withdrawcashcard=''
                this.withdrawcashalipay='1'
                
            }else{
                 
                 this.withdrawcashcard='' 
               this.withdrawcashalipay=''
              
            }
            this.$http.post(this.api+'admin/system_set/save',{
               withdrawcashcard:this.withdrawcashcard,
               withdrawcashalipay:this.withdrawcashalipay,
               withdraw:this.withdraw,
               withdrawmoney:this.withdrawmoney,
               bonusalone:this.bonusalone,
               service_tel:this.service_tel,
               appkey:this.appkey,
               temid:this.temid,
               code:this.code,
               first_thumb: this.first_thumb,
               first_active:this.first_active,
               pageadv:this.pageadv
            }).then(res=>{
                console.log('提交',res)
                if(res.data.status==1){
                    this.$message.success(res.data.message);
                }else{
                    this.$message.error(res.data.message);
                }
                this.getinfo()
            })
        },
        // 获取数据
        getinfo(){
            this.$http.post(this.api+'admin/system_set/index',{}).then(res=>{
                console.log('数据',res)
                if(res.data.status==1){
                //   this.withdrawcashcard=res.data.result.withdrawcashcard
                //    this.withdrawcashalipay=res.data.result.withdrawcashalipay
                    this.withdraw=res.data.result.withdraw
                     this.withdrawmoney=res.data.result.withdrawmoney
                      this.bonusalone=res.data.result.bonusalone
                    this.service_tel = res.data.result.service_tel
                    this.first_active = res.data.result.first_active
                    this.appkey=res.data.result.appkey
                    this.temid=res.data.result.temid
                    this.code=res.data.result.code
                      if(res.data.result.withdrawcashcard=='1'&& res.data.result.withdrawcashalipay=='1'){
                        this.checkList=['0','1']  
                      }else if(res.data.result.withdrawcashcard=='1'&& res.data.result.withdrawcashalipay==''){
                           this.checkList=['0']  
                      }else if(res.data.result.withdrawcashalipay=='1' && res.data.result.withdrawcashcard==''){
                           this.checkList=['1']  
                      }else{
                        this.checkList=[]    
                      }
                     
        
                   if(res.data.result.first_thumb==''){
                       this.imglist1=[]
                   }else{
                    //    console.log(this.imglist1,3333); 
                       this.imglist1 = [
                    {
                        name: "图片",
                        url: res.data.result.first_thumb,
                    }
                        ];
                        // console.log(this.imglist1,123456);
                   }
                     this.imglist2=[]
                   if(res.data.result.pageadv==''){
                       this.imglist2=[]
                   }else{
                      let imgarr= res.data.result.pageadv.split(',')
                        //   console.log(imgarr,111);


                      for(var i =0; i<imgarr.length;i++){
                          this.imglist2.push( {
                            name: "图片"+(i+1),
                            url: imgarr[i],
                          })
                      }
                       
                        //  console.log(this.imglist2,7777);
                   }

                    
                }else{
                    this.bonusalone=0
                    this.withdraw = ''
                    this.withdrawmoney = 0
                    this.withdrawcashcard = ''
                    this.withdrawcashalipay =''
                    this.service_tel = ''
                }
            })
        },
        Change(val){
            // console.log(val,6666);
            if(val.length==0){
               this.withdrawcashcard=''
               this.withdrawcashalipay=''
            }else if(val.length==1){
                if(val[0]=='0'){
                    this.withdrawcashcard='1' 
                    this.withdrawcashalipay=''
                }else{
                     this.withdrawcashcard=''
                     this.withdrawcashalipay='1'
                }
            }else{
                this.withdrawcashcard='1' 
                this.withdrawcashalipay='1'
            }
        },
        //选择商品
        xuanzhe(){
            this.dialogVisibleS = true;
             this.getshop();
        },
        getshop(){
            this.$http
                .post("/admin/active/index", {
                    status: 1,
                    keyword: this.keyword,
                    limit:this.limit,
                    page: this.pageS,
                }).then(res=>{
                    // console.log(res,5555);
                    if (res.data.status == 1) {
                       
                        this.choShopList = res.data.result.list;
                        this.total =Number(res.data.result.total);
                    }
                })
        },
        chooseShop(row){
            console.log(row.id);
            this.dialogVisibleS = false;
            this.first_active=row.id
        },
        searchShop(){
            this.pageS=1
            this.getshop()
        },
           handleCurrentChangeS(val) {
            this.pageS = val;
            this.getshop();
        },
        handleRemove1(file, fileList) {
            this.imglist1 = fileList;

        }, 
         handleRemove2(file, fileList) {
            this.imglist2 = fileList;

        }, 
         handlePictureCardPreview1(file) {
            this.dialogImageUrl1 = file.url;
            this.dialogVisible1 = true;
        },
          handlePictureCardPreview2(file) {
            this.dialogImageUrl2= file.url;
            this.dialogVisible2 = true;
        },
         beforeRemove1(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
         beforeRemove2(file, fileList) {
            return this.$confirm(`确定移除 ${file.name}？`);
        },
         onexceed1(files, fileList) {
            this.$message.warning("只能上传一张图片!");
        },
         onexceed2(files, fileList) {
        
        },
         // 上传成功
        uploadSuccess1(response, file, fileList) {
            this.$message.success("上传成功");
        },
         uploadSuccess2(response, file, fileList) {
            this.$message.success("上传成功");
        },
         // 上传之前
        beforeAvatarUpload1(file) {
            var that = this;
            // 判断类型是不是图片
            if (!/image\/\w+/.test(file.type)) {
                that.$message("请确保文件为图像类型");
                return false;
            } else {
                var article_image, image_base64;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                image_base64 = this.result.split(",")[1];
                article_image = image_base64;
                that.$http
                    .post(that.baseurl + "admin/index/imgbase64", {
                        imgdata: article_image   
                    })
                    .then(res => {
                        // console.log("5555555555555555",res)
                        if (res.data.status == 1) {
                            that.imglist1.push({
                                name: file.name,
                                url: res.data.result.url,
                                imgurl: res.data.result.path
                            });
                            that.$message.success(res.data.message);
                        } else if (res.data.status == 0) {
                            this.$message.error(res.data.result.message);
                        }
                    })
                    .catch(error => {});
                };
            }
        },
         beforeAvatarUpload2(file) {
            var that = this;
            // 判断类型是不是图片
            if (!/image\/\w+/.test(file.type)) {
                that.$message("请确保文件为图像类型");
                return false;
            } else {
                var article_image, image_base64;
                var reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                image_base64 = this.result.split(",")[1];
                article_image = image_base64;
                that.$http
                    .post(that.baseurl + "admin/index/imgbase64", {
                        imgdata: article_image
                    })
                    .then(res => {
                        // console.log("5555555555555555",res)
                        if (res.data.status == 1) {
                            that.imglist2.push({
                                name: file.name,
                                url: res.data.result.url,
                                imgurl: res.data.result.path
                            });
                            that.$message.success(res.data.message);
                        } else if (res.data.status == 0) {
                            this.$message.error(res.data.result.message);
                        }
                    })
                    .catch(error => {});
                };
            }
        },
    },
    mounted(){
        this.getinfo()
    },
    created(){
         this.baseurl = Api.url;
    }
}
</script>
<style lang="less" scoped>
.ccia{
    .ccia_top{
        button{
             // width: 100px;
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
            color: #ffffff;
            border: 0;
            font-size: 12px;
            border-radius: 2px;
            background-color:#cba361;
            outline: none;
            // cursor: pointer;
            float: left;
        }
    }
    .ccia_contentbox{
        border-top: 1px solid #EDECEC;
        .ccia_content{
            overflow: hidden;
            .el-input{
                width: 50%;
            }
            .content_top{
                margin-top:30px;
                position: relative;
                text-align: left;
                >span:nth-of-type(1){
                    width: 150px;
                    display: inline-block;
                    text-align: right;
                    margin-right:20px;
                    height: 32px;
                    line-height: 32px;
                    font-size: 13px;
                }
                >span:nth-of-type(2){
                    position:absolute;
                    left: 175px;
                    top:40px;
                    font-size: 12px;
                    color :#999999;
                    font-family:PingFang-SC-Medium;
                    font-weight:500;
                }
                .el-select{
                    width: 100px;
                    height: 32px;;
                }
                >div{
                    display: inline;
                    font-size: 12px;
                }
            }
       
       
            div:last-child{
                button{
                    // width: 100px;
                    min-width: 58px;
                    height: 32px;
                    line-height: 32px;
                    padding: 0 15px;
                    color: #ffffff;
                    border: 0;
                    font-size: 12px;
                    border-radius: 2px;
                    background-color:#cba361;
                    outline: none;
                    cursor: pointer;
                    // float: left;
                }
                button:nth-of-type(1){
                    margin-left: 170px;
                    margin-right:10px;
                }
                button:nth-of-type(2){
                    color: #000;
                    padding: 0 18px;
                    background-color: #fff;
                    font-size: 13px;
                    border: 1px solid #EFEFEF;
                    
                }
            }
            .content_toplogo{
                margin-top: 48px;
                box-sizing: border-box;
                display: flex;
                
                align-item:center;
                >span{
                    margin-top: 60px;
                    margin-right: 25px !important;
                }
                >div{
                    display: inline-block;
                }
            }
        }
    }
    .submitbox{
        margin-top: 25px;
        margin-left: 5px;
        text-align: left;
        >p{
            font-size: 14px;
            color: #999;
            padding-left: 169px;
            margin-top: 10px;
        }
    }
}
</style>


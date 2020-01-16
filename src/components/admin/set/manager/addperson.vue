<template>
    <div class="ccia">
        <div class="ccia_top">
            <button>
                {{uid?'编辑管理员':'添加管理员'}}
            </button>
        </div>

        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop"></div> -->
            <div class="ccia_content">

                <div class="content_top">
                    <span>手机</span>
                    <div>
                        <el-input v-model="mobile" placeholder="请输入手机号"></el-input>
                    </div>
                </div>
                <div class="content_top" style="overflow:hidden">
                    <span style="float:left">头像</span>
                    <div class="clearfix" style="display:inline-block">
                        <el-upload class="avatar-uploader" :action="baseurl + 'admin/index/imgbase64'" :show-file-list="false" :on-success="handleAvatarSuccess" :before-upload="beforeAvatarUpload">
                            <img v-if="imageUrl" :src="imageUrl" class="avatar">
                            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                        </el-upload>
                    </div>
                </div>
                <div class="content_top">
                    <span>状态</span>
                    <div>
                        <el-select v-model="level" placeholder="请选择状态">
                            <el-option v-for="(item,index) in options" :key="index" :label="item.name" :value="item.val">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                 <div class="content_top">
                    <span>账号类型</span>
                    <div>
                        <el-select v-model="type" placeholder="请选择类型">
                            <el-option v-for="(item,index) in options1" :key="index" :label="item.name" :value="item.val">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                  <div class="content_top">
                       <span>管理活动</span>
                      <div>
                        
                            <el-input placeholder="管理活动" disabled >
                            <template slot="append">
                                <el-button @click="choShop">选择活动</el-button>
                            </template>
                            </el-input>
                            <p style="margin-left:175px;">提示：请选择管理员管理的活动,超级管理员不用选择</p>
                            <ul class="choShopName" style="margin-left:175px;" v-if="checkShopList.length>0">
                                <li
                                v-for="(item,index) in checkShopList"
                                :key="index">
                                    <p style="margin-left:10px">{{item.title}}
                                        <i class="el-icon-circle-close-outline" @click="deleteShop(item)"></i>
                                    </p>
                                </li>
                            </ul>
                    
                      </div>
                  </div>
                <!-- <div v-if='uid' class="content_top">
                    <span>是否修改其他管理员信息</span>
                    <div>
                        <el-radio-group v-model="is_otheradmin">
                            <el-radio :label="1">是</el-radio>
                            <el-radio :label="0">否</el-radio>
                        </el-radio-group>
                    </div>
                </div> -->
                <div class="content_top">
                    <span>密码</span>
                    <div>
                        <el-input v-model="password" placeholder="默认123456"></el-input>
                    </div>
                </div>
                <div class="content_top">
                    <span>昵称</span>
                    <div>
                        <el-input v-model="username" placeholder="请输入内容"></el-input>
                    </div>
                </div>
                <div class="content_top">
                    <span>备注</span>
                    <div>
                        <el-input v-model="remark" placeholder="请输入内容"></el-input>
                    </div>
                </div>

                <div class="submitbox">
                    <button @click="submit(uid)">提交</button>
                    <button @click="goback">返回列表</button>
                    <!-- <p>(如已有该支付方式,提交会覆盖原支付设置)</p> -->
                </div>
            </div>
        </div>
         <!-- 选择商家弹出框-->
        <el-dialog
        title="选择管理活动"
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
            label="活动"
            width="250"
        >
            <template
            slot-scope="scope"
            >
                <img style="width:80px;height:50px;" :src="scope.row.thumb">
                <span>{{scope.row.title}}</span>
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
            :total="totalS"
        >
        </el-pagination>
        </div>
        <span
        slot="footer"
        class="dialog-footer"
        >
        <el-button @click="cancel">取 消</el-button>
        </span>
    </el-dialog>
    </div>

</template>
<script>
import { Api } from "../../../../APi/WEBPC/index";
export default {
    data() {
        return {
            uid: "",
            mobile: "",
            password: "",
            username: "",
            remark: "",
            baseurl: this.api,
            imageUrl: "",
            level: "",
            thumb: "",
            is_otheradmin: 1,
            email: "",
            type:'',
            type1:'',
            choShopList:[],
            checkShopList:[],
             merch: [],
             merchids:'',
             dialogVisibleS: false,
               limit: 5,
            pageS: 1,
             keyword: "",
            totalS: "",
            options: [
               {
                   name:'禁用',
                   val:0
               } ,
               {
                   name:'启用',
                   val:1
               } ,
            ],
            options1: [
               {
                   name:'超级管理员',
                   val:1
               } ,
               {
                   name:'活动管理员',
                   val:2
               } ,
            ]
        };
    },
    methods: {
        goback() {
            // this.$router.go(-1)
            this.$router.push("/manager");
        },
      
        // 提交
        submit(val) {
            // if (this.level == "子管") {
            //     this.level = 1;
            // } else if (this.level == "财务人员") {
            //     this.level = 2;
            // } else if (this.level == "订单人员") {
            //     this.level = 3;
            // }
            console.log(this.thumb);
            if (val) {
                if (this.level == "禁止") {
                            this.level = 0;
                        } else if (this.level == "启用") {
                            this.level = 1;
                        }
                        if (this.type == "超级管理员") {
                            this.type = 1;
                        } else if (this.type == "活动管理员") {
                            this.type = 2;
                        }
                this.$http
                    .post(this.api + "admin/users/update", {
                        id:this.uid,
                        mobile: this.mobile,
                        password: this.password,
                        avatar: this.imageUrl,
                        status: this.level,
                        name:this.username,
                        remark:this.remark,
                        type:this.type,
                        authority:this.merchids
                    })
                    .then(res => {
                        //  console.log('genx',res)
                        if (res.data.status == 1) {
                            this.$message.success(res.data.message);
                            this.$router.push("/manager");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
            } else {
                this.$http
                    .post(this.api + "admin/users/save", {
                        mobile: this.mobile,
                        password: this.password,
                        avatar: this.imageUrl,
                        status: this.level,
                        name:this.username,
                        remark:this.remark,
                        type:this.type,
                        authority:this.merchids
                    })
                    .then(res => {
                        // console.log('提交',res)
                        if (res.data.status == 1) {
                            this.$message.success(res.data.message);
                            this.$router.push("/manager");
                        } else {
                            this.$message.error(res.data.message);
                        }
                    });
            }
        },
        // 获取数据
        getinfo() {
            this.$http
                .post(this.api + "admin/users/read", {
                    id: this.uid
                })
                .then(res => {
                    console.log('数据',res)
                    if (res.data.status == 1) {
                        (this.mobile = res.data.result.mobile),
                            (this.password = ""),
                            (this.imageUrl = res.data.result.avatar);
                        (this.username = res.data.result.name),
                            (this.remark = res.data.result.remark),
                            (this.level = res.data.result.status); 
                            (this.type = res.data.result.type);
                            (this.merchids = res.data.result.authority);
                            if(res.data.result.merch==""){
                                 (this.merch = []);   
                            }else{
                                (this.merch = res.data.result.merch);
                            }
                             
                        if (this.level == 0) {
                            this.level = "禁止";
                        } else if (this.level == 1) {
                            this.level = "启用";
                        }
                        if (this.type == 1) {
                            this.type = "超级管理员";
                        } else if (this.type == 2) {
                            this.type = "活动管理员";
                        }
                         this.merch.forEach((item, index) => {
                            this.checkShopList.push(item);
                        });
                    }
                });
        },

         //选择活动
        choShop() {
            this.$http
                .post("/admin/active/index", {
                    status: 1,
                    keyword: this.keyword,
                    limit:this.limit,
                    page: this.pageS,
                })
                .then(res => {
                    this.dialogVisibleS = true;
                    //console.log(res)
                    if (res.data.status == 1) {
                        console.log("123",res)
                        this.choShopList = res.data.result.list;
                        this.totalS = +res.data.result.total;
                    }
            });
        },
        searchShop() {
            this.choShop();
        },
        chooseShop(row) {
            let c=0;
            this.merch.forEach(element => {
                if (element.id == row.id) {
                    this.$Message.info("您已选中！");
                    c=1
                }
            });
            if(c==0){
                this.merch.push(row)
                let checkShopIdList = [];
                this.merch.forEach(element => {
                    checkShopIdList.push(element.id);
                });
                this.merchids = checkShopIdList.join(",");
                this.checkShopList = this.merch;
                console.log(this.merchids);
                console.log(this.merch);
            }
        },
        deleteShop(item) {
            this.merch.splice(
                this.merch.findIndex(it =>
                    it.id == item.id ? item.id : item.index
                ),
                1
            );
            let checkShopIdList = [];
            for (let itemId of this.merch) {
                checkShopIdList.push(itemId.id);
            }
            this.merchids = checkShopIdList.join(",");
            console.log(this.merchids);
        },

        cancel() {
            this.keyword = "";
            this.dialogVisibleS = false;
        },
         handleCurrentChangeS(val) {
            this.pageS = val;
            this.choShop();
        },
        handleAvatarSuccess(res, file) {
            // this.imageUrl = URL.createObjectURL(file.raw);
            console.log(this.imageUrl)
        },
        beforeAvatarUpload(file) {
            let image_base64;
            let that = this
            if (!/image\/\w+/.test(file.type)) {
                that.$message("请确保文件为图像类型");
                return false;
            } else {
                let reader = new FileReader();
                reader.readAsDataURL(file);
                reader.onload = function(e) {
                    image_base64 = this.result.split(",")[1];
                    var params = {
                        imgdata: image_base64
                    };
                    that.$http
                        .post(that.api + "admin/index/imgbase64", params)
                        .then(res => {
                               console.log(res)
                            if (res.data.status == 1) {
                                that.imageUrl = res.data.result.url
                                that.$message.success(res.data.message);
                                console.log(that.imageUrl)
                            } else if (res.data.status == 0) {
                                this.$message.error(res.data.message);
                            }
                        });
                };
            }
        }
    },
    created() {
         this.baseurl = Api.url;
        this.uid = Number(this.$route.params.id);
        if (this.uid) {
            this.getinfo();
        }
    }
};
</script>
<style lang="less" scoped>
.ccia {
    .ccia_top {
        button {
            // width: 100px;
            height: 32px;
            line-height: 32px;
            padding: 0 10px;
            color: #ffffff;
            border: 0;
            font-size: 12px;
            border-radius: 2px;
            background-color: #cba361;
            outline: none;
            // cursor: pointer;
            float: left;
        }
    }
    .ccia_contentbox {
        border-top: 1px solid #edecec;
        text-align: left;
        .ccia_content {
            overflow: hidden;
            .el-input {
                width: 50%;
            }
            .content_top {
                margin-top: 30px;
                > span:nth-of-type(1) {
                    width: 150px;
                    display: inline-block;
                    text-align: right;
                    margin-right: 20px;
                    height: 32px;
                    line-height: 32px;
                    font-size: 13px;
                }
                > span:nth-of-type(2) {
                    position: absolute;
                    left: 175px;
                    top: 40px;
                    font-size: 12px;
                    color: #999999;
                    font-family: PingFang-SC-Medium;
                    font-weight: 500;
                }
                .el-select {
                    width: 200px;
                    height: 32px;
                }
                > div {
                    display: inline;
                }
            }

            div:last-child {
                button {
                    // width: 100px;
                    min-width: 58px;
                    height: 32px;
                    line-height: 32px;
                    padding: 0 15px;
                    color: #ffffff;
                    border: 0;
                    font-size: 12px;
                    border-radius: 2px;
                    background-color: #cba361;
                    outline: none;
                    cursor: pointer;
                    // float: left;
                }
                button:nth-of-type(1) {
                    margin-left: 170px;
                    margin-right: 10px;
                }
                button:nth-of-type(2) {
                    color: #000;
                    padding: 0 18px;
                    background-color: #fff;
                    font-size: 13px;
                    border: 1px solid #efefef;
                }
            }
            .content_toplogo {
                margin-top: 48px;
                box-sizing: border-box;
                display: flex;

                align-item: center;
                > span {
                    margin-top: 60px;
                    margin-right: 25px !important;
                }
                > div {
                    display: inline-block;
                }
            }
        }
    }
    .submitbox {
        margin-top: 25px;
        margin-left: 5px;
        > p {
            font-size: 14px;
            color: #999;
            padding-left: 169px;
            margin-top: 10px;
        }
    }
}
/deep/ .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
}
/deep/ .avatar-uploader .el-upload:hover {
    border-color: #409eff;
}
/deep/ .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
}
/deep/ .avatar {
    width: 178px;
    height: 178px;
    display: block;
}
</style>


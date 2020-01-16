<template>
    <div class="ccia">
        <div class="add_top">
            <router-link to="/afterCoupon">
                <div class="add_topBtn">
                    <el-button type="primary" ><i class="el-icon-arrow-left"></i>返回列表</el-button>
                </div>
            </router-link>    
        </div>
        <div class="add_con">
            <el-form ref="info" :model="info" >
                <el-form-item label="优惠券名称" class="add_conInp">
                    <el-input type="text" v-model="info.title"></el-input>
                </el-form-item>
                <!-- <el-form-item label="优惠券类型">
                    <el-select v-model="info.name" placeholder="请选择">
                        <el-option v-model="info.name" ></el-option>
                    </el-select>
                </el-form-item> -->
                <el-form-item label="金额" class="add_conInp">
                    <el-input type="text" v-model="info.money"></el-input>
                </el-form-item>
                <el-form-item label="市场价格" class="add_conInp">
                    <el-input type="text" v-model="info.oldmoney"></el-input>
                </el-form-item>
                <el-form-item label="详情" class="add_conTextarea">
                    <Editor v-model="info.content" :t_value="info.content" class="editorclass" > </Editor>
                </el-form-item>
                <el-form-item label="活动时间">
                    <el-col :span="11">
                        <el-date-picker 
                        type="datetime" 
                        placeholder="选择日期" 
                        v-model="info.starttime" 
                        style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                    <el-col class="line" :span="2" style="width: 5%!important;margin-left:15px;">-</el-col>
                    <el-col :span="11">
                        <el-date-picker 
                        type="datetime" 
                        placeholder="选择日期" 
                        v-model="info.endtime" 
                        style="width: 100%;">
                        </el-date-picker>
                    </el-col>
                </el-form-item>
                <el-form-item label="选择商家"  class="add_conInp">
                    <el-input placeholder="选择商家" v-model="info.merchtitle" disabled>
                        <template slot="append">
                            <el-button @click="choShop">选择商家</el-button>
                        </template>
                    </el-input>
                    <p>提示：请选择活动关联商家</p>
                    <div class="choShopName" v-if="info.merchtitle">
                        <p style="margin-left:10px">{{info.merchtitle}}<i class="el-icon-circle-close-outline" @click="deleteShop"></i></p>
                    </div>
                </el-form-item>
                <el-form-item label="选择活动"  class="add_conInp">
                    <el-input placeholder="选择活动" v-model="info.activetitle" disabled>
                        <template slot="append">
                            <el-button @click="choAct">选择活动</el-button>
                        </template>
                    </el-input>
                    <p>提示：请选择关联活动商品</p>
                    <div class="choShopName" v-if="info.activetitle">
                        <p style="margin-left:10px">{{info.activetitle}}<i class="el-icon-circle-close-outline" @click="deleteAct"></i></p>
                    </div>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-radio-group v-model="info.status">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="是否多次核销">
                    <el-radio-group v-model="info.multiple">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="核销次数" class="add_conInp">
                    <el-input type="text" v-model="info.checknum"></el-input>
                    <p>提示：多次核销的优惠券需填写核销次数，若不填写默认为核销一次</p>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="primaryBtn">提交</el-button>
                    <el-button @click="goback">返回列表</el-button>
                </el-form-item>
            </el-form>
        </div>
        <!-- 选择商家及活动弹出层 -->
        <el-dialog
        title="选择参与商家"
        :visible.sync="dialogVisibleS"
        width="60%">
            <el-input v-model="keywordS">
                <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchShop"
                ></el-button>
            </el-input>
            <el-table :data="choShopList">
                <el-table-column
                    label="商家"
                    width="250"
                >
                    <template
                    slot-scope="scope"
                    >
                        <img style="width:80px;height:50px;" :src="scope.row.thumb">
                        <span>{{scope.row.title}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="联系人"
                    property="name"
                    width="250"
                ></el-table-column>
                <el-table-column
                    label="电话"
                    property="mobile"
                ></el-table-column>
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
                :page-size="limitS"
                layout="total,prev, pager, next"
                :total="totalS"
                >
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
            </span>
        </el-dialog>
    <!-- 弹窗分割 -->
        <el-dialog
        title="选择活动"
        :visible.sync="dialogVisibleA"
        width="60%">
            <el-input v-model="keywordA">
                <el-button
                slot="append"
                icon="el-icon-search"
                @click="searchAct"
                ></el-button>
            </el-input>
            <el-table :data="choActList">
                <el-table-column
                    label="活动标题"
                    width="250"
                    prop="title"
                ></el-table-column>
                <el-table-column
                    label="图片"
                    width="250"
                >
                    <template
                    slot-scope="scope"
                    >
                        <img style="width:100px;height:100px;" :src="scope.row.thumb">
                    </template>
                </el-table-column>
                <el-table-column
                    label="开始时间"
                    property="starttime"
                ></el-table-column>
                <el-table-column
                    label="结束时间"
                    property="endtime"
                ></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button
                        @click="chooseAct(scope.row)"
                        type="text"
                        size="small"
                        >选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div class="clearfix">
                <el-pagination
                background
                @current-change="handleCurrentChangeA"
                :current-page="pageA"
                :page-size="limitA"
                layout="total,prev, pager, next"
                :total="totalA"
                >
                </el-pagination>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancelA">取 消</el-button>
            </span>
        </el-dialog>
    </div>

</template>

<script>
import Editor from "../editor"
  export default {
    data() {
        return {
            mid: this.$route.params.id, // 判断新增还是修改字段
            info: {
                activeid: "",
                activetitle: "",
                category_name: "",
                checknum: "",
                content: "",
                createtime: "",
                endtime: "",
                id: "",
                merchid: "",
                merchtitle: "",
                money: "",
                multiple:'',
                starttime: "",
                status: "",
                title: "",
                oldmoney: '',
            },
            choShopList:[],//所有商家列表集合
            keywordS:'',
            dialogVisibleS:false,
            pageS:1,
            limitS:15,
            totalS:'',
            choActList:[],//所有活动列表集合
            keywordA:'',
            dialogVisibleA:false,
            pageA:1,
            limitA:15,
            totalA:'',
        }
    },
    components: {
        Editor
    },
    methods: {
        onSubmit() {
            console.log(this.info.status);
            if (this.mid != "" && !isNaN(this.mid)) {
                // console.log(222)
                //提交修改活动
                this.$http.post("/admin/coupon/update",this.info).then(res => {
                    // console.log("222",res)
                    if(res.data.status==1){
                        this.$message.success(res.data.message);
                        this.goback()
                    }else{
                        this.$message.error(res.data.message);
                    }
                }).catch(err => {
                    this.$message.error(err.data.message);
                });
            }else{
                //提交活动
                this.$http.post("/admin/coupon/save",this.info).then(res => {
                    // console.log("222",res)
                    if(res.data.status==1){
                        this.$message.success(res.data.message);
                        this.goback()
                    }else{
                        this.$message.error(res.data.message);
                    }
                }).catch(err => {
                    this.$message.error(err.data.message);
                });
            }
        },
        couponList(){
            if(this.mid){
                this.$http.post("/admin/coupon/read",{
                    id:this.mid
                    
                }).then(res=>{
                    console.log(this.mid)
                    console.log("数据",res)
                    this.info=res.data.result.info;
                })
            }
        },
        choShop() {
            //选择商家
            this.$http.post("/admin/merch/index", {
                    status: 1,
                    keyword: this.keywordS
                })
                .then(res => {
                    this.dialogVisibleS = true;
                    console.log('选择商家',res)
                if (res.data.status == 1) {
                    this.choShopList = res.data.result.list;
                    this.totalS = +res.data.result.total;
                }
            });
        },
        searchShop() {
            this.choShop();
        },
        chooseShop(row) {
            console.log(row,'弹窗选择')
            this.info.merchtitle=row.title
            this.info.merchid=row.id
        },
        deleteShop(){
            console.log("1111")
            this.info.merchtitle=''
            this.info.merchid=''
        },
        handleCurrentChangeS(val) {
            this.pageS = val;
            this.choShop();
        },
        cancel() {
            this.keywordS = "";
            this.dialogVisibleS = false;
        },
        choAct() {
            //选择活动
            this.$http.post("/admin/active/index", {
                    status: 1,
                    keyword: this.keywordA
                })
                .then(res => {
                    this.dialogVisibleA = true;
                    console.log(res)
                if (res.data.status == 1) {
                    this.choActList = res.data.result.list;
                    this.totalA = +res.data.result.total;
                }
            });
        },
        searchAct() {
            this.choAct();
        },
        chooseAct(row) {
            console.log(row,'jljljlsddflijll')
            this.info.activetitle=row.title
            this.info.activeid=row.id
        },
        deleteAct(){
            console.log("1111")
            this.info.activetitle=''
            this.info.activeid=''
        },
        handleCurrentChangeA(val) {
            this.pageA = val;
            this.choAct();
        },
        cancelA() {
            this.keywordA = "";
            this.dialogVisibleA = false;
        },
        goback(){
            this.$router.go(-1)
        }
    },
    computed: {},

    created() {
        this.couponList()
    },

    mounted() {},

    watch: {}

  }

</script>
<style lang='less' scoped>
.ccia{
    padding: 0 10px 39px 0;
    .add_top{
        padding: 20px 0;
        border-bottom: 1px solid #EDECEC;
        .add_topBtn{
            text-align: left;
            padding-left: 41px;
            /deep/ .el-button{
                color: #ffffff;
                font-size: 14px;
                cursor: pointer;
                i{
                    margin-right: 3px;
                }
            }
        }
    }
    .add_con{
        padding-top: 42px;
        width:100%;
        /deep/ .el-form-item__label {
            width: 200px;
            font-size: 16px;
            color: #000000;
            padding: 0 20px 0 0;
        }
        /deep/ .el-form-item__content {
            margin-left: 0;
            float: left;
            .el-input__inner {
                width: 300px;
                height: 40px;
                line-height: 40px;
            }
        }
        .primaryBtn{
            margin-left: 200px;
        }
        .add_conInp{
            width:100%;
           /deep/ .el-input__inner {
               float: left;
                width:1100px;
            }
            p{
                text-align: left;
                color: #666666;
                font-size: 12px;
            }
        }
        .choShopName {
            width: 100%;
            height: 40px;
            overflow: hidden;
            p {
            color: rgb(216, 189, 99);
            font-size: 16px;
            }
            i {
            width: 16px;
            height: 16px;
            cursor: pointer;
            }
        }
    }
    .add_conTextarea{
        width:100%;
        // /deep/.el-form-item__content{
        //     width:1380px;
        // }
        height: 570px;
        /deep/ .el-form-item__label{
                    float: left;
                    line-height: 400px;
                }
        .editorclass{
                width:1150px;
                // min-height: 140px !important; 
            }
    }
    
}
</style>
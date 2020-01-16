<template>
    <div class="ccia">
        <div class="add_top">
            <router-link to="/memberList">
                <div class="add_topBtn">
                    <el-button type="primary"><i class="el-icon-arrow-left"></i>返回列表</el-button>
                </div>
            </router-link>
        </div>
        <div class="add_con">
            <el-tabs v-model="activeName" @tab-click="handleClick">
                <el-tab-pane label="基本" name="first" class="add_conFir">
                    <el-form ref="form" :model="form" style="margin-top:40px;">
                        <el-form-item label="会员">
                            <div>
                                <span style="width:60px;height:60px;overflow:hidden;border-radius:50px;display:inline-block;vertical-align: middle;margin-right:20px;">
                                    <img style="width:100%;height:100%" :src="form.avatar" alt="">
                                </span>
                                <span style="font-size:20px;">{{form.nickname}}</span>
                            </div>
                        </el-form-item>
                        <el-form-item label="真实姓名" class="add_conInp">
                            <el-input type="text" v-model="form.realname"></el-input>
                        </el-form-item>
                        <el-form-item label="手机号">
                            <p style="font-size:20px;">{{form.mobile}}</p>
                        </el-form-item>
                        <el-form-item label="密码" class="add_conInp">
                            <el-input type="text" placeholder="密码留空则不修改" v-model="password"></el-input>
                        </el-form-item>
                        <el-form-item label="注册时间" class="add_conInp">
                            <p style="font-size:20px;color:#666666;">{{form.createtime}}</p>
                        </el-form-item>
                        <el-form-item label="会员状态">
                            <el-switch
                                v-model="form.status"
                                active-color="#13ce66"
                                inactive-color="#ff4949"
                                active-value="1"
                                inactive-value="0">
                            </el-switch>
                        </el-form-item>
                        <el-form-item label="余额" class="add_conInp">
                            <span style="font-size:20px;">{{form.money}}</span><span @click="addmoney" class="font-c cur-po"> 充值</span>
                        </el-form-item>
                        <el-form-item label="参与活动">
                            <p style="font-size:20px;">{{form.active_text}}</p>
                        </el-form-item>
                        <el-form-item>
                            <div>
                                <el-button type="primary" @click="onSubmit" class="primaryBtn">保存</el-button>
                                <el-button @click="onCancel">取消</el-button>
                            </div>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
                <el-tab-pane label="分销" name="second" class="add_conSec">
                    <el-form ref="form" :model="form" style="margin-top:40px;">
                        <el-form-item label="上级分销商" class="add_shangjiInp">
                            <el-input disabled v-model="niandmob">
                                <el-button style="color:#6e6e6e;padding-right:20px;" slot="append" @click="choDis">选择上级分销商</el-button>
                                <el-button style="background-color:#eb6060;color:#fff;height:100%" slot="append" @click="delDis">清除选择</el-button>
                            </el-input>
                        </el-form-item>
                        <el-form-item label="累计佣金">
                            <p style="font-size:20px;">{{form.commissions}}</p>
                        </el-form-item>
                        <el-form-item label="已打款佣金">
                            <p style="font-size:20px;">{{form.applymoney}}</p>
                        </el-form-item>
                    </el-form>
                </el-tab-pane>
            </el-tabs>
        </div>
        <el-dialog title="会员充值" :visible.sync="dialogTableVisible">
            <div class="dialog_top" style="overflow:hidden">
                <div style="width:50%;float:left;">
                    <span style="font-size:16px">会员：</span>
                    <span style="width:50px;height:50px;overflow:hidden;border-radius:25px;display:inline-block;vertical-align: top;">
                        <img style="width:100%;height:100%" :src="form.avatar" alt="">
                    </span>
                    <span>{{form.nickname}}</span>
                </div>
                <div style="width:50%;float:left">
                    <div style="float:left;font-size:16px">会员信息：</div>
                    <div style="float:left">
                        <p>ID：{{form.id}}</p>
                        <p>姓名：{{form.realname}}</p>
                        <p>手机号：{{form.mobile}}</p>
                    </div>
                </div>
            </div>
            <div class="dialog_bottom">
                <el-tabs v-model="activeName1" @tab-click="handleClick1">
                    <el-form :model="form" ref="ruleForm" label-width="120px" >
                        <el-form-item label="当前余额" prop="name">
                            <span>{{form.money}}</span>
                        </el-form-item>
                        <el-form-item label="变化" prop="type">
                            <el-radio-group v-model="type">
                                <el-radio label="+">增加</el-radio>
                                <el-radio label="-">减少</el-radio>
                                <el-radio label="=">最终余额</el-radio>
                            </el-radio-group>
                        </el-form-item>
                        <el-form-item label="充值数目" prop="money">
                            <el-input v-model="addmon"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                            <el-input type="textarea" v-model="addbeizhu"></el-input>
                        </el-form-item>
                        <el-form-item>
                            <el-button type="primary" @click="submitForm('ruleForm')">确认充值余额</el-button>
                            <el-button @click="cancel">取消</el-button>
                        </el-form-item>
                    </el-form>
                </el-tabs>
            </div>
        </el-dialog>
        <el-dialog
            title="选择上级分销商"
            :visible.sync="dialogVisibleS"
            width="60%">
            <el-input v-model="keyword">
                <el-button slot="append" icon="el-icon-search" @click="searchS"></el-button>
            </el-input>
            <el-table :data="gridData">
                <el-table-column label="昵称" width="250">
                    <template slot-scope="scope">
                        <span style="display:inline-block;width:30px"><img width="30px" :src="scope.row.avatar" alt=""></span>
                        <span>{{scope.row.nickname}}</span>
                    </template>
                    
                </el-table-column>
                <el-table-column property="realname" label="姓名" width="250"></el-table-column>
                <el-table-column property="mobile" label="电话"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="chooseClick(scope.row)" type="text" size="small">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div  class="clearfix">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="limit"
                    layout="total,prev, pager, next"
                    :total="total">
                </el-pagination>
             </div>
            <span slot="footer">
                <el-button @click="cancelS">取 消</el-button>
            </span>
            <!-- <el-table :data="gridData">
                <el-table-column label="昵称" width="250">
                    <template slot-scope="scope">
                        <span style="display:inline-block;width:30px"><img width="30px" :src="scope.row.headimg_show" alt=""></span>
                        <span>{{scope.row.nicheng}}</span>
                    </template>
                    
                </el-table-column>
                <el-table-column property="realname" label="姓名" width="250"></el-table-column>
                <el-table-column property="mobile" label="电话"></el-table-column>
                <el-table-column label="操作">
                    <template slot-scope="scope">
                        <el-button @click="chooseClick(scope.row)" type="text" size="small">选择</el-button>
                    </template>
                </el-table-column>
            </el-table>
            <div  class="clearfix">
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="page"
                    :page-size="limit"
                    layout="total,prev, pager, next"
                    :total="total">
                </el-pagination>
             </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="cancel">取 消</el-button>
            </span> -->
        </el-dialog>
    </div>
</template>

<script>

  export default {
    data() {
        return {
            mid:this.$route.params.id,
            activeName: 'first',//标签分页
            form: {
                
            },
            password:'',
            activeName1: "one",//金额修改弹框
            dialogTableVisible:false,
            type:'+',
            niandmob:'',
            addmon:'',
            addbeizhu:'',

            //分销商弹框
            dialogVisibleS:false,
            keyword:'',//搜索框
            gridData: [],//分销商数据
            //分页
            limit:5,
            page:1,
            total:0,
        }
    },
    methods: {
        //标签页
        handleClick(tab, event) {
            // console.log(tab, event);
        },
        handleClick1(tab, event) {
            //   console.log(this.mid)
            // console.log(tab, event);
        },
        //获取用户信息
        getIdInfo(){
            this.$http.post("/admin/member/read",{
                id:this.mid
            }).then(res=>{
                console.log("数据",res)
                if(res.data.status==1){
                    this.form=res.data.result.info
                    // console.log("数据11111",this.form.agent)
                    if(this.form.agent){
                        this.niandmob = this.form.agent.nickname + '/' + this.form.agent.mobile
                    }else{
                        this.niandmob = ''
                    }
                }else{
                    this.$Message.error(res.data.message)
                }
            })
        },
        //充值
        addmoney(){
            this.dialogTableVisible = true
        },
        cancel(){
            this.dialogTableVisible = false
        },
        //选择分销商
        getshopList(){
            this.$http.post("/admin/member/index",{
                limit:this.limit,
                page:this.page,
                keyword:this.keyword,
            }).then(res=>{
                // console.log("分销商",res)
                if(res.data.status==1){
                    if(res.data.result.list!=""){
                        this.gridData=res.data.result.list
                        this.total=res.data.result.total*1
                    }else{
                        this.$Message.info("暂无数据")
                    }
                }else{
                    this.$Message.error(res.data.message)
                }
            })
        },
        choDis(){
            this.dialogVisibleS=true
            this.getshopList()
        },
        searchS(){
            this.getshopList()
        },
        cancelS(){
            this.dialogVisibleS=false
        },
        chooseClick(row){
            this.$http.post(this.api + 'admin/member/bindagent',{
                id:this.mid,
                agentid:row.id
            }).then(res=>{
                if(res.data.status ==1){
                    this.dialogVisibleS = false
                    this.keyword = ''
                    this.$message.success(res.data.message)
                    this.getIdInfo()
                }else{
                    this.$message.error(res.data.message) 
                }
            })
        } ,
        delDis(){
            this.$http.post(this.api + 'admin/member/removeagent',{
                id:this.mid,
            }).then(res=>{
                 console.log("清除上级",res)
                if(res.data.status ==1){
                    this.$message.success(res.data.message)
                    this.getIdInfo()
                }else{
                    this.$message.error(res.data.message) 
                }
            })
        },
        handleCurrentChange(val){
            this.page = val
            this.getshopList()
        },
        //弹框提交
        submitForm(val){
            if(!this.type){
                this.$message.error('请选择变化方式')
                return
            }
            if(!this.addmon){
                this.$message.error('请选择金额')
                return
            }
            if(this.addmon>99999999){
                this.$message.error('金额过大')
                return
            }
            this.$http.post("/admin/member/setCredit",{
                id:this.mid,
                number:this.addmon,
                type:this.type,
                remark:this.addbeizhu 
            }).then(res=>{
                console.log('111')
                if(res.data.status==1){
                    console.log("111",res)
                    this.dialogTableVisible=false;
                    this.addmon=0;
                    this.getIdInfo()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        //保存按钮
        onSubmit() {
            console.log(this.form.realname)
            console.log(this.form.password)
            this.$http.post('/admin/member/update',{
                id:this.mid,
                nickname:this.form.nickname,
                realname:this.form.realname,
                mobile:this.form.mobile,
                password:this.password,
            }).then(res=>{
                if(res.data.status==1){
                    this.$message.success(res.data.message)
                    this.getIdInfo()
                }else{
                    this.$message.error(res.data.message)
                }
            })
        },
        onCancel(){
            this.$router.go(-1)
        }
    },

    components: {},

    computed: {},

    created() {
        this.getIdInfo()
        this.getshopList()
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
        padding-top: 30px;
        padding-left: 41px;
        /deep/ .el-tabs__item {
            padding: 0 40px;
            font-size: 24px;
            color: #333333;
        }
        
        /deep/ .el-form-item__label {
            width: 150px;
            font-size: 16px;
            color: #000000;
            padding: 0 40px 0 0;
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
            margin-left: 150px;
            margin-top: 100px;
        }
        .add_conInp{
            width:100%;
            /deep/ .el-input__inner {
                float: left ;
                width:1100px;
            }
        }
        .add_shangjiInp{
            width:100%;
            /deep/ .el-input__inner {
                float: left ;
                width:1100px;
                
            }
        }
    }
    .dialog_top{
        text-align: left;
        border-bottom: 1px solid #efefef;
        padding-bottom: 10px;
        p{
            height: 20px;
            line-height: 20px;
        }
    }
    .dialog_bottom{
        text-align: left;
    }
}
</style>
<template>
    <div class="ccia">
        <div class="ccia_top">
            <div class="timebox">
                <!-- {{timenum}} -->
                <el-date-picker
                    v-model="timenum"
                    @change="timechange"
                    format='yyyy-MM-dd'
                    value-format='yyyy-MM-dd'
                    type="daterange"
                    align="right"
                    unlink-panels
                    range-separator="至"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions2">
                </el-date-picker>
            </div>
            <div class="top_right">
                <el-select  v-model="nowstatus" clearable  placeholder="状态" class="typeselect" @change="typechange">
                    <el-option
                    v-for="item in statuslist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value">
                    </el-option>
                </el-select>
                <!-- <el-select class="hydj" v-model="lvid" clearable  placeholder="会员等级" @change="levelchange">
                    <el-option
                    v-for="item in levellist"
                    :key="item.id"
                    :label="item.levelname"
                    :value="item.id">
                    </el-option>
                </el-select> -->
                <div class="searchinputbox">
                    <el-input v-model="keyword" placeholder="请输入提现单号/用户名/用户手机" class="searchinput" @change="search"></el-input>
                </div>
                <button @click="search">搜索</button>
                <!-- <a class="exportbtn" :href="exporthref">导出</a> -->
            </div>
            
        </div>
        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop"></div> -->
            <div class="ccia_content clearfix">
                <!-- <div class="top">
                    提现列表
                </div> -->
                <div>
                     <el-table
                        :data="tableData"
                        v-loading="isLoading"
                        style="width: 100%">
                        <el-table-column
                            prop="logno"
                            label="提现单号"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="date"
                            label="粉丝"
                            width="150">
                            <template slot-scope="scope">
                                <img :src="scope.row.avatar?scope.row.avatar:''" class="userpic">
                                <span>{{scope.row.nickname}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="会员信息"
                            width="150">
                            <template slot-scope="scope">
                                <div>{{scope.row.levelname}}</div>
                                <div>{{scope.row.mobile}}</div>
                            </template>
                        </el-table-column>
    <!-- label="充值金额 / 应到账金额 / 手续费金额" -->
                        <el-table-column
                            prop="name"
                            :render-header="renderHeader">
                            <template slot-scope="scope">
                                <div>{{scope.row.money}}</div>
                                <div>{{scope.row.realmoney}}</div>
                                <div>{{scope.row.charge}}</div>
                            </template>
                        </el-table-column>
                        <!-- <el-table-column
                            prop="name"
                            :render-header="renderHeader1"
                            width="150">
                        </el-table-column> -->
                        <el-table-column
                            prop="applytype"
                            label="提现方式"
                            width="300">
                            <template slot-scope="scope">
                                <div>{{scope.row.applytype}}</div>
                                <div v-if="scope.row.applytype=='支付宝'">{{scope.row.mobile}}</div>
                                <div v-else-if="scope.row.applytype=='银行卡'">{{scope.row.bankcard}}</div>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="createtime"
                            label="提现时间"
                            width="180">
                        </el-table-column>
                        
                        <el-table-column
                            prop="status_text"
                            label="状态"
                             width="100">
                            <template slot-scope="scope">
                                <span v-if="scope.row.status=='-1'" class="istype1">
                                    {{scope.row.status_text}}
                                </span>
                                <span v-else-if="scope.row.status=='0'" class="istype2">
                                    {{scope.row.status_text}}
                                </span>
                                <span v-else class="istype3">
                                    {{scope.row.status_text}}
                                </span>
                            </template>
                        </el-table-column>
                         <el-table-column
                        fixed="right"
                        label="操作">
                            <template slot-scope="scope">
                                <!-- <el-tooltip class="item" effect="dark" content="处理" placement="top">
                                    <span class="edit" v-if="scope.row.status==0 || scope.row.status==-1" @click="tocheck(scope.row)"><i class="iconfont el-icon-edit-outline"></i></span>
                                </el-tooltip> 
                                <span class="niu" :class="scope.row.status_text === '启用' ? 'info' : 'warning'"  @click="statusupdate(scope.row)">{{scope.row.status_text}}</span> -->
                                <el-radio-group v-if='scope.row.status==0'>
                                    <el-radio @click.native.prevent="clickitem(scope.row.id,'-1')" label="-1" >拒绝</el-radio>
                                    <el-radio @click.native.prevent="clickitem(scope.row.id,'1')" label="1" >同意</el-radio>
                                </el-radio-group>
                            </template>
                        </el-table-column>
                    </el-table>
                    <el-pagination
                        style="padding-bottom: 20px;"
                        background
                        @current-change="handleCurrentChange"
                        :current-page="currentPage"
                        :page-size="limit"
                        layout="total, prev, pager, next, jumper"
                        :total="total">
                    </el-pagination>
                </div>
            </div>
        </div>
        <!-- <el-dialog title="提现处理" :visible.sync="dialogFormVisible" class="checklegal" >
            <el-form>
                <el-form-item label="提现处理：" :label-width="formLabelWidth">
                    <el-radio-group v-model="checkmoney">
                        <el-radio label="-1" >拒绝</el-radio>
                        <el-radio label="1" >同意</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="备注" :label-width="formLabelWidth">
                    <el-input v-model="remark" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="sendcheck">确 定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>
<script>
export default {
    data(){
        return{
            pickerOptions2: {
                shortcuts: [{
                    text: '今天',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    // start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近一周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', [start, end]);
                    }
                },{
                    text: '最近两周',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();

                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 14);
                    picker.$emit('pick', [start, end]);
                    }
                }, {
                    text: '最近一个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', [start, end]);
                    }
                }],
            },
            statuslist:[
                {
                    value: "-1",
                    label: "拒绝"
                },
                {
                    value: "0",
                    label: "申请中"
                },
                {
                    value: "1",
                    label: "提现成功"
                }
            ],
            isLoading:true,
            nowstatus:'',//状态选择
            exporthref:'',
            // token:sessionStorage.getItem("ms_token"),
            tableData: [],
            currentPage:1,
            limit:10,
            total:0,
            timenum:[],
            starttime:'',
            endtime:'',
            keyword:'',
            levellist: [],
            lvid:'',
            formLabelWidth: '120',
            dialogFormVisible:false,
            checkid:'',//弹框选中的id
            checkstatus:'',
            checkmoney:'',//弹框选中的状态
            remark:'',//弹框选中的备注
        }
    },
    methods:{
        // 获取列表
        getlist(){
            this.isLoading=true
            this.$http.post('admin/withdraw_log/index',{
                status:this.nowstatus,
                page:this.currentPage,
                limit:this.limit,
                starttime:this.starttime,
                endtime:this.endtime,
                keyword:this.keyword,
                lvid:this.lvid
            }).then(res=>{
                this.isLoading=false
                console.log('提现记录',res)
                if(res.data.status==1){
                    if(res.data.result.list!=''){
                        this.tableData = res.data.result.list
                        this.total = Number(res.data.result.total)
                    }else{
                        this.tableData = []
                        this.total = 0
                    }
                    // this.exporthref = `${this.api}admin/index/export?exporttype=4&status=${this.status}&position=adminapp&token=${this.token}&limit=${this.limit}&page=${this.currentPage}&keyword=${this.keyword}&lvid=${this.lvid}&starttime=${this.starttime}&endtime=${this.endtime}`
                }else{
                    this.$Message.error(res.data.message)
                }
            })
        },
        // 获取会员等级
        // getuserlevel(){
        //     this.$http.post('admin/memberlevel/index',{
        //         limit:99999,
        //         enabled:1
        //     }).then(res=>{
        //         // console.log('用户等级',res)
        //         if(res.data.status==1){
        //             this.levellist = res.data.result.list
        //         }
        //     })
        // },
        timechange(){
            this.currentPage = 1
            // console.log(this.timenum)
            if(!this.timenum){
                this.starttime = ''
                this.endtime = ''
            }else{
                this.starttime = this.timenum[0]
                this.endtime = this.timenum[1]
            }
            this.getlist()
        },
        typechange(val){
            this.currentPage = 1
            this.nowstatus = val;
            this.getlist()
        },
        // levelchange(){
        //     this.currentPage = 1
        //     this.getlist()
        // },
        handleCurrentChange(val) {
            this.currentPage =val
            // console.log(`当前页: ${val}`);
            this.getlist()
        },
        renderHeader (h, { column, $index }) {
            return [h('p',['提现金额']),h('p',['应到账金额']),h('p',['手续费金额'])]
        },
        // renderHeader1(h){
        //     return [h('p', {}, ['已发送金额']),]
        //     // h('p', {}, ['(微信红包)'])
        // },
        search(){
            this.currentPage = 1
            this.getlist()
        },
        clickitem(id,val){
            if(val==-1){
                this.$http.post('admin/withdraw_log/refuse',{
                    id:id,
                }).then(res=>{
                    // console.log('处理',res)
                    if(res.data.status==1){
                        this.$message.success(res.data.message);
                        this.getlist()
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            }else{
                this.$http.post('admin/withdraw_log/manual',{
                    id:id,
                }).then(res=>{
                    // console.log('处理',res)
                    if(res.data.status==1){
                        this.$message.success(res.data.message);
                        this.getlist()
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            }
        },
        // tocheck(row){
        //     this.dialogFormVisible = true
        //     console.log('点击的',row.status)
        //     this.checkmoney = row.status
        //     // this.remark = ''
        //     this.checkid = row.id
        //     // this.checkstatus = row.status
        // },
        // sendcheck(){
        //     this.$http.post(this.api+'admin/withdraw/change',{
        //         id:this.checkid,
        //         status:this.checkmoney,
        //         remark:this.remark
        //     }).then(res=>{
        //         // console.log('处理',res)
        //         if(res.data.status==1){
        //             this.$message.success(res.data.message);
        //             this.dialogFormVisible = false
        //             this.getlist()
        //         }else{
        //             this.$message.error(res.data.message);
        //         }
        //     })
        // },
    },
    mounted(){
        this.getlist()
        // this.getuserlevel()
        // let hh = Array.from('linlei')
        
    }
}
</script>
<style lang="less" scoped>
.ccia{
    padding: 0;
    background-color: #EDF1F2;
}
.ccia_top{
    padding: 19px 20px;
    width: 100%;
    box-sizing: border-box;
    background-color: #fff;;
    border-radius: 4px;
    >div{
        float: left;
        // box-sizing: border-box;
    }
    .exportbtn{
        color: white;
        background-color: #CBA361;
        width: 57px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        outline: none;
        display: inline-block;
        text-decoration: none;
        font-size: 13px;
    }
    .timebox{
        width: 300px;
        height: 30px;
        // background-color: red;
        text-align:center;
        line-height: 30px;
        font-size: 12px;
        color: #333333;
        cursor: pointer;
        position: relative;
        /deep/ .el-input__inner{
            width: 100%;
            .el-range-separator{
                width: 20px;
            }
        }
    }
    .top_right{
        // width: 50%;
        float: right;
        .el-select{
            float: left;
        }
        .el-input{
             float: left;
        }
    }
    .typeselect {
        width: 100px;
    }
    .closebox{
        height: 30px;
        width: 30px;
        text-align: center;
    }
    /deep/ .el-input::-webkit-scrollbar-thumb{
        border-radius: 0;
    }
    /deep/ .el-input__inner{
        border-radius: 0;
        // width: 100px;
        color: #333333;
    }
    .hydj{
        /deep/ .el-input__inner{
        border-radius: 0;
        width: 120px;
        color: #333333;
    }
    }
    .searchinputbox{
        // width: 33.5%;
        float: left;
        width: 460px;
        .searchinput{
            /deep/ .el-input__inner{
                width: 100%;
            }
        }
    }
    button{
        width: 57px;
        height: 32px;
        text-align: center;
        line-height: 30px;
        outline: none;
        border:0;
        float:left;
        color: #FEFFFF;
        font-family:PingFang-SC-Medium;
        font-size: 13px;
        cursor: pointer;
    }
    button:nth-of-type(1){
        background-color: #CBA361;
    }
    a{
        margin-left: 5px;

    }
    
}
.ccia_contentbox{
    margin-top: 20px;
    background-color: #fff;
    border-radius: 4px;
    .top{
        width: 100%;
        height: 50px;
        line-height: 50px;
        border-bottom: 1px solid #EDECEC;
        font-size: 15px;
        font-family:PingFang-SC-Medium;
        // padding-left:32px;
    }
    >div{
        padding:0 30px;
        /deep/ .el-table__body {
            /deep/ .el-table_1_column_7  .cell{
                // color: #28B7A3;
            }
        }
    }
    .el-table{
        font-size: 16px;
    }
    .istype1{
        color: red;
        // font-size: 13px;
    }
    .istype2{
        color: #28B7A3;
        // font-size: 13px;
    }
    .istype3{
        color: #CBA361;
        // font-size: 13px;
    }
    .userpic{
        width: 40px;
        height: 40px;
        // background-color:red;
        // border-radius: 50%;
        // transform: translate(0,10px)
        vertical-align:middle;
    }
    /deep/ .el-table__row{
        span{
            vertical-align:middle;
        }
        
    }
}
.edit{
    display: inline-block;
    width: 22px;
    height: 22px;
    border-radius: 2px;
    border: 1px solid #EFF0F0;
    // border: 1px solid red;
    text-align: center;
    cursor: pointer;
    i{
        line-height: 22px;
        font-size: 16px;
    }
    
}
.edit:hover{
    border: 1px solid #28B7A3;
    i{
        color: #28B7A3;
    }
}
.checklegal{
        box-sizing: border-box;
        /deep/ .el-form-item__label{
            width: 25%;

        }
        /deep/ .el-input{
            width: 50%;
            // display:inline;
        }
        /deep/ .el-form-item__label{
            margin-right: 30px;
        }
        .isagree{
            // border: 1px solid #EB6060;
            padding-left: 25%;
            margin-top: -15px;
            color: #999999;
            font-size: 12px;
            line-height: 27px;
        }
        .dialog-footer{
            text-align: center;
            padding-right: 70px;
            button{
                width: 105px;
            }
        }
        /deep/ .el-dialog__footer{
            padding-top:0;
            margin-top: -10px;
        }
         
    }
</style>




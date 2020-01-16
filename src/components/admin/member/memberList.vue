<template>
    <div class="ccia">
        <div class="act_top">
            <el-row>
                <el-col :span="12">
                    <div class="act_topL">
                        <div class="timebox">
                            <el-date-picker
                                v-model="timenum"
                                type="datetimerange"
                                :picker-options="pickerOptions2"
                                range-separator="至"
                                start-placeholder="开始日期"
                                end-placeholder="结束日期"
                                align="right"
                                :default-time="['12:00:00', '08:00:00']"
                                prefix-icon="el-icon-date"
                                @change="datechange"
                                value-format='yyyy-MM-dd HH:mm:ss'
                                >
                            </el-date-picker>
                        </div>
                        <!-- <el-select v-model="lvid" clearable placeholder="等级" @change="changelev">
                            <el-option
                            v-for="(item,index) in options1"
                            :key="index"
                            :label="item.value"
                            :value="item.status">
                            </el-option>
                        </el-select> -->
                        <el-select v-model="isNormal" clearable placeholder="黑名单" @change="changestatus">
                            <el-option
                            v-for="(item,index) in options2"
                            :key="index"
                            :label="item.label"
                            :value="item.value">
                            </el-option>
                        </el-select>
                    </div> 
                </el-col>
                <el-col :span="12">
                    <div class="act_topR">
                        <div class="searchinputbox">
                            <el-input v-model="keyword" placeholder="请输入会员名称/电话号码" class="searchinput"></el-input>
                        </div>
                        <button @click="search">搜索</button>
                        <!-- <button @click="search" style="margin-left:10px">导出</button> -->
                    </div>
                </el-col>
            </el-row>
        </div>
        <div class="act_btn">
            <el-button @click="alldelete(1)">设置黑名单</el-button>
            <el-button @click="alldelete(0)">取消黑名单</el-button>
            <!-- <el-button >设置黑名单</el-button>
            <el-button >取消黑名单</el-button> -->
        </div>
        <div class="act_con">
            <el-table
            v-loading="isLoading"
            :data="memList"
            style="width: 100%"
            @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="会员" width="330" prop="">
                    <template slot-scope="scope">
                        <span style="display:inline-block;width:60px;height:60px;overflow:hidden;border-radius:50%;"><img style="width:100%;height:100%" :src="scope.row.avatar" onerror="this.src='../../../../static/images/pro.png'" alt=""></span>
                        <span style="display:inline-block;width:150px;height:60px;vertical-align: text-bottom;">{{ scope.row.nickname}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="会员信息" width="330" >
                    <template slot-scope="scope">
                        <div>
                            <p style="height:30px;">{{ scope.row.realname}}</p>
                            <p style="height:30px;">{{ scope.row.mobile}}</p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="是否参与活动" width="150" prop="isjoin">
                    <!-- <template slot-scope="scope">
                        <p style="height:30px;">{{ scope.row.isjoin_text}}</p>
                    </template> -->
                </el-table-column>
                <el-table-column label="成交" width="200">
                    <template slot-scope="scope2">
                        <div>
                            <p style="height:30px;">订单：<span>{{ scope2.row.ordertotal}}</span></p>
                            <p style="height:30px;">金额：<span>{{ scope2.row.orderprice}}</span></p>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="余额" prop="money"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <el-switch
                            @change="deleterow(scope.row)"
                            v-model="scope.row.status"
                            active-value = 1
                            inactive-value = 0
                            active-color="#CBA361"
                            inactive-color="#ff4949">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="注册时间" width="250" prop="createtime"></el-table-column>
                <el-table-column label="操作"  width="300">
                    <template slot-scope="scope">
                        <el-tooltip class="item" effect="dark" content="个人详情" placement="top">
                            <span class="edit" @click="rowmore(scope.row)"><i class="iconfont el-icon-service "></i></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="个人订单" placement="top">
                            <span class="edit" @click="listmore(scope.row)"><i class="iconfont el-icon-document"></i></span>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="page"
                :page-size="pagesize"
                layout="total, prev, pager, next, jumper"
                :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>

export default {
    data(){
        return{
            
            timenum: '',//日期选择
            starttime:'',
            endtime:'',
            keyword:'',//搜索关键字
            status:'',
            isjoin_text:'',//是否参加活动文字
            lvid:'',//点击时等级更改
            isNormal:'',//点击是否为黑名单或正常
            isLoading:true,//表格加载
            pickerOptions2: {
                shortcuts: [
                    {
                        text: '今天',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
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
                    }
                ]
            },
            // options1: [
            //     {
            //         value:'普通会员',
            //         status:1,
            //     },
            //     {
            //         value:'霸王卡会员',
            //         status:0,
            //     }
            // ],
            options2: [
                {
                    value: "1",
                    label: "正常"
                },
                {
                    value: "0",
                    label: "黑名单"
                }
            ],
            memList:[],//会员列表
            multipleSelection: [],//单选框选中会员列表
            // 分页
            page: 1,
            total: 0,
            pagesize: 10,
        }
    },
    methods:{
        // 获取会员列表
        getmemlist() {
            this.isLoading=true
            this.$http.post("/admin/member/index", {
                starttime:this.starttime,
                endtime:this.endtime,
                status:this.isNormal,
                page:this.page,
                limit:this.pagesize,
                keyword:this.keyword
            }).then(res => {
                this.isLoading=false
                if (res.data.status == 1) {
                    this.total=+res.data.result.total;
                    this.memList = res.data.result.list;
                    console.log('1',this.memList);
                    this.memList.forEach(item=>{
                        if(item.isjoin==1){
                            this.isjoin_text="是"
                        }else{
                            this.isjoin_text="否"
                        }
                    })
                }else{
                    this.total=0;
                    this.memList=[];
                }
            });
        },
        //日期选择
        datechange(){
            if(this.timenum){
                this.starttime=this.timenum[0];
                this.endtime=this.timenum[1];
            }else{
                this.starttime='';
                this.endtime='';
            }
            this.getmemlist();
        },
        //等级选择
        changelev(val){
            this.page = 1
            this.lvid=val
            this.getmemlist()
        },
        //正常,黑名单选择
        changestatus(val){
            this.page=1
            this.isNormal=val
            this.getmemlist()
        },
        //搜索
        search(){
            this.page=1;
            this.getmemlist()
        },
        //设置黑名单
        alldelete(val){
            // this.idarr="";
            console.log('this.multipleSelection',this.multipleSelection)
            let idarr =this.multipleSelection.map(x=>x.id)
            idarr = idarr.join(',')
            console.log(val)
            this.$http.post("/admin/member/setstatus",{
                id:idarr,
                status:val
            }).then(res=>{
                if(res.data.status==1){
                    this.$message.success(res.data.message);
                    this.getmemlist();
                }else{
                    this.$message.error(res.data.message);
                }
            })
        },
        //点击单选框触发的事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
        },
        //操作
        rowmore(row) {
            this.$router.push("/memberInfo/" + row.id);
        },
        listmore(row){
            this.$router.push({
                path:'./getCoupon',
                query:{
                    mobile:row.mobile
                }
            });
            // console.log(row)
            // bus.$emit('myusersearch',row.nicheng)    
        // this.$router.push(`/allorders?nicheng=${row.nicheng}`)
            // sessionStorage.setItem('myusersearch',row.nicheng)
        },
        
        //状态判断
        deleterow(row) {
            // console.log( typeof(row.status))
            if (row.status == 0) {
                row.status = 1;
            } else {
                row.status = 0;
            }
            console.log(row.status)
            this.$http.post("/admin/member/setstatus", {
                id: row.id,
                status: row.status
            }).then(res => {
                if (res.data.status == 1) {
                    // console.log(res);
                    this.$message.success(res.data.message);
                    this.getmemlist();
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.page=val;
            this.getmemlist();
        }
    },
    created(){
        this.getmemlist()
    }
}
</script>
<style lang="less" scoped>
.ccia{
    .act_top{
        padding: 20px 0;
        border-bottom: 1px solid #EDECEC;
        overflow: hidden;
        .act_topL{
            overflow: hidden;
            > div {
                float: left;
                // box-sizing: border-box;
            }
            .timebox{
                width: 450px;
                height: 32px;
                text-align: center;
                line-height: 30px;
                font-size: 12px;
                color: #333333;
                cursor: pointer;
                position: relative;
                /deep/ .el-input__inner {
                    border-radius: 0;
                    width: 100%;
                    .el-range-separator{
                        width: 21px;
                    }
                    .el-range-input {
                        width:180px;
                    }
                }
            }
            .el-select{
                border-radius: 0;
                width:130px;
                .el-input__inner{
                    border-radius: 0;
                    width: 100%;
                }
            }
        }
        
        .act_topR{
            float: right;
            overflow: hidden;
            .searchinputbox{
                float: left;
                width: 500px;
                /deep/ .el-input__inner {
                    border-radius: 0;
                    width:100%;
                }
            }
            button {
                float: left;
                width: 57px;
                height: 32px;
                text-align: center;
                line-height: 30px;
                outline: none;
                border: 0;
                float: left;
                background-color: #CBA361;
                color: #ffffff;
                font-family: PingFang-SC-Medium;
                font-size: 13px;
                cursor: pointer;
            }
            
        }
    }
    .act_btn{
        text-align: left;
        padding: 10px 0;
        border-bottom: 1px solid #EDECEC;
        /deep/ .el-button{
                background-color: #CBA361;
                color: #ffffff;
                font-size: 14px;
                cursor: pointer;
            }
        
    }
    .act_con{
        width: 100%;
        overflow: hidden;
        /deep/ .el-table__row{
            font-size: 16px;
            .el-table td {
                padding: 20px 0;
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
                font-size: 13px;
            }
            
        }

        .edit:hover{
            border: 1px solid #cba361;
            i{
                color: #cba361;
            }
        }
    }
}
</style>


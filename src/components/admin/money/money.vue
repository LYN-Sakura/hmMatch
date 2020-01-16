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
            <!-- <el-select class="hydj" v-model="lvid" clearable  placeholder="会员等级" @change="levelchange">
                <el-option
                v-for="item in levellist"
                :key="item.id"
                :label="item.levelname"
                :value="item.id">
                </el-option>
            </el-select> -->
            <div class="top_right">
                <div class="searchinputbox">
                    <el-input v-model="keyword" placeholder="请输入提现单号/用户名/用户手机" class="searchinput" clearable @change="search"></el-input>
                </div>
                <button @change="search">搜索</button>
                <!-- <a class="exportbtn" :href="exporthref">导出</a> -->
            </div>
            
        </div>

        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop"></div> -->
            <div class="ccia_content clearfix">
                <div style="border-top:1px solid #EDECEC;">
                     <el-table :data="tableData" style="width: 100%">
                        <el-table-column label="会员信息">
                            <template slot-scope="scope">
                                <div style="float:left;width:80px;height:80px;overflow:hidden;"><img style="width:100%;height:100%" :src="scope.row.avatar" onerror="this.src='../../../../static/images/pro.png'" alt=""></div>
                                <div style="float:left;margin-left:5px;">
                                    <p style="height:40px;line-height:40px;">{{ scope.row.nickname}}</p>
                                    <p style="height:40px;line-height:40px;">{{ scope.row.mobile}}</p>
                                </div>
                            </template>
                        </el-table-column>
                        <el-table-column prop="number" label="余额变化">
                            <template slot-scope="scope">
                                <div>{{changetype}}{{scope.row.number}}</div>
                            </template>          
                        </el-table-column>
                        <el-table-column prop="remark" label="备注" width="400px">
                        </el-table-column>
                        <el-table-column prop="name" label="操作员">
                        </el-table-column>
                        <el-table-column prop="createtime" label="操作时间">
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
            timenum:[],
            starttime:'',
            endtime:'',
            keyword:'',
            tableData: [],
            changetype:'',//+,-
            currentPage:1,//分页
            limit:10,
            total:0,
            levellist: [],
            lvid:'',//等级
            exporthref:''//导出
        }
    },
    methods:{
        // 获取列表
        getlist(){
            this.$http.post('admin/finance/index',{
               
                page:this.currentPage,
                limit:this.limit,
                starttime:this.starttime,
                endtime:this.endtime,
                keyword:this.keyword,
               
            }).then(res=>{
                console.log('财务列表', res);
                if(res.data.status==1){
                    if(res.data.result.list!=''){
                        this.tableData = res.data.result.list
                        // this.exporthref = `${this.api}admin/index/export?exporttype=4&status=${this.status}&position=adminapp&token=${this.token}&limit=${this.limit}&page=${this.currentPage}&keyword=${this.keyword}&lvid=${this.lvid}&starttime=${this.starttime}&endtime=${this.endtime}`
                        this.tableData.forEach(item=>{
                            if(item.status==1){
                                this.changetype='+'
                            }else if(item.status==2){
                                this.changetype='-'
                            }
                        })
                    }else{
                        this.tableData = []
                    }
                        this.total = Number(res.data.result.total)
                    
                }else{
                    this.tableData = []
                    this.total = 0
                }
            })
        },
        // 时间选择
        timechange(){
            this.currentPage = 1
            console.log(this.timenum)
            if(!this.timenum){
                this.starttime = ''
                this.endtime = ''
            }else{
                this.starttime = this.timenum[0]
                this.endtime = this.timenum[1]
            }
            this.getlist()
        },
        //会员等级选择
        // levelchange(){
        //     this.currentPage = 1
        //     this.getlist()
        // },
        handleCurrentChange(val) {
            this.currentPage =val
            // console.log(`当前页: ${val}`);
            this.getlist()
        },
      
        search(){
            this.currentPage = 1
            this.getlist()
        },
        
       
    },
    mounted(){
      this.getlist()
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
         background-color:#CBA361; 
        width: 57px;
        height: 32px;
        text-align: center;
        line-height: 32px;
        outline: none;
        display: inline-block;
        text-decoration: none;
        font-size: 13px;
        margin-left:20px;
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
        margin-left:19px;
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
        background-color:#CBA361; 
    }
    
    
}
.ccia_contentbox{
  
    background-color: #fff;
    border-radius: 4px;
    // /deep/ .el-table__row{
    //         font-size: 16px;
    //         .el-table td {
    //             padding: 20px 0;
    //         }
    //     }
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
    .istype{
        color: #28B7A3;
        // font-size: 13px;
    }
    .userpic{
        width: 30px;
        height: 30px;
        // background-color:red;
        border-radius: 50%;
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





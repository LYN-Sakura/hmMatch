<template>
    <div class="ccia">
      <div class="act_top">
          <el-row>
              <el-col :span="4">
                  <div class="act_topL">
                    <el-button @click="SelectChoDel"><i class="el-icon-delete"></i>批量删除</el-button>
                  </div>
                  
              </el-col>
              <el-col :span="20">
                  <div class="act_topR">
                      <div class="timebox">
                          <el-date-picker
                              v-model="valueTime"
                              type="datetimerange"
                              :picker-options="pickerOptions2"
                              range-separator="至"
                              start-placeholder="开始日期"
                              end-placeholder="结束日期"
                              align="right"
                              :default-time="['12:00:00', '08:00:00']"
                              prefix-icon="el-icon-date"
                              @change="timechange"
                              value-format='yyyy-MM-dd HH:mm:ss'
                              >
                          </el-date-picker>
                      </div>
                      <div class="selbox">
                          <el-select v-model="nowstatus" clearable placeholder="状态" @change="typechange">
                              <el-option
                              v-for="item in typelist"
                              :key="item.value"
                              :label="item.label"
                              :value="item.value">
                              </el-option>
                          </el-select>
                      </div>
                      <div class="searchinputbox">
                          <el-input v-model="keyword" placeholder="请输入ID/名称/商家名称" class="searchinput"></el-input>
                      </div>
                      <button @click="search">搜索</button>
                  </div>
                  
              </el-col>
          </el-row>
      </div>
      <div class="act_con">
            <el-table
            :data="couRecList"
            style="width: 100%"
            v-loading="isLoading"
            @selection-change="handleSelectionChange">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="ID" width="80" prop='id'></el-table-column>
                <el-table-column label="会员信息" >
                    <template slot-scope="scope">
                        <div style="float:left;width:80px;height:80px;overflow:hidden;"><img style="width:100%;height:100%" :src="scope.row.avatar" onerror="this.src='../../../../static/images/pro.png'" alt=""></div>
                        <div style="float:left;margin-left:5px;">
                            <p style="height:40px;line-height:40px;">{{ scope.row.nickname}}</p>
                            <p style="height:40px;line-height:40px;">{{ scope.row.mobile}}</p>
                        </div>
                    </template>
                </el-table-column>
                <!-- <el-table-column label="类型" width="180" prop='cate_name'></el-table-column> -->
                <el-table-column label="商家" prop='merchtitle'></el-table-column>
                <el-table-column label="状态" width="180" prop='status_text'>
                    <template slot-scope="scope" >
                        <span class="niu" :class="scope.row.status_text === '待使用' ? 'info' : 'warning'" >{{scope.row.status_text}}</span>
                    </template>
                </el-table-column>
                <el-table-column label="领劵时间" prop='createtime'></el-table-column>
                <el-table-column label="核销时间" prop='usetime'></el-table-column>
                <el-table-column label="操作"  width="120" prop=''>
                    <template slot-scope="scope" >
                        <el-tooltip class="item" effect="dark" content="记录" placement="top">
                            <span class="edit" @click="rowmore(scope.row)"><i class="iconfont el-icon-document"></i></span>
                        </el-tooltip>
                        <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <span class="edit" @click="delmore(scope.row)"><i class="iconfont el-icon-delete"></i></span>
                        </el-tooltip>
                        <!-- <span class="caozuo" @click="deleterow(scope.row)"><span v-if="scope.row.status==1">正常</span><span v-if="scope.row.status==2">冻结</span></span> -->
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination
                background
                @current-change="handleCurrentChange"
                :current-page="currentPage"
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
            mobile:this.$route.query.mobile,
            valueTime:'',
            starttime: "",
            endtime: "",
            keyword:'',
            isLoading:true,//表格加载
            couRecList:[],//优惠券领取列表
            pickerOptions2: {
                shortcuts: [{
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
                }, {
                    text: '最近三个月',
                    onClick(picker) {
                    const end = new Date();
                    const start = new Date();
                    start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                    picker.$emit('pick', [start, end]);
                    }
                }]
            },
            typelist: [
                {
                    value: "1",
                    label: "启用"
                },
                {
                    value: "0",
                    label: "禁用"
                }
            ],
            nowstatus: "",//选择状态当前状态
            selectList:[],//单选框选中优惠券列表
            currentPage:1,//分页
            total: 0,
            pagesize: 10,
        }
    },
    methods:{
        // 日期筛选
        timechange() {
            console.log("选择时间",this.valueTime);
            if (this.valueTime) {
                this.starttime = this.valueTime[0];
                this.endtime = this.valueTime[1];
            } else {
                this.starttime = "";
                this.endtime = "";
            }
            this.couponRecordlist();
        },
        // 优惠券领取记录
        couponRecordlist() {
            this.isLoading=true
            if(this.mobile){
                this.keyword=this.mobile
            }else{
                this.keyword=''
            }
            this.$http.post("/admin/coupon_log/index", {
                page:this.currentPage,
                limit:this.pagesize,
                keyword:this.keyword,
                starttime:this.starttime,
                endtime:this.endtime,
            }).then(res => {
                console.log('优惠券领取记录',res)
                this.isLoading=false
                if (res.data.status == 1) {
                    this.couRecList = res.data.result.list;
                    this.total=res.data.result.total*1;
                    console.log(this.couRecList);
                }else{
                    this.total=0;
                    this.couRecList=[];
                }
            });
        },
        // 状态选择
        typechange(val) {
            console.log(val)
            alert("没有状态查询")
            // this.currentPage = 1;
            // this.nowstatus = val;
            // this.couponRecordlist();
        },
        //单选框选中优惠券状态更改
        handleSelectionChange(val){
            this.selectList=val
        },
        SelectChoDel(val){
            let selextIdList=this.selectList.map(x=>x.id)
            selextIdList=selextIdList.join(",")
            this.$http.post("/admin/coupon_log/delete", {
                id: selextIdList,
            }).then(res => {
                if (res.data.status == 1) {
                    // console.log(res);
                    this.$message.success(res.data.message);
                    this.couponRecordlist();
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        //搜索
        search(){
            this.currentPage=1;
            this.couponRecordlist()
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
            this.currentPage=val;
            this.couponRecordlist();
        },
        //操作
        rowmore(row) {
            // this.$router.push("/cancelRecord/" + row.id);
            this.$router.push({
                path:'./cancelRecord',
                query:{
                    id:row.id,
                }
            })
        },
        delmore(row){
            alert("删除我已经注释掉了")
            // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     let delid=row.id;
            //     this.$http.post("/admin/coupon_log/delete",{
            //         id:delid
            //     }).then(res=>{
            //         if (res.data.status == 1) {
            //             this.$message.success(res.data.message);
            //         } else {
            //             this.$message.error(res.data.message);
            //         }
            //         this.couponRecordlist()
            //         this.currentPage=1
            //     })
            //     // this.$message({
            //     //     type: 'success',
            //     //     message: '删除成功!'
            //     // });
            // }).catch(() => {
            //     this.$message({
            //         type: 'info',
            //         message: '已取消删除'
            //     });          
            // });
      
        },
    },
    created(){
        this.couponRecordlist()
        // admin/order/index
        this.$http.post("/admin/order/index", {
                
            }).then(res => {
                console.log('订单记录',res)
                
                // if (res.data.status == 1) {
                //     this.couRecList = res.data.result.list;
                //     this.total=res.data.result.total*1;
                //     console.log(this.couRecList);
                // }else{
                //     this.total=0;
                //     this.couRecList=[];
                // }
            });
    }
}
</script>
<style lang="less" scoped>
.ccia{
    .act_top{
        padding: 20px 0;
        border-bottom: 1px solid #EDECEC;
        // overflow: hidden;
        .act_topL{
            float: left;
            /deep/ .el-button{
                background-color: #CBA361;
                color: #ffffff;
                font-size: 14px;
                cursor: pointer;
                i{
                    margin-right: 3px;
                }
            }
        }
        
        .act_topR{
            float: right;
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
            .selbox{
                margin-left: 20px;
                /deep/ .el-input--suffix {
                    border-radius: 0;
                    width:100px;
                    .el-input__inner{
                        border-radius: 0;
                        width: 100%;
                        .el-input__suffix{
                           width: 20px; 
                        }
                    }
                }
            }
            .searchinputbox{
                width: 400px;
                /deep/ .el-input__inner {
                    border-radius: 0;
                    width:100%;
                }
                .el-button{
                    background-color: #CBA361;
                    color: #ffffff;
                    font-size: 14px;
                    cursor: pointer;
                }
            }
            button {
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
        .niu {
            height: 20px;
            line-height: 20px;
            border-radius: 2px;
            text-align: center;
            font-size: 14px;
            padding: 10px 15px;
        }
        .warning {
            background: #e8e8e8;
            color: #999999;
        }
        .info {
            background: #cba361;
            color: #feffff;
        }
    }
}
</style>
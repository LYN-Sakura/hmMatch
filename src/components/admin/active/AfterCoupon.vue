<template>
    <div class="ccia">
      <div class="act_top">
          <el-row>
              <el-col :span="4">
                  <div class="act_topL">
                      <router-link to="/addCoupon">
                          <el-button><i class="el-icon-plus"></i>添加优惠券</el-button>
                      </router-link>
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
                              value-format='yyyy-MM-dd'
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
      <div class="act_btn">
          <button @click="SelectChoStatus(0)"><img src="../../../../static/images/showImg.png" alt="">显示</button>
          <button @click="SelectChoStatus(1)"><img src="../../../../static/images/hideImg.png" alt="">隐藏</button>
          <!-- <button @click="search1"><i class="el-icon-delete"></i>删除</button> -->
      </div>
      <div class="act_con">
          <el-table
          :data="couponList"
          style="width: 100%"
          v-loading="isLoading"
          @selection-change="handleSelectionChange">
              <el-table-column type="selection"></el-table-column>
              <el-table-column label="ID" width="80" prop="id"></el-table-column>
              <el-table-column label="优惠券标题" prop="title"></el-table-column>
              <!-- <el-table-column label="类型" width="160" prop="merchtitle"></el-table-column> -->
              <el-table-column label="商家" prop="merchtitle"></el-table-column>
              <el-table-column label="状态" width="200" prop="status_text" show-overflow-tooltip current-row-key>
                <template slot-scope="scope">
                    <el-button class="niu">
                        <span class="niu" :class="scope.row.status_text === '启用' ? 'info' : 'warning'"  @click="statusupdate(scope.row)">{{scope.row.status_text}}</span>
                    </el-button>
                </template>
              </el-table-column>
              <el-table-column label="开始时间" prop="starttime"></el-table-column>
              <el-table-column label="结束时间" prop="endtime"></el-table-column>
              <el-table-column label="创建时间" prop="createtime"></el-table-column>
              <el-table-column label="操作" width="300" >
                <template slot-scope="scope" >
                    <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                        <span class="edit" @click="rowmore(scope.row)"><i class="iconfont el-icon-edit"></i></span>
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
            valueTime: '',
            keyword:'',
            page: 1,
            //limit:15,
            starttime: "",
            endtime: "",
            createtime:"",
            isLoading:true,//表格加载
            couponList:[],//优惠券列表
            selectList:[],//单选框选中优惠券列表
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
            total: 0,
            pagesize: 10,
        }
    },
    methods:{
        // 日期筛选
        timechange() {
            console.log(this.valueTime);
            if (this.valueTime) {
                this.starttime = this.valueTime[0];
                this.endtime = this.valueTime[1];
            } else {
                this.starttime = "";
                this.endtime = "";
            }
            this.getgradelist();
        },
        // 获取优惠券列表
        getgradelist() {
            this.isLoading=true
            this.$http.post("/admin/coupon/index", {
                page:this.page,
                limit:this.pagesize,
                keyword:this.keyword,
                starttime:this.starttime,
                endtime:this.endtime,
                status:this.nowstatus
            }).then(res => {
                this.isLoading=false
                if (res.data.status == 1) {
                    this.couponList = res.data.result.list;
                    this.total= res.data.result.total-0;
                    console.log(this.couponList);
                    
                }else{
                    this.total=0;
                    this.couponList=[];
                }
            });
        },
        // 状态选择
        typechange(val) {
            console.log(val)
            this.page = 1;
            this.nowstatus = val;
            this.getgradelist();
        },
        //启用和隐藏状态
        statusupdate(row){
            if (row.status == 1) {
                row.status = 1;
                // row.status_text="隐藏"
            } else {
                row.status = 0;
                // row.status_text="启用"
            }
            console.log(row.status)
            this.$http.post("/admin/coupon/setstatus", {
                id: row.id,
                status: row.status
            }).then(res => {
                if (res.data.status == 1) {
                    // console.log(res);
                    this.$message.success(res.data.message);
                    this.getgradelist();
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        //操作
        rowmore(row) {
            // this.$router.push("/memberinfo/" + row.id);
            this.$router.push("/addCoupon/" + row.id);
        },
        delmore(row){
            alert("删除我已经注释掉了")
            // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
            //     confirmButtonText: '确定',
            //     cancelButtonText: '取消',
            //     type: 'warning'
            // }).then(() => {
            //     let delid=row.id;
            //     this.$http.post("/admin/coupon/delete",{
            //         id:delid
            //     }).then(res=>{
            //         if (res.data.status == 1) {
            //             this.$message.success(res.data.message);
            //         } else {
            //             this.$message.error(res.data.message);
            //         }
            //         this.getgradelist()
            //         this.page=1
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
        search(){
            this.page=1;
            this.getgradelist();
        },
        SelectChoStatus(val){
            let selextIdList=this.selectList.map(x=>x.id)
            selextIdList=selextIdList.join(",")
            this.$http.post("/admin/coupon/setstatus", {
                id: selextIdList,
                status: val
            }).then(res => {
                if (res.data.status == 1) {
                    // console.log(res);
                    this.$message.success(res.data.message);
                    this.getgradelist();
                } else {
                    this.$message.error(res.data.message);
                }
            });
        },
        //单选框选中优惠券状态更改
        handleSelectionChange(val){
            this.selectList=val
        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getgradelist();
            console.log(`当前页: ${val}`);
        }
    },
    created(){
        this.getgradelist()
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
    .act_btn{
        text-align: left;
        padding: 10px 0;
        border-bottom: 1px solid #EDECEC;
        button {
            width: 65px;
            height: 28px;
            text-align: center;
            line-height: 28px;
            outline: none;
            border: 1px solid #EAEBEC;
            color: #858585;
            background-color: #ffffff;
            font-family: PingFang-SC-Medium;
            font-size: 14px;
            cursor: pointer;
            img{
                width: 16px;
                height: 16px;
                margin-right: 5px;
                vertical-align: middle;
            }
            i{
                margin-right: 5px;
            }
        }
        
    }
    .act_con{
        width: 100%;
        overflow: hidden;
        /deep/.el-table th {
            padding: 10px 0;
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
            display: inline-block;
            width: 40px;
            height: 20px;
            line-height: 20px;
            border-radius: 2px;
            text-align: center;
            font-size: 14px;
            padding: unset;
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
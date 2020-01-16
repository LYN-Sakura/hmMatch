<template>
    <div class="ccia">
        <div class="act_top">
            <el-row>
                <el-col :span="4">
                    <div class="act_topL">
                        <router-link to="/addClassify">
                            <el-button><i class="el-icon-plus"></i>添加新分类</el-button>
                        </router-link>
                    </div>
                </el-col>
                <el-col :span="20">
                    <div class="act_topR">
                        <div class="selbox">
                            <el-select v-model="cityValue" clearable placeholder="状态">
                                <el-option
                                v-for="(item,index) in citylist"
                                :key="index"
                                :label="item.city"
                                :value="item.city">
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
            :data="cousortList"
            style="width: 100%"
            v-loading="isLoading">
                <el-table-column type="selection"></el-table-column>
                <el-table-column label="ID" width="120" prop='id'></el-table-column>
                <el-table-column label="优惠券种类名称" prop='category_name'></el-table-column>
                <el-table-column label="状态" width="400" prop=''></el-table-column>
                <el-table-column label="操作" width="200">
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
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="currentPage4"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
            </el-pagination>
        </div>
    </div>  
</template>

<script>
export default {
    data(){
        return{
            value1: '',
            keyword:'',
            page: 1,
            limit:15,
            starttime: "",
            endtime: "",
            isLoading:true,//表格加载
            cousortList:[],//优惠券种类列表
            citylist:[
                {city:"武汉",area:['洪山区','汉口区','武昌区']},
                {city:"黄冈",area:['1区','2区','3区']}
            ],//城市集合
            currentPage4: 4,//分页
            cityValue: '',
        }
    },
    methods:{
        // 优惠券领取记录
        couponsortList() {
            this.isLoading=true
            this.$http.post("/admin/category/index", {
                // page:this.page,
                // limit:this.limit,
                // keyword:this.keyword,
                // starttime:this.starttime,
                // endtime:this.endtime,
            }).then(res => {
                // console.log(res,'分销')
                this.isLoading=false
                if (res.data.status == 1) {
                    this.cousortList = res.data.result.list;
                    this.total=+res.data.result.total;
                    console.log(this.cousortList);
                    // for (let couItem of this.couponList) {
                    //     couItem.starttime = this.getLocalTime(
                    //         new Date(parseInt(couItem.starttime))
                    //     );
                    //     couItem.endtime = this.getLocalTime(
                    //         new Date(parseInt(couItem.endtime))
                    //     );
                    //     couItem.createtime = this.getLocalTime(
                    //         new Date(parseInt(couItem.createtime))
                    //     );
                    // }
                }else{
                    this.total=0;
                    this.cousortList=[];
                }
            });
        },
        //操作
        rowmore(row) {
            // this.$router.push("/memberinfo/" + row.id);
            this.$router.push("/addClassify/" + row.id);
        },
        delmore(row){
            console.log(row)
            // bus.$emit('myusersearch',row.nicheng)    
        // this.$router.push(`/allorders?nicheng=${row.nicheng}`)
            // sessionStorage.setItem('myusersearch',row.nicheng)
        },
        search(){

        },
        handleSizeChange(val) {
            console.log(`每页 ${val} 条`);
        },
        handleCurrentChange(val) {
            console.log(`当前页: ${val}`);
        }
    },
    created(){
        this.couponsortList()
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
    }
}
</style>
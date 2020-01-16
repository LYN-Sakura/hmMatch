<template>
    <div class="ccia">
        <div class="ccia_top">
            <button @click="toaddlevel">
                +添加幻灯片
            </button>
            <div>
                <!-- <button @click="search">
                    搜索
                </button> -->
                
                <!-- <el-input v-model="keyword" placeholder="请输入内容"></el-input> -->
                <el-select v-model="status" clearable  placeholder="状态" @change="typechange">
                    <el-option
                    v-for="item in typelist"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                    >
                    </el-option>
                </el-select>
            </div>
            
            
        </div>
        <div class="ccia_contentbox">
            <!-- <div class="ccia_contenttop">
                <ul>
                    <li  @click="deletelevel('isall')"><i class="el-icon-delete"></i> 删除</li>
                </ul>
            </div> -->
            <div class="ccia_content clearfix">
                <el-table
                    ref="multipleTable"
                    :data="tableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    @selection-change="handleSelectionChange">
                    
                    <!-- <el-table-column
                        type="selection"
                       >
                    </el-table-column> -->
                    <el-table-column
                        label="排序"
                        type="index"
                        width="100">
                    </el-table-column>
                    <el-table-column
                        label="图片位置"
                        >
                        <template slot-scope="scope">
                                <span v-if="scope.row.type==1">景点</span>
                                <span v-if="scope.row.type==2">酒店</span>
                                <span v-if="scope.row.type==3">首页</span>   
                        </template>
                    </el-table-column>
                    <el-table-column
                        label="跳转类型"
                        >
                        <template slot-scope="scope">
                                <span v-if="scope.row.tzurltype==1">商品路径</span>
                                <span v-if="scope.row.tzurltype==2">其他路径</span>
                                
                        </template>
                    </el-table-column>

                    <el-table-column
                        label="链接"
                        >
                        <template slot-scope="scope">
                                <span>{{scope.row.tzurltype==1?scope.row.goodsid:scope.row.tzurl}}</span>
                        </template>
                    </el-table-column>
                    

                   <el-table-column
                        label="是否启用">
                        <template slot-scope="scope">
                            <el-switch
                                @change="statuschange(scope.row)"
                                v-model="scope.row.status"
                                active-color="#28B7A3"
                                inactive-color="#ff4949">
                            </el-switch>
                            </template>
                    </el-table-column>
                    <!-- <el-table-column
                        prop="status"
                        label="状态">
                    </el-table-column> -->
                    <el-table-column
                        fixed="right"
                        label="操作">
                        <template slot-scope="scope">
                            <!-- <span class="edit"><i class="iconfont icon-geren"></i></span> -->
                             <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <span class="edit" @click="toedit(scope.row)"><i class="el-icon-edit"></i></span>
                            </el-tooltip> 
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <span class="edit" @click="deletelevel('notall',scope.row)"><i class="el-icon-delete"></i></span>
                            </el-tooltip>
                            <!-- <span class="edit" @click="tosetting(scope.row)"><i class="el-icon-setting"></i></span> -->
                        </template>
                    </el-table-column>
                </el-table>
                <el-pagination
                    background
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-size="10"
                    layout="total, prev, pager, next, jumper"
                    :total="total">
                </el-pagination>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
            typelist: [{
                value: '1',
                label: '启用'
                }, {
                value: '0',
                label: '禁用'
                }],
                status:'',
          
            keyword:'',
            //表格
            tableData: [],
            multipleSelection: [],
            // 分页
            currentPage:1,
            limit:10,
            total:0
        }
    },
    methods:{
        // 获取列表
        getlist(){
            this.$http.post(this.api+'admin/Lunboimgs/index',{
                limit:this.limit,
                page:this.currentPage,
                status:this.status
            }).then(res=>{
                console.log('轮播',res)
                if(res.data.status==1){
                    this.tableData = res.data.result.list
                    console.log(this.tableData,6666);
                    this.tableData.forEach(item => {
                        if(item.status==1){
                            item.status=true
                        }else if(item.status==0){
                            item.status=false
                        }
                    });
                    this.total = Number(res.data.result.total)
                }else{
                    this.tableData = []
                    this.total = 0
                }
            })
        },
        // 状态选择
        typechange(val){
            console.log(val,321)
            this.currentPage = 1
            this.status = val
            this.getlist()
        },
        search(){
            this.currentPage = 1
            this.getlist()
        },
        // 跳转添加页面
        toaddlevel(){
            this.$router.push('/addppt')
        },
        toedit(row){
            this.$router.push('/addppt/'+row.id)
        },
        // 选中事件
        handleSelectionChange(val) {
            this.multipleSelection = val;
            // console.log(this.multipleSelection)
        },
        // 切换状态
        statuschange(row){
            if(row.status){
                row.status = 1
            }else{
                row.status = 0
            }
            this.$http.post(this.api+'admin/Lunboimgs/change',{
                id:row.id,
                status:row.status
            }).then(res=>{
                // console.log('切换',res)
                if(res.data.status==1){
                    this.$message.success(res.data.message);
                }else{
                    this.$message.warning(res.data.message);
                }
                this.getlist()
            })
        },
        // 换页
        handleCurrentChange(val) {
            // console.log(`当前页: ${val}`);
            this.currentPage = val
            this.getlist()
        },
        // 删除按钮
        deletelevel(all,row){
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let deleteid=''
                if(all=='isall'){
                    if(this.multipleSelection.length==0){
                        this.$message.warning('请先选择需要删除的内容!');
                        return
                    }
                    let tmplist=[]
                    this.multipleSelection.forEach(item => {
                            tmplist.push(item.id)
                    });
                    tmplist = tmplist.join(',')
                    // console.log(tmplist)
                    deleteid = tmplist
                }else if(all=='notall'){
                    deleteid = row.id
                    // console.log(deleteid)
                }
                this.$http.post(this.api+'admin/Lunboimgs/del',{
                    id:deleteid
                }).then(res=>{
                    // console.log('删除',res)
                    if(res.data.status==1){
                        this.$message.success('删除成功!');
                        this.getlist()
                    }else{
                        this.$message.error(res.data.message);
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
            // console.log(all)
            // console.log(row)
        }
    },
    mounted(){
        // this.getlist()
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
            background-color:#28B7A3;
            outline: none;
            cursor: pointer;
            float: left;
        }
        >div{
            float: right;
            width: 60%;
            button{
                border-radius: 0;
                padding: 0 16px;
                float: right;
            }
        }
        .el-select{
            float: right;
            width: 100px;
            border-radius: 0;
        }
        .el-input{
            float: right;
            width: 70%;
            border-radius: 0;
        }
        /deep/ .el-input__inner{
            border-radius: 0;
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
        font-size: 13px;
    }
    
}
.edit:hover{
    border: 1px solid #28B7A3;
    i{
        color: #28B7A3;
    }
}
</style>



<template>
    <div class="personset ccia">
        <div class="ccia_top">
            <button  @click="addperson">
                +添加管理员
            </button>
            <!-- <button  @click="toauthorityset('1')">
               普通管理员设置
            </button>
            <button  @click="toauthorityset('2')">
                财务管理员设置
            </button>
            <button  @click="toauthorityset('3')">:
                订单管理员设置
            </button> -->
        </div>
        <div class="ccia_contentbox clearfix">
            <template>
                <el-table :data="tableData" stripe style="width: 100%">
                    <el-table-column type="index" label="排序" width="100">
                    </el-table-column>
                    <el-table-column prop="mobile" label="手机号">
                    </el-table-column>
                    <el-table-column prop="name" label="用户名" >
                    </el-table-column>
                     <el-table-column prop="type" label="角色" >
                        
                    </el-table-column>
                    <el-table-column prop="createtime" label="创建时间" >
                    </el-table-column>
                    <!-- <el-table-column label="状态" >
                        <template slot-scope="scope">          
                            <el-switch
                            @change="stoprow(scope.row)"
                            v-model="scope.row.status"
                            active-color="#cba361"
                            inactive-color="#ff4949">
                            </el-switch>
                        </template>
                    </el-table-column> -->
                    <el-table-column label="操作">
                        <template slot-scope="scope">
                            <el-tooltip class="item" effect="dark" content="编辑" placement="top">
                            <span class="edit" @click="toedit(scope.row)"><i class="el-icon-edit"></i></span>
                            </el-tooltip> 
                            <el-tooltip class="item" effect="dark" content="删除" placement="top">
                            <span class="edit" @click="deleterow(scope.row)"><i class="el-icon-delete"></i></span>
                            </el-tooltip>
                        </template>
                    </el-table-column>
                </el-table>
            </template>
            <el-pagination background @current-change="handleCurrentChange" :current-page="page" :page-size="limit" layout="total, prev, pager, next, jumper" :total="total">
            </el-pagination>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            tableData: [],
            page:1,
            limit:10,
            total:0,
            nowstatus:true,
           
        };
    },
    methods: {
        getlist(){
            this.$http.post(this.api + 'admin/users/index',{
                page:this.page,
                limit:this.limit
            }).then(res=>{
                if(res.data.status==1){
                    console.log(res)
                    this.tableData = res.data.result.list
                    this.total = +res.data.result.total
                    this.tableData.forEach(item=>{
                      if(item.type=='1'){
                          item.type='超管'
                      }else{
                           item.type='活动管理员'
                      }
                    })
                    this.tableData.forEach(item=>{
                        if(item.status==1){
                            item.status=true
                        }else{
                            item.status=false
                        }
                    })
                }
            })
        },
        addperson(){
            this.$router.push('/addperson')
        },
      
        stoprow(row) {
            // console.log(row.status)
            if (row.status == true) {
                this.nowstatus = 1;
            } else {
                this.nowstatus = 0;
            }
            this.$http
                .post(this.api + "admin/admin/admin_jingyong", {
                    otheradminid: row.id,
                    status: this.nowstatus
                })
                .then(res => {
                    if (res.data.status == 1) {
                        // console.log(res);
                        this.$message.success(res.data.message);
                        this.getlist();
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
        },
        toedit(row){
            this.$router.push(`/addperson/${row.id}`)
        },
        deleterow(row){  
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                cancelButtonText: '取消',
                confirmButtonText: '确定',
                type: 'warning'
            }).then(() => {           
            this.$http
                .post(this.api + "admin/users/delete", {
                    id: row.id,
                })
                .then(res => {
                    if (res.data.status == 1) {
                        this.$message.success(res.data.message);
                        this.getlist();
                    } else {
                        this.$message.error(res.data.message);
                    }
                });
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });          
            });
        },
        handleCurrentChange(val) {
            this.page = val;
            this.getlist();
        },
    },
    created () {
        this.getlist()
    }
};
</script>
<style lang="less" scoped>
.ccia_top{
        button{
             // width: 100px;
            height: 32px;
            line-height: 32px;
            padding: 0 15px;
            color: #ffffff;
            border: 0;
            font-size: 12px;
            border-radius: 2px;
            background-color:#cba361;
            outline: none;
            cursor: pointer;
            float: left;
            margin-right: 10px;
        }
    }
.ccia_contentbox{
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
</style>



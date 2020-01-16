<template>
    <div class="ccia">
        <div class="act_top">
            <p>核销记录<span>共有{{total}}条数据</span></p>
        </div>
        <div class="act_con">
            <el-table :data="tableData" style="width: 100%">
                <el-table-column
                    prop="id"
                    label="ID"
                    width="180">
                </el-table-column>
                <el-table-column
                    prop="parentname"
                    label="核销人">
                </el-table-column>
                <el-table-column
                    prop="nickname"
                    label="用户">
                </el-table-column>
                <el-table-column
                    prop="createtime"
                    label="核销时间">
                </el-table-column>
            </el-table>
        </div>
        <div class="act_bot">
            <router-link to="/getCoupon">
                <el-button><i class="el-icon-arrow-left"></i>返回列表</el-button>
            </router-link>
        </div>
    </div>
</template>

<script>
  export default {
    name:'',
    props:[''],
    data () {
      return {
          clid:this.$route.query.id,
          tableData: [{
              id:'',//核销记录ID
              parentname:'',//核销人
              nickname:'',//用户
              createtime:'',//时间
          }],
          total:'',
      };
    },

    components: {},

    computed: {},

    created() {
        console.log("核销ID",this.clid)
        if(this.clid != "" && !isNaN(this.clid)){
            this.$http.post("/admin/checklog/index",{
                clid:this.clid
            }).then(res => { 
                console.log("核销列表",res)
                if(res.data.result.list!=''){
                    this.tableData=res.data.result.list
                }else{
                    this.tableData=[]
                }
                this.total=res.data.result.total
                this.$message.success(res.data.message)
            }).catch(err => {
                this.$message.error(err.data.message)
            });
        }
    },

    mounted() {},

    methods: {},

    watch: {}

  }

</script>
<style lang='less' scoped>
.ccia{
    .act_top{
        width: 100%;
        p{
            font-size: 20px;
            color: #000000;
            padding: 27px 0;
            text-align: left;
            span{
                font-size: 14px;
                color: #999999;
                margin-left: 10px;
            }
        }
    }
    .act_con{
        width: 100%;
        border-top:1px solid #EDECEC;
        /deep/ .el-table th{
            padding: 15px 0;
        }
        /deep/ .el-table--small td{
            padding: 25px 0;
        }
    }
    .act_bot{
        text-align: right;
        margin-top: 200px;
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
}
</style>
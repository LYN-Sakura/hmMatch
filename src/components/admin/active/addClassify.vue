<template>
    <div class="ccia">
        <div class="add_top">
            <router-link to="/couponSort">
                <div class="add_topBtn">
                    <el-button type="primary" ><i class="el-icon-arrow-left"></i>返回列表</el-button>
                </div>
            </router-link>    
        </div>
        <div class="add_con">
            <el-form ref="form" :model="form" >
                <el-form-item label="排序" class="add_conInp">
                    <el-input type="text" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="分类名称" class="add_conInp">
                    <el-input type="text" v-model="form.name"></el-input>
                </el-form-item>
                <el-form-item label="是否启用">
                    <el-radio-group v-model="form.isfre">
                        <el-radio label="1">是</el-radio>
                        <el-radio label="0">否</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="onSubmit" class="primaryBtn">提交</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>

</template>

<script>

  export default {
    data() {
        return {
            form: {
                name: '',
                isfre: "",//是否启用
            },

        }
    },
    methods: {
        onSubmit() {
            console.log('submit!');
        },
    },

    components: {},

    computed: {},

    created() {},

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
        padding-top: 42px;
        width:100%;
        /deep/ .el-form-item__label {
            width: 200px;
            font-size: 16px;
            color: #000000;
            padding: 0 20px 0 0;
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
        .add_conInp{
            width:100%;
           /deep/ .el-input__inner {
               float: left;
                width:1100px;
            }
            p{
                text-align: left;
                color: #666666;
                font-size: 12px;
            }
        }
        .primaryBtn{
            margin-left: 200px;
            margin-top: 188px;
        }
    }

}
</style>
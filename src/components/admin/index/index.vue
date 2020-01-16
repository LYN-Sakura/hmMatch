<template>
    <div class="index" >
        <div class="card_box">
            <div class="card_title">数据概况</div>
            <div class="card_content">
                <div>
                    <img src="../../../../static/images/AdminSystem/admin_Index/indexlogo2.png" alt="">
                    <p>
                        今日订单总数（单）<br>
                        <span>{{jiaoyiNumArr.total}}</span>
                    </p>     
                </div>
                <div>
                    <img src="../../../../static/images/AdminSystem/admin_Index/indexlogo3.png" alt="">
                    <p>
                        今日完成订单金额（元）<br>
                        <span>{{jiaoyiNumArr.paymoney}}</span>
                    </p>
                </div>
                <div>
                    <img src="../../../../static/images/AdminSystem/admin_Index/indexlogo4.png" alt="">
                    <p>
                        今日完成订单数（单）<br>
                        <span>{{jiaoyiNumArr.payorder}}</span>
                    </p>
                </div>
                <div>
                    <img src="../../../../static/images/AdminSystem/admin_Index/indexlogo1.png" alt="">
                    <p>
                        今日新增会员（位）<br>
                        <span>{{jiaoyiNumArr.member}}</span>
                    </p>
                </div>
            </div>
        </div>
        <div class="table_box clearfix">
            <div class="echarts_box">
                <div id="main" style="height:90%;margin:0px auto;">

                </div>
            </div>
            <div class="tablelist_box">
                <div class="tablelist_top">
                    <div>
                         活动销量排行</div>
                    <div>
                        <span v-for="(item,index) in tableData" :key="index" @click="choose(index+1)">
                            <span :class="flag==(index+1)?'active_span':''">{{item.text}}</span>
                        </span>
                        <!-- <span @click="choose(2)"><span :class="flag==2?'active_span':''">昨日</span></span>
                        <span @click="choose(3)"><span :class="flag==3?'active_span':''">最近七日</span></span> -->
                    </div>
                </div>
                <div class="tablelist_con">
                    <template>
                        <el-table v-loading="loading" :data="tableData1" style="width: 100%">
                            <el-table-column type="index" label="排名" width="50">
                            </el-table-column>
                            <el-table-column prop="title" label="活动名称" >
                            </el-table-column>
                            <el-table-column prop="total" label="成交数量" width="100">
                            </el-table-column>
                            <el-table-column prop="money" label="成交金额" width="100">
                                <!-- <template slot-scope="scope">
                                    <span style="color:#28b7a3">{{scope.row.money}}</span>
                                </template> -->
                            </el-table-column>
                        </el-table>
                    </template>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
import index from './index.js';
export default index
</script>
<style lang="less">
@import url('./index.less');
</style>



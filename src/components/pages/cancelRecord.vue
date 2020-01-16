<template>
    <div class="cancelRecord_cont">
        <Header :show="1">
            <span slot="top_text">核销记录</span>
        </Header>
        <!-- 头部搜索 -->
        <div class="cancelRecSearch">
            <div class="searchInp">
                <img src="../../../static/images/cancel/cancel5.png" alt >
                <input type="text" placeholder="请输入关键字搜索" v-model="inps" @keyup="find">
            </div>
        </div>
        <!-- 核销列表 -->
        <div class="cancelRecDetail">
        <ul>
            <li>
                <div
                    class="cancelRecDet"
                    style="background-image: url('../../../static/images/cancel/cancel1.png');background-size: 100% 100%;"
                    v-for="(item,index) in infos"
                    :key="index">
                    <p class="cancelRecDet-img">
                        <img :src="item.avatar" alt>
                    </p>
                    <div class="cancelRecDet-info">
                        <p>{{item.nickname}}</p>
                        <p>核销时间：{{item.createtime | formatDate}}</p>
                    </div>
                </div>
            </li>
            
        </ul>
        </div>
    </div>
</template>

<script>
import { Api } from "../../APi/WEBMb/index.js";
import Header from "../component/header";
export default {
  name: "",
  props: [""],
  data() {
    return {
      infos: [], // 列表信息数据
      limit: 8, // 每页数据条数
      page: 1,// 每页数据条数
      inps:''
    };
  },
  components: {
    Header
  },
  methods: {
    datainfo() {
        Api.Mobile_record({
        }).then(res => {
            console.log("核销记录",res)
            if (res.data.status == 1) {
                if (res.data.result.list != "") {
                    this.infos = res.data.result.list;
                }else{
                    this.$Message.info({
                        content:"暂无更多数据"
                    })
                }
            }
        });
    },
    find(){
        Api.Mobile_record({
            keyword:this.inps
        }).then(res => {
            console.log("核销记录",res)
            if (res.data.status == 1) {
                if (res.data.result.list != "") {
                    this.infos = res.data.result.list;
                }else{
                    this.$Message.info({
                        content:"暂无数据"
                    })
                }
            }
      });
    },
    
  },
  created() {
    this.datainfo();
  },
  mounted() {

  },
  filters: {
    formatDate: function(value) {
        value = Number(value + "000");
        // console.log(value);
        // console.log(typeof value);
        let date = new Date(value);
        let y = date.getFullYear();
        let MM = date.getMonth() + 1;
        MM = MM < 10 ? "0" + MM : MM;
        let d = date.getDate();
        d = d < 10 ? "0" + d : d;
        let h = date.getHours();
        h = h < 10 ? "0" + h : h;
        let m = date.getMinutes();
        m = m < 10 ? "0" + m : m;
        let s = date.getSeconds();
        s = s < 10 ? "0" + s : s;
        return y + "-" + MM + "-" + d + " " + h + ":" + m + ":" + s;
        // return y + "-" + MM + "-" + d;
    }
  }
};
</script>
<style lang="" scoped>
@import url("../../assets/css/cancelRecord.css");
.cancelRecord_cont {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}
</style>
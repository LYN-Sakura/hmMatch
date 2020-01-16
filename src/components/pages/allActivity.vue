<template>
  <div class="allActivity_cont">
    <!-- <Header :show='1'>
            <span slot="top_text">首页</span>
    </Header>-->
    <Header>
      <span slot="top_text">活动列表</span>
    </Header>
    <!-- 头部搜索 -->
    <div class="allActSearch">
      <el-select v-model="province" clearable placeholder="请选择" @change="changepro">
        <el-option
          v-for="(proItem,index) in prolist"
          :key="index"
          :label="proItem.name"
          :value="proItem.code"
        ></el-option>
      </el-select>
      <el-select v-model="city" clearable placeholder="请选择" @change="changecity">
        <el-option
          v-for="(cityItem,index) in citylist"
          :key="index"
          :label="cityItem.name"
          :value="cityItem.code"
        ></el-option>
      </el-select>
      <el-select v-model="area" clearable placeholder="请选择" @change="changearea">
        <el-option
          v-for="(areaItem,index) in arealist"
          :key="index"
          :label="areaItem.name"
          :value="areaItem.code"
        ></el-option>
      </el-select>
    </div>
    <div class="allActivity">
      <!-- xx霸王免单活动 -->
      <div class="allActHotEvent">
        <ul>
          <li
            class="allActivity_li"
            v-for="(item,index) in allActList"
            :key="index"
            @click.prevent="goCardDetail(item.id,item.title)"
          >
            <div
              class="allActEventT"
              :style="{'background':'url('+`./../static/images/actStyle${item.style}.png`+')'}"
            >
            <!--   <div
              class="allActEventT"
              :style="{'background':'url('+`${item.thumb}`+')'}"
            > -->
              <p class="zhuang"  v-if="item.state == 0" style=" background: url(./../static/images/activitylist_mark1.png);">正在准备中</p>
              <p class="zhuang"  v-if="item.state == 1" style=" background: url(./../static/images/activitylist_mark2.png);">活动进行中</p>
              <p class="zhuang"  v-if="item.state == -1" style=" background: url(./../static/images/activitylist_mark3.png);">活动已结束</p>
              <!-- <P>
                <span @click.prevent="goCardDetail(item.id,item.title)">查看活动详情</span>
              </P>-->
            </div>
            <div class="allActEventB">
              <p style="font-size:1rem;text-align:left;">{{item.title}}</p>
              <p style="padding-top:1rem;text-align:left;color:gray;">
                <img src="../../../static/images/activitylist_positioning.png">
                {{item.address}}
              </p>
              <!-- <span>剩余时间:{{ item.djs }}</span> -->
            </div>
          </li>
        </ul>
        <!-- 展开更多 -->
        <div class="allActEvent-btn">
          <span @click="getMore">{{loadtext}}</span>
          <img :src="loadtext=='展开更多'?'../../../static/images/allActivity/cnopps8.png':''" alt>
        </div>
      </div>
    </div>
    <div class="footer">
      <Tabbar></Tabbar>
    </div>
  </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import Header from "../component/header";
import Tabbar from "../component/Tabbar";
export default {
  name: "",
  props: [""],
  data() {
    return {
      allActList: [], //所有活动的列表
      pastActList: [], //往期活动的列表
      limit: 4, //显示默认条数
      page: 1, //显示默认页数
      loadtext: "展开更多",
      currentCityName: "", //默认为北京
      ccode: "",
      inps: "",
      prolist: [], //省
      citylist: [], //市
      arealist: [], //区
      province: "", //省,
      city: "", //市
      area: "" //区
    };
  },
  components: {
    Header,
    Tabbar
  },
  methods: {
    getallActList() {
      this.$http
        .post("/mobile/active/listing", {
          limit: this.limit,
          page: this.page,
          province: localStorage.getItem("pro_code"),
          city: localStorage.getItem("city_code"),
          area: localStorage.getItem("area_code")
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.result.total != 0) {
              this.allActList = res.data.result.list;
            } else {
              this.$Message.info("未找到相关活动");
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },

    getlocation() {
      this.$http
        .post("/mobile/active/getlocal", {
          limit: this.limit,
          page: this.page,
          lng: localStorage.getItem("lng"),
          lat: localStorage.getItem("lat")
        })
        .then(res => {
          if (res.data.status == 1) {
            if (res.data.result.total != 0) {
              this.allActList = res.data.result.list;
              this.province = res.data.result.city.province;
              this.city = res.data.result.city.city;
              this.area = res.data.result.city.area;
              this.getcity(res.data.result.city.pcode);
              this.getarea(res.data.result.city.ccode);
            } else {
              this.$Message.info("未找到相关活动");
            }
          } else {
            this.$Message.error(res.data.message);
          }
        });
    },
    getsheng(code) {
      this.$http
        .post("/mobile/index/province", {
          code: code
        })
        .then(res => {
          this.prolist = res.data.result.list;
        });
    },
    getcity(code) {
      this.$http
        .post("/mobile/index/city", {
          code: code
        })
        .then(res => {
          this.citylist = res.data.result.list;
        });
    },
    getarea(code) {
      this.$http
        .post("/mobile/index/area", {
          code: code
        })
        .then(res => {
          this.arealist = res.data.result.list;
        });
    },
    //获取省市列表集合
    changepro(val) {
      // 省级获取数据
      //console.log("省", val);
      localStorage.setItem("pro_code", val);
      this.province = val;
      this.getcity(val);
    },
    changecity(val) {
      this.city = val;
      localStorage.setItem("city_code", val);
      this.getarea(val);
    },
    changearea(val) {
      localStorage.setItem("area_code", val);
      this.page=1;
      this.getallActList();
    },
    //头部搜索
    searchInp() {
      this.getallActList();
    },
    choiceCity() {
      //选择城市
      this.$router.push("./cityselect");
    },
    getMore() {
      this.page++;
      console.log(this.page);
      this.$http
        .post("/mobile/active/listing", {
          limit: this.limit,
          page: this.page,
          province: localStorage.getItem("pro_code"),
          city: localStorage.getItem("city_code"),
          area: localStorage.getItem("area_code")
        })
        .then(res => {
          let thisactList = res.data.result.list;
          // console.log("更多+++",res)
          if (thisactList != "") {
            // this.$Message.info("数据加载完毕！");
            thisactList.forEach(item => {
              this.allActList.push(item);
            });
            if (thisactList.length <= 4) {
              this.$Message.info("数据加载完毕！");
              this.loadtext = "数据已全部加载";
            }
          } else {
            thisactList = [];
          }
        });
    },
    // 验证定位于选择城市是否一致
    verifycity() {
      let city = localStorage.getItem("city");
      let code = localStorage.getItem("citycode");
      let ccity = localStorage.getItem("ccity");
      let ccode = localStorage.getItem("ccode");
      if (city) {
        if (ccode.substring(0, 3) !== code.substring(0, 3)) {
          MessageBox.confirm(
            "定位到您在" + city + "是否切换至该区进行探索?"
          ).then(action => {

            localStorage.setItem("ccity", city);
            localStorage.setItem("ccode", code);
            this.currentCityName = city;
            // this.currentCityCode= localStorage.getItem('ccode')
            this.getallActList();
          });
        } else {

          this.getallActList();
        }
      }
    },
    //跳转活动详情
    goCardDetail(cid, cname) {
      this.$router.push({
        path: "./activityDetail",
        query: {
          cid: cid
        }
      });
    }
  },
  created() {
    this.lng = localStorage.getItem("lng");
    this.lat = localStorage.getItem("lat");
    this.getlocation();
    this.getsheng();
  },
  mounted() {
    setInterval(() => {
      for (var key in this.allActList) {
        let aaa = parseInt(this.allActList[key]["endtime"] * 1000);
        let bbb = new Date().getTime();
        let rightTime = aaa - bbb;
        if (rightTime > 0) {
          let dd = Math.floor(rightTime / 1000 / 60 / 60 / 24);
          let hh = Math.floor((rightTime / 1000 / 60 / 60) % 24);
          let mm = Math.floor((rightTime / 1000 / 60) % 60);
          let ss = Math.floor((rightTime / 1000) % 60);
          dd = dd < 10 ? "0" + dd : dd;
          hh = hh < 10 ? "0" + hh : hh;
          mm = mm < 10 ? "0" + mm : mm;
          ss = ss < 10 ? "0" + ss : ss;
          // this.list[key]["djs"] = dd + "天" + hh + "小时" + mm + "分" + ss + "秒";
          this.$set(
            this.allActList[key],
            "djs",
            dd + "天" + hh + "小时" + mm + "分" + ss + "秒"
          );
        } else {
          // this.list[key]["djs"]="已结束"
          this.$set(this.allActList[key], "djs", "已结束");
        }
      }
    }, 1000);
  }
};
</script>
<style lang="" scoped>
@import url("../../assets/css/allActivity.css");

.allActivity_cont {
  width: 100%;
  height: 100%;
  background-color: #f3f5f7;
  position: relative;
  overflow: hidden;
}

.allActivity_li {
  display: flex;
}
.allActivity_li > div:nth-child(1) {
  flex: 6.2;
}
.allActivity_li > div:nth-child(1) > p {
  float: left;
  margin-left: 0.25rem;
  margin-top: 0.6rem;
  width: 121px;
  height: 43px;
  font-size: 0.91rem;
  padding-left: 0.9rem;
  padding-top: 0.7rem;
  text-align: left;
}
.allActivity_li > div:nth-child(2) {
  flex: 3.8;
  padding-top: 2rem;
  padding-left: 0.5rem;
}
</style>

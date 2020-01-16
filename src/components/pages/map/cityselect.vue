<template>
  <div class="busjoin_cont">
    <Header :show="1">
        <span slot="top_text">请选择城市</span>
    </Header>
    <div class="busjoin_bot">
      <!-- 搜索 -->
      <!-- <div class="sousuobox">
          <img src="../../../../static/img/phone-img/sousuo.png" alt="">
          <input type="text" placeholder="城市名、拼音首字母" @input="fn(key)" v-model="key">
      </div> -->

      <!-- 当前 -->
      <div class="dq">
          <span>当前：</span>
          <span>{{currentcity}}</span>
      </div>

      <!-- <div class="remen">
          <div>已定位城市</div>
          <div>
              <div
                  v-for="rm in this.dingwei.hotlist"
                  :key="rm.id"
                  @click="remen(rm.name)"
                  class="cityname"
              >{{rm.name}}</div>
          </div>
      </div> -->

      <div class="jiane"></div>

      <mt-index-list>
        <mt-index-section index="A">
          <mt-cell
            :title="ia.name"
            v-for="ia in zm.A"
            :key="ia.id"
            @click.native="citybtn(ia)"
          ></mt-cell>
        </mt-index-section>
        <mt-index-section index="B">
          <mt-cell :title="ia.name" v-for="ia in this.zm.B" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="C">
          <mt-cell :title="ia.name" v-for="ia in this.zm.C" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="D">
          <mt-cell :title="ia.name" v-for="ia in this.zm.D" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="E">
          <mt-cell :title="ia.name" v-for="ia in this.zm.E" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="F">
          <mt-cell :title="ia.name" v-for="ia in this.zm.F" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="G">
          <mt-cell :title="ia.name" v-for="ia in this.zm.G" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="H">
          <mt-cell :title="ia.name" v-for="ia in this.zm.H" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="J">
          <mt-cell :title="ia.name" v-for="ia in this.zm.J" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="K">
          <mt-cell :title="ia.name" v-for="ia in this.zm.K" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="L">
          <mt-cell :title="ia.name" v-for="ia in this.zm.L" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="M">
          <mt-cell :title="ia.name" v-for="ia in this.zm.M" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="N">
          <mt-cell :title="ia.name" v-for="ia in this.zm.N" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="P">
          <mt-cell :title="ia.name" v-for="ia in this.zm.P" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="Q">
          <mt-cell :title="ia.name" v-for="ia in this.zm.Q" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="R">
          <mt-cell :title="ia.name" v-for="ia in this.zm.R" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="S">
          <mt-cell :title="ia.name" v-for="ia in this.zm.S" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="T">
          <mt-cell :title="ia.name" v-for="ia in this.zm.T" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="W">
          <mt-cell :title="ia.name" v-for="ia in this.zm.W" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="X">
          <mt-cell :title="ia.name" v-for="ia in this.zm.X" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="Y">
          <mt-cell :title="ia.name" v-for="ia in this.zm.Y" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
        <mt-index-section index="Z">
          <mt-cell :title="ia.name" v-for="ia in this.zm.Z" :key="ia.id" @click.native="citybtn(ia)"></mt-cell>
        </mt-index-section>
      </mt-index-list>
    </div>
    <div class="busjoin_choArea" v-if='zhezhao==true'>
      <ul>
        <li v-for="(item,index) in arealist" :key="index" @click.prevent="areabtn(item)">{{item.name}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
import { IndexList, IndexSection } from "mint-ui";
import Header from "../../component/header";
// import "../../../../static/js/mobile_css"
export default {
    components: {
        Header
    },
    name: "citylocation",
    data() {
        return {
            citylist: {
                
            },
            currentcity: "",
            currentcode:"",
            dingwei: [],
            zm: [],
            key: "",
            zhezhao:false,
            arealist:[]
        };
    },
    methods: {
        getlist: function() {
            this.$http.post("mobile/index/getcity",{

            }).then(res=>{
                this.citylist=res.data.result.list
                let data = this.citydata;
                this.zm = this.citylist;
            })
        },
        citybtn(val) {
            console.log("点击的城市",val);
            this.zhezhao=true
            this.$http.post("mobile/index/get_lower_address",{
              code:val.code
            }).then(res=>{
              console.log("区",res);
                this.arealist=res.data.result.list
                
            })
        },
        areabtn(val){
          this.zhezhao=false
          // console.log("区code",val.code);
          // console.log("区name",val.name);
          this.currentcity = val.name;
          this.currentcode = val.code;
          localStorage.setItem('ccity',val.name)
          localStorage.setItem('ccode',val.code)
          this.$router.go(-1)
        }
    },
    created() {},
    mounted() {
        this.getlist();
        this.currentcity = localStorage.getItem('ccity') || localStorage.getItem('city')
        // let city=localStorage.getItem('city')
        // let citycode=localStorage.getItem('citycode')
        // if(citycode){
        //     this.currentcity=city
        // }
    }
};
</script>

<style lang="less" scoped>
.busjoin_cont {
  width: 100%;
  height: 100%;
  overflow: hidden;
  position: relative;
  text-align: left;
}
.busjoin_bot {
  position: absolute;
  top: 2.75rem;
  left: 0;
  right: 0;
  bottom: 0rem;
  margin: auto;
  overflow: scroll;
  -webkit-overflow-scrolling: touch;
  /* border: 1px solid red; */
}
::-webkit-scrollbar {
  display: none;
}

.zuiwai {
  text-align: left;
}
.jiane {
  height: 0.1rem;
  border-bottom: 0.1rem #e8e8e8 solid;
}
.city-top {
  height: 1.5rem;
  line-height: 1.5rem;
  margin-top: 0.575rem;
  width: 100%;
  text-align: center;
  > div:nth-child(1) {
    font-size: 2rem;
    float: left;
    padding-left: 1rem;
  }
  > div:nth-child(2) {
    color: #333333;
    font-size: 1.2rem;
  }
}
.sousuobox {
  width: 100%;
  height: 3.4375rem;
  border-top: 0.0625rem solid #ccc;
  border-bottom: 0.0625rem solid #ccc;
  padding: 0 0.75rem;
  background-color: #f2f3f4;
  input {
    width: 100%;
    border: 0.0625rem solid #cccccc;
    background: #fff;
    outline: none;
    border-radius: 0.75rem;
    height: 1.71875rem;
    line-height: 1.71875rem;
    transform: translateY(50%);
    padding-left: 0.5rem;
  }
}

.dq {
  // border: 1px solid red;
  border-bottom: 0.0625rem solid #f0f0f0;
  height: 3rem;
  line-height: 3rem;
  font-size: 1rem;
  background-color: #fff;
  > span:nth-child(1) {
    color: #666666;
    font-size: 0.6rem;
    margin-left: 0.6rem;
  }
}
.remen {
  background-color: #f2f3f4;
  > div:nth-child(1) {
    color: #666666;
    font-size: 0.6rem;
    margin: 0.6rem 0 0 0.6rem;
  }
  > div:nth-child(2) {
    .cityname {
      border: 1px solid #ccc;
      font-size: 0.6rem;
      margin: 0.4rem;
      background: #fff;
      display: inline-block;
      padding: 8px 23px;
      border-radius: 0.2rem;
    }
  }
}
.busjoin_choArea{
  width: 100%;
  height: 100%;
  position: absolute;
  background-color:rgba(0,0,0,0.2);
  ul{
    width: 100%;
    height: 12rem;
    position: absolute;
    bottom: 0;
    left: 0;
    background-color: #ffffff;
    overflow: scroll;
    -webkit-overflow-scrolling: touch;
    li{
      width:100%;
      height: 2rem;
      line-height: 2rem;
      font-size: 1.2rem;
      text-align: center
    }
  }
  ::-webkit-scrollbar {
    display: none;
  }
}
</style>
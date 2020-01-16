export default {
  // 添加请求拦截器
  data() {
    return {
      loading: false,
      condition: 1,
      flag: 1,
      // toparr: [
      //   "哈哈哈哈哈哈哈哈哈哈或",
      //   "我靠我我我我我我我哦",
      //   "哒哒哒哒哒哒多多多"
      // ],
      alllist: [],
      tableData: [], // 销售排行数据
      tableData1:[],
      xdata: [], // 横坐标数组
      chengjiaoArr: [], // 成交额数组
      // jineArr: [], // 金额数组
      // jiaoyiArr: [], // 交易额数组
      Numarr: [], // 数量数组
      jiaoyiNumArr: [] // 今日数据概况数组
    };
  },
  methods: {
    getecharts() {
      let myChart = this.$echarts.init(document.getElementById("main"));
      myChart.setOption({
        title: {
          text: "近七日交易走势",
          textStyle: {
            color: "#333333",
            fontSize: 22,
            fontWeight: "bold"
          }
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: ["成交额", "数量"],
          left: "right"
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xdata,
          splitLine: {
            show: true,
            lineStyle: {
              width: 1,
              type: "solid",
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            lineStyle: {
              color: "#CBCBCB",
              width: 1
            }
          },
          axisLabel: {
            // interval: 3,
            textStyle: {
              color: "#333"
            }
          }
        },
        yAxis: {
          type: "value",
          splitLine: {
            show: true,
            lineStyle: {
                width: 1,
                type: "solid",
              }
          },
          axisTick: {
            show: false,
            // alignWithLabel: true
          },
          axisLine: {
            lineStyle: {
              color: "#CBCBCB",
              width: 1
            }
          },
          axisLabel: {
            // interval: 3,
            textStyle: {
              color: "#333"
            }
          }
        },
        series: [
          {
            name: "成交额",
            type: "line",
            data: this.chengjiaoArr,
            symbol: "circle",
            symbolSize: 5,
            itemStyle: {
              normal: {
                width: 16,
                height: 16,
                color: "#FF6F95",
                lineStyle: {
                  color: "#44ABF7"
                }
              }
            }
          },
          {
            name: "数量",
            type: "line",
            data: this.Numarr,
            itemStyle: {
              normal: {
                color: "#FF5555",
                lineStyle: {
                  color: "#FF5555"
                }
              }
            }
          }
        ]
      });
    },
    getlist() {
      let that = this;
      this.$http.post(this.api + "admin/index/index", {}).then(res => {
        // console.log('后台首页',res.data);
        if (res.data.status == 1) {
          let info = res.data.result;
          that.alllist = info.trade;
          that.tableData = info.rank;
          that.jiaoyiNumArr=info.totay
          this.choose(1)
          // console.log('后台首页-活动销量排行 rank',that.tableData);
          // console.log('后台首页-近七日交易走势 trade',that.alllist);
          // console.log('后台首页 totay',that.jiaoyiNumArr);
          that.xdata = that.alllist.xAxis.data.map(item => {
            // 得到横坐标数据
            return item.substring(5);
          });
          // for (const key in res.data.result.totay) {
          //   that.jiaoyiNumArr.push(
          //     that.toThousands(res.data.result.totay[key])
          //   ); // 近七日交易走势
          // }
            // that.jiaoyiArr = that.alllist.seven_ordersarr.map(item => {
            //   //  得到交易额数组
            //   return +item.cjnum;
            // });
            // that.jineArr = that.alllist.seven_ordersarr.map(item => {
            //   // 得到金额数组
            //   return +item.sumtotal;
            // });
            // console.log('后台首页-近七日交易走势 trade-data',that.alllist.series[1].data);
            that.Numarr = that.alllist.series[1].data.map(item => {
              //  得到交易额数组
              return +item;
            });
            that.chengjiaoArr = that.alllist.series[1].data.map(item => {
              // 得到成交额数组
              return +item;
            });
          // 数据图形勾勒
          that.getecharts();
        }
      });
    },
    // toThousands(num) {
    //   //分割数字
    //   var result = [],
    //     counter = 0;
    //   num = (num || 0).toString().split("");
    //   for (var i = num.length - 1; i >= 0; i--) {
    //     counter++;
    //     result.unshift(num[i]);
    //     if (!(counter % 3) && i != 0) {
    //       result.unshift(",");
    //     }
    //   }
    //   return result.join("");
    // },

    // lunboul(){
    //     let lunboul = document.getElementById('lunboul')
    //     let lunbolis = lunboul.getElementsByTagName('li')
    //     let index = 0
    //     let lun = setInterval(() => {
    //         let c= this.toparr.shift()
    //         this.toparr.push(c)
    //     }, 2000);

    // },
    cutmap(val) {
      this.condition = val;
    },
    choose(val) {
      console.log(val);
      if (val == 1) {
        this.flag = 1;
        if(this.tableData[0].data!=''){
          this.tableData1=this.tableData[0].data
        }else{
          this.tableData1=[]
        }
        // this.tableData=this.alllist.now_goodsarr
        // this.tableData.splice(8)
      } else if (val == 2) {
        this.flag = 2;
        if(this.tableData[1].data!=''){
          this.tableData1=this.tableData[1].data
        }else{
          this.tableData1=[]
        }
        // this.tableData=this.alllist.befor_goodsarr
        // this.tableData.splice(8)
      } else if (val == 3) {
        this.flag = 3;
        if(this.tableData[2].data!=''){
          this.tableData1=this.tableData[2].data
        }else{
          this.tableData1=[]
        }
        // this.tableData=this.alllist.seven_goodsarr
        // this.tableData.splice(8)
      }
    }
  },
  mounted() {
    let that = this;
    this.getecharts();
    window.addEventListener("resize", function() {
      that.getecharts();
    });

    // this.lunboul()
    // 图像绘制方法
    this.getlist();
  }
};

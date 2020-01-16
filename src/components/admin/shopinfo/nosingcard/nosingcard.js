import { Api } from "../../../../APi/WEBPC/index";
export default {
  data() {
    return {
      uid: "", // 修改id字段
      activeName: "first",
      // 库存
      displayorder: "", //排序
      title: "", // 名称
      thumb: "", // 图片
      price: "", // 金额
      addFoodInfo: {
        // 是否上架
        isfre: "" // 是否设置时间
      },
      hascommission: {
        //是否启用分销
        isfre: ""
      },
      bonus: "", // 分销提成数据
      baseurl: "", // 图片上传地址
      imageUrl: "", // 图片路径
      // value: "",          // 上架开始时间
      // value1: "",         // 选择商家结束时间
      checked: "", // 是否启用独立佣金比例
      val: "",
      currentPage: 1,
      ifUpPic: false,  //判断是否上传照片
    };
  },
  methods: {
    goback() {
      this.$router.go(-1);
    },
    handleClick(tab, event) {
      // 表格数据切换
    },
    beforeAvatarUpload(file) {
      let that = this;
      const isLt2M = file.size / 1024 / 1024 < 2;
      if (!/image\/\w+/.test(file.type)) {
        // 文件类型
        that.$message("请确保文件为图像类型");
        return false;
      } else {
        if (!isLt2M) {
          //  文件大小
          this.$message.error("上传头像图片大小不能超过 2MB!");
        } else {
          if (that.imageUrl != "") {
            //  上传数量限制
            this.$message.warning("只能上传一张图片!");
          } else {
            var article_image, image_base64;
            var reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = function(e) {
              image_base64 = this.result.split(",")[1];
              article_image = image_base64;
              that.$http
                .post(that.baseurl + "admin/index/imgbase64", {
                  imgdata: article_image
                })
                .then(res => {
                  console.log(res.data);
                  if (res.data.status == 1) {
                    that.imageUrl = res.data.result.url;
                    that.ifUpPic = true; //上传过照片
                    that.thumb = res.data.result.url;
                    that.$message.success(res.data.message);
                  } else if (res.data.status == 0) {
                    that.$message.error(res.data.result.message);
                  }
                })
                .catch(error => {});
            };
          }
        }
      }
      return false;
    },
    handleRemove(file, fileList) {
      this.imageUrl = "";
      this.thumb = "";
    },
    // 添加/编辑提交
    addFoodSumbmit() {
      let that = this;
      // let bonusalone='';
      // if(this.checked==true){
      //   bonusalone==1
      // }else{
      //   bonusalone==0
      // }
      if (this.uid) {
        //取消独立分销按钮功能
        // Api.Save_update_card({
        //   id: this.uid,
        //   title: this.title,
        //   thumb: this.thumb,
        //   price: this.price,
        //   hascommission: this.hascommission.isfre,
        //   bonus: this.bonus,
        //   status: this.addFoodInfo.isfre,
        //   displayorder: this.displayorder
        // }).then(res => {
        //   if (res.data.status == 1) {
        //     this.$message.success(res.data.message);
        //     this.$router.push("/StoreList");
        //   }else{
        //     this.$message.error(res.data.message);
        //   }
        // });

        // let params = {
        //   id: this.uid,
        //   title: this.title,
        //   thumb: this.thumb,
        //   price: this.price,
        //   hascommission: this.hascommission.isfre,
          
        //   bonus: this.bonus,
        //   status: this.addFoodInfo.isfre,
        //   displayorder: this.displayorder
        // };


        if (this.checked==true) {
          // 是否独立规则
          Api.Save_update_card({
            id: this.uid,
            title: this.title,
            thumb: this.thumb,
            price: this.price,
            hascommission: this.hascommission.isfre,
            bonusalone:1,
            bonus: this.bonus,
            status: this.addFoodInfo.isfre,
            displayorder: this.displayorder
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.message);
              this.$router.push("/StoreList");
            }else{
              this.$message.error(res.data.message);
            }
          });
        } else {
          console.log('11111')
          // params.bonus = "";
          Api.Save_update_card({
            id: this.uid,
            title: this.title,
            thumb: this.thumb,
            price: this.price,
            hascommission: this.hascommission.isfre,
            bonusalone:0,
            bonus: this.bonus,
            status: this.addFoodInfo.isfre,
            displayorder: this.displayorder
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.message);
              this.$router.push("/StoreList");
            }else{
              this.$message.error(res.data.message);
            }
          });
        }
      } else {
        //取消独立分销按钮功能
        // Api.Add_vip_card({
        //   title: this.title,
        //   thumb: this.thumb,
        //   price: this.price,
        //   hascommission: this.hascommission.isfre,
        //   bonus: this.bonus,
        //   status: this.addFoodInfo.isfre,
        //   displayorder: this.displayorder
        // }).then(res => {
        //   if (res.data.status == 1) {
        //     this.$message.success(res.data.message);
        //     this.$router.push("/StoreList");
        //   }else{
        //     this.$message.error(res.data.message);
        //   }
        // });


        // let params = {
        //   title: this.title,
        //   thumb: this.thumb,
        //   price: this.price,
        //   hascommission: this.hascommission.isfre,
        //   bonus: this.bonus,
        //   status: this.addFoodInfo.isfre,
        //   displayorder: this.displayorder
        // };


        if (this.checked==true) {
          // 是否独立规则
          Api.Add_vip_card({
            title: this.title,
            thumb: this.thumb,
            price: this.price,
            hascommission: this.hascommission.isfre,
            bonusalone:1,
            bonus: this.bonus,
            status: this.addFoodInfo.isfre,
            displayorder: this.displayorder
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.message);
              this.$router.push("/StoreList");
            }else{
              this.$message.error(res.data.message);
            }
          });
        } else {
          // params.bonus = "";
          Api.Add_vip_card({
            title: this.title,
            thumb: this.thumb,
            price: this.price,
            hascommission: this.hascommission.isfre,
            bonusalone:0,
            bonus: this.bonus,
            status: this.addFoodInfo.isfre,
            displayorder: this.displayorder
          }).then(res => {
            if (res.data.status == 1) {
              this.$message.success(res.data.message);
              this.$router.push("/StoreList");
            }else{
              this.$message.error(res.data.message);
            }
          });
        }
      }
    },

    // 获取编辑会员卡的数据
    getFooddata(pid) {
      if (pid) {
        Api.Editor_assign_card({
          id: pid
        }).then(res => {
          if (res.data.status == 1) {
            this.displayorder = res.data.result.info.displayorder;
            this.price = res.data.result.info.price;
            this.title = res.data.result.info.title;
            this.imageUrl = res.data.result.info.thumb;
            this.thumb = res.data.result.info.thumb;
            this.addFoodInfo.isfre = res.data.result.info.status;
            this.hascommission.isfre = res.data.result.info.hascommission;
            if (res.data.result.info.bonusalone==1) {
              this.checked = true;
              this.bonus = res.data.result.info.bonus;
            }else{
              this.checked = false;
              this.bonus = res.data.result.info.bonus;
            }
          }
        });
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val;
    },
    //未上传图片地址处理
    handleImg(val){

    }
  },
  created() {
    this.uid = this.$route.query.pid;
    this.baseurl = Api.url;
    this.getFooddata(this.uid);
  },
  watch:{
  }
};

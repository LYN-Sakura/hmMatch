import { Api } from "../../../../APi/WEBPC/index";
export default {
  data() {
    return {
      uid: "", // 判断新增还是修改字段
      miaoshu: "", // 标题
      thumb: "", // 图片
      tzurl: "", // 链接
      enabled: "", // 是否显示启用，隐藏禁用
      no: "", //	排序，数字越大越靠前
      // 上传文件夹
      img_list: [],
      // imgbmp:[],
      baseurl: "",
      dialogVisible: false,
      dialogImageUrl: ""
    };
  },
  methods: {
    // 上传图片
    // 删除文件钩子
    handleRemove(file, fileList) {
      this.img_list = fileList;
    },
    // 点击上传的文件的钩子
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    beforeRemove(file, fileList) {
      return this.$confirm(`确定移除 ${file.name}？`);
    },
    onexceed(files, fileList) {
      this.$message.warning("只能上传一张图片!");
    },
    // 上传成功
    uploadSuccess(response, file, fileList) {
      this.$message.success("上传成功");
    },
    // 上传之前
    beforeAvatarUpload(file) {
      var that = this;
      // 判断类型是不是图片
      if (!/image\/\w+/.test(file.type)) {
        that.$message("请确保文件为图像类型");
        return false;
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
              if (res.data.status == 1) {
                that.img_list.push({
                  name: file.name,
                  url: res.data.result.url,
                  imgurl: res.data.result.path
                });
                that.$message.success(res.data.message);
              } else if (res.data.status == 0) {
                this.$message.error(res.data.result.message);
              }
            })
            .catch(error => {});
        };
      }
    },
    goback() {
      this.$router.go(-1);
    },
    // 提交
    submit() {
      let imgbmp = [];
      this.img_list.forEach(item => {
        imgbmp.push(item.imgurl);
      });
      imgbmp = imgbmp.join(",");
      if (this.uid != "" && !isNaN(this.uid)) {
        Api.Save_pdate_slide({
          id: this.uid,
          title: this.miaoshu,
          displayorder: this.no,
          url: this.tzurl,
          thumb: imgbmp,
          isshow: this.enabled
        })
          .then(res => {
            this.$message.success(res.data.message);
            this.$router.go(-1);
          })
          .catch(err => {
            this.$message.error(err.data.message);
          });
      }else{
        //提交幻灯片
        Api.Add_slide({
          title: this.miaoshu,
          displayorder: this.no,
          url: this.tzurl,
          thumb: imgbmp,
          isshow: this.enabled
        }).then(res=>{
          this.$message.success(res.data.message);
          this.$router.go(-1);
        }).catch(err=>{
          this.$message.error(err.data.message);
        })
        
    }
    },
    // 获取数据
    getinfo() {
      Api.Show_editor_slide({
        id: this.uid
      })
        .then(res => {
          this.no = res.data.result.info.no;
          this.enabled = Number(res.data.result.info.isshow);
          this.miaoshu = res.data.result.info.miaoshu;
          this.tzurl = res.data.result.info.url;
          this.img_list = [
            {
              name: "图片",
              url: res.data.result.info.thumb,
              imgurl: res.data.result.info.thumb
            }
          ];
        })
        .catch(err => {
          this.$message.error(err.data.message);
        });
    }
  },
  created() {
    this.baseurl = Api.url;
  },
  mounted() {
    this.uid = Number(this.$route.query.pid*1);
    if (this.uid) {
      this.getinfo();
    }
  }
};

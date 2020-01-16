export default {
  data: function() {
    return {
      ruleForm: {
        username: "",
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      },
      indextab:[
        {
            img: "",
            img1:"",
            index: "/index",
            title: "数据概况",
        },
        {
            img: "",
            img1:"",
            index: "/bannerset",
            title: "轮播图设置",
        },
        {
            img: "",
            img1:"",
            index: "/Activeset",
            title: "热门活动设置",
        },
        {
            img: "",
            img1:"",
            index: "/bigBusSet",
            title: "大牌商家设置",
        }
    ],
    };
  },
  methods: {
    submitForm() {
      this.$http
        .post("admin/users/login", {
          mobile: this.ruleForm.username,
          password: this.ruleForm.password
        })
        .then(res => {
          if (res.data.status == 1) {
            
            let useradmin = JSON.stringify(res.data.result);
            sessionStorage.setItem('ms_tokens',res.data.result.token);
            sessionStorage.setItem("ms_username", res.data.result.name);            
            sessionStorage.setItem("ms_userImg", res.data.result.avatar);
            localStorage.setItem("ms_userinfo", useradmin);
            this.$router.push("/index");
          } else {
            this.$message.error(res.data.message);
          }
        });
    }
  },
  created () {
    sessionStorage.setItem('openindex','index')
    localStorage.setItem("ms_tab", JSON.stringify(this.indextab));
  }
};

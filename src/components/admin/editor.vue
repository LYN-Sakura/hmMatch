<template>
    <div>
        <!-- 图片上传组件辅助-->
      <el-upload
        style="height:0"
        class="avatar-uploader"
        :action="serverUrl"
        name="imgdata"
        :headers="header"
        :show-file-list="false"
        :on-success="uploadSuccess"
        :on-error="uploadError"
        :before-upload="beforeUpload">
      </el-upload>

        <quill-editor 
        class="editor"
        v-model="content"
        ref="myQuillEditor" 
        :options="editorOption" 
        @blur="onEditorBlur($event)" @focus="onEditorFocus($event)"
        @change="onEditorChange($event)">
        </quill-editor>
    </div>
</template>
<script>
// 工具栏配置
const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // 加粗 斜体 下划线 删除线
  ["blockquote", "code-block"], // 引用  代码块
  [{ header: 1 }, { header: 2 }], // 1、2 级标题
  [{ list: "ordered" }, { list: "bullet" }], // 有序、无序列表
  [{ script: "sub" }, { script: "super" }], // 上标/下标
  [{ indent: "-1" }, { indent: "+1" }], // 缩进
  // [{'direction': 'rtl'}],                         // 文本方向
  [{ size: ["small", false, "large", "huge"] }], // 字体大小
  [{ header: [1, 2, 3, 4, 5, 6, false] }], // 标题
  [{ color: [] }, { background: [] }], // 字体颜色、字体背景颜色
  [{ font: [] }], // 字体种类
  [{ align: [] }], // 对齐方式
  ["clean"], // 清除文本格式
  ["link", "image", "video"] // 链接、图片、视频
];

import { quillEditor } from "vue-quill-editor";
import "quill/dist/quill.core.css";
import "quill/dist/quill.snow.css";
import "quill/dist/quill.bubble.css";

import { Api } from "../../APi/WEBPC/index.js";
export default {
  props: {
    /*编辑器的内容*/
    t_value: String,
    /*图片大小*/
    maxSize: {
      type: Number,
      default: 4000 //kb
    }
  },

  components: {
    quillEditor
  },

  data() {
    return {
      content: this.t_value,
      quillUpdateImg: false, // 根据图片上传状态来确定是否显示loading动画，刚开始是false,不显示
      editorOption: {
        placeholder: "",
        theme: "snow", // or 'bubble'
        placeholder: "您想说点什么？",
        modules: {
          toolbar: {
            container: toolbarOptions,
            // container: "#toolbar",
            handlers: {
              image: function(value) {
                if (value) {
                  // 触发input框选择图片文件
                  document.querySelector(".avatar-uploader input").click();
                } else {
                  this.quill.format("image", false);
                }
              },
              // link: function(value) {
              //   if (value) {
              //     var href = prompt('请输入url');
              //     this.quill.format("link", href);
              //   } else {
              //     this.quill.format("link", false);
              //   }
              // },
            }
          }
        }
      },
      serverUrl: "/admin/index/imgbase64", // 这里写你要上传的图片服务器地址
      header: {
        // token: sessionStorage.token
      } // 有的图片服务器要求请求头需要有token
    };
  },
  watch: {
      t_value(val) {
          // console.log(val)
          this.content = val
      }
  },
    mounted () {
        // console.log(this.content)
        // this.content = '<p><img src="http://lotus.hongbao19.net/uploads/image/36b1e857628b65560de28b2622f56db8.png">哒哒哒哒哒</p>'
    },
  methods: {
    onEditorBlur() {
      //失去焦点事件
    },
    onEditorFocus() {
      //获得焦点事件
    },
    onEditorChange() {
      //内容改变事件
      this.$emit("input", this.content);
    },

    // 富文本图片上传前
    beforeUpload(file) {
      // 显示loading动画
      this.quillUpdateImg = true;
      console.log('111')
      var that = this;
                that.isupload = false
                //判断类型是不是图片
                if (!/image\/\w+/.test(file.type)) {
                    that.$message("请确保文件为图像类型");
                    return false;
                } else {
                    var article_image, image_base64;
                    var reader = new FileReader();
                    reader.readAsDataURL(file);
                    reader.onload = function (e) {
                    //  console.log('img数组',this.result);
                    image_base64 = this.result.split(",")[1];

                    //就是base64
                    article_image = image_base64;
                    // console.log("article_image =",article_image);
                    // this.serverhost=this.GLOBAL.serverhost;
                    //   var url = that.serverhost + 'upload';
                    // console.log('我是地址',url)
                    var params = {
                        imgdata: article_image
                    };
                    
                    that.$http.post('/admin/index/imgbase64', params)
                        .then(res => {
                            console.log(res)
                        if (res.data.status==1){
                            console.log('jinle')
                            // console.log("img =",res.data);
                            // that.html = res.data.result.url
                            // console.log("12312132");
                            // that.$refs.md.$img2Url(pos, res.data.result.url);
                            // console.log("dfgsdhguhfdsgo" ,that.$refs.md);
                            // that.isupload = true
                            let quill = that.$refs.myQuillEditor.quill;
                            console.log('jinle1')
                            let length = quill.getSelection().index;
                            console.log(quill,length)
                            // 插入图片  res.url为服务器返回的图片地址
                            // let reqParamas = 
                            quill.insertEmbed(length, "image", res.data.result.url);
                            // 调整光标到最后
                            quill.setSelection(length + 1);
                            // 数据库返回的图片地址
                            // that.form.thumb = res.data.result.url;
                            // if(typeof(that.thisinfo.imgs)=='string'){
                            //     // console.log('是字符串')
                            //     that.thisinfo.imgs = that.thisinfo.imgs.split(',')
                            //     // console.log('转换后的图片类型',typeof(that.thisinfo.imgs))
                            //     if(that.infoData.imgs[0]==''){
                            //         console.log('第一个是空的')
                            //         that.infoData.imgs.shift()
                            //     }
                            // }
                            console.log(that.content,'content')
                            // that.thisinfo.imgs.push(res.data.result.url)
                            // console.log(that.thisinfo.imgs)
                            that.$message.success(res.data.message);

                        } else if (res.data.status == 0) {
                            that.$message(res.data.message);
                            that.isupload=true
                        }

                        })
                        .catch(error => {
                        // console.log(error)
                        })
                    }
                }
    },

    uploadSuccess(res, file) {
        // console.log(res,'111sssssssss')
        return
      // res为图片服务器返回的数据
      // 获取富文本组件实例
      let quill = this.$refs.myQuillEditor.quill;
      // 如果上传成功
      if (res.code == 200) {
        // 获取光标所在位置
        let length = quill.getSelection().index;
        // 插入图片  res.url为服务器返回的图片地址
        quill.insertEmbed(length, "image", res.url);
        // 调整光标到最后
        quill.setSelection(length + 1);
      } else {
        this.$message.error("图片插入失败");
      }
      // loading动画消失
      this.quillUpdateImg = false;
    },
    // 富文本图片上传失败
    uploadError() {
      // loading动画消失
      this.quillUpdateImg = false;
      this.$message.error("图片插入失败");
    }
  }
};
</script> 

<style>
.editor {
  line-height: normal !important;
  height: 800px;
  height: 500px;
}
.ql-snow .ql-tooltip[data-mode=link]::before {
  content: "请输入链接地址:";
}
.ql-snow .ql-tooltip.ql-editing a.ql-action::after {
    border-right: 0px;
    content: '保存';
    padding-right: 0px;
}

.ql-snow .ql-tooltip[data-mode=video]::before {
    content: "请输入视频地址:";
}

.ql-snow .ql-picker.ql-size .ql-picker-label::before,
.ql-snow .ql-picker.ql-size .ql-picker-item::before {
  content: '14px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=small]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=small]::before {
  content: '10px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=large]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=large]::before {
  content: '18px';
}
.ql-snow .ql-picker.ql-size .ql-picker-label[data-value=huge]::before,
.ql-snow .ql-picker.ql-size .ql-picker-item[data-value=huge]::before {
  content: '32px';
}

.ql-snow .ql-picker.ql-header .ql-picker-label::before,
.ql-snow .ql-picker.ql-header .ql-picker-item::before {
  content: '文本';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="1"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="1"]::before {
  content: '标题1';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="2"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="2"]::before {
  content: '标题2';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="3"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="3"]::before {
  content: '标题3';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="4"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="4"]::before {
  content: '标题4';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="5"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="5"]::before {
  content: '标题5';
}
.ql-snow .ql-picker.ql-header .ql-picker-label[data-value="6"]::before,
.ql-snow .ql-picker.ql-header .ql-picker-item[data-value="6"]::before {
  content: '标题6';
}

.ql-snow .ql-picker.ql-font .ql-picker-label::before,
.ql-snow .ql-picker.ql-font .ql-picker-item::before {
  content: '标准字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=serif]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=serif]::before {
  content: '衬线字体';
}
.ql-snow .ql-picker.ql-font .ql-picker-label[data-value=monospace]::before,
.ql-snow .ql-picker.ql-font .ql-picker-item[data-value=monospace]::before {
  content: '等宽字体';
}
</style>

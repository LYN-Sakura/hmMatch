<template>
  <div class="wrapper" >
    <v-head></v-head>
    <v-sidebar @noIndex="noIndex"></v-sidebar>
    <div class="content-box" :class="{noindex:noindex,isOpen:isopen}">
      <v-tags></v-tags>
      <div class="content">
        <transition name="move" mode="out-in">
          <!-- <keep-alive :include="tagsList"> -->
          <router-view></router-view>
          <!-- </keep-alive> -->
        </transition>
      </div>
      <form class="layer">
          
      </form>
    </div>
  </div>
</template>

<script>
import vHead from "./Header.vue";
import vSidebar from "./Sidebar.vue";
import vTags from "./Tags.vue";
import bus from "./bus";
export default {
  data() {
    return {
      tagsList: [],
      collapse: false,
      noindex: false,
      isopen: false
    };
  },
  components: {
    vHead,
    vSidebar,
    vTags
  },
  created() {
    bus.$on("collapse", msg => {
      this.collapse = msg;
    });

    // 只有在标签页列表里的页面才使用keep-alive，即关闭标签之后就不保存到内存中了。
    bus.$on("tags", msg => {
      let arr = [];
      for (let i = 0, len = msg.length; i < len; i++) {
        msg[i].name && arr.push(msg[i].name);
      }
      this.tagsList = arr;
    });
  },
  methods: {
    noIndex(data) {
      // console.log(data,454);
      if (data == true) {
        this.noindex = true;
      } else {
        this.noindex = false;
      }
    },
    isOpen(data) {
      // console.log('1111',data)
      if (data == false) {
        this.isopen = false;
      } else {
        this.isopen = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
.wrapper{
  height: 100%;
  background-color: #1E222B;
  input{text-align: left;text-indent:8px;}
}::-webkit-scrollbar{
  display: unset;
}
::-webkit-scrollbar {
  /* 滚动条整体部分 */
  width: 6px;
  height: 6px;
  background-color: #f5f5f5;
}
::-webkit-scrollbar-thumb {
  /* 滑块 */
  width: 6px;
  border-radius: 5px;
  background: #cba363;
}
.content-box {
  position: absolute;
  left: 0px;
  right: 0px;
  top: 64px;
  bottom: 0;
  border-radius: 8px 0 0 0;
  padding-bottom: 30px;
  background-color: #EDF1F2;
  overflow-y: scroll;
  -webkit-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
 
}
.content {
  margin: 15px 0 0 20px;
  box-sizing: border-box;
  min-width: 1520px;
}
.noindex {
  position: absolute;
  left: 177px !important;
  top: 64px;
  bottom: 0;
  
}
// .isOpen {
//   position: absolute;
//   right: 260px;
//   top: 64px;
//   bottom: 0;
  
// }
</style>


<template>
  <div class="itemWrop" @click.stop="fn()">
    <span v-show="bol">
      <slot name="imgItem"></slot>
    </span>
    <span class="imgItemRed" v-show="!bol">
      <slot name="imgItemRed"></slot>
    </span>
    <p :class="bol?'xz':'wxz'">{{ txt }}</p>
  </div>
</template>
<script>
export default {
  name: "Item",
  props: ["txt", "mark", "sel"],
  data() {
    return {};
  },
  components: {},
  computed: {
    bol: function() {
      if (this.mark == this.sel) {
        return false;
      } else {
        return true;
      }
    }
  },
  methods: {
    fn: function() {
      this.$emit("change", this.mark);
      this.$router.push("/" + this.mark);
    }
  },
  watch: {}
};
</script>
<style scoped>
.itemWrop {
  width: 25%;
  float: left;
  text-align: center;
  border-top: 0.05rem solid #e5e4e4;
  padding-top: 0.25rem;
  box-sizing: border-box;
  height: 100%;
}
.itemWrop span {
  display: inline-block;
  width: 1.5rem;
  height: 1.35rem;
}
.itemWrop span.imgItemRed {
  width: 1.65rem;
  height: 1.45rem;
}
.itemWrop span img {
  width: 100%;
  height: 100%;
  object-fit: fill;
}
.xz {
  color: #a5a8ac;
  font-size: 0.625rem;
  font-weight: 500;
  line-height: 1.25rem;
}
.wxz {
  color: #936514;
  font-size: 0.625rem;
  font-weight: normal;
  line-height: 1rem;
}
</style>
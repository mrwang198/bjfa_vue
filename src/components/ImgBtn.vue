<template>
  <div class="imgbtn" @click="$emit('click')">
    <i class="icon iconfont" :class="iconclass" :style="{color:isred ? '#ff5656' : '#000'} "></i>
    <p>{{val}}</p>
  </div>
</template>

<script>
export default {
  name: "imgbtn",
  props: ["iconclass", "val", "isred"],
  data() {
    return {};
  },
   
};
</script>

<style lang="scss" scoped>
.imgbtn {
  color: #000;
  width: px2rem(220);
  height: px2rem(220);
  box-sizing: border-box;
  border: px2rem(1) solid #ccc;
  padding-top: px2rem(72);
  text-align: center;
  i {
    font-size: px2rem(60);
  }
  p {
    font-size: px2rem(24);
    line-height: px2rem(68);
  }
}
</style>
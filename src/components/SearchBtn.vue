<template>
  <div class="search-btn">
    <i class="icon iconfont icon-sousuo" @click="$emit('search')"></i>
    <input
      @input="$emit('input',$event.target.value)"
      @keydown.enter="$emit('search')"
      :value="value"
      placeholder="请输入搜索内容"
      type="text"
    />
  </div>
</template>

<script>
export default {
  name: "searchBtn",
  props: ["value"],
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.search-btn {
  height: px2rem(64);
  line-height: px2rem(64);
  background-color: #fff;
  display: flex;
  i,
  input {
    font-size: px2rem(28);
  }
  i {
    flex: 0 0 px2rem(40);
    color: #000;
  }
  input {
    flex: 1;
    border: none;
  }
}
</style>
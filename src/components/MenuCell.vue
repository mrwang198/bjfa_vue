<template>
  <div class="menucell">
    <router-link :to="url">
      <div class="img-wrap">
        <img :src="imgUrl" alt="menuname" />
      </div>
      <div class="title-wrap">{{ menuName }}</div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'menucell',
  props: ['menuName', 'imgUrl', 'url']
};
</script>

<style lang="scss" scoped>
.menucell {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  font-size: px2rem(24);
  color: #000;
  text-align: center;
  .img-wrap {
    display: inline-block;
    height: px2rem(62);
    width: px2rem(62);
    margin-bottom: px2rem(36);
  }
}
.menucell:hover {
  color: $act-color;
  background-color: #00acf7;
}
</style>
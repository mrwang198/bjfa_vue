<template>
  <div class="goodslistitem">
    <div class="img-box">
      <img :src="goods.img" :alt="goods.title" />
    </div>
    <div class="desc-wrap">
      <h3 class="goods-title">{{goods.title}}</h3>
      <div class="aside-info-wrap">
        <span>编码:{{goods.serial}}</span>
        <span>规格:{{goods.packageDimensions}}</span>
      </div>
      <div class="price-wrap">
        <div class="fl">
          价格：
          <span class="money">{{goods.monery}}</span>
        </div>
        <div v-if="showNumber" class="fr">
          库存：
          <span>{{goods.number}}箱&nbsp;</span>
          <i class="icon iconfont icon-icon-refresh"></i>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goodslistitem",
  props: ["goods",'show-number'],
  data() {
    return {};
  },
  mounted(){
    // console.log(this.goods);
  }
};
</script>

<style lang="scss" scoped>
.goodslistitem {
  display: flex;
  padding: px2rem(20) px2rem(0);
  border-top: px2rem(1) solid #ccc;

  i{
      font-size: px2rem(28);
      color: #000;
  }
  .img-box {
    border-top: px2rem(1) solid #ccc;

    flex: 0 0 px2rem(140);
    height: px2rem(140);
    vertical-align: middle;

    img {
      width: 100%;
      height: 100%;
    }
  }
  .desc-wrap {
    text-align: left;

    flex: 1;
    padding-left: px2rem(28);
    line-height: px2rem(20);
    font-size: px2rem(20);
    color: #666;
    .goods-title {
      font-size: px2rem(26);
      color: #000;
      height: px2rem(26);
      line-height: px2rem(26);
      margin-bottom: px2rem(12);
    }
    .aside-info-wrap {
      height: px2rem(20);
      margin-bottom: px2rem(34);
      span:first-child {
        margin-right: px2rem(40);
      }
    }
    .price-wrap{
        overflow: hidden;
        height: px2rem(30);
        line-height: px2rem(30);
        .money{
            font-size: px2rem(30);
            color: #f00;

        }
    }
  }
}
</style>
<template>
  <div class="goodsselect">
    <div class="goods-select-bd">
      <TopHead title="产品选择">
        <div slot="r"></div>
      </TopHead>
      <div class="goodsInfo">
        <GoodsListItem :show-number="false" :goods="goods"></GoodsListItem>
      </div>
      <div class="des-row">
        <div class="fl">仓库：</div>
        <div class="fr">{{warehouseName}}</div>
      </div>
      <div class="des-row">
        <div class="fl">库存：</div>
        <div class="fr">{{goods.number }}</div>
      </div>
      <div class="des-row">
        <div class="fl">数量：</div>
        <div class="fr">
          <a href="javascript:" @click="addCount(-1)" class="link-btn">-</a>
          <input class="count-txt" type="number" v-model="count" />
          <a href="javascript:" @click="addCount(1)" class="link-btn">+</a>
        </div>
      </div>
    </div>
    <div class="goods-select-bottom">
      <!-- <input type=button" value="qingkong" > -->
      <div @click="clearCart()">点击消除购物车</div>
      <div class="btn-wrap">
        <div class="btn act" @click="$router.go(-1)">取消</div>
        <div class="btn" @click="addToCart()">加入购物车</div>
      </div>
    </div>
    <!-- {{$route.params.id}} -->
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
import GoodsListItem from "../components/GoodListItem";
import service from "../service/index";
export default {
  name: "goodsselect",
  created() {
    this.goods = this.$store.state.Goods.find(
      item => item.id == this.$route.params.id
    );
    if (this.$store.state.Warehouse.length <= 0) {
      service
        .loadWarehouse()
        .then(res => {
          this.$store.commit("initWarehouse", res.data);
          this.warehouseName = this.$store.state.Warehouse.find(
            item => item.id == this.goods.warehouseId
          ).reponame;
          console.log(
            "duuegwu",
            this.$store.state.Warehouse.find(
              item => item.id == this.goods.warehouseId
            ).reponame
          );
        })
        .catch(() => {});
    } else {
      this.warehouseName = this.$store.state.Warehouse.find(
        item => item.id == this.goods.warehouseId
      ).reponame;
    }
  },
  data() {
    return {
      goods: {},
      count: 0,
      warehouseName: ""
    };
  },
  methods: {
    clearCart(){
      console.log("进入执行");
      this.$store.state.Cart = [];
    },
    addCount(num) {
      let newCount = this.count + num;
      if (newCount < 0 || newCount > this.goods.number) {
        return;
      }
      this.count = newCount;
    },
    addToCart(){
      //把购物车的相关需要的数据放到vueX中区
      this.$store.commit('addToCart',{
        shopId : this.$store.state.CurOrderShop.id,
        warehouseName:this.warehouseName,
        count:this.count,
        goods:this.goods,
        warehouseId :this.goods.warehouseId
      });
      this.$router.push(`/cart/${this.$route.params.id}`);
      
    }
  },
  components: {
    TopHead,
    GoodsListItem
  }
};
</script>

<style lang="scss" scoped>
.goodsselect {
  background-color: #fff;
  height: 100%;
  display: flex;
  flex-flow: column;
  .goods-select-bottom {
    flex: 1;
    display: flex;
    flex-flow: column nowrap;
    justify-content: flex-end;
    .btn-wrap {
      display: flex;
      border-top: px2rem(1) solid #ccc;
      height: px2rem(108);
      line-height: px2rem(108);
       
      .btn {
        flex: 1;
        color: #10903d;
        font-size: px2rem(36);
        text-align: center;
      }
      .btn:last-child{
        border-right:px2rem(1) solid #ccc;
        background: #10903d;
        color: #fff;
      }
      .act {
        color: #ccc;
      }
    }
  }
  .goodsInfo {
    padding: 0 px2rem(28);
    border-bottom: px2rem(1) solid #ccc;
  }
  .des-row {
    font-size: px2rem(30);
    color: #000;
    border-bottom: px2rem(1) solid #ccc;
    height: px2rem(110);
    line-height: px2rem(110);
    padding: 0 px2rem(28);
  }
  .count-txt,
  .link-btn {
    font-size: px2rem(30);
    float: right;
    height: px2rem(44);
    line-height: px2rem(44);

    border: px2rem(1) solid #000;
    border-radius: 5%;
    // padding: px2rem(5) px2rem(10)
    margin-top: px2rem(35);
    text-align: center;
    margin-left: px2rem(14);
  }
  .count-txt {
    width: px2rem(90);
  }
  .link-btn {
    width: px2rem(40);
  }
}
</style>
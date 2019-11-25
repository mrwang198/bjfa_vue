<template>
  <div class="cart">
    <div class="cart-bd">
      <TopHead :title="shopName">
        <div slot="r" class="edit-btn">编辑</div>
      </TopHead>
      <warehouse
        :warehouse="warehouse"
        v-for="warehouse in curShopCart.warehouse"
        :key="warehouse.warehouseId"
      ></warehouse>
    </div>
    <div class="cart-bottom">
      <div class="checked-wrap fl">
        <CheckBox @change="handlerCheckedAll" v-model="checkedAll"></CheckBox>
        <span class="label">全选</span>
        <span>合计:</span>
        <span class="number">{{getTotal}}</span>
      </div>
      <div class="ok-btn-wrap fr">
        <router-link class="btn" to="/subcart">确定</router-link>
      </div>
    </div>
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
import warehouse from "../components/warehouse";
import { mapState } from "vuex";
import CheckBox from "../components/CheckBox";
export default {
  name: "cart",

  created() {
    this.shopName = this.$store.state.CurOrderShop.name;
    // console.log(this.shopName);
    // console.log(this.CurOrderShop);
    this.curShopCart = this.Cart.find(
      item => item.shopId === this.CurOrderShop.id
    );
    console.log(this.curShopCart);
  },
  computed: {
    ...mapState(["Cart", "CurOrderShop"]),
    getTotal() {
      let total = 0;

      this.curShopCart.warehouse.forEach(w => {
        if (!w.checked) {
          return;
        };
          w.goods.forEach(goods => {
            if(!goods.chcked) return;
            total += goods.count * goods.shopInfo.monery;
          });
        
      });
      return total;
    }
  },
  data() {
    return {
      shopName: "",
      curShopCart: null,
      checkedAll: true
    };
  },
  methods: {
    handlerCheckedAll(value) {
      //修改整个vuex中当前商铺里面的所有商品全部选中
      this.$store.commit("selectAllCart", value);
    }
  },
  components: {
    TopHead,
    warehouse,
    CheckBox
  }
};
</script>

<style lang="scss" scoped>
.cart {
  background: #fff;
  height: 100%;
  display: flex;
  flex-flow: column nowrap;

  .edit-btn {
    color: #fff;
    font-size: px2rem(28);
  }
  .cart-bd {
    flex: 1;
  }
  .cart-bottom {
    flex: 0 0 px2rem(112);
    background: #fafafa;
    height: px2rem(112);
    line-height: px2rem(112);
    font-size: px2rem(28);
    padding: 0 px2rem(28);
    .number {
      color: #f00;
    }
    .label {
      margin: 0 px2rem(66) 0 px2rem(16);
    }
    .ok-btn-wrap {
      .btn {
        display: block;
        text-align: center;
        margin-top: px2rem(20);
        background: #10903d;
        width: px2rem(168);
        height: px2rem(72);
        line-height: px2rem(72);
        color: #fff;
        border-radius: 5%;
      }
    }
  }
}
</style>
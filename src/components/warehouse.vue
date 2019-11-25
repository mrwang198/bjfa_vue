<template>
  <div class="warehouse">
    <div class="warehouse-hd">
      <div class="warehouse-name">
        <CheckBox @change="handlerWarehouseCheckedChange" :value="warehouse.checked"></CheckBox>
        <span class="txt-name">{{warehouse.warehouseName}}</span>
      </div>
      <div class="reamark-wrap">
        <span><router-link :to="`/cartremark/${warehouse.warehouseId}`">备注</router-link> </span>
        <i class="icon iconfont icon-bianji"></i>
      </div>
    </div>
    <div class="warehouse-bd">
      <ul>
        <li class="goods-item-wrap" v-for="goods in warehouse.goods" :key="goods.shopInfo.id">
         <CartshopInfo :goods="goods" :warehouse="warehouse"></CartshopInfo>
        </li>
      </ul>
    </div>
    <!-- {{warehouse.warehouseId}}
    {{warehouse.warehouseName}}-->
  </div>
</template>

<script>
import CheckBox from "../components/CheckBox";
import CartshopInfo from "../components/CartShopInfo";
export default {
  name: "warehouse",
  props: ["warehouse"],
  created() {
    // console.log(warehouse);
  },
  data() {
    return {
      checked: false
    };
  },
  methods:{
    handlerWarehouseCheckedChange(value){
       this.$store.commit('changeWarehouseChecked',{
         checked:value,
         warehouseId: this.warehouse.warehouseId,

       })
    }
  },
  components: {
    CheckBox,
    CartshopInfo
  }
};
</script>

<style lang="scss" scoped>
i {
  font-size: px2rem(28);
}
.warehouse {
  font-size: px2rem(28);
  .warehouse-hd {
    display: flex;
    justify-content: space-between;
    height: px2rem(64);
    line-height: px2rem(64);
    background: #fafafa;
    border-bottom: px2rem(1) solid #ccc;
    padding: 0 px2rem(28);
    .warehouse-name {
      .txt-name {
        padding-left: px2rem(28);
      }
    }
    .reamark-wrap {
      color: #10903d;
    }
    .warehouse-bd {
      background-color: #fff;
       
    }
  }
}
</style>
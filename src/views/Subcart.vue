<template>
  <div class="subcart">
    <div class="subcart-bd">
      <TopHead title="提交订单">
        <div slot="r"></div>
      </TopHead>
      <div class="shopinfo-wrap">
        <div class="receiver-wrap">
          <span class="receiver fl">收货人:{{CurOrderShop.bossName}}</span>
          <span class="phone fr">收货人:{{CurOrderShop.phone}}</span>
        </div>
        <div class="address-wrap">
          <i class="icon iconfont icon-location"></i>
          {{CurOrderShop.address}}
        </div>
      </div>
      <div v-for="warehouse in getCurCartShop.warehouse" :key="warehouse.warehouseId">
        <div class="goods-wrap" v-for="goods in warehouse.goods" :key="goods.shopInfo.id">
          <img class="goods-img" :src="goods.shopInfo.img" :alt="goods.shopInfo.title" />
          <div class="goods-desc-wrap">
            <h3>{{goods.shopInfo.title}}</h3>
            <p class="warehouse-name">{{warehouse.warehouseName}}</p>
            <div class="price-wrap">
              <div class="fl price">
                价格：
                <span class="number">{{goods.shopInfo.monery * goods.count}}</span>
              </div>
              <div class="fr count">数量： {{goods.count}}</div>
            </div>
          </div>
        </div>
        <div class="remark-wrap">备注:{{warehouse.remark}}</div>
      </div>
    </div>

    <div class="subcart-bt">
      <div class="fl">
        合计：
        <span class="number">{{getCurShopTotal}}</span>元
      </div>
      <div class="fr ok-btn" @click="subOrder()">确定</div>
    </div>
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
import { mapState, mapGetters } from "vuex";
import service from "../service/index";
import { Toast } from "mint-ui";
export default {
  name: "subcart",
  data() {
    return {};
  },
  methods: {
    subOrder() {
      service.subOrder(this.getCurCartShop).then(() => {
        Toast("提交订单成功");
        this.$store.commit("subOrderClear");
        setTimeout(() => {
           Toast("为您跳转回商铺页面");
        this.$router.push("/visitshop"); 
        }, 1000);
       
      });
    }
  },

  created() {
    console.log(this.CurOrderShop);
  },
  computed: {
    ...mapState(["CurOrderShop"]),
    ...mapGetters(["getCurCartShop"]),
    getCurShopTotal() {
      let total = 0;

      this.getCurCartShop.warehouse.forEach(w => {
        w.goods.forEach(goods => {
          total += goods.count * goods.shopInfo.monery;
        });
      });
      return total;
    }
  },
  components: {
    TopHead
  }
};
</script>

<style lang="scss" scoped>
.subcart {
  display: flex;
  flex-flow: column nowrap;
  height: 100%;
  background: #fff;
  i {
    font-size: px2rem(28);
    color: #000;
  }
  .subcart-bd {
    flex: 1;
    .shopinfo-wrap {
      height: px2rem(170);
      background: #fafafa;
      border-bottom: px2rem(1) solid #ccc;
      .receiver-wrap {
        font-size: px2rem(28);
        height: px2rem(80);
        line-height: px2rem(80);
        padding: 0 px2rem(28);
      }
      .address-wrap {
        color: #757575;
        padding: 0 px2rem(28);
        font-size: px2rem(28);
      }
    }
    .goods-wrap {
      margin-left: px2rem(28);
      border-bottom: px2rem(1) solid #ccc;
      overflow: hidden;
      padding: px2rem(28) 0;
      .goods-img {
        float: left;
        height: px2rem(124);
        width: px2rem(124);
        box-sizing: border-box;
        border: px2rem(1) solid #ccc;
      }
      .goods-desc-wrap {
        margin-left: px2rem(152);
        padding: 0 px2rem(28);
        font-size: px2rem(24);
        color: #000;
        h3 {
          height: px2rem(24);
          line-height: xp2rem(24);
        }
        .warehouse-name {
          color: #757575;
          height: px2rem(54);
          line-height: px2rem(54);
        }
        .price-wrap {
          height: px2rem(47);
          line-height: px2rem(47);
          .number {
            color: #f00;
          }
        }
      }
    }
    .remark-wrap {
      height: px2rem(80);
      line-height: px2rem(80);
      font-size: px2rem(20);
      padding: 0 px2rem(28);
      border-bottom: px2rem(1) solid #000;
    }
  }
  .subcart-bt {
    flex: 0 0 px2rem(110);
    border-top: px2rem(1) solid #ccc;
    line-height: px2rem(110);
    color: #000;
    font-size: px2rem(28);
    padding: 0 px2rem(28);
    .number {
      color: #f00;
    }
    .ok-btn {
      height: px2rem(70);
      line-height: px2rem(70);
      color: #fff;
      text-align: center;
      width: px2rem(168);
      border-radius: 5%;
      margin-top: px2rem(20);
      background: #10903d;
    }
  }
}
</style>
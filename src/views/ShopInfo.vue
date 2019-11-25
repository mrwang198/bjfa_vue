<template>
  <div class="shopInfo">
    <TopHead title="店面活动">
      <div slot="r">
        <span @click="stopVisit">结束拜访</span>
      </div>
    </TopHead>
    <div class="shopInfo-bd">
      <h3 class="shop-name">{{shopInfo.name}}</h3>
      <div class="shop-progress-wrap pdr28">
        <div class="shop-sales">
          <div class="fl">
            <i class="icon iconfont icon-xiaoliangzuigao"></i> 本月至今的销售量
          </div>
          <div class="fr">{{sailes.MonthSales.toFixed(0)}}</div>
        </div>
        <div class="shop-sales">
          <div class="fl">
            <i class="icon iconfont icon-xiaoliangpaixu"></i> 过往半年的平均销售量
          </div>
          <div class="fr">{{sailes.MonthAvgSales.toFixed(0)}}</div>
        </div>
        <div class="progress-wrap">
          <div class="progress-hd">
            <div class="fl">
              <i class="icon iconfont icon-80"></i>
              核心分销完成率
            </div>
            <div class="fr">{{sailes.DivSalesPercent.toFixed(0)}}&nbsp;{{'%'}}</div>
          </div>
          <div class="progress-bar">
            <div class="progress-bar-val" :style="{width:`${sailes.DivSalesPercent}%`}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="history-remarke-wrap">
      <div class="history-remarke-hd pdrl28">历史拜访备注:</div>
      <textarea placeholder="点击添加历史备注..." class="history-remarke-text pdrl28"></textarea>
    </div>
    <div class="btn-wrap">
      <div class="btn" @click="$router.push('/order/' + $route.params.id)">下单</div>
      <router-link :to="`/Signin/${shopInfo.id}`">
        <div class="btn act">商铺签到</div>
      </router-link>
    </div>
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
import service from "../service/index";
import { mapMutations, mapState } from "vuex";
export default {
  name: "shopInfo",
  data() {
    return {
      shopInfo: null,
      sailes: {
        id: 30066,
        MonthSales: 0,
        MonthAvgSales: 0,
        DivSalesPercent: 0
      }
    };
  },
  components: {
    TopHead
  },
  created() {
    service.getShopInfo(this.$route.params.id).then(res => {
      console.log(res.data);
      //   this.sailes = res.data;
      //展示销售进度，就是那个vue的过渡动画
      //eslint-disable-next-line
      TweenLite.to(this.sailes, 1, res.data);
    });
    this.shopInfo = this.Shops.find(item => item.id == this.$route.params.id);
    //把当前的店铺信息放到vuex中区
    this.$store.commit("initCurOrderShop", { ...this.shopInfo });
  },
  computed: {
    ...mapState(["Shops"])
  },
  methods: {
    ...mapMutations(["initShops", "appendShops"]),
    stopVisit() {
      this.$router.go(-1);
    }
  }
};
</script>

<style lang="scss" scoped>
.pdr28 {
  padding-right: px2rem(28);
}
.pdrl28 {
  padding-left: px2rem(28);
}
.shopInfo {
  background-color: #fff;
  height: 100%;
}

.shopInfo-bd {
  font-size: px2rem(28);
  color: #000;

  .shop-name {
    height: px2rem(84);
    line-height: px2rem(84);
    background-color: #fafafa;
    border-bottom: px2rem(1) solid #ccc;
    padding-left: px2rem(28);
  }
  .shop-progress-wrap {
    background-color: #fff;
    padding-left: px2rem(28);
    i {
      font-size: px2rem(28);
      padding-right: px2rem(20);
    }
    .shop-sales {
      line-height: px2rem(110);
      height: px2rem(110);
      padding: 0 px2rem(28) 0 0;
      border-bottom: px2rem(1) solid #ccc;
    }
    .progress-wrap {
      padding-bottom: px2rem(32);
      .progress-hd {
        font-size: px2rem(28);

        height: px2rem(96);
        line-height: px2rem(96);
      }
      .progress-bar {
        height: px2rem(12);
        border-radius: px2rem(6);
        background-color: #e4e4e4;
        // z-index: 1;
      }
      .progress-bar-val {
        height: px2rem(12);
        border-radius: px2rem(6);
        background: linear-gradient(to right, #808ce4, #57c988, #f60);
        // width: 300px;
        // z-index: 2;
      }
    }
  }
}
.history-remarke-wrap {
  font-size: px2rem(28);
  border-bottom: px2rem(0.5) solid #000;
  .history-remarke-hd {
    height: px2rem(66);
    background-color: #fafafa;
    border: px2rem(1) solid #ccc;
    line-height: px2rem(66);
    font-size: px2rem(28);
  }
  .history-remarke-text {
    height: px2rem(200);
    background-color: #fff;
    width: px2rem(747);
    border: none;

    font-size: px2rem(28);
    color: #ccc;
    padding-top: px2rem(20);
  }
}
.btn-wrap {
  margin: px2rem(168) auto;
  .btn {
    width: px2rem(480);
    font-size: px2rem(36);
    color: #10903d;
    border: px2rem(2) solid #10903d;
    text-align: center;
    height: px2rem(84);
    margin: auto;
    margin-bottom: px2rem(54);
    line-height: px2rem(84);
  }
  .btn.act {
    background-color: #10903d;
    color: #fff;
  }
}
</style>
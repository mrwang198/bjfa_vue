<template>
  <div class="order">
    <TopHead title="下单">
      <div slot="r">
        <i class="icon iconfont icon-cart"></i>
      </div>
    </TopHead>
    <SearchBtn @search="searchGoods" class="search-wrap" v-model="q"></SearchBtn>
    <div class="hot-wrap">
      <ul class="classify-list">
        <li :class="{act: isOnSales}" @click="isOnSalesClick">促销</li>
        <li :class="{act: isAll}" @click="isAllClick">全部</li>
        <li>英雄级</li>
        <li>英雄级</li>
        <li>英雄级</li>
      </ul>
    </div>
    <!-- 商品连表区 -->
    <div class="goods-list-wrap">
      <div class="goods-hd">
        <div class="fl count-wrap">{{cur}}/{{total}}</div>
        <div class="fr">
          <ul class="type-list-wrap">
            <li>{{ getFilterGoodsType }}</li>

            <li>
              <i class="icon iconfont icon-filter" @click="showSelectGoodsType =true"></i>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="goods-bd"
        v-infinite-scroll="loadMore"
        infinite-scroll-disabled="loading"
        infinite-scroll-distance="10"
      >
        <router-link
          class="goods-item-link"
          :to="`/goodsselected/${item.id}`"
          v-for="item in Goods"
          :key="item.id"
        >
          <GoodsListitem  :show-number="true" :goods="item"></GoodsListitem>
        </router-link>
      </div>
    </div>
    <Popup class="popup-select" v-model="showSelectGoodsType" pop-transition="popup-fade">
      <Checklist v-model="filterGoodsType" :options="['食品','日化','保洁']" title="请选择商品类型"></Checklist>
      <Button type="primary" class="btn-select-type" @click="showSelectGoodsType = false">确定</Button>
    </Popup>
  </div>
</template>

<script>
import Vue from "vue";

import TopHead from "../components/TopHead";
import SearchBtn from "../components/SearchBtn";
import GoodsListitem from "../components/GoodListItem";
import service from "../service/index";
import { Popup, Checklist, Button, Toast, InfiniteScroll } from "mint-ui";
import { mapMutations, mapState } from "vuex";
Vue.use(InfiniteScroll);
export default {
  name: "order",
  data() {
    return {
      showSelectGoodsType: false,
      q: "",
      isOnSales: false,
      isAll: true,
      total: 0,
      cur: 0,
      goods: [],
      filterGoodsType: ["食品", "日化", "保洁"],
      curPage: 1,
      loading: false
    };
  },
  created() {
    this.loadGoodsData();
  },
  computed: {
    ...mapState(["Goods"]),
    getFilterGoodsType() {
      return this.filterGoodsType.join("/");
    }
  },
  methods: {
    ...mapMutations(["initGoods", "appendGoods"]),
    loadMore() {
      this.loading = true;
      this.curPage++;
      this.loadGoodsData().finally(() => {
        this.loading = false;
      });
    },
    loadGoodsData() {
      let params = {
        _limit: 20,
        _page: this.curPage,
        q: this.q
      };
      if (!this.isAll) {
        params.isOnSales = this.isOnSales;
      }
      return service
        .loadGoods(params)
        .then(res => {
          console.log(res.data);
          if (!res.data) {
            Toast({
              message: " 我是有底线的。。",
              position: "bottom",
              duration: 5000
            });
          } else {
            // this.goods = [...this.goods, ...res.data];
            this.appendGoods(res.data);
            this.total = res.headers["x-total-count"];
            // // console.log(this.total);
            this.cur = this.Goods.length;
          }

          // console.log(res.headers["x-total-count"]);
        })
        .catch(() => {
          Toast({
            message: "嘤嘤嘤~~失败了。。",
            position: "middle",
            duration: 5000
          });
        });
    },
    isOnSalesClick() {
      this.isOnSales = !this.isOnSales;
      this.isAll = false;
      this.initGoods([]);
      this.curPage = 1;
      this.loadGoodsData();
    },
    isAllClick() {
      this.isOnSales = false;
      this.isAll = !this.isAl;
      this.initGoods([]);
      this.curPage = 1;
      this.loadGoodsData();
    },
    searchGoods() {
      this.curPage = 1;
      this.initGoods([]);
      this.loadGoodsData();
    }
  },
  components: {
    TopHead,
    SearchBtn,
    GoodsListitem,
    Popup,
    Checklist,
    Button
  }
};
</script>

<style lang="scss" scoped>
.order {
  background-color: #fff;
  .hot-wrap {
    background-color: #fafafa;

    padding: px2rem(14) px2rem(28);
    // padding-left: px2rem(28);
    // padding-right: px2rem(28);
    // padding-top:px2rem(14);
    font-size: px2rem(28);

    border: px2rem(1) solid #ccc;
    border-left: none;
    border-right: none;
    .classify-list {
      // border: px2rem(1) solid black;
      display: flex;
      align-items: center;
      height: px2rem(58);
      line-height: px2rem(58);
      text-align: center;
      li {
        flex: 0 0 px2rem(132);
        border-right: px2rem(1) solid #ccc;
        height: px2rem(58);
        line-height: px2rem(58);
      }
      li:last-child {
        border-right: none;
      }
      .act {
        color: #04afeb;
      }
    }
  }
  .goods-list-wrap {
    padding: 0 px2rem(28);
    .goods-item-link {
      display: block;
    }
    .goods-hd {
      overflow: hidden;
      .count-wrap,
      .type-list-wrap {
        height: px2rem(84);
        font-size: px2rem(28);
        line-height: px2rem(84);
      }
      .type-list-wrap {
        display: flex;
        flex: 0 0 px2rem(58);
        li {
          i {
            font-size: px2rem(28);
            color: #000;
          }
        }
      }
    }
  }
  .popup-select {
    width: 80%;
    height: px2rem(300);
    padding: px2rem(50);
    // position: relative;
    .btn-select-type {
      margin: auto;
    }
  }
}
.search-wrap {
  padding: px2rem(20) px2rem(28);
}
</style>
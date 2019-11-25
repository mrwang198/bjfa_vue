 <template>
  <div class="visitshop">
    <TopHead title="店铺拜访">
      <div slot="r"></div>
    </TopHead>
    <MTab :hd-titles="['计划内', '计划外']">
      <div slot="s1" class="tab-bd">
        <div class="search-box">
          <i class="icon iconfont icon-sousuo" @click="searchshop(false)"></i>
          <input
            placeholder="请点击进行搜索哦~~"
            type="text"
            v-model="q"
            class="search"
            @keydown.enter="searchshop(false)"
          />
        </div>
        <loadmore
          :top-method="loadTop"
          :bottom-method="loadBottom"
          :bottom-all-loaded="allLoaded"
          ref="loadmore"
        >
          <ul class="shop-list">
            <li class="shop-item" v-for="item in Shops" :key="item.id">
              <div class="left-desc">
                <router-link :to="`/visitshop/${item.id}`" class="shop-item-link">
                  <div class="desc-hd">
                    <h3 class="shop-name">{{item.name}}</h3>
                    <div class="shop-location">
                      <i class="icon iconfont icon-location"></i>
                      <span>&lt;&nbsp;{{ item.distance+'m'}}</span>
                    </div>
                  </div>
                  <div class="shop-id-wrap">
                    <span class="shop-id">ID:{{item.id}}</span>
                    <span>创建时间:{{item.subon | formatDate }}</span>
                  </div>
                  <div class="boss-wrap">
                    <span class="boss">{{item.bossName}}</span>
                    <span class="phone">
                      <i class="icon iconfont icon-shouji1"></i>
                      {{item.phone}}
                    </span>
                  </div>
                </router-link>
              </div>
              <div class="go-dt-btn">
                <i class="icon iconfont icon-angle-right"></i>
              </div>
            </li>
          </ul>
        </loadmore>
        <!-- <ul class="shop-list">
          <li class="shop-item" v-for="item in shops" :key="item.id">
            <div class="left-desc">
              <router-link :to="`/visitshop/${item.id}`" class="shop-item-link">
                <div class="desc-hd">
                  <h3 class="shop-name">{{item.name}}</h3>
                  <div class="shop-location">
                    <i class="icon iconfont icon-location"></i>
                    <span>&lt;&nbsp;{{ item.distance+'m'}}</span>
                  </div>
                </div>
                <div class="shop-id-wrap">
                  <span class="shop-id">ID:{{item.id}}</span>
                  <span>创建时间:{{item.subon | formatDate }}</span>
                </div>
                <div class="boss-wrap">
                  <span class="boss">{{item.bossName}}</span>
                  <span class="phone">
                    <i class="icon iconfont icon-shouji1"></i>
                    {{item.phone}}
                  </span>
                </div>
              </router-link>
            </div>
            <div class="go-dt-btn">
              <i class="icon iconfont icon-angle-right"></i>
            </div>
          </li>
        </ul>-->
      </div>

      <div slot="s2" class="tab-bd">
        <h3>没有数据</h3>
      </div>
    </MTab>
  </div>
</template>

<script>
import MTab from "../components/MTab";
import service from "../service/index";
import TopHead from "../components/TopHead";
import { Indicator, loadmore } from "mint-ui";
import { mapMutations, mapState } from "vuex";
// import _ from "lodash";
export default {
  name: "visitshop",

  data() {
    return {
      q: "",
      lat: "132.678",
      lng: "66.781",
      // shops: [],
      page: 1,
      allLoaded: false
    };
  },
  created() {
    this.getLocation()
      .then(() => {
        this.searchshop();
      })
      .catch(() => {
        this.searchshop();
      });
  },
  computed: {
    ...mapState(["Shops"])
  },
  filters: {
    formatDate(val) {
      let date = new Date(val);
      return `${date.getFullYear()}年${date.getMonth() +
        1}月${date.getDate()}日`;
    }
  },
  methods: {
    ...mapMutations(["initShops", "appendShops"]),

    loadTop() {},
    loadBottom() {
      this.page += 1;
      this.searchshop(true).then(() => {
        this.$refs.loadmore.onBottomLoaded();
      });
    },
    getLocation() {
      Indicator.open({
        text: "定位中。。。",
        spinnerType: "fading-circle"
      });
      return new Promise((resolve, reject) => {
        //eslint-disable-next-line
        var geolocation = new qq.maps.Geolocation(
          "OB4BZ-D4W3U-B7VVO-4PJWW-6TKDJ-WPB77",
          "myapp"
        );
        geolocation.getLocation(
          position => {
            console.log("position :", position);
            this.lat = position.lat;
            this.lng = position.lng;
            Indicator.close();
            resolve(position);
          },
          err => {
            Indicator.close();
            console.log("定位失败！！！", err);
            reject("定位失败！！！");
          },
          {}
        );
      });
    },
    searchshop(isAppend) {
      Indicator.open({
        text: "数据正海量加载。。。",
        spinnerType: "fading-circle"
      });
      if (!isAppend) {
        this.page = 1;
      }
      return service
        .getShop({
          lat: this.lat,
          lng: this.lng,
          name_like: this.q,
          //eslint-disable-next-line
          _page: this.page
        })
        .then(res => {
          //如果是搜索查询的话，就可以替换整个数组，
          if (isAppend) {
            // let arr = [...this.shops, ...res.data];
            // this.shops = _.uniqBy(arr, "id");
            this.appendShops(res.data);
          }
          // this.shops = res.data;
          this.initShops(res.data);
          //加载更多的话就是在shops里面添加数据
          Indicator.close();
        });
    }
  },
  components: {
    TopHead,
    MTab,
    loadmore
  }
};
</script>

<style lang="scss" scoped>
.tab-bd {
  .search-box {
    overflow: hidden;
    border-bottom: px2rem(2) solid #cbcbcb;
    padding: 0 px2rem(28);
    font-size: px2rem(35);
    background: #fafafa;
    line-height: px2rem(106);
    position: relative;
    i {
      font-size: px2rem(35);

      height: px2rem(106);
      position: absolute;
      left: 0;

      cursor: pointer;
    }
    .search {
      line-height: px2rem(106);
      height: px2rem(106);
      width: px2rem(680);
      padding-left: px2rem(50);
      border: none;
      font-size: px2rem(35);
    }
  }
  .shop-list {
    background-color: #fff;
    padding: 0 px2rem(28);
    .shop-item {
      display: flex;
      justify-content: space-between;
      border-bottom: px2rem(1) solid #ccc;

      .left-desc {
        flex: 1;
        padding-right: px2rem(28);
        .desc-hd {
          display: flex;
          justify-content: space-between;
          line-height: px2rem(80);
          font-size: px2rem(25);
          color: #000;

          .shop-location {
            i {
              font-size: px2rem(25);
            }
          }
        }
        .shop-id-wrap {
          height: px2rem(24);
          .shop-id {
            padding-right: px2rem(47);
            font-size: px2rem(24);
            line-height: px2rem(24);
          }
          span {
            font-size: px2rem(24);
            line-height: px2rem(24);
          }
        }
        .boss-wrap {
          overflow: hidden;
          line-height: px2rem(72);
          font-size: px2rem(24);
          height: px2rem(72);
          .boss {
            float: left;
          }
          .phone {
            float: right;

            color: #10903d;
            i {
              font-size: px2rem(40);
              color: #000;
            }
          }
        }
      }
      .go-dt-btn {
        flex: 0 0 px2rem(34);
        line-height: px2rem(174);

        height: px2rem(174);
        // border-bottom: px2rem(1) solid #ccc;
        i {
          font-size: px2rem(28);
        }
      }
    }
  }
}
</style>
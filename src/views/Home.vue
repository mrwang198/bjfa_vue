<template>
  <div class="home">
    <tophead title="SFA">
      <router-link to="/user" slot="r" class="icon iconfont icon-user"></router-link>
    </tophead>
    <div class="main-bd">
      <div class="date-wrap">{{this.getYearMonth}}</div>
      <div class="mp-wrap">
        <mp title="当前月进度" :val="getDayOfMonth  " :precent="true"></mp>
        <mp title="当前月销售完成度" :val="monthSealsPrecent" :precent="true"></mp>
        <mp title="有效店铺数" :val="shops" :precent="false"></mp>
      </div>
    </div>
    <div class="main-nav">
      <div class="nav-cell" v-for="i in 9" :key="i">
        <template v-if="i <= menuList.length">
          <menucell
            :url="menuList[i-1].url"
            :imgUrl="menuList[i-1].imgUrl"
            :menuName="menuList[i-1].menuName"
          ></menucell>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
// import HelloWorld from "@/components/HelloWorld.vue";
import TopHead from "../components/TopHead";
import mp from "../components/Mp";
import service from "../service/index";
import menucell from "../components/MenuCell";
const menuList = [
  {
    menuName: "公司通告",
    imgUrl: require("@/assets/shouyeicons/gstg.png"),
    url: "/notice"
  },
  {
    menuName: "进店拜访",
    imgUrl: require("@/assets/shouyeicons/jdbf.png"),
    url: "/visitshop"
  },
  {
    menuName: "电话订单",
    imgUrl: require("@/assets/shouyeicons/dhdd.png"),
    url: "/phoneorder"
  },
  {
    menuName: "订单状态",
    imgUrl: require("@/assets/shouyeicons/ddzt.png"),
    url: "/orders"
  },
  {
    menuName: "培训资料",
    imgUrl: require("@/assets/shouyeicons/pxzl.png"),
    url: "/training"
  },
  {
    menuName: "消息中心",
    imgUrl: require("@/assets/shouyeicons/xxzx.png"),
    url: "/message"
  },
  {
    menuName: "新增门店",
    imgUrl: require("@/assets/shouyeicons/xzmd.png"),
    url: "/addedshop"
  },
  {
    menuName: "同步数据",
    imgUrl: require("@/assets/shouyeicons/sjtb.png"),
    url: "/asyncdata"
  }
];
export default {
  name: "home",
  components: {
    tophead: TopHead,
    mp,
    menucell
  },
  computed: {
    getYearMonth() {
      let t = new Date();
      return `${t.getFullYear()}年${t.getMonth() + 1}月`;
    },
    getDayOfMonth() {
      let t = new Date();
      // let m = 0;
      // let x =t.getMonth() + 1;
      // switch (x) {
      //   case (1, 3, 5, 7, 8, 10, 12):
      //     m = 31;
      //     break;
      //   case (4, 6, 9, 11):
      //     m = 30;
      //     break;
      //   case 2:
      //     m = 28;
      //     break;
      //   default:
      //     break;
      // }
      // console.log(t.getMonth + 1);
      // console.log(m);
      // console.log( parseInt((t.getDate() / m) * 100));
      return parseInt((t.getDate() / 30) * 100);
    }
  },
  mounted() {},
  data() {
    return {
      monthSealsPrecent: 0,
      shops: 0,
      menuList
    };
  },
  created() {
    // axios.get('/api/getUserProgress')
    service.getUserProgress().then(res => {
      console.log(res.data);
      this.monthSealsPrecent = parseInt(res.data.monthPercent * 100);
      this.shops = res.data.totalShops;
    });
  }
};
</script>
<style lang="scss" scoped>
.home {
  display: flex;
  height: 100%;
  flex-direction: column;
  .main-nav {
    background: #fff;

    border-top: 1px solid #000;
    flex: 1;
    padding: 0 px2rem(30);
    display: flex;
    flex-flow: row wrap;
    align-content: stretch;
    align-items: stretch;
    .nav-cell {
      border-bottom: 1px solid #000;
      border-right: 1px solid #000;
      flex: 1 1 30%;
    }
    .nav-cell:nth-child(3n) {
      border-right: none;
    }
  }
}
#pie {
  width: px2rem(500);
  height: px2rem(400);
}
.main-bd {
  .date-wrap {
    padding: px2rem(40) 0 px2rem(22);
    color: #000;
    font-size: $text-mid;
    text-align: center;
  }
  .mp-wrap {
    background: #fff;

    display: flex;
    justify-content: space-around;
  }
}
</style>

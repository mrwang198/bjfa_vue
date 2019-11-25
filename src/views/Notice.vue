<template>
  <div class="notice">
    <TopHead title="公司公告">
      <div slot="r"></div>
    </TopHead>
    <div class="notice-wrap">
      <loadmore
        :top-method="loadTop"
        :bottom-method="loadBottom"
        :bottom-all-loaded="allLoaded"
        ref="loadmore"
      >
        <ul class="notice-list">
          <li v-for="(item,index) in noticeList" :key="index" class="notice-item">
            <router-link :to="`/notice/${item.id}`">
              <div class="notice-wrap">
                <i class="icon iconfont icon-dian" :class="{readed:item.isRead}"></i>
                <div class="notice-bd">
                  <h3 class="notice-title">{{item.title}}</h3>
                  <p class="notice-date">{{item.SubDate | dateFormat}}</p>
                </div>
              </div>
            </router-link>
          </li>
        </ul>
      </loadmore>
    </div>
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
import service from "../service/index";
import { Loadmore } from "mint-ui";
import { mapState, mapMutations } from "vuex";
export default {
  name: "notice",
  data() {
    return {
      // noticeList: [],
      //是否全部加载完成了数据
      allLoaded: false,
      //加载数据的开始日期和技术日期
      startDate: null,
      endDate: null
    };
  },
  computed: {
    ...mapState(["noticeList"])
  },
  filters: {
    dateFormat(val) {
      let d = new Date(val);
      return `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
    }
  },
  methods: {
    ...mapMutations([
      "initNoticeList",
      "loadMoreNoticeUnshift",
      "loadMoreNoticePush"
    ]),
    loadTop() {
      service.getNotice(this.startDate, 10, false).then(res => {
        console.log(res.data.data.messages);
        console.log(this.startDate);
        // this.noticeList.unshift(...res.data.data.message);
        this.loadMoreNoticeUnshift(res.data.data.messages);
        this.startDate = this.noticeList[0].SubDate;
        this.$refs.loadmore.onTopLoaded();
      });
      //   this.endDate = this.noticeList[this.noticeList.length - 1].SubDate;

      //加载完数据后必须重新计算列表的高度
    },
    loadBottom() {
      service.getNotice(this.endDate, 10, true).then(res => {
        if (res.data.data.message <= 0) {
          this.allloaded = true;
          return;
        }
        // this.noticeList.push(...res.data.data.message);
        this.loadMoreNoticePush(res.data.data.messages);
        this.endDate = this.noticeList[this.noticeList.length - 1].SubDate;
        //加载完数据后必须重新计算列表的高度
        this.$refs.loadmore.onBottomLoaded();
      });
      //   //加载完数据后必须重新计算列表的高度
      //   this.$refs.loadmore.onBottomLoaded();
    }
  },
  created() {
    let now = Date.now();
    this.startDate = now;
    //console.log(now);
    service.getNotice(Date.now(), 10, true).then(res => {
      console.log(res.data);
      // this.noticeList.push(...res.data.data.message);
      this.initNoticeList(res.data.data.messages);
      console.log(this.noticeList);
      // //console.log(this.noticeList.length + "哈哈哈哈哈哈");
      this.endDate = this.noticeList[this.noticeList.length - 1].SubDate;
      //console.log(this.endDate + "哈哈哈哈");
    });

    // //console.log(this.endDate);
  },
  components: {
    TopHead,
    loadmore: Loadmore
  }
};
</script>

<style lang="scss" scoped>
.notice-list {
  .notice-item {
    //   line-height: px2rem(125);
    border-bottom: px2rem(1) solid #ccc;
    height: px2rem(125-32);
    padding: px2rem(32) 0 0 px2rem(40);
    .notice-title {
      font-size: px2rem(28);
      color: #000;
      line-height: px2rem(28);
    }
    .notice-date {
      font-size: px2rem(16);
      color: #666;
      line-height: px2rem(50);
    }
    .notice-wrap {
      display: flex;
      i {
        flex: 0 0 px2rem(43);
        color: red;
        line-height: px2rem(20);
        font-size: px2rem(50);
      }
      i.readed {
        color: #ccc;
      }
    }
  }
}
</style>
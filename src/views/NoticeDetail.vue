<template>
  <div class="noticedetail">
    <TopHead title="公告详情">
      <div slot="r"></div>
    </TopHead>
    <h3>{{notice.title}}</h3>
    <p>{{notice.to}}</p>
    <div>{{notice.text}}</div>
    <p>{{notice.date}}</p>
    <p>{{notice.address}}</p>
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
import { mapState, mapMutations } from "vuex";
import service from "../service/index";
export default {
  name: "noticedetail",
  data() {
    return {
      notice: null
    };
  },
  computed: {
    ...mapState(["noticeList"])
  },
  methods: {
    ...mapMutations(["setNoticeReaded"])
  },
  created() {
    const noticeId = this.$route.params.id;
    this.notice = this.noticeList.find(item => item.id == noticeId);

    service.setNoticeReaded(noticeId);
    this.setNoticeReaded(noticeId);
  },
  components: {
    TopHead
  }
};
</script>

<style lang="scss" scoped>
.noticedetail {
  color: #000;
  font-size: px2rem(28);
  line-height: 1.5;
  h3 {
    font-size: px2rem(30);
    line-height: 1.5;
    margin-bottom: px2rem(30);
  }
  p {
    margin-bottom: px2rem(20);
  }
}
</style>
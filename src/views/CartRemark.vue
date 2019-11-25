<template>
  <div class="cartremark">
    <div class="remark-hd">
      <TopHead :title="$store.state.CurOrderShop.name">
        <div slot="r"></div>
      </TopHead>
      <textarea @input="changeRemark" v-model="remark" placeholder="备注信息填这里呦~~!" class="txt-remark"></textarea>
      <span class="txt-len">字数{{getLen}}/20</span>
    </div>
    <div @click="submitRemark" class="remark-bottom">确定</div>
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
export default {
  data() {
    return {
      remark: ""
    };
  },
  computed: {
    getLen() {
      return this.remark.length;
    }
  },
  components: {
    TopHead
  },
  methods: {
    changeRemark(e) {
      let txt = e.target.value;
      if (txt.length > 20) {
        this.remark = txt.slice(0, 20);
      }
    },
    submitRemark() {
        console.log(this.remark);
      this.$store.commit('addRemarkToWarehouse', {
        remark: this.remark,
        warehouseId: this.$route.params.id
      });
      this.$router.go(-1);
    },
  },
  created() {
    //eslint-disable-next-line
    // console.log(this.$store.state.Cart);
   this.remark =  this.$store.getters.getRemarkByWarehouseId(this.$route.params.id);
  }
};
</script>

<style lang="scss" scoped>
.cartremark {
  height: 100%;
  display: flex;
  flex-flow: column nowrap;
  font-size: px2rem(28);
  line-height: 1.5;
  background: #fff;
  .remark-hd {
    flex: 1;
    .txt-remark {
      width: 100%;
      box-sizing: border-box;
      border-bottom: px2rem(1) solid #000;
      background: #fafafa;
      font-size: px2rem(36);
      line-height: 1.5;
      border: none;
      height: px2rem(380);
      padding-left: px2rem(28);
    }
    .txt-len {
      float: right;
      margin-right: px2rem(12);
    }
  }
  .remark-bottom {
    flex: 0 0 px2rem(110);
    border-top: px2rem(1) solid #ccc;
    font-size: px2rem(36);
    color: #10903d;
    text-align: center;
    line-height: px2rem(110);
  }
}
</style>
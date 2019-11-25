<template>
  <div class="mp">
    <!-- 饼状组件 -->
    <div class="label">
      {{ val }}
      <span v-if="precent">%</span>
    </div>
    <div class="pie-wrap" ref="pie"></div>
    <h3>{{title}}</h3>
  </div>
</template>

<script>
import echarts from "echarts/lib/echarts";
// 引入柱状图
import "echarts/lib/chart/pie";
// 引入提示框和标题组件
import "echarts/lib/component/tooltip";
import "echarts/lib/component/title";
export default {
  name: "mp",
  props: {
    title: {
      type: String,
      required: true 
    },
    val: {
      type: Number,
      required: true
    },
    precent: {
      type: Boolean,
      required: true,
      default: false
    }
  },
  data() {
    return {};
  },
  mounted() {
    this.initCircle();
  },
  watch: {
    val: function() {
      this.initCircle();
    }
  },
  methods: {
    initCircle() {
      let data1 = [];
      if (this.precent) {
        data1.push({ value: this.val, name: "" });
        data1.push({ value: 100 - this.val, name: "" });
      } else {
        data1.push({ value: 0, name: "" });
        data1.push({ value: 100, name: "" });
      }
      console.log(data1);
      let myChart = echarts.init(this.$refs.pie);
      // 绘制图表
      myChart.setOption({
        color: ["rgb(102,208,113)", "rgb(223,223,223)"],
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["90%", "100%"],
            avoidLabelOverlap: false,
            label: {
              normal: {
                show: false,
                position: "center"
              },
              emphasis: {
                show: true,
                textStyle: {
                  fontSize: "30",
                  fontWeight: "bold"
                }
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: data1
          }
        ]
      });
    }
  }
};
</script>

<style lang='scss' scoped>
@mixin hwwrap {
  width: px2rem(175);
  height: px2rem(175);
}
.mp {
  position: relative;
  text-align: center;
  color: #000;
  .label {
    line-height: px2rem(175);

    position: absolute;
    @include hwwrap();
    left: 0;
    top: 0;
    font-size: px2rem(48);
    span {
      vertical-align: super;
      font-size: $text-szie-small;
    }
  }
  h3 {
    font-size: $text-size;
    padding: px2rem(22) 0 px2rem(44);
  }
  .pie-wrap {
    @include hwwrap();
  }
}
</style>
<template>
  <div class="add-shop">
    <TopHead title="新增门店">
      <div slot="r" class="ok-btn">确定</div>
    </TopHead>
    <div ref="map" class="map-container"></div>
    <div class="address">
        地址：{{address}}
    </div>
    <div class="row">
        <Field label="商店名称" placeholder="请输入商店名称"></Field>
    </div>
  </div>
</template>

<script>
import {Field} from "mint-ui"; 
import TopHead from "../components/TopHead";
export default {
  name: "addshop",
  data() {
    return {
        address:''
    };
  },
  components: {
    TopHead,
    Field
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap() {
      // 地图的中心地理坐标
      //eslint-disable-next-line
      let center = new qq.maps.LatLng(39.916527, 116.397128);
      // 创建地图
      //eslint-disable-next-line
      var map = new qq.maps.Map(this.$refs.map, {
        center,
        zoom: 13, // 地图缩放级别
        mapStyleId: "style1" // 该key绑定的style1对应于经典地图样式，若未绑定将弹出无权限提示窗
      });
      // 创建标注
      //eslint-disable-next-line
      var marker = new qq.maps.Label({
        //设置Marker的位置坐标
        position: center,
        //设置显示Marker的地图
        map: map,
        content: '<p class="marker">商铺位置</p>',
        //设置Marker被添加到Map上时的动画效果为从天而降
        //eslint-disable-next-line
        animation: qq.maps.MarkerAnimation.DROP,
        visible: true
      });
      // 获取坐标位置的辅助api
      //eslint-disable-next-line
      let geocoder = new qq.maps.Geocoder();
      geocoder.setComplete(result => {
        // map.setCenter(result.detail.location);
        marker.setPosition(result.detail.location);
        this.address = result.detail.address;
      });

      // 获取地图坐标的 地址位置。
      geocoder.getAddress(center);
//eslint-disable-next-line
      qq.maps.event.addListener(map, "click", event => {
          //eslint-disable-next-line
        center = new qq.maps.LatLng(
          event.latLng.getLat(),
          event.latLng.getLng()
        );
        // map.setCenter(center);
        marker.setPosition(center);
        geocoder.getAddress(center);
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.add-shop {
  height: 100%;
  background: #fff;

  .ok-btn {
    font-size: $text-mid;
  }
  .map-container {
    height: px2rem(360);
    border-bottom: px2rem(1) solid #ccc;
  }
  .address{
      font-size: $text-size;
      color: #000;
      line-height: px2rem(40);
      height: px2rem(120);
      background: $serch-bg;
  }
  .row{
      padding-left: px2rem(28);
      border-top: px2rem(1) solid #ccc;
      /deep/ .mint-cell-wrapper{
          font-size: px2rem(28);
           height: px2rem(100);
      line-height: px2rem(100);
      }
  }
}
 
</style>
<style lang="scss">
.marker{
   font-size: px2rem(28);   
}
</style>
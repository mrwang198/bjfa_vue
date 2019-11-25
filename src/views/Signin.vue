<template>
  <div class="signin">
    <TopHead title="签到">
      <div slot="r" @click="submitSigin">
        <span  class="icon iconfont icon-duihao"></span>
      </div>
    </TopHead>
    <input accept="image/*" type="file" class="input-file" ref="file" @change="uploadImg" />
    <div class="img-box-wrap">
      <ImgBtn
        @click="$refs.file.click()"
        class="img-box"
        :isred="false"
        iconclass="icon-xiangji"
        val="上传照片"
      ></ImgBtn>
      <div @click="img.checked = !img.checked" class="img-box" v-for="img in imgs" :key="img.url">
        <div v-if="img.checked" class="check-hover">
          <i class="icon iconfont icon-danxuan1"></i>
        </div>
        <img :src="img.url" width="100%" height="100%" />
      </div>

      <ImgBtn
        @click="removeImg()"
        class="img-box"
        :isred="true"
        iconclass="icon-shanchudange"
        val="删除照片"
      ></ImgBtn>
    </div>
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
import ImgBtn from "../components/ImgBtn";
import service from "../service/index";
import canvasResize from "canvas-resize";
import Utility from "../common/Utility";
import { Toast } from "mint-ui";
export default {
  name: "signin",
  created() {
    //  console.log(process.env.VUE_APP_BASEURL);
  },
  data() {
    return {
      imgs: []
    };
  },
  methods: {
    submitSigin() {
      service
        .submitSigin({
          id: Date.now(),
          shopId: this.$route.params.id,
          SubOn: new Date().toLocaleDateString(),
          imgs: this.imgs.map(item => item.url)
        })
        .then(() => {
          Toast({
            position: "center",
            duration: 2000,
            message: "牛逼",
            iconClass: "icon iconfont icon-duihao",
            className: "icon"
          });
        })
        .catch(() => {
          Toast({
            position: "center",
            duration: 2000,
            iconClass: 'icon iconfont icon-shanchuyitiao',
            message: "滚你妈的，有错",
             className: "icon"
          });
        });
    },
    removeImg() {
      this.imgs = this.imgs.filter(item => item.checked === false);
    },
    uploadImg() {
      //   console.log(e.target);
      console.log(this.$refs.file.files[0]);
      let formData = new FormData();
      //拿到当前需要上传的图片
      let file = this.$refs.file.files[0];
      //对上传的图片进行压缩后，callback返回一个base64字符串，
      canvasResize(file, {
        crop: false, //裁剪参数
        quality: 0.9, //压缩率 0-1
        rotate: 0, //是否旋转
        callback: baseStr => {
          //   console.log(baseStr);
          let fileBlob = Utility.convertBase64UrlToBlob(baseStr, {
            type: file.type
          });
          formData.append("imgF", fileBlob);
          service
            .uploadImg(formData)
            .then(res => {
              console.log(res); 
              this.imgs.push({
                checked: false,
                url: `${process.env.VUE_APP_BASEURL}/${res.data.img}`
              });
            })
            .catch(() => {
              console.log("上传失败");
            });
        }
      });
    }
  },
  components: {
    TopHead,
    ImgBtn
  }
};
</script>

<style lang="scss" scoped>
.icon{
    width: px2rem(300);
    height: px2rem(100);
}
i {
  font-size: px2rem(28);
}
 
.check-hover {
  position: absolute;
  width: 100%;
  height: 100%;
  opacity: 0.8;
  background: #ccc;
  i {
    position: absolute;
    right: px2rem(5);
    top: px2rem(5);
    font-size: px2rem(28);
    color: red;
  }
}
.img-box-wrap {
  padding: px2rem(28);
  overflow: hidden;
  padding-bottom: 0;
  .img-box {
    border: px2rem(1) solid #ccc;
    height: px2rem(220);
    width: px2rem(220);
    box-sizing: border-box;
    float: left;
    margin-right: px2rem(17);
    margin-bottom: px2rem(28);
    position: relative;
  }
  .img-box:nth-child(3n) {
    margin-right: 0;
  }
}
</style>
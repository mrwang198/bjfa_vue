<template>
  <div class="user">
    <div class="user-bd">
      <tophead title="个人信息">
        <div slot="r" class="edit-pwd">修改密码</div>
      </tophead>
      <div class="img-box">
        <input accept="image/*" type="file" class="input-file" ref="file" @change="uploadImg" />
        <img @click="selectFile" class="img-round" :src="loginUser.avatar" alt="真他妈的帅" />
      </div>
      <div class="user-desc-wrap">
        <div class="row">
          <div class="fl">员工姓名：</div>
          <div class="fr">{{loginUser.name}}</div>
        </div>
        <div class="row">
          <div class="fl">手机号：</div>
          <div class="fr">{{loginUser.phone}}</div>
        </div>
        <div class="row">
          <div class="fl">部门：</div>
          <div class="fr">{{loginUser.department}}</div>
        </div>
      </div>
      <div class="last-login-wrap">上次登录的时间：{{loginUser.lastLogin}}</div>
    </div>

    <div class="user-bt">
      <div @click="reLogin" class="btn-l">重新登录</div>
      <div @click="cancalLogin" class="btn-r">注销</div>
    </div>
  </div>
</template>

<script>
import TopHead from "../components/TopHead";
import canvasResize from "canvas-resize";
import service from "../service/index";

import Utility from "../common/Utility";
import { mapState } from "vuex";

export default {
  name: "user",
  data() {
    return {};
  },
  mounted() {
    console.log(this.loginUser);
  },
  methods: {
    selectFile() {
      this.$refs.file.click();
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
              // console.log(res);
              // this.imgs.push({
              //   checked: false,
              //   url: `${process.env.VUE_APP_BASEURL}/${res.data.img}`
              // });
              let newUser = {...this.loginUser};
              newUser.avatar = `${process.env.VUE_APP_BASEURL}/${res.data.img}`;
              this.$store.commit('updateLoginUserInfo',newUser);
              //修服务器的图片的地址
              service.updateUserInfo(newUser);
            })
            .catch(() => {
              console.log("上传失败");
            });
        }
      });
    },
    cancalLogin(){
      //清理我们的sessionstroge localstroge session 的数据
      sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("clearAll");
      this.$router.push('/');
    },
    reLogin(){
       let loginUser = {...this.loginUser};
       sessionStorage.clear();
      localStorage.clear();
      this.$store.commit("clearAll");
      this.$router.push(`/?CNO=${loginUser.CNO}&PNO=${loginUser.PNO}`);
    }
  },
  components: {
    tophead: TopHead
  },
  computed: {
    ...mapState(["loginUser"])
  }
};
</script>

<style lang="scss" scoped>
.user {
  height: 100%;
  background: #fff;
  display: flex;
  flex-direction: column;
  .user-bd {
    flex: 1;
    .img-box {
      margin: px2rem(56) auto;
      height: px2rem(220);
      width: px2rem(220);

      .img-round {
        border-radius: 50%;
        border: px2rem(1) solid #ccc;
        height: px2rem(220);
        width: px2rem(220);
        vertical-align: top;
      }
    }
    .user-desc-wrap {
      border-top: px2rem(1) solid #ccc;
      padding: 0 $text-mid;
      font-size: $text-mid;
      .row {
        line-height: px2rem(110);
        height: px2rem(110);
        border-bottom: px2rem(1) solid #ccc;
        color: #000;
        .fl {
          color: #757575;
        }
      }
      .row:last-child {
        border-bottom: none;
      }
    }
    .last-login-wrap {
      background: #f4f4f4;
      border-bottom: px2rem(1) solid #ccc;
      border-top: px2rem(1) solid #ccc;
      height: px2rem(84);
      line-height: px2rem(84);
      color: #000;
      font-size: $text-size;
      padding: 0 $text-mid;
    }
  }
  .user-bt {
    display: flex;
    font-size: $text-imp;
    flex: 0 0 px2rem(110);
    height: px2rem(110);
    line-height: px2rem(110);
    border-top: px2rem(1) solid #ccc;
    text-align: center;
    .btn-l {
      flex: 1;
      border-right: px2rem(1) solid #ccc;
      color: $act-color;
    }
    .btn-r {
      flex: 1;
      color: #ff5353;
    }
  }
}
.edit-pwd {
  color: #fff;
  font-size: $text-size;
}
</style>
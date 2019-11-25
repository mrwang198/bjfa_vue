<template>
  <div id="login">
    <h1>欢迎登陆宝洁发你系统</h1>

    <div class="top_head"></div>
    <!-- 主体部分 -->
    <div class="login_box">
      <!-- logo部分 -->
      <div class="logo-wrap">
        <div class="logo-box"></div>
      </div>
      <!-- 表单部分 -->
      <!-- //使用这个插件的时候，会有一个校验链表，has方法会寻找里面有没有一个方法是关于cno的，有这个的话，则校验不通过 -->
      <div class="input-group" :class="{active: act_index === 1,error: errors.has('cno')}">
        <label for="cm-code">公司编号：</label>
        <input
          name="cno"
          v-validate="{required: true, max: 6, min: 4}"
          @focus="act_index = 1"
          type="number"
          id="cm_code"
          v-model="cm_code"
        />
      </div>
      <div class="input-group" :class="{active: act_index === 2,error: errors.has('pno')}">
        <label for="PNO">员工编号：</label>
        <input
          v-validate="{required: true, max: 12, min: 4}"
          name="pno"
          @focus="act_index = 2"
          type="number"
          id="PNO"
          v-model="PNO"
        />
      </div>
      <div class="input-group" :class="{active: act_index === 3,error: errors.has('pwd')}">
        <label for="Password">用户密码：</label>
        <input
          v-validate="{required: true, max: 12, min: 4}"
          name="pwd"
          @focus="act_index = 3"
          type="password"
          id="Password"
          v-model="password"
        />
      </div>
      <div class="ck-row">
        <div class="ckbox-wrap" @click="remembSet" :class="{active : rememb}">
          <i class="iconfont" :class="{'icon-check-square':rememb,'icon-border':!rememb}"></i>
          <span>记住密码</span>
        </div>
        <div class="ckbox-wrap" @click="autoLoginSet" :class="{active:autologin}">
          <i class="iconfont" :class="{'icon-check-square':autologin,'icon-border':!autologin}"></i>
          <span>自动登陆</span>
        </div>
      </div>
    </div>
    <div class="btn-wrap" @click="loginBtnClick">登录</div>
    <!-- <span>meg:{{meg}}</span> -->
  </div>
</template>

<script>
import "../assets/font/iconfont.css";
import { mapMutations } from "vuex";
import { Indicator, Toast } from "mint-ui";
// import axios from "axios";
import service from "../service/index";
// axios.defaults.timeout = 5000; // 请求超时
// axios.defaults.baseURL = "/api/"; // api 即上面 vue.config.js 中配置的地址
export default {
  name: "login",
  data() {
    return {
      cm_code: "",
      act_index: 1,
      PNO: "",
      password: "",
      rememb: false,
      autologin: false
    };
  },
  mounted() {
    let data = JSON.parse(localStorage.getItem("login_data"));
    if (data) {
      this.cm_code = data.CNO;
      this.PNO = data.PNO;
      this.password = data.Passwd;
      this.rememb = data.rememb;
      this.autologin = data.autologin;
      if (this.autologin) {
        this.loginBtnClick();
      }
    }else{
      this.PNO = this.$route.query.PNO;
      this.cm_code = this.$route.query.CNO;
    }

    //强制执行校验
    this.$validator.validate();
  },
  methods: {
    ...mapMutations(["initUser"]),
    autoLoginSet() {
      //设置当前的
      this.autologin = !this.autologin;
      this.autologin && (this.rememb = true);
      //   console.log(1);
    },
    remembSet() {
      this.rememb = !this.rememb;
      this.rememb || (this.autologin = false);
    },
    loginBtnClick() {
      //判断当前校验是否全部通过；
      //this.errors.any()，返回boolean如果与错误的话会返回一个true
      if (this.cm_code === "" || this.PNO === "" || this.password === "") {
        console.log("不能为空");
        return;
      }
      if (this.errors.any()) {
        console.log("有错误");
        console.log(this.errors);
        return;
      }
      //弹出等代遮罩层
      Indicator.open("正在登陆。。。");
      //发送ajax请求
      // axios
      //   .post("/api/login", {
      //     CNO: this.cm_code,
      //     PNO: this.PNO,
      //     Passwd: this.password
      //   })
      service
        .login({
          CNO: this.cm_code,
          PNO: this.PNO,
          Passwd: this.password
        })
        .then(res => {
          if (res.data.code === 1) {
            //登陆成功
            Indicator.close();
            //记住密码,setItem里面一定是字符串
            localStorage.setItem(
              "login_data",
              JSON.stringify({
                rememb: this.rememb,
                autologin: this.autologin,
                PNO: this.rememb ? this.PNO : "",
                CNO: this.rememb ? this.cm_code : "",
                Passwd: this.rememb ? this.password : ""
              })
            );
            //把当前的登录的用户信息放到sessionStorage
            sessionStorage.setItem("loginUser", JSON.stringify(res.data.user));
            sessionStorage.setItem("loginToken", res.data.token);

            console.log(this.$store);
            //把当前登陆的对象的用户信息放到vuex中区
            this.initUser(res.data.user);
            // this.$store.commit('initUser',res.data.user);
            //跳转到主页面
            this.$router.push("/home");
          } else {
            console.log(res.data);
            Indicator.close();

            Toast({
              message: "用户名密码不正确，登陆失败",
              // position:"bottom",
              duration: 2000
            });
            //登陆失败
          }
        })
        .catch(error => {
          Indicator.close();

          //登陆异常失败
          Toast({
            message: "登陆状态异常，请重试",
            // position:"bottom",
            duration: 2000
          });
          console.log(error);
        });
    }
  }
};
</script>
<style lang="scss">
html,
body,
#app {
  height: 100%;
}
</style>

<style lang="scss" scoped>
h1 {
  text-align: center;
  font-size: 36px;
  height: px2rem(36);
  padding: px2rem(148-36-44) 0 px2rem(44) 0;
  line-height: px2rem(36);
  color: #fff;
  //  font-weight: 700;
}
#login {
  background: #2ade69;
  height: 100%;
}
.top_head {
  width: px2rem(537);
  height: px2rem(18);
  background: #fff;
  margin: 0 auto;
  border-radius: px2rem(18) px2rem(18) 0 0;
}
@mixin login_wrap {
  width: px2rem(600);
  border-radius: px2rem(20);
  margin: 0 auto;
  background: #fff;
}
.login_box {
  @include login_wrap();
  height: px2rem(836);
}
.logo-wrap {
  padding: px2rem(80) 0;
  .logo-box {
    width: px2rem(190);
    height: px2rem(190);
    margin: 0 auto;
    background: url("../assets/logo.jpg");
    background-size: cover;
  }
}
@mixin rowStyle() {
  padding: 0 px2rem(36);
  color: $text-color;
  width: px2rem(401);
}
.input-group {
  border: 2px solid #e2e2e2;
  border-radius: px2rem(45);
  font-size: $text-mid;
  line-height: px2rem(90);
  @include rowStyle();
  margin: 0 auto px2rem(30) auto;
  input {
    border: 0px none;
    line-height: px2rem(90);
    font-size: $text-mid;
    width: px2rem(200);
  }
}
.input-group.active {
  color: $act-color;
  border: 2px solid $act-color;
}
.input-group.error {
  color: red;
  border: 2px solid #f60;
}
.ck-row {
  @include rowStyle();
  font-size: $text-size;
  display: flex;
  justify-content: space-around;
  .ckbox-wrap {
    padding-top: px2rem(8);
    padding-left: px2rem(70);
    vertical-align: center;
    i::before {
      display: inline-block;
      height: px2rem(30);
      width: px2rem(30);
      font-size: px2rem(30);
    }
  }
}
.ckbox-wrap.active {
  color: $act-color;
}
.btn-wrap {
  @include login_wrap();
  font-weight: 700;
  letter-spacing: px2rem(10);
  height: px2rem(100);
  font-size: $text-imp;
  color: $act-color;
  text-align: center;
  line-height: px2rem(100);
  margin-top: px2rem(20);
}
</style>
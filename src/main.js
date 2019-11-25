import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "./lib/hotcss/hotcss.js";
import helper from "./lib/helper";
import VeeValidate from "vee-validate";
//引入mint-ui的样式
import "mint-ui/lib/style.css";
//在.babelrc上面需要将components的括号去掉
Vue.config.productionTip = false;

Vue.use(VeeValidate);
//做校验偶用的 npm install vee-validate --save下载好之后
//最好重启一下服务。否则会报错
router.beforeEach((to, from, next) => {
  if (to.path != "/") {
    //校验用户是否登陆

    //判断对象返回的类型
    if (helper.getTypes(store.getters.getLoginUser) === "Object") {
      next();
    } else {
      next("/");
    }
  } else {
    next();
  }
});
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

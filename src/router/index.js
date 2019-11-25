import Vue from "vue";
import VueRouter from "vue-router";
import Login from "../views/Login.vue";
import Home from "../views/Home.vue";
import User from "../views/User.vue";
import Notice from "../views/Notice.vue";
import NoticeDetail from "../views/NoticeDetail";
import VisitShop from "../views/VisitShop";
import ShopInfo from "../views/ShopInfo";
import Signin from "../views/Signin";
import Order from "../views/Order";
import GoodsSelect from "../views/GoodsSelect";
import Cart from "../views/Cart";
import CartRemark from "../views/CartRemark";
import Subcart from "../views/Subcart";
import AddShop from "../views/AddShop";
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "login",
    component: Login
  },
  {
    path: "/home",
    name: "Home",
    component: Home
  },
  {
    path: "/user",
    name: "User",
    component: User
  },
  {
    path: "/notice",
    name: "Notice",
    component: Notice
  },
  {
    path: "/subcart",
    name: "subcart",
    component: Subcart
  },
  {
    path: "/visitshop",
    name: "VisitShop",
    component: VisitShop
  },
  {
    path: "/visitshop/:id",
    name: "ShopInfo",
    component: ShopInfo
  },
  {
    path: "/signin/:id",
    name: "Signin",
    component: Signin
  },
  {
    path: "/order/:id",
    name: "order",
    component: Order
  },
  {
    path: "/cart/:id",
    name: "cart",
    component: Cart
  },
  {
    path: "/cartremark/:id",
    name: "cartremarked",
    component: CartRemark
  },
  {
    path: "/goodsselected/:id",
    name: "GoodsSelect",
    component: GoodsSelect
  },
  {
    path: "/notice/:id",
    name: "NoticeDetail",
    component: NoticeDetail
  },
  {
    path: "/about",
    name: "about",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ "../views/About.vue")
  },
  {
    path: "/addedshop",
    name: "addshop",
    component: AddShop
  },
  {
    path: "*",
    name: "all",
    component: VisitShop
  }
];

const router = new VueRouter({
  routes
});

export default router;

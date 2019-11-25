import Vue from "vue";
import Vuex from "vuex";
import _ from "lodash";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    loginUser: sessionStorage.getItem("loginUser")
      ? JSON.parse(sessionStorage.getItem("loginUser"))
      : null,
    noticeList: [],
    Shops: [],
    Goods: [],
    CurOrderShop: {},
    Warehouse: [],
    Cart: []
  },
  mutations: {
    //清理本地sessionstroge localstroge session 俩面的数据
    //eslint-disable-next-line
    clearAll(state) {
      state = {};
    },
    //修改当前用户登录的信息
    updateLoginUserInfo(state, payload) {
      state.loginUser = payload;
    },
    //清理已经提交订单的购物车数据
    subOrderClear(state) {
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.CurOrderShop.id
      );
      let newShopInfo = _.cloneDeep(state.Cart[shopIndex]);
      newShopInfo.warehouse = newShopInfo.warehouse.filter(w => {
        //过滤那些没有选中的
        return w.goods.findIndex(g => g.chcked === false) >= 0;
      });
      newShopInfo.warehouse.forEach(w => {
        w.goods = w.goods.filter(g => g.chcked === false);
      });
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    //修改仓库的备注信息
    addRemarkToWarehouse(state, payload) {
      //payload remark warehouseId
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.CurOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      console.log(newShopInfo);
      let warehouse = newShopInfo.warehouse.find(
        w => w.warehouseId == payload.warehouseId
      );
      warehouse.remark = payload.remark;
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    //全选与全不选
    selectAllCart(state, value) {
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.CurOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      newShopInfo.warehouse.forEach(w => {
        w.checked = value;
        w.goods.forEach(goods => {
          goods.chcked = value;
        });
      });

      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    //修改仓库的选中状态
    changeWarehouseChecked(state, payload) {
      //要求 checked shopid warehouId
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.CurOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      let warehouse = newShopInfo.warehouse.find(
        w => w.warehouseId == payload.warehouseId
      );
      warehouse.checked = payload.checked;
      //如它的仓库父级为false的时候，它里面的goods的chcked也应该为false
      if (payload.checked == false) {
        warehouse.goods.forEach(goods => (goods.chcked = false));
      }
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    //修改里面货物的选中状态；

    changeGoodsChecked(state, payload) {
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.CurOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      let warehouse = newShopInfo.warehouse.find(
        w => w.warehouseId == payload.warehouseId
      );
      if (payload.checked) {
        warehouse.checked = true;
      }
      let goods = warehouse.goods.find(
        goods => goods.shopInfo.id == payload.goodsId
      );
      goods.chcked = payload.checked;
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    //添加商品的数据
    addGoodsCount(state, payload) {
      console.log(payload);
      //第一步拿到商铺的信息
      let shopIndex = state.Cart.findIndex(
        shop => shop.shopId == state.CurOrderShop.id
      );
      let newShopInfo = { ...state.Cart[shopIndex] };
      let warehouse = newShopInfo.warehouse.find(
        w => w.warehouseId == payload.warehouseId
      );
      let goods = warehouse.goods.find(
        goods => goods.shopInfo.id == payload.goodsId
      );
      goods.count += payload.count;
      state.Cart.splice(shopIndex, 1, newShopInfo);
    },
    clearCart(state) {
      state.Cart = [];
    },
    // clearCart(state) {},
    addToCart(state, payload) {
      // console.log(state.Cart);
      // console.log(payload);
      let shopIndex = state.Cart.findIndex(
        item => item.shopId == payload.shopId
      );
      // 如果不在购物车中，直接添加一个新数据到cart中。
      if (shopIndex < 0) {
        console.log("追加一条新的商铺数据到购物车！");
        // console.log(state.CurOrderShop);
        state.Cart.push({
          shopId: payload.shopId,
          shopName: state.CurOrderShop.name,
          warehouse: [
            {
              remark: "",
              warehouseId: payload.warehouseId,
              warehouseName: payload.warehouseName,
              checked: true,
              goods: [
                {
                  shopInfo: payload.goods,
                  count: payload.count,
                  chcked: true
                }
              ]
            }
          ]
        });
        // console.log(state.Cart);
      } else {
        console.log("商铺已存在，+仓库和商品");
        let shop = state.Cart[shopIndex];
        console.log(shop);
        // 判断当前要添加的商品所在的仓库是否已经在cart中存在。
        let warehouseIndex = shop.warehouse.findIndex(
          warehouse => warehouse.warehouseId == payload.warehouseId
        );
        // 当前商铺中如没有当前的仓库
        if (warehouseIndex < 0) {
          console.log("商铺已存在,没有仓库，添加一个新仓库");
          shop.warehouse.push({
            remark: "",
            warehouseId: payload.warehouseId,
            warehouseName: payload.warehouseName,
            checked: true,
            goods: [
              {
                shopInfo: payload.goods,
                count: payload.count,
                chcked: true
              }
            ]
          });
        } else {
          // 当前商铺中有当前仓库。
          // 判断当前仓库中是否 已经添加了此商品。
          // console.log('商铺已存在,仓库也已经存在');
          let warehouse = shop.warehouse[warehouseIndex];
          // 如果当前仓库中没有当前商品
          let goodsIndex = warehouse.goods.findIndex(
            goods => goods.shopInfo.id == payload.goods.id
          );
          if (goodsIndex < 0) {
            // console.log('商铺已存在,仓库也已经存在，在仓库中添加一个新商品');
            warehouse.goods.push({
              shopInfo: payload.goods,
              count: payload.count,
              chcked: true
            });
          } else {
            // console.log('商铺已存在,仓库也已经存在，在仓库中的商品增加数量');
            // 当前仓库已经存在此商品，增加数量
            let newCount = warehouse.goods[goodsIndex].count + payload.count;
            Vue.set(warehouse.goods[goodsIndex], "count", newCount);
          }
        }
        // 当前仓库中的shop信息重新写入到vuex的state里面去。
        Vue.set(state.Cart, shopIndex, shop);
      }
    },
    initWarehouse(state, payload) {
      state.Warehouse = payload;
    },
    initCurOrderShop(state, payload) {
      state.CurOrderShop = payload;
    },
    initGoods(state, payload) {
      state.Goods = payload;
    },
    appendGoods(state, payload) {
      //数组去重
      state.Goods = _.uniqBy([...state.Goods, ...payload], "id");
    },
    initShops(state, payload) {
      state.Shops = payload;
    },
    appendShops(state, payload) {
      //数组去重
      state.Shops = _.uniqBy([...state.Shops, ...payload], "id");
    },
    initUser(state, payload) {
      state.loginUser = payload;
    },
    initNoticeList(state, payload) {
      state.noticeList = _.uniqBy(payload, "id");
    },
    loadMoreNoticeUnshift(state, payload) {
      state.noticeList = [...state.noticeList.unshift(...payload)];
      state.noticeList = _.uniqBy(state.noticeList, "id");
    },
    loadMoreNoticePush(state, payload) {
      state.noticeList = [...state.noticeList.push(...payload)];
      state.noticeList = _.uniqBy(state.noticeList, "id");
    },
    setNoticeReaded(state, payload) {
      let itemIndex = state.noticeList.findIndex(item => item.id == payload);
      let k = state.noticeList[itemIndex];
      k.isReaded = true;
      state.noticeList.splice(itemIndex, 1, k);
    }
  },
  actions: {},
  modules: {},
  getters: {
    getLoginUser(state) {
      return state.loginUser;
    },
    getRemarkByWarehouseId: state => id => {
      let CurOrderShop = state.CurOrderShop;
      let shop = state.Cart.find(shop => shop.shopId == CurOrderShop.id);

      let warehouse = shop.warehouse.find(w => w.warehouseId == id);
      return warehouse.remark;
    },
    getCurCartShop(state) {
      let shop = state.Cart.find(shop => shop.shopId == state.CurOrderShop.id);
      let newShop = _.cloneDeep(shop);
      newShop.warehouse.forEach(w => {
        w.goods = w.goods.filter(g => g.chcked);
      });
      newShop.warehouse = newShop.warehouse.filter(
        w => w.goods.length > 0 && w.checked
      );
      return newShop;
    }
  },
  plugins: [
    createPersistedState({
      storage: window.sessionStorage
    })
  ]
});

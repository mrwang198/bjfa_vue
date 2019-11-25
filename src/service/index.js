import axios from "axios";
//登陆完成后的所有请求
let axiosIns = axios.interceptors.request.use(
  function(config) {
    let loginToken = sessionStorage.getItem("loginToken");
    console.log("loginToken", loginToken);
    if (loginToken) {
      config.headers.Authorization = `Bearer ${loginToken}`;
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default {
  login(data) {
    return axios.post("/api/login", data);
  },
  //当我们退出登陆的时候，取消全局注册的依赖
  logout() {
    axios.interceptors.request.eject(axiosIns);
  },
  getUserProgress() {
    return axios.get("/api/getUserProgress");
  },
  getNotice(date, limit, isloadelater) {
    if (date) {
      date = new Date(date).getTime();
    }
    return axios.get("/api/message", {
      params: {
        date,
        limit,
        isloadelater
      }
    });
  },
  setNoticeReaded(id) {
    return axios.post(`/api/auth/notice/${id}`);
  },
  getShop(data) {
    return axios.get(`/api/auth/shop?_limit=10&_order=asc&_sort=distance`, {
      params: data
    });
  },
  getShopInfo(id) {
    return axios.get("/api/auth/shopSales/" + id);
  },
  uploadImg(fromDate) {
    return axios({
      url: "/api/upload",
      method: "post",
      headers: {
        "content-Type": "multipart/from-data"
      },
      data: fromDate
    });
  },
  submitSigin(data) {
    return axios.post("/api/auth/SignIn", data);
  },
  loadGoods(data) {
    return axios.get("/api/auth/goods", { params: data });
  },
  loadWarehouse() {
    return axios.get("/api/auth/warehouse");
  },
  subOrder(data) {
    return axios.post("/api/auth/order", data);
  },
  updateUserInfo(data) {
    return axios.put(`/api/auth/user/${data.id}`, data);
  }
};

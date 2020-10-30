import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/scss/reset.scss";
import http from "@/api/config";
import "./mock";

// 引入element和element的样式
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

Vue.config.productionTip = false;
Vue.prototype.$http = http;

// 路由拦截
router.beforeEach((to, from, next) => {
  store.commit("getToken");
  let token = store.state.user.token;
  if (!token && to.name !== "login") {
    next({ name: "login" });
  } else {
    next();
  }
});

Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: h => h(App),
  created() {
    store.commit("addMenu", router);
  }
}).$mount("#app");

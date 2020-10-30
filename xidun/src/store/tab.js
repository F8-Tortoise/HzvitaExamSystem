import Cookie from "js-cookie";
export default {
  // 模块化
  state: {
    // 是否收缩菜单
    isCollapse: false,
    menu: [],
    // 点击的菜单
    currentMenu: null,
    tabsList: [
      {
        path: "/",
        name: "home",
        label: "首页",
        icon: "s-home"
      }
    ] //存取标签，方便非父子传递数据
  },
  mutations: {
    setMenu(state, val) {
      state.menu = val;
      Cookie.set("menu", JSON.stringify(val));
      console.log(val, "vuex");
    },
    clearMenu(state) {
      state.menu = [];
      Cookie.remove("menu");
    },
    // 动态添加路由 ，一般用于权限管理
    addMenu(state, router) {
      if (!Cookie.get("menu")) {
        return;
      }
      let menu = JSON.parse(Cookie.get("menu"));
      state.menu = menu;
      let currentMenu = [
        {
          path: "/",
          component: () => import(`@/views/Main`),
          children: []
        }
      ];
      menu.forEach(item => {
        if (item.children) {
          item.children = item.children.map(item => {
            item.component = () => import(`@/views/${item.url}`);
            return item;
          });
          currentMenu[0].children.push(...item.children);
        } else {
          item.component = () => import(`@/views/${item.url}`);
          currentMenu[0].children.push(item);
        }
      });
      console.log(currentMenu, "cur");
      router.addRoutes(currentMenu);
    },
    // 点击了侧边栏
    selectMenu(state, val) {
      if (val.name !== "home") {
        state.currentMenu = val;
        // 判断tabsList里是否有val,没有则返回-1
        let result = state.tabsList.findIndex(item => item.name === val.name);
        // 侧边栏点击后将菜单加入tabsList
        result === -1 ? state.tabsList.push(val) : "";
        Cookie.set("tagList", JSON.stringify(state.tabsList));
      } else {
        state.currentMenu = null;
      }
    },
    getMenu(state) {
      if (Cookie.get("tagList")) {
        let tagList = JSON.parse(Cookie.get("tagList"));
        state.tabsList = tagList;
      }
    },
    // 关闭标签
    closeTab(state, val) {
      // 找到要删除的标签
      let result = state.tabsList.findIndex(item => item.name === val.name);
      //splice(result,1)删除一个
      state.tabsList.splice(result, 1);
      Cookie.set("tagList", JSON.stringify(state.tabsList));
    },
    collapseMenu(state) {
      state.isCollapse = !state.isCollapse;
    }
  },
  actions: {}
};

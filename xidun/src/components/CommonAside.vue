<template>
  <el-menu
    :collapse="isCollapse"
    default-active="2"
    class="el-menu-vertical-demo"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <h3 v-show="!isCollapse">HzvitaExamSystem</h3>
    <h3 v-show="isCollapse">HES</h3>
    <el-menu-item
      :index="item.path"
      v-for="item in noChildren"
      :key="item.path"
      @click="clickMenu(item)"
    >
      <i :class="'el-icon-' + item.icon"></i>
      <span slot="title">{{ item.label }}</span>
    </el-menu-item>
    <el-submenu
      :index="item.label"
      v-for="(item, index) in hasChildren"
      :key="index"
    >
      <template slot="title">
        <i :class="'el-icon-' + item.icon"></i>
        <span>{{ item.label }}</span>
      </template>
      <el-menu-item-group>
        <el-menu-item
          :index="subItem.path"
          v-for="(subItem, subIndex) in item.children"
          :key="subIndex"
          @click="clickMenu(subItem)"
          >{{ subItem.label }}</el-menu-item
        >
      </el-menu-item-group>
    </el-submenu>
  </el-menu>
</template>

<script>
export default {
  data() {
    return {
      asideMenu: [
        {
          path: "/",
          name: "home",
          label: "首页",
          icon: "s-home"
        },
        {
          path: "/tiku",
          name: "tiku",
          label: "题库",
          icon: "document"
        },
        {
          label: "用户管理",
          icon: "user",
          children: [
            {
              path: "/yonghuzu",
              name: "yonghuzu",
              label: "用户组"
            },
            {
              path: "/quanxianguanli",
              name: "quanxianguanli",
              label: "权限管理"
            }
          ]
        }
      ]
    };
  },
  // 计算属性
  computed: {
    // 有没有子组件
    noChildren() {
      return this.menu.filter(item => !item.children);
    },
    hasChildren() {
      return this.menu.filter(item => item.children);
    },
    isCollapse() {
      return this.$store.state.tab.isCollapse;
    },
    menu() {
      return this.$store.state.tab.menu;
    }
  },
  methods: {
    clickMenu(item) {
      this.$router.push({ name: item.name });
      // 选中该菜单
      this.$store.commit("selectMenu", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.el-menu {
  height: 100%;
  border: none;
  h3 {
    color: #ffffff;
    text-align: center;
    line-height: 60px;
  }
}
.el-menu-vertical-demo:not(.el-menu--collapse) {
  width: 200px;
  min-height: 400px;
}
</style>

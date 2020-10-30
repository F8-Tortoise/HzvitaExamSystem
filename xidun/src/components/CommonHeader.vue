<template>
  <header>
    <div class="l-header">
      <el-button
        plain
        icon="el-icon-menu"
        size="mini"
        @click="collapseMenu"
      ></el-button>
      <!-- 面包屑 顶部导航 -->
      <el-breadcrumb separator="/">
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          :to="current.path"
          v-if="current"
          style="cursor:pointer"
        >
          {{ current.label }}
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="r-header">
      <!-- 下拉菜单 -->
      <el-dropdown trigger="click">
        <span class="el-dropdown-link" style="cursor:pointer">
          AspKu<i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </header>
</template>

<script>
// vuex提供的映射方法
import { mapState } from "vuex";
export default {
  computed: {
    // es6的拓展运算符
    ...mapState({
      // currentMenu在tab.js里的selectMenu来
      current: state => state.tab.currentMenu
    })
  },
  methods: {
    collapseMenu() {
      this.$store.commit("collapseMenu");
    },
    logOut() {
      this.$store.commit("clearToken");
      this.$store.commit("clearMenu");
      location.reload();
    }
  }
};
</script>

<style lang="scss" scoped>
header {
  display: flex;
  height: 100%;
  align-items: center;
  justify-content: space-between;
  .l-header {
    display: flex;
    align-items: center;
    .el-button {
      margin-right: 20px;
    }
  }
  .r-header {
    span {
      color: #fff;
    }
  }
}
</style>
<style lang="scss">
.el-breadcrumb__item {
  .el-breadcrumb__inner {
    color: #666666;
    font-weight: normal;
  }
  &:last-child {
    .el-breadcrumb__inner {
      color: #ffffff;
    }
  }
}
</style>

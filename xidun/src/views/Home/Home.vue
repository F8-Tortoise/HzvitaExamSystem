<template>
  <div class="card">
    <el-card
      shadow="hover"
      v-for="item in countData"
      :key="item.name"
      :body-style="{ display: 'flex', padding: 0 }"
    >
      <div class="detail">
        <div class="name">{{ item.name }}</div>
        <div class="value">{{ item.value }}</div>
        <div class="footer">
          <div class="label">{{ item.label }}</div>
          <div>{{ item.num }}</div>
        </div>
      </div>
    </el-card>
    <el-tabs v-model="activeName" @tab-click="handleClick" class="tabs">
      <el-tab-pane label="新增数" name="first">10</el-tab-pane>
      <el-tab-pane label="活跃度" name="second">563</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
      activeName: "first",
      countData: [
        {
          name: "今日用户数",
          value: 5467,
          label: "今日注册量",
          num: "12"
        },
        {
          name: "本周用户数",
          value: 5467,
          label: "本周注册量",
          num: "12"
        },
        {
          name: "本月用户数",
          value: 5467,
          label: "本月注册量",
          num: "12"
        },
        {
          name: "总用户数",
          value: 5467,
          label: "总注册量",
          num: "12"
        }
      ]
    };
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  // 流式布局，自动换行，水平（两端）对齐
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 24%;
    margin: 0 5px 10px 0;
    .detail {
      width: 100%;
      margin: 10px;
      display: flex;
      flex-direction: column;
      justify-content: center;
      .name {
        margin: 10px 0;
        font-size: 20px;
        color: #999999;
      }
      .value {
        text-align: center;
        font-size: 30px;
      }
      .footer {
        display: flex;
        font-size: 15px;
        margin: 10px 0;
        justify-content: flex-end;
        .label {
          margin-right: 15px;
        }
      }
    }
  }
  .tabs {
    width: 100%;
    background-color: #ffffff;
    padding: 10px 0 10px 20px;
    font-size: 20px;
  }
}
</style>

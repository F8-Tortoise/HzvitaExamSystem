import Mock from "mockjs";
import permissionApi from "./permission";

// 设置200-2000ms延时请求到数据
Mock.setup({
  timeout: "200-2000"
});
Mock.mock(/\/permission\/getMenu/, "post", permissionApi.getMenu);

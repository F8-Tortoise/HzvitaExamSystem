import Mock from "mockjs";
export default {
  getMenu: config => {
    const { username, password } = JSON.parse(config.body);
    console.log(JSON.parse(config.body));
    // 先判断用户是否存在
    if (username === "yedafa" || username === "yanglizhu") {
      // 判断账号和密码是否对应
      if (password === "123456") {
        return {
          code: 20000,
          data: {
            menu: [
              {
                path: "/",
                name: "home",
                label: "首页",
                icon: "s-home",
                url: "Home/Home"
              },
              {
                path: "/tiku",
                name: "tiku",
                label: "题库",
                icon: "document",
                url: "Tiku/Tiku.vue"
              },
              {
                label: "用户管理",
                icon: "user",
                children: [
                  {
                    path: "/yonghuzu",
                    name: "yonghuzu",
                    label: "用户组",
                    url: "Yonghu/Yonghuzu.vue"
                  },
                  {
                    path: "/quanxianguanli",
                    name: "quanxianguanli",
                    label: "权限管理",
                    url: "Yonghu/Quanxianguanli.vue"
                  }
                ]
              }
            ],
            // 随机返回一个id字符串来当成token使用
            token: Mock.Random.guid(),
            message: "获取成功"
          }
        };
      } else {
        return {
          code: -999,
          data: {
            message: "密码错误"
          }
        };
      }
    } else {
      return {
        code: -999,
        data: {
          message: "用户不存在"
        }
      };
    }
  }
};

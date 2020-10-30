import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
  // {
  //         path: '/',
  //         component: () =>
  //             import ('@/views/Main.vue'),
  //         children: [{
  //                 path: '/',
  //                 name: 'home',
  //                 component: () =>
  //                     import ('@/views/Home/Home.vue')
  //             },
  //             {
  //                 path: '/tiku',
  //                 name: 'tiku',
  //                 component: () =>
  //                     import ('@/views/Tiku/Tiku.vue')
  //             },
  //             {
  //                 path: '/yonghuzu',
  //                 name: 'yonghuzu',
  //                 component: () =>
  //                     import ('@/views/Yonghu/Yonghuzu.vue')
  //             },
  //             {
  //                 path: '/quanxianguanli',
  //                 name: 'quanxianguanli',
  //                 component: () =>
  //                     import ('@/views/Yonghu/Quanxianguanli.vue')
  //             },
  //         ]
  //     },
  {
    path: "/login",
    name: "login",
    component: () => import("@/views/Login/Login.vue")
  }
];

const router = new VueRouter({
  routes
});

export default router;

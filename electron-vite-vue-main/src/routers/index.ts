import { createRouter, createWebHistory } from "vue-router";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      component: () => import("@/views/Home/index.vue"),
      name: "Home",
    },
    {
      path: "/WorkSpace",
      component: () => import("@/views/WorkSpace/index.vue"),
      name: "WorkSpace",
    },
  ],
});

export default router;

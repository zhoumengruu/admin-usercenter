import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/home.vue";


Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    redirect:'management',
    component: Home
  },
  {
    path: "/management",
    name: "management",
    component: () =>
      import("../views/management.vue")
  },
  {
    path: "/login",
    name: "login",
    component: () =>
      import("../views/login.vue")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if(to.name !== "login"){
    const isLogin = localStorage.getItem("userid") || "";
    if(!isLogin){
      next({
        name:'login'
      })
    }else{
      next()
    }
  }else{
    next()
  }
});

export default router;

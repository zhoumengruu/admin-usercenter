import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);


const routes = [
  {
    path: "/login",
    name: "login",
    component: () => import("../views/login.vue")
  },
  {
    path:"/regist",
    name:'regist',
    component:()=> import("../views/regist.vue")
  },
  {
    path:"/user",
    name:'user',
    redirect:"user/usercenter",
    component:()=> import("../views/user.vue"),
    children:[
      {
        path:'usercenter',
        name:'usercenter',
        
        component:() => import ('../views/usercenter.vue'),
      },
      {
        path:'shop',
        name:'shop',
        component:() => import ('../views/shop.vue')
      },
    ]
      
  }
  
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});
router.beforeEach((to, from, next) => {
  if((to.name !== 'login') && (to.name !== 'regist') ){
    const isLogin = localStorage.getItem('userid') || ""
    if(!isLogin){
      next({
        name: "login"
      })
    }else{
      next()
    }
  }
  else{
    next()
  }
})

export default router;

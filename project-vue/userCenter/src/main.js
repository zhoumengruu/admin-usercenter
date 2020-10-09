import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false;
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

import {post,get,del,put} from "./utils/axios"
Vue.prototype.yPost = post
Vue.prototype.yGet = get
Vue.prototype.yDel = del
Vue.prototype.yPut = put

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

import Vue from 'vue';
import VueRouter from 'vue-router';
import FluxBackend from './components/Backend/Backend.vue';
Vue.use(VueRouter);
const router = new VueRouter({
  routes:[
    {path:"/", component: FluxBackend}
  ]
});
export default router;

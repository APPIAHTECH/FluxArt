import Vue from 'vue';
import VueRouter from 'vue-router';
import Flux from "./components/Flux/Flux.vue";
import iniciarSessio from "./components/iniciarSessio/iniciarSessio.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {path:"/",component: Flux},
    {path:"/iniciarSessio",component: iniciarSessio}
  ]
});
export default router;

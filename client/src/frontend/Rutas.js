import Vue from 'vue';
import VueRouter from 'vue-router';
import Flux from "./components/Flux/Flux.vue";
import IniciarSessio from "./components/iniciarSessio/iniciarSessio.vue";
import Registrar from "./components/Registrar/Registrar.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {path:"/", component: Flux},
    {path:"/iniciarSessio", component: IniciarSessio},
    {path:"/registrar" , component : Registrar}
  ]
});
export default router;

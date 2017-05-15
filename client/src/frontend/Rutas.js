import Vue from 'vue';
import VueRouter from 'vue-router';
import Flux from "./components/Flux/Flux.vue";
import IniciarSessio from "./components/iniciarSessio/iniciarSessio.vue";
import Registrar from "./components/Registrar/Registrar.vue";
import Confirmar from "./components/Confirmar/Confirmar.vue";

Vue.use(VueRouter);

const router = new VueRouter({
  routes:[
    {path:"/", component: Flux},
    {path:"/iniciarSessio", component: IniciarSessio},
    {path:"/registrar" , component : Registrar},
    {path:"/autenticacio/confirmar/:correu" , component : Confirmar}
  ]
});
export default router;

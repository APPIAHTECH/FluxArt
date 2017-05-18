import Vue from 'vue';
import VueRouter from 'vue-router';
import Flux from "./components/Flux/Flux.vue";
import IniciarSessio from "./components/iniciarSessio/iniciarSessio.vue";
import Registrar from "./components/Registrar/Registrar.vue";
import Confirmar from "./components/Confirmar/Confirmar.vue";
import Felicitat from "./components/Felicitat/Felicitat.vue";
import Perfil from "./../../../backend/src/components/Perfils/Perfil/Perfil.vue";
import PerfilConfigurar from "./../../../backend/src/components/Perfils/PerfilConfigurar/PerfilConfigurar.vue";

Vue.use(VueRouter);

const rutaNoDefinit = { template: '<div>No he trobat la ruta ...</div>' };

const router = new VueRouter({
  routes:[
    {path:"/", component: Flux},
    {path:"/iniciarSessio", component: IniciarSessio},
    {path:"/registrar" , component : Registrar},
    {path:"/autenticacio/confirmar/:correu" , component : Confirmar},
    {path:"/autenticacio/felicitar" , component : Felicitat},
    {path:"perfil/configurar/:id" , component : PerfilConfigurar},
    {path:"perfil/nomUsuari" , component : PerfilConfigurar},
    {path:"*" , component: rutaNoDefinit}
  ]
});
export default router;

import Vue from 'vue';
import VueRouter from 'vue-router';
import Flux from "./components/Flux/Flux.vue";
import IniciarSessio from "./components/iniciarSessio/iniciarSessio.vue";
import Registrar from "./components/Registrar/Registrar.vue";
import Confirmar from "./components/Confirmar/Confirmar.vue";
import Felicitat from "./components/Felicitat/Felicitat.vue";
import Sobre from "./components/Sobre/sobre.vue";
import Suport from "./components/Suport/Suport.vue";
import Perfil from './../../../backend/src/components/Perfils/PerfilComplet/Perfil.vue';

Vue.use(VueRouter);

const rutaNoDefinit = { template: '<div>No he trobat la ruta ...</div>' };

const router = new VueRouter({
  routes:[
    {path:"/", component: Flux},
    {path:"/iniciarSessio", component: IniciarSessio},
    {path:"/sobre", component: Sobre},
    {path:"/suport", component: Suport},
    {path:"/registrar" , component : Registrar},
    {path:"/autenticacio/confirmar/:correu" , component : Confirmar},
    {path:"/autenticacio/felicitar" , component : Felicitat},
    {path:"/perfil/:nomUsuari" , component: Perfil},
    {path:"*" , component: rutaNoDefinit}
  ]
});
export default router;

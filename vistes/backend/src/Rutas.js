import Vue from 'vue';
import VueRouter from 'vue-router';
import FluxBackend from './components/Backend/Backend.vue';
import FluxCompte from './components/Perfils/PerfilConfigurar/PerfilConfigurar.vue';
import CrearProjecte from './components/Projecte/CreaProjecte/CreaProjecte.vue';
import PerfilComplet from './components/Perfils/PerfilComplet/Perfil.vue';
import VisualitzarProjecte from './components/Projecte/VisualitzarProjecte/VisualitzarProjecte.vue';
import ElsMenusProjectes from './components/Projecte/ElsMenusProjectes/ElsMenusProjectes.vue';
import MesGran from './components/Projecte/MesGran/MesGran.vue';
import BuscarDissenyador from './components/BuscarDissenyador/BuscarDissenyador.vue';
import rutaNoDefinit from './../../../../../client/src/Error/Error404.vue';

Vue.use(VueRouter);
const rutas = new VueRouter({
  routes:[
    {path:"/", component: FluxBackend},
    {path:"/compte", component: FluxCompte},
    {path:"/crear/projecte", component: CrearProjecte},
    {path:"/perfil/:nomUsuari", component: PerfilComplet},
    {path:"/visualitzar/projecte", component: ElsMenusProjectes},
    {path:"/visualitzar/projecte/:IDProjecte", component: VisualitzarProjecte},
    {path:"/visualitzar/mesgran", component: MesGran},
    {path:"/buscar/artistes", component: BuscarDissenyador},
    {path:"*" , component: rutaNoDefinit}
  ]
});

export default rutas;

import Vue from 'vue';
import VueRouter from 'vue-router';
import FluxBackend from './components/Backend/Backend.vue';
import FluxCompte from './components/Perfils/PerfilConfigurar/PerfilConfigurar.vue';
import CrearProjecte from './components/Projecte/CreaProjecte/CreaProjecte.vue';
import PerfilComplet from './components/Perfils/PerfilComplet/Perfil.vue';
import VisualitzarProjecte from './components/Projecte/VisualitzarProjecte/VisualitzarProjecte.vue';
import BuscarDissenyador from './components/BuscarDissenyador/BuscarDissenyador.vue';

Vue.use(VueRouter);

const rutaNoDefinit = { template: '<div>Soc backend i No he trobat la ruta ...</div>' };

const rutas = new VueRouter({
  routes:[
    {path:"/", component: FluxBackend},
    {path:"/compte", component: FluxCompte},
    {path:"/crear/projecte", component: CrearProjecte},
    {path:"/perfil/:nomUsuari", component: PerfilComplet},
    {path:"/visualitzar/projecte", component: VisualitzarProjecte},
    {path:"/buscar/artistes", component: BuscarDissenyador},
    {path:"*" , component: rutaNoDefinit}
  ]
});

export default rutas;

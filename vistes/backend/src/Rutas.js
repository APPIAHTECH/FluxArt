import Vue from 'vue';
import VueRouter from 'vue-router';
import FluxBackend from './components/Backend/Backend.vue';
import FluxCompte from './components/Perfils/PerfilConfigurar/PerfilConfigurar.vue';
import PerfilComplet from './components/Perfils/PerfilComplet/PerfilComplet.vue';

Vue.use(VueRouter);

const rutaNoDefinit = { template: '<div>Soc backend i No he trobat la ruta ...</div>' };

const rutas = new VueRouter({
  routes:[
    {path:"/", component: FluxBackend},
    {path:"/compte", component: FluxCompte},
    {path:"/perfil" , component: PerfilComplet},
    {path:"*" , component: rutaNoDefinit}
  ]
});

export default rutas;

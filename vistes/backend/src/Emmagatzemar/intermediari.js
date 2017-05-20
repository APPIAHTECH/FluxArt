import Vue from 'vue';
import Vuex from 'vuex';
import Estat from './Estats.js'
import Getters from './Getters.js';
import Setters from "./Setters.js";
import Accions from "./Accions.js";

Vue.use(Vuex);

const intermediari = new Vuex.Store({
  state: Estat,
  getters : Getters ,
  mutations : Setters,
  actions : Accions
});

export default intermediari;

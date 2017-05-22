export default {

  carregarDades(state , dades){
    state.dades = dades;
  },

  setImatgePerfil(state , imatge){
    state.flux.nouImatgePerfil = imatge;
  },

  setDescripcio(state , desc){
    state.flux.descripcio = desc;
  },

  setVolseguir(state , url){
    state.flux.volSeguir = url;
  }
}

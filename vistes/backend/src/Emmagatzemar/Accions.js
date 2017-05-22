export default{

  carregarDades(context , dades){
    context.commit('carregarDades' , dades);
  },


  setImatgePerfil(context , imatge){
      context.commit('setImatgePerfil' , imatge);
  }
}

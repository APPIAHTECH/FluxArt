export default {

  obtenirImatgePerfil(state){return state.dades.perfil.usuari.url_img},

  obtenirID(state){return state.dades.perfil._id;},

  getNom(state){return  state.dades.perfil.usuari.nom},

  getNomUsuari(state){ return state.dades.perfil.usuari.nom_usuari},

  getCorreu(state){ return state.dades.perfil.usuari.correu},

  getEnllasGoogle(state){ return state.dades.perfil.usuari.compte_soccials[0]},

  getEnllasFacebook(state){ return state.dades.perfil.usuari.compte_soccials[1]},

  getEnllasPaypal(state){ return state.dades.perfil.usuari.compte_paypal},

  getEnllasLlocPersonal(state){ return state.dades.perfil.usuari.lloc_web},

  getNotificacions(state){ return state.dades.perfil.usuari.rebreNotificacions},

  getPais(state){return state.dades.perfil.usuari.pais},

  getProvincia(state){return state.dades.perfil.usuari.provincia}

}

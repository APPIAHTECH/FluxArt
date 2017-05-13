const ModelUsuari = require('./../models/usuaris/ModelUsuari.js');
const colleccio = "PerfilUsuari";
let model = new ModelUsuari(colleccio);

class Usuari{

  constructor()
  {}

  obtenirUsuariID(req , res)
  {
    model.obtenirPerfil(req.params.id)
    .then((perfil)=> {
      res.send(perfil)
    }).catch((err)=> {
      console.error(err);
      res.status(500).send("Alguna cosa no anat be");
    });
  }
}

module.exports = Usuari;

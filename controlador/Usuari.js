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

  obtenirUsuari(req , res)
  {
    let contrasenya = req.body.contrasenya;
    let nom_usuari = req.body.nomUsuari;

    console.log("Nom -> ", nom_usuari);
    console.log("Pass -> " , contrasenya);

    res.send("Nom" + nom_usuari+" pas -> "+contrasenya);
  //   model.obtenirUsuaris({"usuari.nom_usuari" : nom_usuari})
  //   .then((perfil)=> {
  //     res.send(perfil)
  //   }).catch((err)=> {
  //     console.error(err);
  //     res.status(500).send("Alguna cosa no anat be");
  //   });
  //
  }
}

module.exports = Usuari;

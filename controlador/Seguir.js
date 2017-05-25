const path = require('path');
const ModelSeguir = require(path.resolve('./models/seguidors/ModelSeguir.js'));
const Query = require('./../models/Query.js');

let model = new ModelSeguir();


class Seguir{

  constructor(){}

  seguirDissenyador(req , res ,next){

    let estructura = model.getModel();
    let idUsuari = req.body.idUsuari.toString();
    let idUsuariASeguir = req.body.idUsuariASeguir.toString();

    estructura._id = Query.generarID();
    estructura.seguir.usuari_id = idUsuari;
    estructura.seguir.dades.id_usuaris_seguint = idUsuariASeguir;
    estructura.seguir.dades.data = new Date();

    Seguir.estaSeguint(idUsuari , idUsuariASeguir , (resultatSeguiment)=>{

      if(resultatSeguiment){
        res.send({seguint : false , jaEstaSeguint : true});
      }else{

        model.insertarSeguiment(estructura)
          .then(resultat => res.send({seguint : true}))
          .catch((err)=> {
            res.send({seguint : false});
            console.error(err);
          });
      }

    });
  }

  static estaSeguint(idUsuari , idUsuariASeguir , callback){

    model.obtenirSeguimentUsuariSeguint(idUsuari , idUsuariASeguir).then( (resultat) =>{
      if(resultat[0])
        callback(true);
      else
        callback(false);
    });
  }

}

module.exports = Seguir;

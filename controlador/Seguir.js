const path = require('path');
const ModelSeguir = require(path.resolve('./models/seguidors/ModelSeguir.js'));
const ModelNotificacio = require(path.resolve('./models/Notificacions/ModelNotificacio.js'));
const Query = require('./../models/Query.js');

let model = new ModelSeguir();
let modelNotificacio = new ModelNotificacio();


class Seguir{

  constructor(){}

  seguirDissenyador(req , res ,next){

    let estructura = model.getModel();
    let idUsuari = req.body.idUsuari.toString();
    let idUsuariASeguir = req.body.idUsuariASeguir.toString();
    let nomUsuari = req.body.nomUsuari.toString();

    estructura._id = Query.generarID();
    estructura.seguir.usuari_id = idUsuari;
    estructura.seguir.dades.id_usuaris_seguint = idUsuariASeguir;
    estructura.seguir.dades.data = new Date();

    Seguir.estaSeguint(idUsuari , idUsuariASeguir , (resultatSeguiment)=>{

      if(resultatSeguiment){
        res.send({seguint : false , jaEstaSeguint : true});
      }else{

        model.insertarSeguiment(estructura)
          .then(resultat => {

              let estructuraNotificacio = modelNotificacio.getModel();
              let notificacioEstandarSeguiment = {
                  "nom_usuari": nomUsuari,
                  "usuari_id": idUsuariASeguir,
                  "missatge" : "Enhorabona  , " +nomUsuari+" t'està seguint",
                  "data" : new Date(),
                  "llegit" : false
                }

                estructuraNotificacio.notificacio = notificacioEstandarSeguiment;

                modelNotificacio.inserirNotificacio(estructuraNotificacio)
                .then(resultat => res.send({seguint : true}))
                .catch(err => console.error(err));

          }).catch(err => console.error(err));
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

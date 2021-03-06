const path = require('path');
const Utilitat = require('./Utilitats.js');
const Query = require('./../models/Query.js');

const ProjecteTemporal = require(path.resolve('./models/projectes/ProjecteTemporal.js'));
const Projecte = require(path.resolve('./models/projectes/ModelProjecte.js'));

let model = new ProjecteTemporal();

const correAdmin = '"eunisae" <eunisaesea@gmail.com>';

class Administracio{

  constructor(){}

  projectes(req , res , next){

    let admin = req.user[0];
    model.obtenirProjectes({"per_validar.confirmat" : false})
    .then(resultat =>{
      res.render('projecte', { titul: 'Flux Admin' , llistatProjectes : resultat , administrador : admin});
    }).catch(err => console.error(err));
  }

  obtenirProjecte(req , res , next){
    let admin = req.user[0];
    let id = req.params.idProjecte.substring(1 , req.params.idProjecte.length -1).trim().toString();
    model.obtenirProjecte(id).then(resultat =>{
      res.render('VeureProjecte', { titul: 'Flux Admin' , projecte : resultat[0] , administrador : admin});
    }).catch(err => console.error(err));
  }

  dashboard(req , res , next){
    let admin = req.user[0];
    res.render('index', { titul: 'Flux Dashboard' , administrador : admin});
  }

  confirmarProjecte(req , res , next){

      let modelProjecte = new Projecte();
      let estructura = modelProjecte.getModel();
      let nouProjecte = req.body.projecConfirmat;

      estructura._id = Query.generarID();
      estructura.projecte = nouProjecte.projecteTemporal;
      estructura.projecte.data_creacio = new Date();
      estructura.projecte.confirmat = true;

      estructura.projecte.visitas = 0;
      estructura.projecte.like = [];
      estructura.projecte.comentaris = [];
      estructura.projecte.comentaris_total = 0;

      modelProjecte.inserirProjecte(estructura).then(resultat => {
        if(resultat)
        {
          let opcionsCorreu = {
              from: correAdmin,
              to: nouProjecte.projecteTemporal.correu,
              subject: 'Confirmació Projecte Flux',
              html: `<b>Hola ${estructura.projecte.nom_usuari}, el teu projecte ${estructura.projecte.titul} a sigut confirmat</b>`
          };

          model.borrarProjecte(nouProjecte._id).then((resultat)=>{ //Borrant projecte temporal
            if(resultat){
              Utilitat.enviarCorreu(opcionsCorreu);
              res.send({confirmat : true});
            }
          }).catch(err => console.error("algun error inserirProjecte -> " , err));
        }
        else res.send({confirmat : false});

      }).catch((error)=>{

        console.error(err);
        res.status(504).send({confirmat : false});
      });

    }

  denegarProjecte(req , res , next){
    let projecte = req.body.projecteDenegat;

    let opcionsCorreu = {
        from: correAdmin,
        to: projecte.projecteTemporal.correu,
        subject: 'Denegat Projecte Flux ',
        html: `<b>Hola ${projecte.projecteTemporal.nom_usuari} ,et comuniquem que el projecte ${projecte.projecteTemporal.titul} a sigut denegat, ja que no compleix amb el requeriment. Per a més informació referents els requeriments de projectes vés a Flux/suport.</b>` // html body
    };

    model.borrarProjecte(projecte._id).then((resultat)=>{ //Borrant projecte temporal
      if(resultat){
        Utilitat.enviarCorreu(opcionsCorreu);
        res.send({confirmat : true});
      }
    }).catch(err => {
      console.error("algun error inserirProjecte -> " , err);
      res.send({confirmat : false});
    });

  }
}

module.exports = Administracio;

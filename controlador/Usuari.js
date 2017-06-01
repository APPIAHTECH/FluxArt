const ModelUsuari = require('./../models/usuaris/ModelUsuari.js');
const ModelProjecte = require('./../models/projectes/ModelProjecte.js');
const ModelSeguiment = require('./../models/seguidors/ModelSeguir.js');
const ModelNotificacio = require('./../models/Notificacions/ModelNotificacio.js');

const Utilitat = require('./Utilitats.js');
const Query = require('./../models/Query.js');

const excloureCamps = {"usuari.contrasenya" : 0 , "usuari.estat_activacio" : 0 , "usuari.data_validacio" : 0 , "usuari.usuari_proveidor_id" : 0 , "usuari.tipus_registracio": 0};

let model = new ModelUsuari();

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

  obtenirUsuariNomUsuari(req , res)
  {

    let modelProject = new ModelProjecte();
    let modelSeguir = new ModelSeguiment();
    let IDusuari = "" , iniciatSessio = false;
    let nomUsuari = req.params.nomUsuari.toString();

    if(req.user){
      if(req.user[0].usuari.nom_usuari == nomUsuari)
        iniciatSessio = true;
    }

    model.obtenirUsuaris({"usuari.nom_usuari" : nomUsuari} , excloureCamps)
    .then((perfil)=> {

      IDusuari = perfil[0]._id.toString();
      let seguint = modelSeguir.quantitatSeguidors(IDusuari);
      let quantitatProjectes = modelProject.quantitatProjectes(IDusuari);
      let perfilUsuari = {
        _id : IDusuari,
        perfil : {}
      }

      Promise.all([seguint , quantitatProjectes]).then((valors)=>{
        perfilUsuari.perfil = perfil[0].usuari;
        res.send({
          iniciatSessio : iniciatSessio,
          perfil : perfilUsuari,
          quantitatSeguidors : valors[0],
          quantitatProjectes : valors[1]
        });

      });

    }).catch((err)=> {
      console.error(err);
      res.status(500).send("Alguna cosa no anat be");
    });

  }

  recuperarTotDades(req, res , next){

    let IDusuari = req.user[0]._id.toString();
    let modelProject = new ModelProjecte();
    let modelSeguir = new ModelSeguiment();
    let modelNotificacio = new ModelNotificacio();

    let dades = {
      perfil : {},
      treballs : [],
      notificacions : [],
      quantitatSeguidors : 0,
      quantitatProjectes : 0
    }

    let seguint = modelSeguir.quantitatSeguidors(IDusuari);
    let perfil = model.obtenirPerfil(IDusuari , excloureCamps);
    let projectes = modelProject.obtenirProjectesLimit(IDusuari , 50 , {"projecte.data_creacio" : -1}); //50 projectes
    let quantitatProjectes = modelProject.quantitatProjectes(IDusuari);
    let notificacions = modelNotificacio.obtenirNotificacionsNoLegit(IDusuari);


    Promise.all([perfil , projectes , seguint , quantitatProjectes , notificacions]).then((valors)=>{

      dades.perfil = valors[0][0];
      dades.treballs = valors[1];
      dades.quantitatSeguidors = valors[2];
      dades.quantitatProjectes = valors[3];
      dades.notificacions = valors[4];

      res.send(dades);
      next();
    });

  }

  actualitzarDades(req , res , next){

    let dades = req.body;
    let comptes = [];;

    comptes.push(dades.compteGoogle);
    comptes.push(dades.compteFacebook);

    if(dades.imatgePerfilNou && dades.contrasenyaNova){

      Utilitat.encriptarContrasenya(dades.contrasenyaNova).then((contrasenya)=>{
        model.actualitzarPerfil(dades.id , {
          "usuari.nom" : dades.nom,
          "usuari.nom_usuari" : dades.nomUsuari,
          "usuari.correu" : dades.correu,
          "usuari.pais" : dades.pais,
          "usuari.provincia" : dades.provincia,
          "usuari.rebreNotificacions" : dades.rebreNotificacions,
          "usuari.compte_paypal" : dades.comptePaypal,
          "usuari.lloc_web" : dades.llocWeb,
          "usuari.compte_soccials" : comptes,
          "usuari.contrasenya": contrasenya,
          "usuari.url_img": dades.imatgePerfilNou,
          "usuari.descripcio" : dades.descripcio

        }).then(resultat => res.send({actualizat : true})).catch(err => {actualizat : false});
      });

    }else if(dades.contrasenyaNova){

      Utilitat.encriptarContrasenya(dades.contrasenyaNova).then((contrasenya)=>{
        model.actualitzarPerfil(dades.id , {
          "usuari.nom" : dades.nom,
          "usuari.nom_usuari" : dades.nomUsuari,
          "usuari.correu" : dades.correu,
          "usuari.pais" : dades.pais,
          "usuari.provincia" : dades.provincia,
          "usuari.rebreNotificacions" : dades.rebreNotificacions,
          "usuari.compte_paypal" : dades.comptePaypal,
          "usuari.lloc_web" : dades.llocWeb,
          "usuari.compte_soccials" : comptes,
          "usuari.contrasenya": contrasenya,
          "usuari.descripcio" : dades.descripcio

        }).then(resultat => res.send({actualizat : true})).catch(err => {actualizat : false});
      });

    }else if(dades.imatgePerfilNou){

      model.actualitzarPerfil(dades.id , {
        "usuari.nom" : dades.nom,
        "usuari.nom_usuari" : dades.nomUsuari,
        "usuari.correu" : dades.correu,
        "usuari.pais" : dades.pais,
        "usuari.provincia" : dades.provincia,
        "usuari.rebreNotificacions" : dades.rebreNotificacions,
        "usuari.compte_paypal" : dades.comptePaypal,
        "usuari.lloc_web" : dades.llocWeb,
        "usuari.compte_soccials" : comptes,
        "usuari.url_img": dades.imatgePerfilNou,
        "usuari.descripcio" : dades.descripcio

      }).then(resultat => res.send({actualizat : true})).catch(err => {actualizat : false});

    }else {

      model.actualitzarPerfil(dades.id , {
        "usuari.nom" : dades.nom,
        "usuari.nom_usuari" : dades.nomUsuari,
        "usuari.correu" : dades.correu,
        "usuari.pais" : dades.pais,
        "usuari.provincia" : dades.provincia,
        "usuari.rebreNotificacions" : dades.rebreNotificacions,
        "usuari.compte_paypal" : dades.comptePaypal,
        "usuari.lloc_web" : dades.llocWeb,
        "usuari.compte_soccials" : comptes,
        "usuari.descripcio" : dades.descripcio

      }).then(resultat => res.send({actualizat : true})).catch(err => {actualizat : false});

    }
  }

  obtenirUsuariDissenyadors(req , res , next){
    let quantitat = parseInt(req.params.quantitat);
    let filtrar = req.params.filtrar.toString();
    let ordenacio = parseInt(req.params.ordenacio);
    let idUsuari = req.params.id.toString();

    model.obtenirUsuarisLimitat({$and : [{"usuari.nom_usuari" : {$ne : "admin"}} , {"_id" : {$ne : Query.convertirAObjecteID(idUsuari)}} ] }, quantitat , {filtrar : ordenacio} , {"_id" : 1 , "usuari.nom_usuari" : 1 , "usuari.url_img" : 1})
    .then((resultat)=> res.send(resultat))
    .catch(err => res.status(500).send('alguna cosa no anat be'));
  }

  eliminarDades(req , res , next){
    let id = req.body.IDUsuari;
    if(req.user){
      if (id){
        model.borarUsuari(id)
        .then(resultat => res.send({borrat : true}))
        .catch(err => res.send({borrat : false , error : err}));
      }
    }

  }
}

module.exports = Usuari;

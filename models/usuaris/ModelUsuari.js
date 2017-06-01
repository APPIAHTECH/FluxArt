const Query = require('./../Query');
const ModelBase = require('./../ModelBase');
const ModelProjecte = require('./../projectes/ModelProjecte');
const Notificacions = require('./../Notificacions/ModelNotificacio');
const Seguidors = require('./../seguidors/ModelSeguir');

const colleccio = "PerfilUsuari";
const document = {
  "usuari":{
    "nom":"",
    "nom_usuari":"",
    "correu":"",
    "url_img":"http://blog.ramboll.com/fehmarnbelt/wp-content/themes/ramboll2/images/profile-img.jpg",
    "contrasenya":"",
    "lloc_web":"",
    "descripcio":"",
    "compte_soccials":[],
    "tipus_registracio" : "",
    "compte_paypal":"",
    "estat_activacio": false,
    "data_validacio":"",
    "usuari_proveidor_id":"",
    "primerCop":false,
    "rebreNotificacions":false,
    "pais":"España",
    "provincia":"Barcelona"
  }
}

class ModelUsuari extends ModelBase{

  constructor(colleccioEntrad , documentEntrada){

    if(colleccioEntrad && documentEntrada)
      super(colleccioEntrad , documentEntrada);
    else
      super(colleccio , document);
  }

  //Obtencio de dades
  obtenirPerfil(id , excloureCamps){

    return new Promise((resolve , reject) =>{
      Query.querySeleccio(this.getColleccio() , {"_id": Query.convertirAObjecteID(id)} , excloureCamps)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.log(err);
        reject(err);
      });

    });
  }

  obtenirUsuaris(condicio , excloureCamps)
  {
    return new Promise((resolve , reject) =>{
      Query.querySeleccio(this.getColleccio() , condicio , excloureCamps)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.log(err);
        reject(err);
      });

    });
  }

  obtenirUsuarisLimitat(condicio , quantitat , filtrar , excloureCamps)
  {
    return new Promise((resolve , reject) =>{
      Query.querySeleccioLimitat(this.getColleccio() , condicio , quantitat , filtrar , excloureCamps)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.log(err);
        reject(err);
      });

    });
  }

  obtenirDonacions(usuariID , donacioID){}
  obtenirSeguidors(id){}

  //Actualitzar dades
  actualitzarPerfil(id , cambis){

    return new Promise((resolve , reject) =>{
      Query.queryActualitzacio(this.getColleccio() , {"_id": Query.convertirAObjecteID(id)} , {
        $set:cambis //Objecte {"camp":"valor"}
      }).then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        reject(err);
        console.log(err);
      });
    });

  }

  //Afegir
  inserirUsuari(perfil){

    return new Promise((resolve , reject) =>{
      Query.queryInsercio(this.getColleccio() , perfil)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=>{
          reject(err);
         console.log(err);
      });
    });

  }

  //Borar  //Danger! //Eliminara tot les dades
  borarUsuari(id){

    let modelProject = new ModelProjecte();
    let modelNotificacions = new Notificacions();
    let modelSeguidors  = new Seguidors();

    let elimnarProjectes = Query.queryEliminacio(modelProject.getColleccio(), {"projecte.usuari_id": id});
    let elimnarNotificacions = Query.queryEliminacio(modelNotificacions.getColleccio(), {"notificacio.usuari_id": id});
    let elimnarSeguidors = Query.queryEliminacio(modelSeguidors.getColleccio(), {"seguir.usuari_id": id});
    let eliminarUsuari = Query.queryEliminacio(this.getColleccio() , {"_id": Query.convertirAObjecteID(id)});


    return new Promise((resolve , reject) =>{
      Promise.all(eliminarUsuari , elimnarProjectes , elimnarNotificacions , elimnarSeguidors , eliminarUsuari)
      .then((resultat)=> resolve(resultat))
      .catch(err => reject(err))
    });
  }

}

module.exports = ModelUsuari;

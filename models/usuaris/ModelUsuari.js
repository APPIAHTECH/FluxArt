const Query = require('./../Query');
const ModelBase = require('./../ModelBase');

const colleccio = "PerfilUsuari";
const document = {
  "usuari":{
    "nom":"",
    "nom_usuari":"",
    "correu":"",
    "url_img":"",
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
    "pais":"españa",
    "provincia":"barcelona"
  }
}

class ModelUsuari extends ModelBase{

  constructor(){
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

  //Borar
  borarUsuari(id){
    return new Promise((resolve , reject) =>{

      Query.queryEliminacio(this.getColleccio() , {"_id": Query.convertirAObjecteID(id)})
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        reject(err);
        console.log(err);
      });

    });


  } //Danger! //Eliminara tot les dades

}

module.exports = ModelUsuari;

const Query = require('./../Query');
const ModelBase = require('./../ModelBase');

const colleccio = "Notificacions";
const document = {
  "notificacio":{
    "nom_usuari":"",
    "usuari_id":"",
    "missatge" : "",
    "data" : "",
    "llegit" : true
  }
}


class ModelNotificacio extends ModelBase{

  constructor(){
    super(colleccio , document);
  }

  obtenirNotificacionsNoLegit(id , excloureCamps){

    return new Promise((resolve , reject) =>{
      Query.querySeleccio(this.getColleccio() ,{$and : [ {"notificacio.usuari_id": id} ,  {"notificacio.llegit": false}]} , excloureCamps)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.log(err);
        reject(err);
      });

    });
  }

  inserirNotificacio(notifiacio){

    return new Promise((resolve , reject) =>{
      Query.queryInsercio(this.getColleccio() , notifiacio)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=>{
          reject(err);
         console.log(err);
      });
    });

  }

  actualitzarNotificacio(id , cambis){

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
}

module.exports = ModelNotificacio;

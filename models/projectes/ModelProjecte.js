const Query = require('./../Query');
const ModelBase = require('./../ModelBase');

const colleccio = "Projecte";
const document = {

  "projecte":{
    "usuari_id":"",
    "titul":"",
    "descripcio":"",
    "imatges":[],
    "categoria":"",
    "tags":[],
    "comentaris":[
      {
        "idProjecte" : "",
        "url_img" : "",
        "IDUsuari" : "",
        "missatge"  : "",
        "nomUsuari" : "",
        "data" : new Date(),
        "comentari" : 0
      }
    ],
    "visitas":0,
    "like":[],
    "data_creacio":"",
    "te_donacio":false,
    "confirmat" : false,
    "comentaris_total" : 0
  }
}

class ModelProjecte extends ModelBase{

  constructor(colleccioEntrada , documentEntrada){

    if(colleccioEntrada && documentEntrada)
      super(colleccioEntrada , documentEntrada);
    else
      super(colleccio , document);

  }

  inserirProjecte(projecte){

    return new Promise((resolve , reject) =>{
      Query.queryInsercio(this.getColleccio() , projecte)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=>{
        reject(err);
         console.log(err);
      });
    });

  }

  //Retorna un top de quantitat de projectes.
  obtenirVariusProjectes(condicio , quantitat , filtrar){

    return new Promise((resolve , reject) =>{
      Query.querySeleccioLimitat(this.getColleccio(), condicio , quantitat , filtrar)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.error(err);
        reject(err);
      });
    });
  }

  obtenirProjectesLimit(id , quantitat , filtrar){

    return new Promise((resolve , reject) =>{
      Query.querySeleccioLimit(this.getColleccio(), {"projecte.usuari_id" : `${id}`}  , quantitat , filtrar)
      .then((res)=>  resolve(res))
      .catch((err)=> {
        console.error(err);
        reject(err);
      });
    });
  }

  obtenirProjecte(id){
    return new Promise((resolve , reject) =>{
      Query.querySeleccio(this.getColleccio() , {"_id": Query.convertirAObjecteID(id)})
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.log(err);
        reject(err);
      });

    });
  }

  borrarProjecte(id){
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

  }

  obtenirProjectes(condicio){

    return new Promise((resolve , reject) =>{
      Query.querySeleccio(this.getColleccio(), condicio)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.error(err);
        reject(err);
      });
    });
  }

  obtenirQuantitatProjecteUsuari(camps){

    return new Promise((resolve , reject) =>{
      Query.queryAgrupacio(this.getColleccio(), camps)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.error(err);
        reject(err);
      });
    });

  }

  quantitatProjectes(idUsuari){
    return new Promise((resolve , reject)=>{

      Query.queryContar(this.getColleccio() , {"projecte.usuari_id" : idUsuari})
      .then(res => resolve(res))
      .catch(err => reject(err));

    });
  }

  actualitzarProjecte(id , cambis){

    return new Promise((resolve , reject) =>{
      Query.queryActualitzacio(this.getColleccio() , {"_id": Query.convertirAObjecteID(id)} , {
        $set:cambis
      }).then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.log(err);
        reject(err);
      });
    });

  }

  actualitzarProjectPushArray(id , push){

    return new Promise((resolve , reject) =>{
      Query.queryActualitzacioArray(this.getColleccio() ,{"_id": Query.convertirAObjecteID(id)} , push)
      .then((res)=> resolve(res))
      .catch((err)=> {
        console.log(err);
        reject(err);
      });
    });
  }

  actualitzarProjectPullArray(id , pull){

    return new Promise((resolve , reject) =>{
      Query.queryActualitzacioArray(this.getColleccio() , {"_id": Query.convertirAObjecteID(id)} , pull)
      .then((res)=> resolve(res))
      .catch((err)=> {
        console.log(err);
        reject(err);
      });
    });
  }

  actualitzacioIncremental(id , camp){

    return new Promise((resolve , reject) =>{
      Query.queryActualitzacioArray(this.getColleccio() , {"_id": Query.convertirAObjecteID(id)} , {$inc : camp} )
      .then((res)=> resolve(res))
      .catch((err)=> {
        console.log(err);
        reject(err);
      });
    });

  }

}

module.exports = ModelProjecte;

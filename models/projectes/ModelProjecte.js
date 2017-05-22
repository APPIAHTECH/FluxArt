const Query = require('./../Query');
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
        "usuari_id":"",
        "missatge":"",
        "data":""
      }
    ],
    "visitas":0,
    "like":0,
    "no_like":0,
    "data_creacio":"",
    "te_donacio":false,
    "confirmat" : false
  }
}

class ModelProjecte{

  constructor(colleccioEntrada = "Projecte"){
    this.setColleccio(colleccioEntrada);
    this.setModel(document);
  }

  setColleccio(colleccio){this.colleccio = colleccio;}
  getColleccio(){return this.colleccio;}

  setModel(model)
  {this.model = model;}

  getModel()
  {return this.model}

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

  obtenirProjectesLimit(id , quantitat){

    return new Promise((resolve , reject) =>{
      Query.querySeleccioLimit(this.getColleccio(), {"projecte.usuari_id" : `${id}`}  , quantitat)
      .then((res)=>  resolve(res))
      .catch((err)=> {
        console.error(err);
        reject(err);
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
}

module.exports = ModelProjecte;

const Query = require('./../Query');
const colleccio = "Projecte";

class ModelProjecte{

  constructor(){
    this.setColleccio(colleccio);
  }
  setColleccio(colleccio){this.colleccio = colleccio;}
  getColleccio(){return this.colleccio;}

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

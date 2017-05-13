const Query = require('./../Query');

class ModelProjecte{

  constructor(colleccio){
    this.setColleccio(colleccio);
  }
  setColleccio(colleccio){this.colleccio = colleccio;}
  getColleccio()
  {return this.colleccio;}

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

const Query = require('./../Query');
const ModelBase = require('./../ModelBase');

const colleccio = "Seguir";
const document = {
  "seguir":{
    "usuari_id":"",
    "dades":{
      "id_usuaris_seguint":"",
      "data":""
    }
  }
}

class ModelSeguir extends ModelBase{

  constructor(){
    super(colleccio , document);
  }

  insertarSeguiment(seguiment){
    return new Promise((resolve , reject) =>{
      Query.queryInsercio(this.getColleccio() , seguiment)
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=>{
          reject(err);
         console.log(err);
      });
    });
  }

  obtenirSeguimentUsuariSeguint(idUsuari , idUsuariASeguir){

    return new Promise((resolve , reject) =>{
      Query.querySeleccio(this.getColleccio() ,
      {$and : [{"seguir.usuari_id": idUsuari} , {"seguir.dades.id_usuaris_seguint": idUsuariASeguir}]} , {})
      .then((res)=> {
        resolve(res);
      })
      .catch((err)=> {
        console.log(err);
        reject(err);
      });

    });
  }


quantitatSeguidors(idUsuari){

  return new Promise((resolve , reject)=>{

    Query.queryContar(this.getColleccio() , {"seguir.dades.id_usuaris_seguint" : idUsuari})
    .then(res => resolve(res))
    .catch(err => reject(err));

  });

}



}

module.exports = ModelSeguir;

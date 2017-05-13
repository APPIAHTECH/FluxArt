const Query = require('./../Query');
const document = {
  "usuari":
  {
    "nom":"",
    "nom_usuari":"",
    "correu":"",
    "url_img":"",
    "contrasenya":"",
    "localitat":"",
    "lloc_web":"",
    "descripcio":"",
    "compte_soccials":[],
    "tipus_registracio" : "",
    "compte_paypal":"",
    "estat_activacio": false,
    "data_validacio":"",
    "usuari_proveidor_id":""
  }
}

class ModelUsuari{

  constructor(colleccio){
    this.setColleccio(colleccio);
    this.setModel(document);
  }

  setColleccio(colleccio)
  {this.colleccio = colleccio;}

  getColleccio()
  {return this.colleccio;}

  setModel(model)
  {this.model = model;}

  getModel()
  {return this.model}

  //Obtencio de dades
  obtenirPerfil(id){

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

  obtenirUsuaris(condicio)
  {
    return new Promise((resolve , reject) =>{
      Query.querySeleccio(this.getColleccio() , condicio)
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

  // deshabilitar
  donarBaixa(id ){}

}

module.exports = ModelUsuari;

const ModelUsuari = require('./ModelUsuari.js');
const colleccio = "UsuarisTemporal";
const document = {

  "usuari":{
    "nom_usuari":"",
    "correu":"",
    "contrasenya":"",
    "tipus_registracio" : "intern",
    "data_creacio":"",
    "estat_activacio": false,
  },

  "per_validar":{
    "encriptacio" : "",
    "dataCaducitat":""
  }
}

class UsuarisTemporal extends ModelUsuari{

  constructor(){
    super(colleccio);
    this.setModel(document);
  }


}

module.exports = UsuarisTemporal;

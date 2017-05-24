const ModelProjecte = require('./ModelProjecte.js');
const colleccio = "ProjectesTemporals";
const document = {

    "projecteTemporal":{
      "usuari_id":"",
      "titul":"",
      "descripcio":"",
      "imatges":[{ "nom":"", "tipus":"", "mida":"", "url":""}],
      "categoria":"",
      "tags":[],
      "te_donacio":false,
      "correu" : ""

    },

  "per_validar":{
    "confirmat" : false,
    "dataCaducitat":""
  }
}

class ProjecteTemporal extends ModelProjecte{

  constructor(colleccioEntrada = colleccio){
    super(colleccioEntrada);
    this.setModel(document);
  }


}

module.exports = ProjecteTemporal;

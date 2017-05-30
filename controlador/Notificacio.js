const path = require('path');
const ModelNotificacio = require(path.resolve('./models/Notificacions/ModelNotificacio.js'));

let model = new ModelNotificacio();

class Notificacio{

  constructor(){}

  llegit(req , res ,next){
    let idNotificacio = req.body.idNotificacio.toString();
    
    model.actualitzarNotificacio(idNotificacio , {"notificacio.llegit" : true})
    .then(resultat => res.send({llegit : true}))
    .catch(err => console.error(err));

  }
}

module.exports = Notificacio;

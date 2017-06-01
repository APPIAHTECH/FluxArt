const path = require('path');
const Query = require('./../models/Query.js');

const ModelProjecteTemporal = require(path.resolve('./models/projectes/ProjecteTemporal.js'));
const Utilitat = require(path.resolve('./controlador/Utilitats.js'));

let model = new ModelProjecteTemporal();
class ProjecteTemporal{

  constructor(){}

  afegirProjecteTemporal(req ,res , next){

    let estructura = {};
    estructura = model.getModel();
    
    estructura._id = Query.generarID();
    estructura.projecteTemporal.usuari_id = req.body.dadesUsuari._id;
    estructura.projecteTemporal.nom_usuari = req.body.dadesUsuari.usuari.nom_usuari
    estructura.projecteTemporal.titul = req.body.dadesProjecte.nomProjecte
    estructura.projecteTemporal.descripcio = req.body.dadesProjecte.descripcio;
    estructura.projecteTemporal.categoria = req.body.dadesProjecte.categoria;
    estructura.projecteTemporal.tags = req.body.dadesProjecte.tags;
    estructura.projecteTemporal.te_donacio = req.body.dadesProjecte.poderDonar;
    estructura.projecteTemporal.imatges = req.body.llistatImatges;
    estructura.projecteTemporal.correu = req.body.dadesUsuari.usuari.correu;
    estructura.per_validar.confirmat = false;
    estructura.per_validar.dataCaducitat = Utilitat.generarDataCaducitat();

    model.inserirProjecte(estructura).then(result =>  res.send({faltaPerConfirmar : true}) )
                                      .catch(err => {
                                        console.log('errror -> ' , err);
                                        res.status(501).send('alguna cosa no anat be afegirProjecteTemporal');
                                      });
  }
}

module.exports = ProjecteTemporal;

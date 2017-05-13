const path = require('path');
const ModelProjecte = require(path.resolve('./models/projectes/ModelProjecte.js'));
const colleccio = "Projecte";

let model = new ModelProjecte(colleccio);
class Projecte{

  constructor(){}

  obtenirProjectesSpecifiques(req , res)
  {
      let categoria = req.params.categoria;
      let quantitat = parseInt(req.params.quantitat);
      let camp = req.params.camp;
      let campOrdenacio = req.params.ordenacio;
      let filtratge = {} , condicio = {};
      filtratge[`projecte.${camp}`] = parseInt(campOrdenacio);
      condicio['projecte.categoria'] = categoria.toString();

       model.obtenirVariusProjectes(condicio , quantitat , filtratge)
      .then((projecte)=> res.send(projecte))
      .catch((err)=> console.log(err));
  }

  buscarPerTitul(req , res)
  {
    let tipusProjecte = req.query.projecte;

    console.log(req.query);
    if(typeof(tipusProjecte) ==   "undefined" || tipusProjecte == "")
      {res.redirect("/");}

    let condicio = {
      "projecte.titul" : {
        $regex : tipusProjecte,
        $options:"im",

      } //Busca tot els projecte amb el titul tipusProjecte i(case insensitive)
      //m (De diverses línies d'ajust de les línies que comencen amb el patró especificat)
    };

    model.obtenirProjectes(condicio).then((projectes)=> res.send(projectes))
    .catch((err)=> {
      console.error(err);
      res.status(500).send("Alguna cosa no anat be");
    });

  }

}

module.exports = Projecte;

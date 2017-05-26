const path = require('path');
const ModelProjecte = require(path.resolve('./models/projectes/ModelProjecte.js'));

let model = new ModelProjecte();

class Projecte{

  constructor(){}

  obtenirProjectesSpecifiques(req , res)
  {
      Projecte.dadesEntrada(req , res , (peticio)=>{

        let filtratge = {} , condicio = {};
        filtratge[`projecte.${peticio.camp}`] = peticio.campOrdenacio;
        condicio['projecte.categoria'] = peticio.categoria;

        model.obtenirVariusProjectes(condicio , peticio.quantitat , filtratge)
       .then((projecte)=> res.send(projecte))
       .catch((err)=> console.log(err));
      });

  }

  obtenidrProjecteID(req , res){
    let IDProjecte = req.params.id;

    if(IDProjecte){
      model.obtenirProjecte(IDProjecte)
      .then((resultat) =>  {
        res.send({ projecte : resultat[0] , exsisteix : true});
      } ).catch(err => console.error(err));

      }else{
        res.send({exsisteix : false});
      }
  }

  static dadesEntrada(req , res , callback){

    let peticio = {
      categoria : req.params.categoria.toString(),
      quantitat : parseInt(req.params.quantitat),
      camp : req.params.filtrar.toString(),
      campOrdenacio: parseInt(req.params.ordenacio)
    }

    if(req.params.data)
      peticio['data'] = new Date(req.params.data);

    callback(peticio);
  }

  obtenirMesProjectes(req , res){

    Projecte.dadesEntrada(req , res , (peticio)=>{

      let filtratge = {} ,  data = peticio.data;
      filtratge[`projecte.${peticio.camp}`] = peticio.campOrdenacio;

      console.log("dates -> ", data);
      model.obtenirVariusProjectes({"projecte.data_creacio":{$lt:data}} , peticio.quantitat , filtratge)
     .then((projecte)=> res.send(projecte))
     .catch((err)=> console.log(err));

    });
  }

  buscarPerTitul(req , res)
  {
    let tipusProjecte = req.query.projecte;

    if(tipusProjecte === "" || tipusProjecte === "undefined")
      res.status(202).send("no es pot procedir amb la peticio demanat");
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

  actualitzarVisitas(req , res , nex){
    let idProjecte = req.body.idProjecte;
    model.actualitzacioIncremental(idProjecte , {"projecte.visitas" : 1})
    .then(resultat => {
      res.send({visitat : true});
    }).catch((err)=> console.error(err));
  }

  inserirComentari(req , res , nex){

    let idProjecte = req.body.idProjecte;
    let comentar = {
      idProjecte : req.body.idProjecte,
      url_img : req.body.url_img,
      IDUsuari : req.body.IDUsuari,
      missatge: req.body.missatge,
      nomUsuari : req.body.nomUsuari,
      data : req.body.data,
      comentari : req.body.comentari
    }

    model.actualitzarProjectPushArray(idProjecte , { $push: { "projecte.comentaris": comentar } })
    .then((resultat) => {

      model.actualitzarProjecte(idProjecte , {"projecte.comentaris_total" : comentar.comentari + 1})
      .then(resultat => {
        res.send({inserit : true});
      }).catch((err)=> console.error(err));

    })
    .catch((err) => {
      console.error(err);
      res.send({inserit : false});
    });

  }

  actualitzarLikes(req , res , next){

    let likes = {
      idProjecte : req.body.idProjecte,
      IDUsuari : req.body.IDUsuari
    }

    model.actualitzarProjectPushArray(likes.idProjecte , { $push: { "projecte.like": likes } })
    .then((resultat) => res.send({inserit : true}))
    .catch((err) => {
      console.error(err);
      res.send({inserit : false});
    });


  }

}

module.exports = Projecte;

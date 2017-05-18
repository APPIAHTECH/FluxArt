const ModelUsuari = require('./../models/usuaris/ModelUsuari.js');
const ModelProjecte = require('./../models/projectes/ModelProjecte.js');

let model = new ModelUsuari();

class Usuari{

  constructor()
  {}

  obtenirUsuariID(req , res)
  {
    model.obtenirPerfil(req.params.id)
    .then((perfil)=> {
      res.send(perfil)
    }).catch((err)=> {
      console.error(err);
      res.status(500).send("Alguna cosa no anat be");
    });
  }

  recuperarTotDades(req, res , next){

    let IDusuari = req.user[0]._id;
    let modelProject = new ModelProjecte();
    let dades = {
      perfil : {},
      treballs : []
    }
    let perfil = model.obtenirPerfil(IDusuari);
    let projectes = modelProject.obtenirProjectesLimit(IDusuari , 50); //50 projectes

    //Donacions //https://images5.alphacoders.com/612/thumb-1920-612672.jpg

    //Seguint

    //Sessions

    Promise.all([perfil , projectes]).then((valors)=>{

      model.formattarCamp(valors[0][0] , (perfil)=>{
        dades.perfil = perfil;
        dades.treballs = valors[1];
        res.send(dades);
        next();
      });

    });

  }
}

module.exports = Usuari;

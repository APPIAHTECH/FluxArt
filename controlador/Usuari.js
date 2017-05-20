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

  actualitzarDades(req , res , next){

    //Si hi ha contrasenya nova  encriptar i guarda la nova,
    let dades = req.body;
    let comptes = [];;

    comptes.push(dades.compteGoogle);
    comptes.push(dades.compteFacebook);

    model.actualitzarPerfil(dades.id , {
      "usuari.nom" : dades.nom,
      "usuari.nom_usuari" : dades.nomUsuari,
      "usuari.correu" : dades.correu,
      "usuari.pais" : dades.pais,
      "usuari.provincia" : dades.provincia,
      "usuari.rebreNotificacions" : dades.rebreNotificacions,
      "usuari.compte_paypal" : dades.comptePaypal,
      "usuari.lloc_web" : dades.llocWeb,
      "usuari.compte_soccials" : comptes

    }).then(resultat => res.send({actualizat : true})).catch(err => {actualizat : false});
  }

  eliminarDades(req , res , next){
    let id = req.body.IDUsuari;
    if(req.user){
      req.session.destroy(()=>{ res.send({tancatSessio : true}) });
      if (id) model.borarUsuari(id).then(resultat => res.send({borrat : true})).catch(err => res.send({borrat : false , error : err}));
    }

  }
}

module.exports = Usuari;

const express = require('express');
const path = require('path');
const router = express.Router();

const Projecte = require('./../controlador/Projecte.js');
const ProjecteTemporal = require('./../controlador/ProjecteTemporal.js');
const Usuari = require('./../controlador/Usuari.js');
const Autenticacio = require('./../controlador/Autenticacio.js');

let controladorProjecte = new Projecte();
let controladorProjecteTemporal = new ProjecteTemporal()
let controladorUsuari = new Usuari();

/* peticio dades /peticio . */
router.get('/peticio/projecte/:categoria/:quantitat/:filtrar/:ordenacio', controladorProjecte.obtenirProjectesSpecifiques);

router.get('/peticio/projecte/:categoria/:quantitat/:filtrar/:ordenacio/:data', controladorProjecte.obtenirMesProjectes);

router.get('/peticio/buscar', controladorProjecte.buscarPerTitul);

router.get('/peticio/usuari/:id' , controladorUsuari.obtenirUsuariID);

router.get('/peticio/perfil/:nomUsuari' , controladorUsuari.obtenirUsuariNomUsuari);

router.get('/peticio/dades', Autenticacio.esAutentificat , controladorUsuari.recuperarTotDades);

router.get('/peticio/tancarSessio', (req , res)=>{

  if(req.user)
    req.session.destroy(()=>{ res.send({tancatSessio : true}) });
  else
    res.status(202).send({tancatSessio : false});
});


router.get('/peticio/teSessio', (req , res)=>{

  if(req.user)
    res.send({sessio : true});
  else
    res.send({sessio : false});

});

router.post('/peticio/actualitzar', Autenticacio.esAutentificat , controladorUsuari.actualitzarDades);

router.post('/peticio/eliminar', Autenticacio.esAutentificat , controladorUsuari.eliminarDades);

router.post('/peticio/pujar', Autenticacio.esAutentificat  , controladorProjecteTemporal.afegirProjecteTemporal);

module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();

const Projecte = require('./../controlador/Projecte.js');
const ProjecteTemporal = require('./../controlador/ProjecteTemporal.js');
const Usuari = require('./../controlador/Usuari.js');
const Autenticacio = require('./../controlador/Autenticacio.js');
const Seguir =  require('./../controlador/Seguir.js');
const Notificacio = require('./../controlador/Notificacio.js');

let controladorProjecte = new Projecte();
let controladorProjecteTemporal = new ProjecteTemporal()
let controladorUsuari = new Usuari();
let controladorSeguir = new Seguir();
let controladorNotificacio = new Notificacio();

/* peticio dades /peticio . dades representa int o date*/
router.get('/peticio/projecte/:categoria/:quantitat/:filtrar/:ordenacio', controladorProjecte.obtenirProjectesSpecifiques);

router.get('/peticio/projecte/:categoria/:quantitat/:filtrar/:ordenacio/:dades', controladorProjecte.obtenirMesProjectes);

router.get('/peticio/seguidor/projecte/:quantitat/:filtrar/:ordenacio/:id', Autenticacio.esAutentificat , controladorProjecte.obtenirProjectesSeguidors);

router.get('/peticio/seguidor/projecte/:quantitat/:filtrar/:ordenacio/:id/:dades', Autenticacio.esAutentificat , controladorProjecte.obtenirMesProjectesSeguidors);

router.get('/peticio/projecte/amb/:id', controladorProjecte.obtenidrProjecteID);

router.get('/peticio/projecte/usuari/:categoria/:quantitat/:filtrar/:ordenacio/:nomUsuari', controladorProjecte.recuperarProjecteUsuari);

router.get('/peticio/projecte/usuari/:categoria/:quantitat/:filtrar/:ordenacio/:nomUsuari/:dades', controladorProjecte.recuperarMesProjectesUsuari);

router.get('/peticio/buscar', controladorProjecte.buscarPerTitul);

router.get('/peticio/usuari/:id' , controladorUsuari.obtenirUsuariID);

router.get('/peticio/dissenyadors/:quantitat/:filtrar/:ordenacio/:id' , controladorUsuari.obtenirUsuariDissenyadors);

router.get('/peticio/perfil/:nomUsuari' , controladorUsuari.obtenirUsuariNomUsuari);

router.get('/peticio/dades', Autenticacio.esAutentificat , controladorUsuari.recuperarTotDades);

router.get('/peticio/usuari/seguint/:id', Autenticacio.esAutentificat , controladorSeguir.recuperarSeguidors);

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

router.post('/peticio/seguir', controladorSeguir.seguirDissenyador);

router.post('/peticio/notificacio/llegit', controladorNotificacio.llegit);

router.post('/peticio/actualitzar', Autenticacio.esAutentificat , controladorUsuari.actualitzarDades);

router.post('/peticio/projecte/actualitzar/visitas', Autenticacio.esAutentificat , controladorProjecte.actualitzarVisitas);

router.post('/peticio/projecte/inserir/comentaris', Autenticacio.esAutentificat , controladorProjecte.inserirComentari);

router.post('/peticio/projecte/actualitzar/likes', Autenticacio.esAutentificat , controladorProjecte.actualitzarLikes);

router.post('/peticio/projecte/actualitzar/nolike', Autenticacio.esAutentificat , controladorProjecte.noAgrada);

router.post('/peticio/eliminar', Autenticacio.esAutentificat , controladorUsuari.eliminarDades);

router.post('/peticio/pujar', Autenticacio.esAutentificat  , controladorProjecteTemporal.afegirProjecteTemporal);

module.exports = router;

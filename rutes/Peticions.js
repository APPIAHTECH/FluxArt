const express = require('express');
const router = express.Router();

const Projecte = require('./../controlador/Projecte.js');
const Usuari = require('./../controlador/Usuari.js');
const Autenticacio = require('./../controlador/Autenticacio.js');

let controladorProjecte = new Projecte();
let controladorUsuari = new Usuari();

/* peticio dades /peticio . */
router.get('/peticio/projecte/:categoria/:quantitat/:filtrar/:ordenacio', controladorProjecte.obtenirProjectesSpecifiques);

router.get('/peticio/projecte/:categoria/:quantitat/:filtrar/:ordenacio/:data', controladorProjecte.obtenirMesProjectes);

router.get('/peticio/buscar', controladorProjecte.buscarPerTitul);

router.get('/peticio/usuari/:id' , controladorUsuari.obtenirUsuariID);

router.get('/peticio/dades', Autenticacio.esAutentificat , controladorUsuari.recuperarTotDades);

router.post('/peticio/actualitzar', Autenticacio.esAutentificat , controladorUsuari.actualitzarDades);

router.post('/peticio/eliminar', Autenticacio.esAutentificat , controladorUsuari.eliminarDades);

router.get('/peticio/tancarSessio', (req , res)=>{

  if(req.user)
    req.session.destroy(()=>{ res.send({tancatSessio : true}) });
  else
    res.status(202).send({tancatSessio : false});
});


module.exports = router;

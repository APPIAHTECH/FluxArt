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

router.get('/peticio/usuari', Autenticacio.esAutentificat , controladorUsuari.recuperarTotDades);


module.exports = router;

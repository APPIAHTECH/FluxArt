const express = require('express');
const router = express.Router();

const Projecte = require('./../controlador/Projecte.js');
const Usuari = require('./../controlador/Usuari.js');

let controladorProjecte = new Projecte();
let controladorUsuari = new Usuari();

/* peticio dades /peticio . */
router.get('/peticio/projecte/:categoria/:quantitat/:filtrar/:ordenacio', controladorProjecte.obtenirProjectesSpecifiques);

router.get('/peticio/buscar/projecte', controladorProjecte.buscarPerTitul);

router.get('/peticio/usuari/:id' , controladorUsuari.obtenirUsuariID);


module.exports = router;

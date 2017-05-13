const express = require('express');
const path = require('path');
const router = express.Router();

const passport = require('passport');
const Projecte = require('./../controlador/Projecte.js');
const Usuari = require('./../controlador/Usuari.js');
const Autenticacio = require('./../controlador/Autenticacio.js');


router.get('/backend' , Autenticacio.esAutentificat);
router.use('/backend' , express.static(path.resolve('./backend')));

module.exports = router;

const express = require('express');
const passport = require('passport');
const router = express.Router();

const Autenticacio = require('./../controlador/Autenticacio.js');
const Usuari = require('./../controlador/Usuari.js');

let controladorUsuari = new Usuari();

Autenticacio.google();
Autenticacio.facebook();
Autenticacio.intern();

router.get('/google', passport.authenticate('google', { scope: ['email' , 'profile'] })); //scope Les dades que es vol poder accedir
router.get('/google/callback',  passport.authenticate('google', { successRedirect: '/api/backend', failureRedirect: '/'}));
router.get('/facebook', passport.authenticate('facebook'));
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/api/backend', failureRedirect: '/' }));
router.get('/intern/registrar/verificar/:encriptacio', Autenticacio.verificar);

router.post('/intern', passport.authenticate('local'),(req , res)=> res.send({intern:true})); //Si tot va be enviar al client status 200 en cas contrari 401
router.post('/intern/registrar', Autenticacio.registrar);



module.exports = router;

const express = require('express');
const path = require('path');
const router = express.Router();

const passport = require('passport');
const Autenticacio = require('./../controlador/Autenticacio.js');
const Administracio = require('./../controlador/Administracio.js');

let controladorAdmin =  new Administracio();
Autenticacio.intern();

router.use('/administracio' , express.static(path.resolve('./vistes/Admi')));

router.use('/administracio/projecte' , express.static(path.resolve('./vistes/Admi')));

router.get('/administracio/projecte/:idProjecte' , Autenticacio.esAutentificatAdmin , controladorAdmin.obtenirProjecte);

router.get('/administracio/projectes' , Autenticacio.esAutentificatAdmin , controladorAdmin.projectes);

router.get('/administracio/tancarSessio' , (req , res , next)=>{

  if(req.user) req.session.destroy(()=> res.redirect('/admin/administracio/iniciarSessio'));

});

router.get('/administracio' , Autenticacio.esAutentificatAdmin , controladorAdmin.dashboard);

router.post('/administracio/confirmat' , Autenticacio.esAutentificatAdmin , controladorAdmin.confirmarProjecte);

router.post('/administracio/denegar' , Autenticacio.esAutentificatAdmin , controladorAdmin.denegarProjecte);

router.post('/administracio/intern', passport.authenticate('local' ,  { successRedirect: '/admin/administracio', failureRedirect: '/admin/administracio/iniciarSessio' }));

router.get('/administracio/iniciarSessio' , (req , res)=> res.render('IniciarSessio', { titul: 'Flux Admin'}));

module.exports = router;

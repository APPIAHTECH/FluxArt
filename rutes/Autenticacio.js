const express = require('express');
const passport = require('passport');
const router = express.Router();

const Projecte = require('./../controlador/Projecte.js');
const Autenticacio = require('./../controlador/Autenticacio.js');

Autenticacio.google();
Autenticacio.facebook();

router.get('/google', passport.authenticate('google', { scope: ['email' , 'profile'] })); //scope Les dades que es vol poder accedir
router.get('/google/callback',  passport.authenticate('google', { successRedirect: '/api/backend', failureRedirect: '/'}));
router.get('/facebook', passport.authenticate('facebook')); //scope Les dades que es vol poder accedir
router.get('/facebook/callback', passport.authenticate('facebook', { successRedirect: '/api/backend', failureRedirect: '/' }));

module.exports = router;

const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const LocalStrategy = require('passport-local').Strategy;

const Utilitats = require('./Utilitats.js');
const credencials = require('./../config/credencials.js');
const ModelUsuari = require('./../models/usuaris/ModelUsuari.js');
const UsuarisTemporal = require('./../models/usuaris/UsuarisTemporal.js');
const colleccio = "PerfilUsuari";

let model = new ModelUsuari(colleccio);
let estructura = model.getModel(); //Retorna l'estructura del model usuari
let perfil = {};


class Autenticacio{

  constructor()
  {}

  static google()
  {
    passport.use(new GoogleStrategy({
      clientID: credencials.google.client_id,
      clientSecret: credencials.google.client_secret,
      callbackURL: credencials.google.redirect_uris[0]
    }, (token, tokenSecret, profile, done)=>{
      Autenticacio.resol(token, tokenSecret, profile, done , 'google' , {"usuari.nom_usuari" : profile.displayName}); //Busca els usuaris per seudo nom
    }));

  }

  static facebook()
  {
    passport.use(new FacebookStrategy({
      clientID: credencials.facebook.client_id,
      clientSecret: credencials.facebook.client_secret,
      callbackURL: credencials.facebook.redirect_uris[0],
      profileFields: credencials.facebook.profileFields, //Les dades ha recuperar
    }, (token, tokenSecret, profile, done)=>{
      Autenticacio.resol(token, tokenSecret, profile, done , 'facebook' ,{"usuari.nom_usuari" : profile.displayName}); //Busca els usuaris per seudo nom
    }));

  }

  static intern()
  {
    Autenticacio.generarSessio(true);
    passport.use(new LocalStrategy({
      usernameField: 'nomUsuari',
      passwordField: 'contrasenya'
    } ,(nomUsuari , contrasenya , done)=>{
      //Buscant usuari amb les credencials entrades
      model.obtenirUsuaris({"usuari.nom_usuari": nomUsuari})
      .then((resultat)=> {

        if(!resultat[0]) //Si no hi ha usuari
          return done(null , false);

          Utilitats.compararContrasenyaEncriptat(contrasenya, resultat[0].usuari.contrasenya)
          .then((sonIguals)=>{

            console.log("Resultat de comparacio -> ", sonIguals);
            if(sonIguals)
              return done(null , resultat);
            else
              return done(null , false);

          }).catch((err) =>{
            console.error(err);
            return done(err);
          });


      }).catch((err) =>{
        console.error(err);
        return done(err);
      });

    }));

  }

  static resol(token, tokenSecret, profile, done , proveidor , condicio)
  {
    Autenticacio.generarSessio(false);
    model.obtenirUsuaris(condicio)
    .then((usuari)=> {

      if(usuari.length == 0) //Si l'usauri no esta definit
      {
        perfil = Autenticacio.estructurar(estructura , profile , proveidor);
        model.inserirUsuari(perfil)
        .catch((err) => {
          console.log(err);
          done(err);
        });

        done(null , perfil);//done(err , user , info) iniquem el modul passport que ja em operat amb el usuari.
      }else
        done(null, false , { message: 'Usuari ja esta en db.' });

    }).catch((err)=> {
      console.log(err);
      done(err);
    });

  }

  static estructurar(perfil , profile , proveidor) //profile representa el perfil que entra el proveidor
  {
    if(proveidor === 'google')
    {
        perfil.usuari.usuari_proveidor_id = profile.id;
        perfil.usuari.nom = profile.name.givenName;
        perfil.usuari.nom_usuari = profile.displayName;
        perfil.usuari.correu = profile.emails[0].value;
        perfil.usuari.url_img = profile.photos[0].value;
        perfil.usuari.compte_soccials = [profile.provider];
        perfil.usuari.tipus_registracio = profile.provider;
        perfil.usuari.estat_activacio = true;
        perfil.usuari.data_validacio = new Date();

    }else if(proveidor === 'facebook'){

      perfil.usuari.usuari_proveidor_id = profile.id;
      perfil.usuari.nom_usuari = profile.displayName;

      if(typeof(profile.emails) != 'undefined')//DE MONENBT NOTE L'API DE facebook NO VOL DONAR EMIAL :()
        profile.emails[0].value;

      perfil.usuari.url_img = profile.profileUrl;
      perfil.usuari.compte_soccials = [profile.provider];
      perfil.usuari.tipus_registracio = profile.provider;
      perfil.usuari.estat_activacio = true;
      perfil.usuari.data_validacio = new Date();
    }

    return perfil;
  }

  static generarSessio(intern = false)
  {
    passport.serializeUser((perfil, done) =>{ //Serialitza el sobrenom del usuari a sessio

      if(intern) //Si l'autenticacio es de manera intern
        return done(null , perfil[0].usuari.nom_usuari);
      else
        return done(null, perfil.usuari.nom_usuari); //autenticacio externa
    });

    //Si es fa una req.user recupera de la bd el les dades de l'usuari.
    passport.deserializeUser((nom_usuari, done) =>{
      model.obtenirUsuaris({"usuari.nom_usuari" : nom_usuari})
      .then((perfil)=> done(null , perfil))
      .catch((err) => done(err));
    });
  }

  static registrar(req , res , next){
    let model = new UsuarisTemporal();
    let estructura = model.getModel();

    let dadesUsuari = {
      nomUsuari : req.body.nomUsuari,
      contrasenya : req.body.contrasenya,
      correu : req.body.correu
    }

    Autenticacio.comprovarNomUsuari(dadesUsuari.nomUsuari).then((usuari)=>{

      if(usuari[0])
        res.status(202).send('NomExisteix');
      else {

        Autenticacio.comprovarCorreu(dadesUsuari.correu).then((usuariCorreu)=>{

          if(usuariCorreu[0])
            res.status(202).send('CorreuExisteix');
          else
          {
            Utilitats.encriptarContrasenya(dadesUsuari.contrasenya).then((contrasenya)=>{

              estructura.usuari.nom_usuari = dadesUsuari.nomUsuari;
              estructura.usuari.correu = dadesUsuari.correu;
              estructura.usuari.contrasenya = contrasenya;
              estructura.usuari.tipus_registracio = ['intern'];
              estructura.usuari.data_creacio = new Date();
              estructura.usuari.estat_activacio = "pendent";
              estructura.per_validar.encriptacio = Utilitats.generarStringEncriptat(dadesUsuari.correu);
              estructura.per_validar.dataCaducitat = Utilitats.generarDataCaducitat();

              //NOTE: opcionsCorreu Canviar html pasar plantilla crear const from eunisae...
              model.inserirUsuari(estructura).then((resultat)=>{

                let link = Utilitats.location(req) + "/autenticacio/intern/registrar/verificar/"+estructura.per_validar.encriptacio;
                let opcionsCorreu = {
                    from: '"eunisae" <eunisaesea@gmail.com>', // sender address
                    to: dadesUsuari.correu, // list of receivers
                    subject: 'Hello ✔ confirmar registracio', // Subject line
                    text: 'Hello confirmar registracio a Flux '+link, // plain text body
                    html: '<b>Hello confirmar registracio a Flux</b>'+link // html body
                };

                Utilitats.enviarCorreu(opcionsCorreu);
                res.send("confirmar correu");
              }).catch((err)=> console.error(err));

            });


          }

        }).catch((err)=> console.error(err));
      }

    }).catch((err)=> console.error(err));



  }

  static operar()
  {

  }
  static verificar(req , res , next){

    let model = new UsuarisTemporal();
    let modelUsuari = new ModelUsuari(colleccio);
    let perfil = modelUsuari.getModel();
    let encriptacio = req.params.encriptacio;

    model.obtenirUsuaris({"per_validar.encriptacio" : encriptacio}).then((usuariTemporal)=>{

      if(!usuariTemporal[0]) //Si no hi ha cap usuari amb l'encriptacio correspondent o ha set validat
        res.redirect('/');

        usuariTemporal[0].usuari.estat_activacio = true
        perfil.usuari.nom_usuari = usuariTemporal[0].usuari.nom_usuari;
        perfil.usuari.correu = usuariTemporal[0].usuari.correu;
        perfil.usuari.contrasenya = usuariTemporal[0].usuari.contrasenya;
        perfil.usuari.tipus_registracio = usuariTemporal[0].usuari.tipus_registracio;
        perfil.usuari.estat_activacio = usuariTemporal[0].usuari.estat_activacio;
        perfil.usuari.data_validacio = new Date();

        modelUsuari.inserirUsuari(perfil)
        .then((resultat)=> {
          model.borarUsuari(usuariTemporal[0]._id).catch((err)=> console.error(err));
          res.redirect('/#/iniciarSessio'); //El client
        }).catch((err)=> console.error(err));

    }).catch((err) => console.error(err));

  }

  static esAutentificat(req , res , next)
  {
    if(req.user) //Si te sessio
        next();
    else //Si no te sessio
      res.send('Validar', 'Te has de validar <a href='/'>inici</a>');
  }

  static comprovarCorreu(correu)
  {
    return new Promise((resolve , reject) =>{
      model.obtenirUsuaris({"usuari.correu" : correu})
      .then((usuari)=> resolve(usuari))
      .catch((err)=> reject(err));
    });
  }

  static comprovarNomUsuari(nomUsuari)
  {
    return new Promise((resolve , reject) =>{
      model.obtenirUsuaris({"usuari.nom_usuari" : nomUsuari})
      .then((usuari)=> resolve(usuari))
      .catch((err)=> reject(err));
    });
  }
}

module.exports = Autenticacio;

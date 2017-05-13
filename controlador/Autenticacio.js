const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;

const credencials = require('./../config/credencials.js');
const ModelUsuari = require('./../models/usuaris/ModelUsuari.js');
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

  static resol(token, tokenSecret, profile, done , proveidor , condicio)
  {
    Autenticacio.generarSessio();
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

  static generarSessio()
  {

    passport.serializeUser((perfil, done) =>{ //Serialitza el sobrenom del usuari a sessio
      done(null, perfil.usuari.nom_usuari);
    });

    //Si es fa una req.user recupera de la bd el les dades de l'usuari.
    passport.deserializeUser((nom_usuari, done) =>{
      model.obtenirUsuaris({"usuari.nom_usuari" : nom_usuari})
      .then((perfil)=> done(null , perfil))
      .catch((err) => done(err));
    });
  }

  static esAutentificat(req , res , next)
  {
    if(req.user) //Si te sessio
        next();
    else //Si no te sessio
      res.send("Te has de validar <a href='/'>inici</a>");
  }

}

module.exports = Autenticacio;

const crypto = require('crypto');
const nodemailer = require('nodemailer');
const bcrypt  = require('bcrypt');
const url = require('url');
const fs = require('fs');

class Utilitats {
  constructor() {}

  static generarStringEncriptat(correu)
  {
    let rb = crypto.randomBytes(20);
    let cadenaEncriptat = crypto.createHash('sha1').update(rb + correu).digest('hex');
    return cadenaEncriptat;
  }

  static generarDataCaducitat(){
    let caduca = new Date();
    caduca.setHours(caduca.getHours() + 6); //6Horas
    return caduca;
  }

  static enviarCorreu(opcions , callback)
  {
    let transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'eunisaesea@gmail.com',
            pass: '8QK/Zv+7-[%_q}t;4k`)NaYGBcf[/4au'
        }
    });

    let mailOptions = opcions;

    transporter.sendMail(mailOptions, (error, info) => {
        if (error)
            {
              console.error(error);
              callback(false , error);
            }
      console.log('Missatge %s enviar amb exit a : %s', info.messageId, info.response);

      callback(true);
    });

  }

  static encriptarContrasenya(contrasenya)
  {
    return new Promise((resolve , reject)=>{
      bcrypt.hash(contrasenya, 10).then((hash)=> resolve(hash)).catch((err)=> reject(err));
    });
  }

  static compararContrasenyaEncriptat(contrasenyaUsuari , contrasenyaHash)
  {
    return new Promise((resolve , reject)=>{
     bcrypt.compare(contrasenyaUsuari, contrasenyaHash).then((hash)=> resolve(hash)).catch((err)=> reject(err));
   });
  }

  static location(req) { //Equivalent windowlocation
    return url.format({
        protocol: req.protocol,
        host: req.get('host')
    });
  }

  static llegirFitxer(ruta , callback){
    fs.readFile(ruta, 'utf8', (err,data) =>{
      if (err)
        return console.log(err);
      callback(data);
    });

  }

}

module.exports = Utilitats;

const fs = require("fs");
const path = require('path')
const ConnexioDB = require('./ConnexioDB');
const rutaActual = path.join(__dirname, '/');

class Migrar{

  constructor()
  {}

  static migrar(){

    var estructura_colleccions = Migrar.carregarEstructura();

    for (let [clau, valor] of estructura_colleccions.entries())
      ConnexioDB.inserirColleccio(clau , valor)//Inserint colleccio en BD

  }

  static carregarEstructura()
  {
    let estructura = new Map();

    //Introduir totes les colleccions que es vol afegir a la BD
    estructura.set(
      'PerfilUsuari',
      Migrar.obtenirFitxerJson(rutaActual +'colleccions/PerfilUsuari.json')
    );
    estructura.set(
      'Projecte',
      Migrar.obtenirFitxerJson(rutaActual + 'colleccions/Projecte.json')
    );
    estructura.set(
      'Donacions',
      Migrar.obtenirFitxerJson(rutaActual + 'colleccions/Donacions.json')
    );
    estructura.set(
      'Seguir',
      Migrar.obtenirFitxerJson(rutaActual + 'colleccions/Seguir.json')
    );
    estructura.set(
      'Seguit',
      Migrar.obtenirFitxerJson(rutaActual + 'colleccions/Seguit.json')
    );
    estructura.set(
      'Sessions',
      Migrar.obtenirFitxerJson(rutaActual + 'colleccions/Sessions.json')
    );

    return estructura
  }

  static obtenirFitxerJson(fitxer)
  {
    let data = fs.readFileSync(fitxer);
    let objecte = JSON.parse(data.toString());
    return objecte;
  }

}

module.exports = Migrar;

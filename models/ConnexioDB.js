const mongodb = require('mongodb');
const MongoClient = require('mongodb').MongoClient;

class ConnexioDB{

  constructor(){}

  //Mothodes de classe
  static host(){return "localhost";}
  static port(){return "27017";}
  static baseDades(){return "fluxDB";}

  static obtenirConnexio(){
    let url = "";
    let connexio = null;
    url = `mongodb://${ConnexioDB.host()}:${ConnexioDB.port()}/${ConnexioDB.baseDades()}`;
    connexio = MongoClient.connect(url); //Realitzant la connexio amb la BD
    return connexio;//Retorna un promise (db ,err)
  }

  static inserirColleccio(nom_colleccio , json)
  {
    ConnexioDB.obtenirConnexio()
    .then((db)=> {

        db.createCollection(nom_colleccio, (err, colleccio)=>{
          colleccio.insert(json); //insert en la colleccio un doc json
          console.log(`colleccio ${nom_colleccio} creat`);
          db.close();
        });

      })
      .catch((err)=> console.error("Error (inserirColleccio) : " , err));
  }

  static convertirAObjecteID(id) //Converteix un string ID a un ObjectID valid per a mongodb
  {return new mongodb.ObjectID(id);}

  static generarID(){
    {return new mongodb.ObjectID();}
  }

}

module.exports = ConnexioDB;

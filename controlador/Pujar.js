const CredencialsDrive = require('./../config/drive/CredencialsDrive');

class Pujar extends CredencialsDrive{

  constructor(rutaCredencials)
  {
    super(rutaCredencials);
    this.validarseDrive((auth)=>{
      console.log("Connexio amb drive oks :D" + auth);
    });
  }

}

module.exports = Pujar;

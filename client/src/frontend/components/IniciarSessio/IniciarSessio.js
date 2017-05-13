export default {

  props:{

    url:{
      type: String,
      required:false
    },
  },

  data(){
    return{
      nomUsuari : "",
      contrasenya : "",
      metode : "POST",
      peticio : window.location.href,
      urlIniciSessio : window.location.href + "autenticacio/intern"
    }
  },

  methods:{

    iniciarSessioGoogle()
    {
      this.login("GET" , "autenticacio/google");
    },

    iniciarSessioFacebook()
    {
      this.login("GET" , "autenticacio/facebook");
    },

    login(methods , url)
    {
      this.metode = methods;
      this.peticio += url;
      window.location.href = this.peticio;
    },

    iniciarSessio(event)
    {
      //event.preventDefault();
      this.peticio = this.urlIniciSessio;
      let formulari = event.target.form;

      if(this.validarDades())
      {
        if(this.estaUsuari(formulari))
        {
          console.log("Donant acces ...");
        }
      }else {
        alert("Les dades no son valides");
      }

    },

    validarDades()
    {
      if(this.nomUsuari.length >= 3 && this.nomUsuari.length <= 150 && this.nomUsuari != "undefined")
      {
        if(this.contrasenya.length != 0 && this.nomUsuari != "undefined")
            return true;
        else
          return false;
      }else
        return false;

    },

    notificar()
    {

    },

  }
}

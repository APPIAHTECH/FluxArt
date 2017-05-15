export default {

  data(){
    return{
      nomUsuari : "",
      contrasenya : "",
      correu : "",
      metode : "POST",
      peticio : "http://" + window.location.hostname + ":"+window.location.port+"/",
      urlIniciSessio : "autenticacio/intern/registrar",
      redirecionar : "api/backend",
      error :false,
      missatge : "Alguna cosa no anat be"
    }
  },

  methods:{

    RegistrarGoogle()
    {this.registrarExtern("GET" , "autenticacio/google");},

    RegistrarFacebook()
    {this.registrarExtern("GET" , "autenticacio/facebook");},

    registrarExtern(methods , url)
    {
      let urlSortida = this.peticio + url;
      this.metode = methods;
      window.location.href = urlSortida;
    },

    registrar(event)
    {
      event.preventDefault();
      let urlSortida = this.peticio + this.urlIniciSessio;
      console.log(urlSortida);

      if(this.validarDades()){

        let dades = {
          nomUsuari : this.nomUsuari,
          contrasenya : this.contrasenya,
          correu : this.correu
        }

        this.$http.post(urlSortida , dades).then((res)=>{
          console.log(res);
        }).catch((resposta) => console.error(resposta));
      }

    },

    validarDades()
    {
      //Validar les dades
      return true;
    }

  }
}

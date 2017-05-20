export default {

  data(){
    return{
      nomUsuari : "",
      contrasenya : "",
      metode : "POST",
      peticio : "http://" + window.location.hostname + ":"+window.location.port+"/",
      urlIniciSessio : "autenticacio/intern",
      redirecionar : "api/backend",
      error :false,
      missatge : "Alguna cosa no anat be"
    }
  },

  methods:{

    iniciarSessioGoogle()
    {this.login("GET" , "autenticacio/google");},

    iniciarSessioFacebook()
    {this.login("GET" , "autenticacio/facebook");},

    login(methods , url)
    {
      let urlSortida = this.peticio + url;
      this.metode = methods;
      window.location.href = urlSortida;
    },

    iniciarSessio(event)
    {
      event.preventDefault();
      let urlSortida = this.peticio + this.urlIniciSessio;

      if(this.validarDades()){
        let dades = {
          nomUsuari : this.nomUsuari,
          contrasenya : this.contrasenya
        }

        this.$http.post(urlSortida , dades).then((res)=>{

          if(res.ok) //Pot login {200 - 299} resposta.status
              this.$destroy();


        }).catch((resposta) => {

          if (resposta.status === 401) //No te autoritzacio
            this.notificar("Males credencials");
        });
      }

    },

    validarDades()
    {return this.nomUsuari != "undefined" && this.contrasenya.length != 0;},

    notificar(msg , tipus)
    {
      this.error = true;
      this.missatge = msg;
    },
  },

  beforeDestroy(){
    this.login('GET' , this.redirecionar);
  }
}

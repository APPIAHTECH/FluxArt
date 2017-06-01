export default {

  data(){
    return{
      nomUsuari : "",
      contrasenya : "",
      correu : "",
      metode : "POST",
      peticio : "http://" + window.location.hostname + ":"+window.location.port+"/",
      urlIniciSessio : "autenticacio/intern/registrar",
      redirecionar : "#/autenticacio/confirmar/",
      errorNom :false,
      errorCorreu : false,
      missatge : "Alguna cosa no anat be",
      posibleNom : "Son Vegeta" //Recuperar del server quin noms estan disponibles
    }
  },

  methods:{

    RegistrarGoogle()
    {this.confirmar("GET" , "autenticacio/google");},

    RegistrarFacebook()
    {this.confirmar("GET" , "autenticacio/facebook");},

    confirmar(methods , url)
    {
      let urlSortida = this.peticio + url;
      this.metode = methods;
      window.location.href = urlSortida;
    },

    registrar(event)
    {
      event.preventDefault();
      let urlSortida = this.peticio + this.urlIniciSessio;

      if(this.validarDades()){
        let dades = {
          nomUsuari : this.nomUsuari.trim(),
          contrasenya : this.contrasenya,
          correu : this.correu.trim()
        }

        this.$http.post(urlSortida , dades).then((res)=>{
          if(res.status === 200) //Si tot va be
            this.confirmar('GET' , this.redirecionar+this.correu);
        else if(res.status === 202)
        {
          if(res.bodyText === 'NomExisteix')
          {
            this.errorNom = true;
            this.missatge = "El nom existeix tria un altre :D";
          }
          else if(res.bodyText === 'CorreuExisteix')
            this.errorCorreu = true;
            this.missatge = "El correu ja estan sent usat";
        }

        }).catch((resposta) => console.error(resposta));
      }else
        alert("El camp de nom ha de ser caracters valids..");
    },

    validarDades()
    {
      let pattern = /[^A-Z][^a-z][^0-9]/g; //Busca de manera global si el caracter no es de a-z majus o minus o no es un numero , no accepto
      if(pattern.test(this.nomUsuari))
        return false;
      else
        return true;
    },
  }
}

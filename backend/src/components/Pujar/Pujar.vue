<template>
  <!--FALTA ACABAR DE IMPLEMENTAR-->
  <div class="pujar">
    <form  :method="metode" :action="url" :enctype="encriptacio">
        <h2>Col·loqui arxius aquí</h2>

        <div class="loader" ></div>
        <div v-bind:class="{loader_animar : animar}" id="semi_loader"></div>

        <div v-if="!animar" id="imgConte">
          <div class="imatge-pujada"></div>
        </div>

        <div v-else id="increment">
          <div><h2>{{increment}}</h2></div>
        </div>

        <div class="selecionar">
          <p><strong>or</strong></p>
          <p id="select">
            <label for="inputFixer" id="seleccio">{{msg}}</label>
            <input id="inputFixer" type="file" name="imatges" :accept="fitxersAcceptats" @change="obtenirImatges" multiple hidden>
            <input type="submit" @click="pujar">
          </p>
        </div>

    </form>
  </div>
</template>

<script>
export default{
  data(){
      return {
        metode : "post",
        url : "/upload", //A quina url s'enviara
        encriptacio : "multipart/form-data",
        fitxersAcceptats : "image/*", //els imatges que es permitran son jpg , png ,gif,
        midaMaxima : 2, //MB
        maximaQuantitatImatges: 5,
        msg : "seleccionar un imatge d'ordinador",
        llistat_imatges : [],
        animar : false,
        increment : 0,
        estatSeleccio : false //indica si el usuari ha seleccionat arxius
      }
    },

    methods:{
      obtenirImatges(event){
        let imatges = event.target.files || event.dataTransfer.files; //L'element que llença l'event en aquet cas input[file] , recuperem els fitxers (dataTransfer per drag i drop)

        if (imatges.length === 0 || imatges.length > this.maximaQuantitatImatges)
        {
          this.notificar();
          return;
        }
        Array.from(imatges).forEach((imatge) => {

          if(this.validarImatge(imatge))
           {
             this.convertirAUrlValid(imatge , (imatgeCodificat)=> this.llistat_imatges.push(imatgeCodificat));
             this.animar = true;
           }
           else
             alert("L'imatge "+imatge.name+" no es valid");
        }); //El files retorna un FileList per tal de iterrar , el paso a array i recupero cada element

      },

      validarImatge(imatge)
      {
        let midaMaxima = this.midaMaxima * 1024 * 1024; //File.size es en bytes
        if(imatge.type.match(this.fitxersAcceptats))//Si l'imatge no es de tipus jpg , jpeg , gif , png retorna null en cas de no coincidencia
        {
          if(imatge.size <= midaMaxima)
            return true;
        }
        return false;
      },

      resetejarValors()
      {
        this.llistat_imatges = [];
        this.increment = 0;
        this.estatSeleccio = false;
      },

      pujar(event){

        var formulari = new FormData(event.target.form);
        event.preventDefault();

        this.$http.post(this.url, formulari , {
          progress(e) {
            if (e.lengthComputable) this.increment = ((e.loaded / e.total ) * 100);
          }
        })
        .then((response)=>{
          console.log(response.body);
        })
        .catch((err)=> console.log(err));

      },

      convertirAUrlValid(imagte , callback){
        let reader = new FileReader(); //Method asyn
        reader.onload = (event)=> callback(reader.result);
        reader.readAsDataURL(imagte); //codifica el imatge en string per convertilo en un url valid
      },

      notificar(){alert("Ups , alguna cosa no ha nat be");}
    }
}


</script>

<style scoped>
@import url('https://fonts.googleapis.com/css?family=Roboto');

form
{height: 400px;}
div.pujar
{
  width: 70%;
  height: auto;
  background: #FAFAFA;
  margin: 0 auto;
  padding: 10px;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

h2{
  text-align:center;
  font-family: 'Roboto', sans-serif;
  font-size: 25pt;
  opacity: .4;
  font-weight: lighter;
  color: #9E9E9E;
}

div.loader {

  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin: 10px auto;
  background: white;
  box-shadow: 5px 10px 5px #888888;
}

div#semi_loader
{
  border-radius: 50%;
  width: 200px;
  height: 200px;
  margin: 10px auto;
  position: relative;
  top: -53%;
}

div.loader_animar
{
  border-top: 5px solid #f44336;
  animation: animacioCercle 2s linear infinite;
}

div.imatge-pujada
{
  width: 80px;
  height:80px;
  background-image: url('https://cdn1.iconfinder.com/data/icons/hawcons/32/698925-icon-92-inbox-download-512.png');
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
  margin: auto;
}

div.selecionar
{
  margin: auto;
  text-align: center;
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
  position: relative;
  top: -280px;
}

#select
{
  color:#03A9F4;
  margin-left: 10px;
}

#seleccio
{cursor: pointer;}

ul , li , a
{
  text-decoration: none;
  list-style: none;
}

div#imgConte
{
  position: relative;
  top: -370px;
}

ul#llista
{
  display: flex;
  flex-flow: row wrap;
  justify-content: center;
}

div#increment
{
  position: relative;
  top: -360px;
}

@keyframes animacioCercle {
  0% { transform: rotate(0deg); }
   100% { transform: rotate(360deg); }
}
</style>

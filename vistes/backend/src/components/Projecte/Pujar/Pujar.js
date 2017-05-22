import Utilitats from "./../../global/Utilitat.js";

export default{
  props: {

    dadesProjecte:{
      type:Object,
      required:true
    },

  },
  data(){
      return {
        metode : "post",
        url : Utilitats.rutaUrl() + "frontend/peticio/pujar", //A quina url s'enviara
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
             this.convertirAUrlValid(imatge , (imatgeCodificat)=> {
               this.llistat_imatges.push(imatgeCodificat);
               this.estatSeleccio = true;
             });
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
        event.preventDefault();
        this.animar = true;
        let dades = {

          llistatImatges : this.llistat_imatges,
          dadesProjecte : this.dadesProjecte,
          dadesUsuari : this.$store.getters.getUsuari
        }

        this.$http.post(this.url, dades , {
          progress(e) {
            if (e.lengthComputable){
              this.increment = ((e.loaded / e.total ) * 100);
              console.log("valor " , this.increment);
            }
          }
        }).then((response)=>{

          this.animar = false;
          this.resetejarValors();

          let res = response.body;
          console.log(res);
          if(res.faltaPerConfirmar)
            alert("El projecte a sent enviat. El teu projecte esta sent revisat per el departament de Flux  , de aqui una setmana aprox es confirmara el teu projecte");
          else
            alert("Alguna cosa no anat be , tornau a intentar si seguiex aixi contacta amb nosaltres.");

        }).catch((err)=> console.log(err));

      },

      convertirAUrlValid(imagte , callback){
        let reader = new FileReader(); //Method asyn
        reader.onload = (event)=> callback(reader.result);
        reader.readAsDataURL(imagte); //codifica el imatge en string per convertilo en un url valid
      },

      notificar(){alert("Ups , alguna cosa no ha nat be");}
    }
}

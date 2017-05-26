import Utilitat from './../global/Utilitat.js'
//NOTE : INIFINITE SCROLL NO TIRA ACABAR
export default {
  props:{

    quantitatProjectes:{
      type:Number,
      required:true
    },

    quantitatPermes:{
      type:Number,
      required:true
    }
  },

  data(){
    return{
      host : Utilitat.rutaUrl(),
      categories:[],
      popular:[],
      categoria : "Illustracio",
      filtrar : "data_creacio", //filtrar per visitas
      ordenacio : -1, //1 DEC -1 ASC
      llistatProjectes : [],
      ocupat: false,
      distancia : 20,
      projecteRecent : "",
      urlVisitas : Utilitat.rutaUrl() + 'frontend/peticio/projecte/actualitzar/visitas',
      url : "",
      urlUsuari: "",
      urlBusqueda:"",
      urlMesProjectes:""
    }
  },

  methods:{

    carregarMes(){
      this.ocupat = true;
      if(this.llistatProjectes.length > 0)
      {
        let resultat;
        if(this.llistatProjectes.length === this.quantitatPermes)
        {
          alert("registret per poder veure mes :D");
          return;
        }
        resultat = this.llistatProjectes[this.llistatProjectes.length - 1];
        this.projecteRecent = new Date(resultat.projecte.data_creacio);
        this.urlMesProjectes = `${this.url}${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${this.projecteRecent}`;
        this.resoldrePeticio(this.urlMesProjectes);
      }
    },

    obtenirProjectesLimitat()
    {
      let url = this.url;
      url += `${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}`;
      this.resoldrePeticio(url);
    },

    resoldrePeticio(url)
    {
      Utilitat.peticioGet(url) //Demanat projectes
      .then((projectes)=> {

        if(projectes.length === 0)
        {
          this.ocupat = true;
          // this.notificar();
          return;

        }else {

          projectes.forEach((projecte)=> { //Per cada projecte obtenc el seu propietari

            let idUsuari = projecte.projecte.usuari_id;
            let peticio = `${this.urlUsuari}${idUsuari}`;

            Utilitat.peticioGet(peticio).then((usuari) => {

              if(usuari.length !== 0){
                projecte['info'] = usuari[0]; //Afegint les dades del propietari del projecte.
                this.llistatProjectes.push(projecte);
              }

              this.ocupat = false;
            }).catch((err) => console.error(err));

          });
        }

      }).catch((err) => console.error(err));
    },

    buidarProjectes(){
      this.llistatProjectes = [];
    },

    buscar(event)
    {
      this.ocupat = true;
      this.buidarProjectes();
      let valorBusqueda = event.target.value;
      if(valorBusqueda.length >= 3)
      {
        let url = `${this.urlBusqueda}?projecte=${valorBusqueda}`;
        this.resoldrePeticio(url);
      }
    },

    populars(event)
    {
      //popular:['Més Vist' , 'Més Comentades'],
      let butto = event.target.innerHTML;
      this.buidarProjectes();
      switch(butto) {
          case this.popular[0]: //Més Vist
              this.mesVist();
              break;
          case this.popular[1]: //Més Comentades
              this.mesComentades();
              break;
          default:
              console.log("Opcio no escollida :O");
      }
    },

    categoriesProjecte(event)
    {
      //categories : ['Illustracio' , 'Logotips' , "UX Experiencia de usuari" , "UI Interfície d'usuari" , 'Icones' , 'Disseny Web' , 'Aplicacions mobils'],
      let opcioEscollida = event.target.innerHTML;
      this.buidarProjectes();
      this.recuperarProjectes(opcioEscollida);
    },

    //resoldre(buidar , filtrar , ordenacio)
    //Buidant array de projectes (llistatProjectes) , ja que s'ha pogut filtrar i recoperar els projectes
    mesVist()
    {this.resoldre("visitas" , -1);},

    mesComentades()
    {this.resoldre("comentaris_total" , -1);},

    recuperarProjectes(categoria)
    {
      this.categoria = categoria;
      this.resoldre(this.filtrar , this.ordenacio);
    },

    resoldre(filtrar , ordenacio)
    {
        this.filtrar = filtrar;
        this.ordenacio = ordenacio;
        this.obtenirProjectesLimitat();
    },

    notificar()
    {
      //TODO CAMBIAR PER UNA NOTIFICAIO MILLOR :D
      alert("No hi ha resultat de busqueda ...");
    },

    detail(event){
      let id = event.target.dataset.idprojecte;
      Utilitat.peticioPost(this.urlVisitas , {idProjecte : id, visitas : 1});
      Utilitat.redirecionar(Utilitat.rutaUrl() + 'api/backend/#/visualitzar/projecte/'+id);
    },
  },

created(){
    Utilitat.esperar(()=>{
      this.url = this.host + "frontend/peticio/projecte/";
      this.urlBusqueda = this.host + "frontend/peticio/buscar";
      this.urlUsuari = this.host + "frontend/peticio/usuari/";
      this.categories = this.$store.getters.getCategories;
      this.popular = this.$store.getters.getPopular;
      this.obtenirProjectesLimitat() ; // Carregant els projectes ...
    })
  }
}

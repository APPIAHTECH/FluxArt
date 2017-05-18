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
      host : "http://" + window.location.hostname + ":"+window.location.port+"/",
      categories:['illustracio' , 'fan art'],
      categoria : "illustracio",
      popular:['Més Vist' , 'Més Comentades'],
      tags:[],
      filtrar : "data_creacio", //filtrar per visitas
      ordenacio : -1, //1 DEC -1 ASC
      llistatProjectes : [],
      ocupat: false,
      distancia : 10,
      carregantMesProjectes :false,
      projecteRecent : "",
      url : "",
      urlUsuari: "",
      urlBusqueda:"",
      urlMesProjectes:""
    }
  },

  methods:{

    carregarMes(){
      this.ocupat = true;
      let resultat;
      this.carregantMesProjectes = true;
      if(this.llistatProjectes.length > 0)
      {
        if(this.llistatProjectes.length === this.quantitatPermes)
        {
          this.carregantMesProjectes = false;
          alert("registret per poder veure mes :D");
          return;
        }
        resultat = this.llistatProjectes[0];
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

    peticioGet(url)
    {//NOTE : alguna cosa no funciona be revisar!
      console.log("que pasa -> ", this);
      return new Promise((resolve , reject) =>{

        console.log("peticioGet -> ", url);
        this.$http.get(url) //Demanat projectes
          .then((resposta) => {

              if(resposta){
                resposta.json().then((resultat) => resolve(resultat)).catch((err)=>{
                  reject(err);
                  console.error(err);
                });
              }
          }).catch((err)=> {
            console.error(err);
            reject(err);
          });
      });

    },

    resoldrePeticio(url)
    {
      this.peticioGet(url) //Demanat projectes
      .then((projectes)=> {

        if(projectes.length === 0)
        {
          this.notificar();
          return;

        }else {
          //Buidant array de projectes (llistatProjectes) , ja que s'ha pogut filtrar i recoperar els projectes
          if(!this.carregantMesProjectes)this.llistatProjectes = [];

          projectes.forEach((projecte)=> { //Per cada projecte obtenc el seu propietari

            let idUsuari = projecte.projecte.usuari_id;
            let peticio = `${this.urlUsuari}${idUsuari}`;

            console.log("URL QUE ESTRA -> ", peticio);
            this.peticioGet(peticio)
            .then((usuari) => {

              projecte['info'] = usuari[0]; //Afegint les dades del propietari del projecte.
              this.llistatProjectes.push(projecte);

            }).catch((err) => console.error(err));

          });

          this.carregantMesProjectes = false;
          this.ocupat = false;

        }

      }).catch((err) => {
        console.log("WTF ? ", err);
      });
    },

    buscar(event)
    {
      let valorBusqueda = event.target.value;

      if(valorBusqueda.length >= 3 || valorBusqueda.length === 0) //NOTE pensar en treura valorBusqueda.length === 0 ja que recupera tots el projectes de db!!
      {
        let url = `${this.urlBusqueda}?projecte=${valorBusqueda}`;
        this.resoldrePeticio(url);
      }
    },

    populars(event)
    {
      //popular:['Més Vist' , 'Més Comentades'],
      let butto = event.target.innerHTML;
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
      //categories:['illustracio' , 'fan art']

      let butto = event.target.innerHTML;
      switch(butto) {
          case this.categories[0]:
              this.recuperarProjectes(this.categories[0]);
              break;
          case this.categories[1]:
              this.recuperarProjectes(this.categories[1]);
              break;
          default:
              console.log("Opcio no valida :O");
      }
    },

    //resoldre(buidar , filtrar , ordenacio)
    mesVist()
    {
      this.resoldre("visitas" , -1);
    },

    mesComentades()
    {
      this.resoldre("comentaris_total" , -1);
    },

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
    }
  },

created(){
    this.url = this.host + "frontend/peticio/projecte/";
    this.urlBusqueda = this.host + "frontend/peticio/buscar";
    this.urlUsuari = this.host + "frontend/peticio/usuari/";
    setTimeout(() => this.obtenirProjectesLimitat() , 5); // Carregant els projectes ...
  }
}

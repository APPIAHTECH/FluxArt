import Utilitat from './../global/Utilitat.js';
export default {
  methods: {
    carregarMes(){

        this.ocupat = true;
        if(this.llistatProjectes.length > 0)
        {
          let resultat , url = "";
          if(this.llistatProjectes.length === this.quantitatPermes)
            return;

          resultat = this.llistatProjectes[this.llistatProjectes.length - 1];

          if(this.esVisitas)
            this.projecteRecent = resultat.projecte.visitas;
          else if(this.esComentaris)
            this.projecteRecent = resultat.projecte.comentaris_total;
          else
            this.projecteRecent = new Date(resultat.projecte.data_creacio);

            if(this.esSeguidors){
              this.projecteRecent = resultat.projecte.data_creacio;
              this.llistatSeguint.forEach((objecte)=>{
                url = `${this.urlProjecteSeguidors}${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${objecte.seguir.dades.id_usuaris_seguint}/${this.projecteRecent}`;
                this.resoldrePeticio(url);
              });

            }else if(this.esAltres){

              if(!this.esFora) { //Si la peticio no ve del frontend 'http://localhost:3000/#/perfil/Stephen'

                if(this.$route.params.nomUsuari){

                  if(this.$route.params.nomUsuari == this.$store.getters.getUsuari.usuari.nom_usuari)
                    this.urlMesProjectes = `${this.url}${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${this.$store.getters.getUsuari.usuari.nom_usuari}/${this.projecteRecent}`;
                  else
                    this.urlMesProjectes = `${this.url}${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${this.$route.params.nomUsuari}/${this.projecteRecent}`;

                }else
                  this.urlMesProjectes = `${this.url}${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${this.$store.getters.getUsuari.usuari.nom_usuari}/${this.projecteRecent}`;
                  this.resoldrePeticio(this.urlMesProjectes);
              }else {
                this.urlMesProjectes = `${this.url}${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${this.dadesFora.nomUsuari}/${this.projecteRecent}`;
                this.resoldrePeticio(this.urlMesProjectes);
              }

            }else{
              this.urlMesProjectes = `${this.url}${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${this.projecteRecent}`;
              this.resoldrePeticio(this.urlMesProjectes);
            }
        }
        this.ocupat = false;
      },

      obtenirProjectesLimitat(altres, nomUsuari)
      {
        let url = "";

        if(!altres)
          url = `${this.url}${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}`;
        else
          url = `${this.url}${this.categoria}/${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${nomUsuari}`;

        this.resoldrePeticio(url);
      },

      projectesSeguidors(){

        let url ="";
        let idUsuari = this.$store.getters.obtenirID;
        this.esVisitas = false;
        this.esComentaris = false;
        this.esSeguidors = true;
        this.buidarProjectes();

        this.llistarSeguidors(idUsuari , (seguidors)=>{
          this.llistatSeguint = seguidors;
          seguidors.forEach((objecte)=>{
            url = `${this.urlProjecteSeguidors}${this.quantitatProjectes}/${this.filtrar}/${this.ordenacio}/${objecte.seguir.dades.id_usuaris_seguint}`;
            this.resoldrePeticio(url);
          });
        });

      },

      llistarSeguidors(idUsuari , callback){
        let urlSeguinr = this.urlSeguir + idUsuari;
        Utilitat.peticioGet(urlSeguinr)
        .then((resultat)=> callback(resultat))
        .catch(err => console.error(err));
      },

      resoldrePeticio(url)
      {
        Utilitat.peticioGet(url) //Demanat projectes
        .then((projectes)=> {

          if(projectes.length === 0){
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
        // this.ocupat = true;
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
        //['Recents' , 'Més Vist' , 'Més Comentades'],
        let opcioEscollida = event.target.innerHTML;
        this.buidarProjectes();
        if(opcioEscollida === 'Recents')
          this.mesRecent();
        else if(opcioEscollida === 'Més Vist')
          this.mesVist();
        else
          this.mesComentades();
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
      {
        this.esVisitas = true;
        this.esComentaris = false;
        this.esSeguidors = false;
        this.resoldre("visitas" , -1);
      },

      mesComentades()
      {
        this.esVisitas = false;
        this.esComentaris = true;
        this.esSeguidors = false;
        this.resoldre("comentaris_total" , -1);
      },

      mesRecent()
      {
        this.esVisitas = false;
        this.esComentaris = false;
        this.esSeguidors = false;
        this.resoldre("data_creacio" , -1);
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

          if(this.esAltres){


            if(!this.esFora){
              if(this.$route.params.nomUsuari){

                if(this.$route.params.nomUsuari == this.$store.getters.getUsuari.usuari.nom_usuari)
                  this.obtenirProjectesLimitat(true , this.$store.getters.getUsuari.usuari.nom_usuari);
                else
                    this.obtenirProjectesLimitat(true , this.$route.params.nomUsuari);

              }else
                this.obtenirProjectesLimitat(true , this.$store.getters.getUsuari.usuari.nom_usuari);
            }else{
              this.obtenirProjectesLimitat(true , this.dadesFora.nomUsuari);
            }

          }else{
            this.obtenirProjectesLimitat(false);
          }

      },

      detail(event){
        let id = event.target.dataset.idprojecte;
        Utilitat.peticioPost(this.urlVisitas , {idProjecte : id, visitas : 1});
        Utilitat.redirecionar(Utilitat.rutaUrl() + 'api/backend/#/visualitzar/projecte/'+id);
      },

      setejarUrls(url , urlBusqueda , urlUsuari , urlProjecteSeguidors , urlSeguir){

        this.url = url;
        this.urlBusqueda = urlBusqueda;
        this.urlUsuari = urlUsuari;
        this.urlProjecteSeguidors = urlProjecteSeguidors;
        this.urlSeguir = urlSeguir;

      },

      veurePerfil(event){
        Utilitat.redirecionar('#/perfil/'+event.target.dataset.nomusuari);
      }
    }
}

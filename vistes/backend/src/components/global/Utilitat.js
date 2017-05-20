import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

const temps = 100;//1s
class Utilitat {
  constructor() {}


  static redirecionar(url){
    window.location.href = url;
  }

  static validarFormulari(){

  }

  static esperar(callback){

    setTimeout(() => {
      callback();
    }, temps);
  }

  static rutaUrl(){
    return "http://" + window.location.hostname + ":"+window.location.port+"/";
  }

  static peticioGet(url)
  {
    if(!url)
      new Error("No has definit url");
    return new Promise((resolve , reject) =>{

      Vue.http.get(url)
        .then((resposta) => {
            if(resposta && resposta.status === 200){
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

  }

  static peticioPost(url , cos){
    if(!url)
      new Error("No has definit url");

    return new Promise((resolve , reject) =>{

      Vue.http.post(url , cos)
        .then((resposta) => {

          if(resposta && resposta.status === 200){
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
  }
}

export default Utilitat;

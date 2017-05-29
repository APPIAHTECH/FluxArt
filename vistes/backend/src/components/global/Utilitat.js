import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);

const temps = 1000;//1ms
const icone = "https://codeanywhere.com/images/plane.svg";
class Utilitat {
  constructor() {}


  static redirecionar(url){
    window.location.href = url;
  }

  static validarFormulari(dades){
  }

  static esperar(callback){

    setTimeout(() => {
      callback();
    }, temps);
  }

  static notificar(titul , msg , tempsTancament = 5000){

    let opcions = {
        body: msg,
        icon: icone
    }
    let notificacio = new Notification(titul,opcions);
    setTimeout(notificacio.close.bind(notificacio), tempsTancament);
  }

  static demanarPermis(){
    if (!("Notification" in window))
        alert("El teu navegador no suporta sistema de notifications , intent en actualitzar el teu navegador");
    else if (Notification.permission === "granted")
      return true;
    else if (Notification.permission !== 'denied') {
      Notification.requestPermission(function (permission) {
        if (permission === "granted")
           return true;
      });
    }
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

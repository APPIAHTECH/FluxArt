
let url = 'http://' + window.location.host;

function enviarPeticio(url , cos){
  $.ajax({
         type: 'post',
         url: url,
         data: JSON.stringify(cos),
         contentType: "application/json; charset=utf-8",
         traditional: true,
         success: function (data) {

             if(data.confirmat)
                alert('Accions Confirmat');
            else
              alert('alguna consa no anat be');
         }
     });
}

function confirmar(event) {

  let urlConfirmar = url + '/admin/administracio/confirmat';
  let projecte = {projecConfirmat : dades};
  enviarPeticio(urlConfirmar , projecte);
}


function denegar() {
  let urlDenegar = url + '/admin/administracio/denegar';
  let projecte = {projecteDenegat : dades};
  enviarPeticio(urlDenegar , projecte);
}

function cambiar(event){

  let imatgeGran = document.getElementById('imatgeGran');
  let imatge = event.target.currentSrc;
  imatgeGran.src = imatge;
}

function mesGran(event){
  let finestra = window.open(event.target.currentSrc, "imatgeGran", "height=800,width=800");
}

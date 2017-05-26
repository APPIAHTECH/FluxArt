<template>
  <div class="contenidor">
    <div class="visualitzarProjecte">

      <div class="contenidorPrimer">

        <div class="capcelera">
          <div class="img perfilUrl" :style="{ 'background-image': 'url(' + imgPerfil + ')' }"></div> <p>{{nomUsuari}}</p>
          <div class="donar">
            <a href="https://plus.google.com/share?url={http://localhost:3000/#/visualitzar/projecte}" onclick="javascript:window.open(this.href,
            '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><img
            src="https://www.gstatic.com/images/icons/gplus-16.png" alt="Share on Google+"/></a>

            <a href="#" v-if="teDonacio"><img src="https://www.joomlashack.com/images/showcase/osdonate.png" alt="" id="pay"></a>

            <button type="button" @click="actualitzarLikes"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>


          </div>
        </div>


        <div class="contenidorImatge perfilUrl" :style="{ 'background-image': 'url(' + imatgeGran + ')' }"></div>
        <div class="llistatImatges">

          <div v-for="imatge in llistatImatges" class="cont">
            <div class="imatges perfilUrl" :style="{ 'background-image': 'url(' + imatge + ')' }"></div>
          </div>

        </div>
      </div>
      <hr>

      <div class="contenidorSegon">
        <div class="info">
          <h2>{{titul}}</h2>
          <p>{{descripcio}}</p>
        </div>

        <div class="tipusCat">
          <div class="cate">
            <p>Categoria</p>
            <h4>{{categoria}}</h4>
          </div>

          <div class="cate">
            <p>Tags</p>
            <div class="tags">
              <h4>{{tags}}</h4>
            </div>
          </div>
        </div>

        <div class="puntuacio">
          <div class="rand">
            <i class="fa fa-eye" aria-hidden="true">Visitas</i> <p>{{visitas}}</p>
            <hr>
            <i class="fa fa-heart" aria-hidden="true">Like?</i> <p id="pos">{{like}}</p>
            <hr>
            <i class="fa fa-comment" aria-hidden="true">Comentaris</i> <p id="poss">{{comentarisTotal}}</p>
          </div>
        </div>

        <hr>
        <div class="comentaris">

          <div class="coments" v-for="comentari in comentaris">
            <div id="in">
              <div class="img perfilUrl" :style="{ 'background-image': 'url(' + comentari.url_img + ')' }"></div>
              <h2 id="nom">{{comentari.nomUsuari}}</h2><h6>{{comentari.data}}</h6>
            </div>
            <div id="com">
              <p>{{comentari.missatge}}</p>
            </div>
          </div>

          <div class="ferComentari">
            <input type="text" placeholder="Escriu aquí per comentar" v-model="missatgeComentar">
            <button type="button" class="btn perso" @click="inserirComentari"></button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./VisualitzarProjecte.js"></script>
<style src="./VisualitzarProjecte.css" scoped></style>

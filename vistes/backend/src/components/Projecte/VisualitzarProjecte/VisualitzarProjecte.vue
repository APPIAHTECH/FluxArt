<template>
  <div class="contenidor">
    <div class="visualitzarProjecte">

      <div class="contenidorPrimer">

        <div class="capcelera">
          <div class="img perfilUrl" :style="{ 'background-image': 'url(' + imgPerfil + ')' }" :data-nomusuari="nomUsuari" @click="veurePerfil"></div>
          <div class="donar">
            <a href="https://plus.google.com/share?url={http://localhost:3000/#/visualitzar/projecte}" onclick="javascript:window.open(this.href,
            '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><img
            src="https://www.gstatic.com/images/icons/gplus-16.png" alt="Share on Google+"/></a>
            <a v-if="teDonacio" @click="donarDiners"><img src="http://bryanjacobsonfoundation.org/wp-content/uploads/2013/10/donate-icon@2x.png" alt="" id="pay"></a>
            <button type="button" class="btn perso" @click="actualitzarLikes" v-if="!liAgrada"><i class="fa fa-thumbs-up" aria-hidden="true"></i></button>
            <button type="button" class="btn perso" v-else @click="noAgrada"><i class="fa fa-heart" aria-hidden="true"></i></button>
          </div>
        </div>

        <div class="contenidorImatge perfilUrl" :style="{ 'background-image': 'url(' + imatgeGran + ')' }" @click="mesGran"></div>

        <div class="llistatImatges">

          <div v-for="imatge in llistatImatges" class="cont">
            <div class="imatges perfilUrl" :style="{ 'background-image': 'url(' + imatge + ')' }" @click="cambiar" :data-imatge="imatge"></div>
          </div>

        </div>
      </div>


      <div class="contenidorSegon">
        <div class="info">
          <h2>{{titul}}</h2>
          <div id="descripcio">
            <p id="descrip">{{descripcio}}</p>
          </div>
        </div>

        <div class="contenidroInfor">
          <div class="tipusCat">
            <div class="cate">
              <p>Categoría</p>
              <h4>{{categoria}}</h4>
            </div>

            <div class="cate" v-show="tags">
              <p>Tags</p>
              <div class="tags">
                <h4>{{tags}}</h4>
              </div>
            </div>
          </div>

          <div class="puntuacio">
            <div class="rand">
              <i class="fa fa-eye" aria-hidden="true" id="visitas">Visitas</i><p class="especial">{{visitas}}</p>
              <hr>
              <i class="fa fa-heart" aria-hidden="true" id="cor">Like</i> <p class="especial">{{like}}</p>
              <hr>
              <i class="fa fa-comment" aria-hidden="true" id="commen">Comentaris</i><p class="especial">{{comentarisTotal}}</p>
            </div>
          </div>
        </div>

        <div class="comentaris">

          <div class="coments" v-for="comentari in comentaris">
            <div id="in">
              <div class="img perfilUrl" :style="{ 'background-image': 'url(' + comentari.url_img + ')' }"></div>
              <h2 id="nom">{{comentari.nomUsuari}}</h2>
            </div>
            <div id="com" @change="scrollABaix">
              <p>{{comentari.missatge}}</p>
            </div>
          </div>
        </div>

        <div class="ferComentari">
          <input type="text" placeholder="Escriu aquí per comentar" v-model="missatgeComentar" @keypress="inserirComentari">
          <!-- <button type="button" class="btn perso" @click="inserirComentari"><i class="fa fa-chevron-right" aria-hidden="true"></i></button> -->
        </div>
      </div>

    </div>
  </div>
</template>

<script src="./VisualitzarProjecte.js"></script>
<style src="./VisualitzarProjecte.css" scoped></style>

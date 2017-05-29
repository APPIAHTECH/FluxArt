<template>
  <div class="contenidor">
    <div class="visualitzarProjecte">

      <div class="contenidorPrimer">

        <div class="capcelera">
          <div class="img perfilUrl" :style="{ 'background-image': 'url(' + imgPerfil + ')' }"></div> <p id="nomUsuari">{{nomUsuari}}</p>
          <div class="donar">
            <a href="https://plus.google.com/share?url={http://localhost:3000/#/visualitzar/projecte}" onclick="javascript:window.open(this.href,
            '', 'menubar=no,toolbar=no,resizable=yes,scrollbars=yes,height=600,width=600');return false;"><img
            src="https://www.gstatic.com/images/icons/gplus-32.png" alt="Share on Google+"/></a>

            <a v-if="teDonacio" @click="donarDiners"><img src="https://www.joomlashack.com/images/showcase/osdonate.png" alt="" id="pay"></a>



            <button type="button" class="btn perso" @click="actualitzarLikes" v-if="!liAgrada"><i class="fa fa-thumbs-up" aria-hidden="true"></i>Like</button>

            <button type="button" class="btn perso" v-else @click="noAgrada"><i class="fa fa-heart" aria-hidden="true"></i>M'agrada</button>


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
          <input type="text" name="" :value="descripcio" disabled="true" id="textDesc">
        </div>

        <div class="tipusCat">
          <div class="cate">
            <p>Categoría</p>
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
            <i class="fa fa-eye" aria-hidden="true" id="visitas">Visitas <p>{{visitas}}</p></i>
            <i class="fa fa-heart" aria-hidden="true" id="cor">Like? <p id="pos">{{like}}</p></i>
            <i class="fa fa-comment" aria-hidden="true" id="commen">Comentaris <p id="poss">{{comentarisTotal}}</p></i>
          </div>
        </div>

        <div class="comentaris">

          <div class="coments" v-for="comentari in comentaris">
            <div id="in">
              <div class="img perfilUrl" :style="{ 'background-image': 'url(' + comentari.url_img + ')' }"></div>
              <h2 id="nom">{{comentari.nomUsuari}}</h2><h6>{{calcularTemps(comentari.data)}}</h6>
            </div>
            <div id="com">
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

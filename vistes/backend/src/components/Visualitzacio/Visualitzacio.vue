<template><!--v-infinite-scroll="carregarMes" infinite-scroll-disabled="ocupat" :infinite-scroll-distance="distancia"-->
  <section class="visualitzar" id="visual">
    <nav class="nav">
      <div class="pos">
        <ul>

          <li class="categorias">
            <a><h1 id="titul">Categories<i class="fa fa-angle-down" aria-hidden="true"></i></h1></a>
            <div class="contenidorCategoria">
              <ul v-for="categoria in categories">
                <li><a @click="categoriesProjecte">{{categoria}}</a></li>
              </ul>
            </div>
          </li>

          <li><a><input type="text" name="search" placeholder="Buscar ... " @input="buscar"></a></li>
          <!-- <li><a><input type="submit" name="" value="Buscar"></a></li> -->

          <li class="categorias" id="popu">
            <a><h1 id="titul">Popular<i class="fa fa-angle-down" aria-hidden="true"></i></h1></a>
            <div class="contenidorCategoria">
              <ul v-for="popu in popular">
                <li><a @click="populars">{{popu}}</a></li>
              </ul>
            </div>
          </li>

        </ul>
      </div>
    </nav>

    <div class="contenidor_imatges">
      <div class="marc" v-for="llista in llistatProjectes">
        <div class="imatge" :style="{ 'background-image': 'url(' + llista.projecte.imatges[0] + ')' }"></div>
        <div class="capcalera">
          <div class="pefil" :style="{ 'background-image': 'url(' + llista.info.usuari.url_img + ')' }"></div>
          <div class="nom"><h4 class="nomPerfil">{{llista.projecte.titul}}</h4></div>
          <div class="rand">
            <i class="fa fa-eye" aria-hidden="true">{{llista.projecte.visitas}}</i>
            <i class="fa fa-heart" aria-hidden="true">{{llista.projecte.like}}</i>
            <i class="fa fa-comment" aria-hidden="true">{{llista.projecte.comentaris.length}}</i>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script src="./Visualitzacio.js"></script>
<style src="./Visualitzacio.css" scoped></style>

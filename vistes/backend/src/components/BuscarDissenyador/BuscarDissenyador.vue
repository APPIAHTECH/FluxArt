<template>
  <div id="BuscarDisenyador">

    <div class="capcelera">
      <h1>Dissenyadors</h1>
    </div>

    <div class="contenidorDissenyadors">

      <div class="contenidor_imatges">


        <div class="marc" v-for="dissenyador in llistatUsuaris">
          <div class="imatge" :style="{ 'background-image': 'url(' + dissenyador.usuari.url_img + ')' }"></div>
          <div class="capceleraBaix">
            <h4><i class="fa fa-paper-plane" aria-hidden="true"></i> {{dissenyador.usuari.nom_usuari}}</h4>
            <button type="button" class="btn seguir" @click="seguirUsuari" :data-usuari="dissenyador._id" :data-nom="dissenyador.usuari.nom_usuari">Seguir</button>
          </div>
        </div>
      </div>

    </div>

  </div>
</template>


<script src="./BuscarDissenyador.js"></script>
<style src="./BuscarDissenyador.css" scoped></style>

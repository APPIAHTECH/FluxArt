<template>
  <div class="pujar">
    <form  :method="metode" :enctype="encriptacio" @submit="pujar">
        <div class="contenidorPujar">
          <h2>Col·loqui imatges aquí</h2>

          <div class="loader" ></div>
          <div v-bind:class="{loader_animar : animar}" id="semi_loader"></div>

          <div v-if="!animar" id="imgConte">
            <div class="imatge-pujada"></div>
          </div>

          <div v-else id="increment">
            <div><h2 id="incrementar">{{increment}}</h2></div>
          </div>

          <div class="selecionar">

            <div v-if="llistat_imatges.length > 0">
              <p id="select"><input type="submit" value="Publicar"></p>
            </div>

            <div v-else>
              <p><strong>or</strong></p>
              <p id="select">
                <label for="inputFixer" id="seleccio">{{msg}}</label>
                <input id="inputFixer" type="file" name="imatges" :accept="fitxersAcceptats" @change="obtenirImatges" multiple hidden>
              </p>
            </div>
          </div>
        </div>
    </form>

    <div v-if="estatSeleccio">
      <div class="vistaPrevia">
        <img :src="imatge" alt="" v-for="imatge in llistat_imatges">
      </div>
    </div>
  </div>
</template>


<script src="./Pujar.js"></script>
<style src="./Pujar.css" scoped></style>

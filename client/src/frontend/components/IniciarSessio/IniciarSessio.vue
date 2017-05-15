<template>
  <div class="bg">
    <div class="contenidor">
      <form :action="peticio" :method="metode" enctype="multipart/form-data" accept-charset="UTF-8" @submit="iniciarSessio">
        <div class="capcelera">
          <h4 id="titul" v-if="error">{{missatge}} <i class="fa fa-frown-o" aria-hidden="true"></i></h4>
          <h4 id="titul" v-else> hey <i class="fa fa-smile-o" aria-hidden="true"></i></h4>
        </div>

        <div class="letGo">
          <div class="formulari">
            <label>Sobrenom</label>
            <input type="text" required min="3" maxlength="150" autofocus v-model="nomUsuari" name="nomUsuari">
            <label>Contrasenya <a href="#" v-if="error" id="oblidat">Oblidat?</a></label>
            <input type="password" required min="6" class="password" v-model="contrasenya" required name="contrasenya">
            <input type="submit" value="Iniciar Sessió"> <a href="/#/registrar">Crear Compte <i class="fa fa-arrow-right" aria-hidden="true"></i></a>
          </div>
          <hr>
          <!-- <p id="expandeix">or</p> -->
          <hr id="abaix">
          <div class="xarxaSocials">
            <label>Conectar amb</label>
            <button type="button" class="btn google" @click="iniciarSessioGoogle"><i class="fa fa-google-plus" aria-hidden="true"></i></button>
            <button type="button" class="btn facebook" @click="iniciarSessioFacebook"><i class="fa fa-facebook" aria-hidden="true"></i></button>
            <label id="info">Un clic a iniciar sessió en Flux si el seu compte està connectat a Google or Facebook.</label>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script src="./IniciarSessio.js"></script>
<style src="./IniciarSessio.css" scoped></style>

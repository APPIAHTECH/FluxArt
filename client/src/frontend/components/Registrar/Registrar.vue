<template>
  <div class="contenidor">

    <div class="presentacio">

      <div class="icone"></div>

      <div class="text">
        <h1 id="titul">FLux</h1>
        <h4 id="expandeix">El Disseny que mes ...</h4>
      </div>
    </div>

    <div class="registrar">
      <div class="tituls">
        <h1 id="registrar">Registra't</h1>
        <h4 id="introdueix">Introdueixi la seva adreça de correu electrònic <br>per crear el seu compte a Flux</h4>
      </div>

      <form :method="metode" enctype="multipart/form-data" accept-charset="UTF-8" @submit="registrar">
        <div class="formulari">
          <label>Nom Usuari</label>
          <input type="text" required min="3" maxlength="150" autofocus v-model="nomUsuari" name="nomUsuari">
          <label>Correu</label>
          <input type="email" v-model="correu" name="correu" required>
          <label>Contrasenya</label>
          <input type="password" required min="6" class="password" v-model="contrasenya" required name="contrasenya">
          <input type="submit" value="Crear Compte"><p id="inici">Ja tens un compte ? </p> <a href="/#/iniciarSessio">Iniciar Sessió</a>
        </div>

        <div class="xarxaSocials">
          <div class="google" @click="RegistrarGoogle">
            <div class="imgGoogle"></div><p id="xarxa">Registrar amb Google</p>
          </div>

          <div class="facebook" @click="RegistrarFacebook">
            <div class="imgFacebook"></div><p id="xarxa">Registrar amb Google</p>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script src="./Registrar.js"></script>
<style src="./Registrar.css" scoped></style>

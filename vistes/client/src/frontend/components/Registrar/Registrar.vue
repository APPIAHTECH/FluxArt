<template>
  <div class="contenidor">

    <div class="presentacio">

      <div class="icone"></div>

      <div class="text">
        <h1 id="titul" style="margin-top:100px; font-size:15pt;">FLUX L'ART DE COMPARTIR</h1>
        <h4 id="expandeix"></h4>
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
          <input type="text" required minlength="3" maxlength="150" autofocus v-model="nomUsuari" name="nomUsuari">

          <h4 id="error" v-if="errorNom">{{missatge}} <i class="fa fa-frown-o" aria-hidden="true"></i></h4>
          <p v-if="errorNom" id="posibleNom">T'interesa aquets nom de usuari? : <strong>{{posibleNom}}</strong> , esta disponible</p>

          <label>Correu</label>
          <input type="email" v-model="correu" name="correu" required>

          <h4 id="error" v-if="errorCorreu">{{missatge}} <i class="fa fa-frown-o" aria-hidden="true"></i></h4>

          <label>Contrasenya</label>
          <input type="password" required min="6" class="password" v-model="contrasenya" required name="contrasenya">
          <input type="submit" value="Crear Compte"><p id="inici">Ja tens compte ? </p> <a href="/#/iniciarSessio">Iniciar Sessió</a>
        </div>

        <div class="xarxaSocials">
          <div class="google" @click="RegistrarGoogle">
            <div class="imgGoogle"></div><p id="xarxa">Registrar amb Google</p>
          </div>

          <div class="facebook" @click="RegistrarFacebook">
            <div class="imgFacebook"></div><p id="xarxa">Registrar amb Facebook</p>
          </div>
        </div>

      </form>
    </div>
  </div>
</template>

<script src="./Registrar.js"></script>
<style src="./Registrar.css" scoped></style>

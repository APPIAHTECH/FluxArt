<template>
  <div id="menuFrontal">
    <div class="capcelera">
      <h5 id="titul"><a href="/api/backend">Flux</a></h5>
      <div class="butoMenu" @click="activar()">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
    </div>
    <div class="contenidor">
      <button type="button" name="button" class="btn"><a href="/api/backend/#/crear/projecte" id="crear">Crear Projecte</a></button>

      <div class="contenidorDeixar">
        <div class="img perfilUrl" :style="{ 'background-image': 'url(' + imatgePerfil + ')' }"><i class="fa fa-angle-down" aria-hidden="true"></i></div>
        <div class="baixar">
          <a :href="nomPeril">Perfil</a>
          <a href="/api/backend/#/compte">Compte</a>
          <a @click="tancarSessio" id="tancar">Tancar sessió</a>
        </div>
      </div>

      <div class="notificacio" @click="mostarNoti">
        <i class="fa fa-bell" aria-hidden="true"></i>
        <div class="circle" v-if="notificacions.length > 0">
          <p>{{notificacionNoLegit}}</p>
        </div>

        <div class="notifica" v-if="mostrarNotificacio">
          <div class="msg" v-for="notificacio in notificacions" @click="llegit" :data-idNorificacio="notificacio._id">
            <i class="fa fa-commenting" aria-hidden="true"></i><p :data-idNorificacio="notificacio._id">{{notificacio.notificacio.nom_usuari}}</p>
            <p :data-idNorificacio="notificacio._id">{{notificacio.notificacio.missatge}}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./MenuFrontal.js"></script>
<style src="./MenuFrontal.css" scoped></style>

<template>
  <div id="menuFrontal">
    <div class="capcelera">
      <h5 id="titul">Flux</h5>
      <div class="butoMenu">
        <i class="fa fa-bars" aria-hidden="true"></i>
      </div>
    </div>
    <div class="contenidor">
      <button type="button" name="button" class="btn">Crear Projecte </button>

      <div class="contenidorDeixar">
        <div class="img perfilUrl" :style="{ 'background-image': 'url(' + imatgePerfil + ')' }"><i class="fa fa-angle-down" aria-hidden="true"></i></div>
        <div class="baixar">
          <a href="#">Perfil</a>
          <a href="#">Configuració</a>
          <a href="#">Tancar sessió</a>
        </div>
      </div>

      <div class="notificacio">
        <i class="fa fa-bell" aria-hidden="true"></i>
        <div class="circle">
          <p>2</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script src="./MenuFrontal.js"></script>
<style src="./MenuFrontal.css" scoped></style>

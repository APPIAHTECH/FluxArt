<template>
  <div id="menuLateral"  v-bind:class="{ activat: esAmagar }">
    <div class="seccions">
      <div class="contenidor">
        <h2 id="noms">Projectes</h2><i class="fa fa-cog" aria-hidden="true"></i>
        <ul id="llistat">
          <li><a href="#">Visualització</a></li>
          <li><a href="#">Destacats</a></li>
        </ul>
      </div>
    </div>

    <div class="seccions">
      <div class="contenidor">
        <h2 id="noms">Dissenyadors</h2><i class="fa fa-users" aria-hidden="true"></i>
        <ul id="llistat">
          <li><a href="#">Buscar</a></li>
          <li><a href="#">Destacats</a></li>
        </ul>
      </div>
    </div>

    <div class="seccions">
      <div class="contenidor">
        <h2 id="noms">Estadistiques</h2><i class="fa fa-bar-chart" aria-hidden="true"></i>
        <ul id="llistat">
          <li><a href="#">Panell</a></li>
        </ul>
      </div>
    </div>

    <div class="seccions">
      <div class="contenidor">
        <h2 id="noms">Configuració</h2><i class="fa fa-cog" aria-hidden="true"></i>
        <ul id="llistat">
          <li><a href="#">Perfil</a></li>
          <li><a href="#">Tancar sessió</a></li>
        </ul>
      </div>
    </div>


  </div>
</template>

<script src="./MenuLateral.js"></script>
<style src="./MenuLateral.css" scoped></style>

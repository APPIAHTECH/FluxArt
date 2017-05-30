<template>
  <div class="menuLateral amagar" id="idMenuLateral">

    <div class="seccions">
      <div class="contenidor">
        <h2 id="noms">Projectes</h2><i class="fa fa-cog" aria-hidden="true"></i>
        <ul id="llistat">
          <li><a href="#/visualitzar/projecte">Els Meus Projectes</a></li>
        </ul>
      </div>
    </div>

    <div class="seccions">
      <div class="contenidor">
        <h2 id="noms">Dissenyadors</h2><i class="fa fa-users" aria-hidden="true"></i>
        <ul id="llistat">
          <li><a href="#/buscar/artistes">Buscar</a></li>
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
          <li><a href="#/compte">Compte</a></li>
          <li><a :href="nomPeril">Perfil</a></li>
        </ul>
      </div>
    </div>

  </div>
</template>

<script src="./MenuLateral.js"></script>
<style src="./MenuLateral.css" scoped></style>

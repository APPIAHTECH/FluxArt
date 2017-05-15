<template>

  <div class="contenidor">

    <div class="tituls">
      <h1 id="titul">Confirmació</h1>
      <h4 id="expandeix">Estas apunt de acabar tu prometo <i class="fa fa-smile-o" aria-hidden="true"></i></h4>
    </div>

  <form :action="confirmat" method="GET">
    <div class="confirmar">
      <p id="text">Per tal de validar el compte ves al correu <strong>{{correu}}</strong> <br>he enviat un link al correu que has pasat [canviar recordar no posar aquet text!]</p>
      <input type="submit" value="Iniciar Sessió">
    </div>
  </form>

  </div>
</template>

<script src="./Confirmar.js"></script>
<style src="./Confirmar.css" scoped></style>

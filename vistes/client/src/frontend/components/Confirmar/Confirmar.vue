<template>

  <div class="contenidor">

    <div class="correu">

      <div class="img"></div>
      <div class="tituls">
        <h1 id="titul">Confirmació</h1>
      </div>

    <form :action="confirmat" method="GET">
      <div class="confirmar">
        <p id="text">Hem enviat un correu electrònic a <strong>{{correu}}</strong> per confirmar la validesa de la vostra adreça de correu electrònic.
          Després de rebre el correu electrònic segueix l'enllaç proporcionat per completar el registrament. Sort!</p>
      </div>
      <hr>
      <p id="noRebut">Si no a rebut cap correu electrònic de confirmació <a href="#" id="reenviar">Reenviar</a></p>
    </form>
    </div>
  </div>
</template>

<script src="./Confirmar.js"></script>
<style src="./Confirmar.css" scoped></style>

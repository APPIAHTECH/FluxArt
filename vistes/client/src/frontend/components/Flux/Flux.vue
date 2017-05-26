<template>
  <div class="contenidor">
    <FluxMenu></FluxMenu>
    <div class="presentacio">
      <h4 id="expandeix">AMPLIAR LA TEVA MAGINACIÓ</h4>
      <h1 id="titul">L'ART DE COMPARTIR</h1>
      <button type="button" class="btn"><a href="/#/registrar">REGISTRAT</a></button>
    </div>
    <div class="imatge"></div>
    <div class="proces">
      <div class="cap">
        <h3 class="capituls"><h3 id="canvi">1</h3>En què estàs treballant?</h3>
        <div class="text">
          <p class="explicacio">Navega , busca el projecte que <br/>mes t'apaciona!</p>
        </div>
      </div>

      <div class="cap">
        <h3 class="capituls"><h3 id="canvi">2</h3>Pujar</h3>
        <div class="text">
          <p class="explicacio">Puja el teu disseny favorit</p>
        </div>
      </div>

      <div class="cap">
        <h3 class="capituls"><h3 id="canvi">3</h3>Comparteix</h3>
        <div class="text">
          <p class="explicacio">Mostrar i explicar per als dissenyadors</p>
        </div>
      </div>
    </div>
    <!-- <FluxVisualitzar :quantitatProjectes="quantitatProjectes" :quantitatPermes="quantitatPermes"></FluxVisualitzar> -->
    <FluxFooter></FluxFooter>
  </div>
</template>

<script src="./Flux.js"></script>
<style src="./Flux.css" scoped></style>

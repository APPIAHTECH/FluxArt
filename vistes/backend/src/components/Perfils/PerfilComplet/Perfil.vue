<template>
  <div id="perfilComplet">
    <div class="perfilLateral">
      <PerfilLateral></PerfilLateral>
    </div>
    <div class="projectes">
      <FluxVisualitzar :quantitatProjectes="quantitatProjectes" :quantitatPermes="quantitatPermes" :visualitzarNormal="visualitzarNormal" :esAltres="esAltres"></FluxVisualitzar>
    </div>
  </div>
</template>


<script src="./Perfil.js"></script>
<style src="./Perfil.css" scoped></style>

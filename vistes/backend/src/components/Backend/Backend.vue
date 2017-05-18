<template>
  <div class="backend">
    <MenuFrontal :imatgePerfil="getImatgePerfil()"></MenuFrontal>
    <div class="contenidor">
      <MenuLateral></MenuLateral>
      <FluxVisualitzar :quantitatProjectes="quantitatProjectes" :quantitatPermes="quantitatPermes"></FluxVisualitzar>
    </div>
    </div>
  </div>
</template>

<script src="./Backend.js"></script>
<style src="./Backend.css" scoped></style>

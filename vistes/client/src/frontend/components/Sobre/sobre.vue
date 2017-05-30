<template>
  <div id="sobre">
    <MenuFrontal></MenuFrontal>
    <div class="contenidor">
      <div class="presentacio">
        <h4 id="expandeix">QUI SÓN AQUESTS ?</h4>
        <h1 id="titul">SOBRE FLUX</h1>
      </div>
    </div>

    <div class="explicacioContenidor">
      <p>En què estàs treballant? Flux és una comunitat de dissenyadors web, dissenyadors gràfics, il·lustradors, artistes de icones, tipògrafies, dissenyadors de logos, i altres tipus. <br> <br>Comparteixen imatges petites / grans que mostren el seu treball, processos i projectes actuals.
        <br> Flux és un lloc per mostrar , promoure, descobrir i explorar el disseny. Fundada el 2017, <br>es el projecte final de un estudiant de DAW , IES CIRVIANUM TORELLO.<br></p>

        <div class="equip">
          <h1 id="titul" style="color:black">EQUIP FLUX</h1>
          <div class="perfil"></div>
          <p id="dis">DISSENYADOR / FUNDADOR / DESENVOLUPADOR </p>
          <div class="xarxa">
            <a href="#/perfil/Stephen"><i class="fa fa-paper-plane" aria-hidden="true"></i></a>
            <a href=""><i class="fa fa-google-plus-square" aria-hidden="true"></i></a>
            <a href=""><i class="fa fa-facebook-official" aria-hidden="true"></i></a>
          </div>
          <h4 id="expandeix">Stephen Appiah Frimpong</h4>
        </div>
        <googleMap :center="center" :zoom="12" id="mapa"></googleMap>
    </div>
    <FluxFooter></FluxFooter>
  </div>
</template>

<script src="./sobre.js"></script>
<style src="./sobre.css" scoped></style>

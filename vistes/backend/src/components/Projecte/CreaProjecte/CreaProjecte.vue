<template>
  <div id="crearPro">

  <div class="contenidor">
    <div class="capcelera">
      <h1 id="titul">Pujar Projecte</h1>
    </div>


    <div class="cos">

      <div v-if="mostrarPujar" id="pujar">
        <FluxPujar :dadesProjecte="obtenirDades"></FluxPujar>
        <button type="button" name="button" class="btn" @click="mostrarPujar = false"><i class="fa fa-arrow-left" aria-hidden="true"></i> Anterior</button>
        <button type="button" name="button" class="btn" @click="mostrarPujar = false">Cancelar</button>
      </div>

        <div v-else id="else">
          <p>Informació</p>
          <input type="text" placeholder="Nom del teu projecte" v-model="nomProjecte" required>
          <textarea name="desc" rows="8" cols="80" placeholder="Descripció" v-model="descripcio" required></textarea>

          <p>Categoría</p>
          <select v-model="categoria">
            <option :value="categoria" v-for="categoria in categories">{{categoria}}</option>
          </select>
          <input type="text" placeholder="tags separats per comes" v-model="tags" id="tags">
          <p id="poderDonar">Poder Donar ?  <input type="checkbox" id="checkbox" v-model="poderDonar"></p>

          <button type="button" name="button" class="btn" @click="validar">Seguent <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </div>
  </div>

  <div class="contenidor" id="requisit">
    <h1 id="titulR">Requisits Projecte</h1>
    <p>Sabem que és molt llarg, però amb tot això estara mes segur!</p>

    <ol>
      <ul>
        <li>Imatges</li>
        <li>Imatges</li>
        <li>Imatges</li>
        <li>Imatges</li>
      </ul>
    </ol>

    <p id="msg">Tots els projectes que comparteixis en Flux es de caracter Creative Commons més informació <a href="http://es.creativecommons.org/blog/licencias/"><i class="fa fa-cc" aria-hidden="true"></i></a></p>
  </div>
  </div>
</template>


<script src="./CreaProjecte.js"></script>
<style src="./CreaProjecte.css" scoped></style>

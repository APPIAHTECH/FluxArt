<template>
  <div id="crearPro">

  <div class="contenidor">
    <div class="capcelera">
      <h1 id="titul">PROJECTE</h1>
    </div>


    <div class="cos">

      <div v-if="mostrarPujar" id="pujar">
        <FluxPujar :dadesProjecte="obtenirDades"></FluxPujar>
        <button type="button" name="button" class="btn" @click="mostrarPujar = false"><i class="fa fa-arrow-left" aria-hidden="true"></i> Anterior</button>
        <button type="button" name="button" class="btn" @click="mostrarPujar = false">Cancelar</button>
      </div>

        <div v-else id="else">
          <p>Informació</p>
          <input type="text" placeholder="Nom del teu projecte" v-model="nomProjecte" required maxlength="50">
          <textarea name="desc" rows="8" cols="80" placeholder="Descripció , max 20 líneas" v-model="descripcio" required maxlength="500"></textarea>

          <p>Categoría</p>
          <select  v-model="categoria">
            <option :value="categoria" v-for="categoria in categories">{{categoria}}</option>
          </select>
          <input type="text" placeholder="tags separats per comes" v-model="tags" id="tags" maxlength="50">
          <p id="poderDonar">Permetre Donacions ?  <input type="checkbox" id="checkbox" v-model="poderDonar"></p>

          <button type="button" name="button" class="btn" @click="validar">Seguent <i class="fa fa-arrow-right" aria-hidden="true"></i></button>
        </div>
      </div>
  </div>

  <div class="contenidor" id="requisit">
    <h1 id="titulR">Requisits Projecte</h1>
    <p>Sabem que és molt llarg, però amb tot això estara mes segur!</p>

    <ul>
      <li>Format <p>Tipus de format acceptat per Flux</p></li>
      <ol>
        <ul>
          <li>.jpg</li>
          <li>.png</li>
          <li>.gif</li>
        </ul>
      </ol>
      <li>Mides <p>la mida de cada imatge no ha de superar els 2MB</p></li>
      <ol>
        <ul>
          <li>2MB per imatge</li>
        </ul>
      </ol>
    </ul>

    <p id="msg">Tots els projectes que comparteixis en Flux es de caracter Creative Commons més informació <a href="http://es.creativecommons.org/blog/licencias/"><i class="fa fa-cc" aria-hidden="true"></i></a></p>
  </div>
  </div>
</template>


<script src="./CreaProjecte.js"></script>
<style src="./CreaProjecte.css" scoped></style>

<template>
  <div id="compte">
    <div class="contenidorCompte">
      <form @submit="actualitzar">
        <div class="contenidor">

          <div class="seccio">
            <div class="apartats">
              <PerfilLateral :configurar="configurar"></PerfilLateral>
            </div>
          </div>
          <div class="seccio" id="dades">

            <div class="apartats">
              <h1 id="titul">Edita els paràmetres personals</h1>
            </div>

            <div class="apartats">
              <label>Nom</label>
              <input type="text" name="" autofocus v-model="nom">
              <label>Nom Usuari</label>
              <input type="text" v-model="nomUsuari" required disabled>
              <label>Correu</label>
              <input type="email" name="" v-model="correu" class="mail">
            </div>

            <div class="apartats row">
              <div class="pais">
                <label>País</label>
                <input type="text" name="" value="" id="regio" placeholder="En quin país estas ? " v-model="pais">
              </div>
              <div class="regio">
                <label>Provinci/Regío</label>
                <input type="text" name="" value="" id="regio" placeholder="Escriu aquí" v-model="provincia">
              </div>
            </div>

            <div class="apartats row">
              <div class="pais">
                <label>Contrassenya Actual</label>
                <input type="password" name="" value="" id="regio" placeholder="Escriu aquí la teva contrassenya actual" v-model="contrasenyaActual">
              </div>
              <div class="regio">
                <label>Nova Contrassenya</label>
                <input type="password" name="" value="" id="regio" placeholder="Escriu aquí la contrassenya nova" v-model="contrasenyaNova">
              </div>
            </div>

            <div class="apartats">
              <div class="row">
                  <input type="checkbox" v-model="rebreNotificacions"/> <p>Estic d'acord en rebre notificacions de correus electrònics de Flux</p>
              </div>
              <div class="centrar" id="abaix">
                <input type="submit" class="btn" value="Actualitzar compte">
                <button type="button" name="button" class="btn" id="eliminar" @click="eliminar">Eliminar Compte</button>
              </div>
            </div>
          </div>

          <div class="seccio" id="noBorder">
            <div class="apartats">
              <h1 id="titul">Comptes extern</h1>
            </div>

            <div class="apartats">
              <label>Google</label>
              <input type="email" name="" v-model="compteGoogle">
              <label>Facebook</label>
              <input type="email" name="" v-model="compteFacebook">
              <label>Compte Paypal</label>
              <input type="email" name="" v-model="comptePaypal">
              <label>Lloc Web Personal</label>
              <input type="text" name="" v-model="llocWeb">
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>


<script src="./PerfilConfigurar.js"></script>
<style src="./PerfilConfigurar.css" scoped></style>

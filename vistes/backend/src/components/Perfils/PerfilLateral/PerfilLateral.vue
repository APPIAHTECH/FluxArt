<template>
  <div id="perfil">

    <div class="contenidor-perfil">
      <div class="contenidor">
        <div class="imatgePerfil imatge"></div>
        <h1>{{nomUsuari}}</h1>
        <h4>{{nom}}</h4>
      </div>

        <div class="contenidor">
          <div class="seccions">

            <div class="projectes">
              <h1>{{projectes}}</h1>
              <h4>Projectes</h4>
            </div>

            <div class="seguidors">
              <h1>{{seguidors}}</h1>
              <h4>Seguidors</h4>
            </div>

          </div>
        </div>

        <div class="contenidor">
          <div  v-if="!iniciatSessio && !mostrarEditar">
            <div class="descripcio">{{descripcio}}</div>
          </div>

          <div v-else>

            <div class="descripcio">
              <label> Descripció</label>
              <input type="text" v-model="descripcio" placeholder="Escriu aquí la teva bio ">
            </div>
          </div>
        </div>

        <div class="contenidor">
          <div class="descripcio">
            <i class="fa fa-google-plus" aria-hidden="true"></i><p>{{compteFace}}</p>
            <i class="fa fa-facebook" aria-hidden="true"></i><p>{{compteGoogle}}</p>
          </div>
        </div>

        <div class="contenidor" id="noBorder">
          <div v-if="!iniciatSessio && !mostrarEditar">
            <button type="button" class="btn">Seguir</button>
          </div>

          <div v-else class="centrar">
            <button type="button" class="btn">Pujar imatge perfil</button>
            <button type="button" class="btn" id="eliminar">Eliminar imatge</button>
          </div>
        </div>
    </div>
  </div>
</template>


<script src="./PerfilLateral.js"></script>
<style src="./PerfilLateral.css" scoped></style>

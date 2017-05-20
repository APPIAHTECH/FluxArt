<template>
  <div id="compte">
    <div class="contenidorCompte">
      <form method="post" action="">
        <div class="contenidor">
          <div class="seccio">
            <div class="apartats">
              <Perfil></Perfil>
            </div>
          </div>

          <div class="seccio" id="dades">

            <div class="apartats">
              <h1 id="titul">Edita els paràmetres personals</h1>
            </div>

            <div class="apartats">
              <label>Nom</label>
              <input type="text" name="" value="" autofocus>
              <label>Nom Usuari</label>
              <input type="text" name="" value="">
              <label>Correu</label>
              <input type="email" name="" value="">
            </div>

            <div class="apartats row">
              <div class="pais">
                <label>País</label>
                <select>
                  <option value="españa">España</option>
                  <option value="españa">España</option>
                  <option value="españa">España</option>
                  <option value="españa">España</option>
                </select>
              </div>
              <div class="regio">
                <label>Provinci/Regío</label>
                <input type="text" name="" value="" id="regio" placeholder="Escriu aquí">
              </div>
            </div>

            <div class="apartats ">
              <div class="row">
                  <input type="checkbox"/> <p>Estic d'acord en rebre notificacions de correus electrònics de Flux</p>
              </div>
              <div class="centrar" id="abaix">
                <button type="button" name="button" class="btn">Actualitzar Informació</button>
              </div>
            </div>
          </div>

          <div class="seccio" id="noBorder">
            <div class="apartats">
              <h1 id="titul">El seu enllaç extern</h1>
            </div>

            <div class="apartats">
              <label>Google</label>
              <input type="email" name="" value="">
              <label>Facebook</label>
              <input type="email" name="" value="">
              <label>Compte Paypal</label>
              <input type="email" name="" value="">
              <label>Lloc Web Personal</label>
              <input type="text" name="" value="">
            </div>
          </div>

        </div>
      </form>
    </div>
  </div>
</template>


<script src="./PerfilConfigurar.js"></script>
<style src="./PerfilConfigurar.css" scoped></style>

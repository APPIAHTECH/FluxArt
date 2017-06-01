<template>
  <div class="suport">
    <MenuFrontal></MenuFrontal>
    <div class="contenidor">
      <div class="presentacio">
        <h4 id="expandeix">QUINES SÓN LES REGLES?</h4>
        <h1 id="titul">SUPORT</h1>
      </div>
    </div>

    <div class="explicacioContenidor">

      <div class="contenidorTemas">
        <h1 id="titul">Temas</h1>
        <ul>
          <li><a id="titul">L'ús d'Flux</a></li>
          <li><a>Que és Flux?</a></li>
        </ul>

        <ul>
          <li><a id="titul">Registració</a></li>
          <li><a>Que és Flux?</a></li>
        </ul>

        <ul>
          <li><a id="titul">Iniciar Sessió</a></li>
          <li><a>Que és Flux?</a></li>
        </ul>

        <ul>
          <li><a id="titul">Projectes</a></li>
          <li><a>Que és Flux?</a></li>
        </ul>
      </div>

      <div class="contactar">

        <div class="form">
           <form action="enviarCorreu" method="POST" class="form">
             <label>Correu Electrònic</label>
             <input type="text" name="email" value="" autofocus required>
             <label>Tema</label>
             <input type="text" name="sub" value="" placeholder="tema ..." required>
             <textarea name="missatge" style="padding:10px;" class="textarea" required></textarea>
             <input type="submit" name="submite" value="Enviar">
           </form>
         </div>

           <div class="other">
             <i class="fa fa-envelope other" aria-hidden="true"></i><p class="special">eunisaesea@gmail.com</p><br>
             <i class="fa fa-phone-square other" aria-hidden="true"></i><p class="special">632736096</p>
           </div>
         </div>
       </div>

      </div>
    </div>

  </div>
</template>
<script src="./Suport.js"></script>
<style src="./Suport.css" scoped></style>

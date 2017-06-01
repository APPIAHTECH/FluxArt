<template>
  <div id="correuEnviat">

    <div class="missatge">
      <h4>Flux t'espera</h4><h1>Correu Enviat</h1>
      <p>{{msg}} <i class="fa fa-coffee" aria-hidden="true"></i></p>
      <button type="button" name="button" class="btn" @click="tornar()">Tornar</button>
    </div>

  </div>
</template>
<script>
export default {
  data() {
    return {

      msg : "El correu s'enviarà el departament de recursos humans. Rebrà una resposta en quant haguem revisat el contingut. Fins ara "
    }
  },

  methods: {
     tornar(){
      window.location.href = "/";
    }
  }
}
</script>
<style scoped>

div#correuEnviat{
  width: 100%;
  height: 100%;
  background: #79D0EF;
  display: flex;
  flex-flow: column nowrap;
  align-items: center;
  justify-content: center;
}

div.missatge{
  width: 50%;
  height: auto;
}

h1{
  font-size: 30pt;
  color: white;
}

h4{
  font-size: 15pt;
  color: #00749A;
}
p{font-size: 13pt; color: white; opacity: .7; margin-bottom: 20px;}
button.btn{
  background-color: #00749A;
  border: none;
  color: white;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  margin: auto;
  margin: 4px 2px;
  cursor: pointer;
  border-radius: 4px;
}
</style>

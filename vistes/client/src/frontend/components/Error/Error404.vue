<template>
  <div class="contenidorError">
    <div class="missatge">
      <h4>Error 404</h4><h1> Oops! , estàs perdut?</h1>
      <p>La pagina que estàs buscant no existeix</p>
      <button type="button" name="button" class="btn" @click="tornar()">Tornar</button>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
     tornar(){
      window.location.href = "/";
    }
  }
}

</script>
<style scoped>

div.contenidorError{
  width: 100%;
  height: 100%;
  background: #8EE791;
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

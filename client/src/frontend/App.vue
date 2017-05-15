<template>
  <div class="pagina">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  components: {}
}

</script>

<style>
@import url('https://fonts.googleapis.com/css?family=Roboto');

*{
  padding: 0;
  margin: 0;
  font-family: 'Roboto', sans-serif;
}

body , html{
  height: 100%;
  padding: 0;
  margin: 0;
}
body{background: #ffff;}
div.pagina
{
  width: 100%;
  height: 100%;
  max-width: 100%;
  box-sizing: content-box;
}

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

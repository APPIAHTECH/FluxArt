<template>
  <div class="pagina">
    <MenuLateral></MenuLateral>
    <router-view></router-view>
    <FluxFooter></FluxFooter>
  </div>
</template>

<script>

import MenuLateral from './components/Menu/MenuLateral/MenuLateral.vue';
import FluxFooter from './components/Footer/Footer.vue';
export default {
  components: {
    MenuLateral,
    FluxFooter
  }
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
  display: flex;
  flex-flow: row nowrap;
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

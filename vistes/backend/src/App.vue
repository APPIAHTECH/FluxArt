<template>
  <div class="pagina">
    <router-view></router-view>
    <FluxFooter></FluxFooter>
  </div>
</template>

<script>
import FluxFooter from './components/Footer/Footer.vue';
export default {
  components: {
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
  min-height: 100% !important;
  padding: 0;
  margin: 0;
}
body{
  height: auto;
  background: #292929;
}
div.pagina
{
  width: 100%;
  height: auto;
  display: flex;
  flex-flow: column nowrap;
  box-sizing: border-box;
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

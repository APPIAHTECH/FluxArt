<template>
  <div id="mesGran">
    <img :src="imatge" alt="">
  </div>
</template>
<script>
export default {

  data() {
    return {

      imatge : ""
    }
  },

  created(){
    this.imatge = this.$store.getters.getImatgeTemporal;
  }
}
</script>
<style scoped>

div.mesGran{
  width: 100%;
  height: 100%;
}

img{
  width: 100%;
  height: auto;
}

</style>

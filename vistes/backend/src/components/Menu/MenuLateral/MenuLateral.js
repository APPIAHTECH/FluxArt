export default {
  data(){
    return {
      esAmagar : false
    }
  },

  methods: {

    modificarEstat(){
      if(this.esAmagar !=  true)
        this.esAmagar = true;
      else
        this.esAmagar =false;
    }
  }
}

export default {

  data(){
    return{
      confirmat : "#/iniciarSessio",
      correu : "eunisaesea@gmail.com"
    }
  },

  methods:{},

  created(){
    this.correu = this.$route.params.correu; //Recuperant el correu que es pasa per param
  }
}

<template>
  <div class="container">
    <h2>Hola {{ name }}</h2>
    <span>Estás logeado como {{ email }}</span> 
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: 'login',
  data: function(){
      return { }
  },
  created: function(){
    console.log('created:', {name: this.$route.query.name})
    this.$store.dispatch('getLoginAction', {name: this.$route.query.name})
    console.log('despues del dispatch')
  },
  components: {
    
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    name() {
        return this.$store.state.user.name
    },
    email(){
        return this.$store.state.user.email
    }
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
<template>
  <div v-if="!loading" class="container">
    <h2>{{ candidate.name }}</h2>
    <div>
        <div>{{candidate.phone}} {{candidate.email}}</div>
        <div v-bind:key="item._id" v-for="item in candidate.experience">
            <b>{{item.tags}}</b>
            <p class="body">{{item.description}}</p>
        </div>
    </div>     
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>


export default {
  name: 'message',
  data: function(){
      return {
          
      }
  },
  created: function(){
    this.$store.dispatch('getCandidateDataAction', {candidate: this.$route.query.candidate})
  },
  components: {
    
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    candidate() {
      return this.$store.state.candidate
    }
  },
  methods:{
    
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
  }
  .body{
      border-bottom: 2px solid gray;
  }
</style>
<template>
  <div v-if="!loading" class="candidate">
    <NotificationBar />
    <b-button @click="filter=''">Todos</b-button>
    <b-button @click="filter='open'">Activos</b-button> 
    <div class="container"> 
      <span v-bind:key="item._id" v-for="item in candidatures()">
        <CandidatureCard :item="item"></CandidatureCard>  
      </span>  
    </div>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
// @ is an alias to /src
import CandidatureCard from '@/components/CandidatureForCandidateCard.vue'
import NotificationBar from '@/components/NotificationBar.vue'

export default {
  name: 'candidature',
  data: function(){
    return {
      filter: 'open'
    }
  },
  components: {
    CandidatureCard,
    NotificationBar
  },
  created: function(){
    this.$store.dispatch('getCandidatureDataAction')
  },
  computed:{
    loading() {
      return this.$store.state.loading
    },
  },
  methods: {
    candidatures() {
      const c = Object.values(this.$store.state.myCandidatures)
      return  c.filter((x) => x.status.startsWith(this.filter))
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: row;
    align-items: center;
  }
</style>
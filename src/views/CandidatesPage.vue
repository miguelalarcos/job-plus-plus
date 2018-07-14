<template>
  <div v-if="!loading" class="candidate">
    <NotificationBar />
    <b-button @click="filter=''">Todos</b-button>
    <b-button @click="filter='open'">Activos</b-button> 
    <div class="container"> 
      <span v-bind:key="item._id" v-for="item in candidates">
        <CandidateCard :item="item" />
      </span>  
    </div>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
// @ is an alias to /src
import CandidateCard from '@/components/CandidatureForOffererCard.vue'
import NotificationBar from '@/components/NotificationBar.vue'

export default {
  name: 'CandidatesPage',
  data: function(){
    return {
      filter: 'open'
    }
  },
  components: {
    CandidateCard, NotificationBar
  },
  created: function(){
    this.$store.dispatch('getCandidaturesForOfferAction', {offer: this.$route.query.offer})
  },
  methods: {
    //candidates() {
    //  const c = Object.values(this.$store.state.candidaturesForOfferer)
    //  return  c.filter((x) => x.status.startsWith(this.filter))
    //}
  },
  computed:{
    loading() {
      return this.$store.state.loading
    },
    candidates() {
      const c = Object.values(this.$store.state.candidaturesForOfferer)
      return  c.filter((x) => x.status.startsWith(this.filter))
    }
  },
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
<template>
  <div class="candidate">
    <NotificationBar />
    <div class="container">
      <span v-bind:key="item.id" v-for="item in candidatures()">
        <CandidatureCard :item="item">
          <div>sale?</div>
        </CandidatureCard>  
      </span>  
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import CandidatureCard from '@/components/CandidatureForCandidateCard.vue'
import NotificationBar from '@/components/NotificationBar.vue'

export default {
  name: 'candidature',
  components: {
    CandidatureCard,
    NotificationBar
  },
  created: function(){
    this.$store.dispatch('getCandidatureDataAction')
  },
  methods: {
    candidatures() {
      return Object.values(this.$store.state.myCandidatures)
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
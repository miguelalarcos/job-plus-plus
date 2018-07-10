<template>
  <div class="candidate">
    <span v-bind:key="item.id" v-for="item in candidates()">
      <CandidateCard :item="item" />
    </span>  
  </div>
</template>

<script>
// @ is an alias to /src
import CandidateCard from '@/components/CandidatureForOffererCard.vue'

export default {
  name: 'CandidatesPage',
  components: {
    CandidateCard
  },
  methods: {
    candidates() {
      return Object.values(this.$store.state.candidaturesForOfferer)
    }
  }
}
</script>

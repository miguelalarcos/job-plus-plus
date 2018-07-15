<template>
  <div v-if="!loading" class="offerer">
    <NotificationBar />
    <div class="container"> 
      <span v-bind:key="item.id" v-for="item in offers()">
        <OfferCard :item="item" />
      </span>  
    </div>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
// @ is an alias to /src
import NotificationBar from '@/components/NotificationBar.vue'
import OfferCard from '@/components/OfferForCandidateCard.vue'

export default {
  name: 'searchOffers',
  components: {
    NotificationBar,
    OfferCard
  },
  data: function(){
    return {
      
    }
  },
  created: function(){
    this.$store.dispatch('getSearchOfferDataAction', {tags: ['python']})
  },
  methods: {
    offers() {
      return Object.values(this.$store.state.searchOffers)
    }
  },
  computed:{
    loading() {
      return this.$store.state.loading
    },
  }
}
</script>

<style lang="scss">
.container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
</style>





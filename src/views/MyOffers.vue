<template>
  <div v-if="!loading" class="offerer">
    <NotificationBar />
    <b-button @click="filter=''">Todos</b-button>
    <b-button @click="filter='open'">Activos</b-button> 
    <b-button @click="newOffer()">Nueva oferta</b-button>
    <div class="container"> 
      <span class="offer-card" v-bind:key="item._id" v-for="item in offers()">
        <OfferCard :item="item" />
      </span>  
      <b-button @click="loadMore()">Cargar más</b-button>
    </div>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
// @ is an alias to /src
import NotificationBar from '@/components/NotificationBar.vue'
import OfferCard from '@/components/OfferForOffererCard.vue'

export default {
  name: 'MyOffers',
  components: {
    NotificationBar,
    OfferCard
  },
  data: function(){
    return {
      filter: 'open',
      offset: 0
    }
  },
  created: function(){
    //reset my offers
    this.$store.commit('resetMyOffers')
    this.$store.dispatch('getOfferDataAction', {offset: this.offset, offerer: this.$store.state.user.email})
  },
  methods: {
    loadMore(){
      this.offset = this.offset + 10
      this.$store.dispatch('getOfferDataAction', {offset: this.offset, offerer: this.$store.state.user.email})      
    },
    newOffer(){
      this.$store.dispatch('newOfferAction')
    },
    offers() {
      const c = Object.values(this.$store.state.myOffers)
      return  c.filter((x) => x.status.startsWith(this.filter))
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
  align-items: flex-start;
}

.offer-card {
  align-self: stretch;
}
</style>





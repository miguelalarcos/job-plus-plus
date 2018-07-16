<template>
  <div v-if="!loading" class="offerer">
    <NotificationBar />
    <b-button @click="filter=''">Todos</b-button>
    <b-button @click="filter='open'">Activos</b-button> 
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
import OfferCard from '@/components/OfferForOffererCard.vue'

export default {
  name: 'MyOffers',
  components: {
    NotificationBar,
    OfferCard
  },
  data: function(){
    return {
      filter: 'open'
    }
  },
  created: function(){
    this.$store.dispatch('getOfferDataAction', {offerer: this.$store.state.user.email})
  },
  methods: {
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
  align-items: center;
}
</style>





<template>
  <div class="home">
    <NotificationBar />
    <div class="container">
      <span v-bind:key="item.id" v-for="item in offers()">
        <OfferCard :item="item" />
      </span>
    </div>  
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
  methods: {
    offers() {
      return Object.values(this.$store.state.myOffers)
    }
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
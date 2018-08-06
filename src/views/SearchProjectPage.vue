<template>
  <div v-if="!loading">
    <NotificationBar />
    <div class="container2"> 
      <span v-bind:key="item.id" v-for="item in projects()">
        <Card :item="item" />
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
import Card from '@/components/ProjectCard.vue'

export default {
  name: 'searchProjects',
  components: {
    NotificationBar,
    Card
  },
  data: function(){
    return {
      
    }
  },
  created: function(){
    this.$store.dispatch('getSearchProjectDataAction', {tags: ['python', 'react', 'redux']})
  },
  methods: {
    projects() {
      return Object.values(this.$store.state.searchProjects)
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
.container2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
}
</style>





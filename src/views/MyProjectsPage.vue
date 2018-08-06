<template>
  <div v-if="!loading">
    <NotificationBar />
    <b-button @click="filter=''">Todos</b-button>
    <b-button @click="filter='open'">Activos</b-button> 
    <b-button @click="newProject()">Nuevo proyecto</b-button>
    <div class="container2"> 
      <span class="project-card" v-bind:key="item._id" v-for="item in projects()">
        <Card :item="item" />
      </span>  
      <!--<b-button @click="loadMore()">Cargar más</b-button>-->
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
  name: 'MyProjects',
  components: {
    NotificationBar,
    Card
  },
  data: function(){
    return {
      filter: 'open',
      //offset: 0
    }
  },
  created: function(){
    //reset my offers
    //this.$store.commit('resetMyOffers')
    this.$store.dispatch('getPerojectsDataAction', {user: this.$store.state.user.login})
  },
  methods: {
    /*loadMore(){
      this.offset = this.offset + 10
      this.$store.dispatch('getOfferDataAction', {offset: this.offset, offerer: this.$store.state.user.login})      
    },*/
    newProject(){
      this.$store.dispatch('newProjectAction')
    },
    projects() {
      const c = Object.values(this.$store.state.myProjects)
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
.container2 {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: flex-start;
}

.project-card {
  align-self: stretch;
}
</style>





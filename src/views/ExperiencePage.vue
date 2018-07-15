<template>
  <div v-if="!loading" class="container">
    <span v-bind:key="item._id" v-for="(item, index) in experiences">
        <ExperienceCard :item="item" :index="index"/>
      </span> 
    <b-button @click="append" :variant="'primary'">
      añadir experiencia
    </b-button>
  </div>
  <div v-else>
    loading...
  </div>
</template>

<script>
// @ is an alias to /src
import ExperienceCard from '@/components/ExperienceCard.vue'

export default {
  name: 'message',
  data: function(){
      return {
          message: ''
      }
  },
  created: function(){
    this.$store.dispatch('getUserDataAction', {user_id: this.$route.query.user_id})
  },
  components: {
    ExperienceCard
  },
  computed: {
    loading() {
      return this.$store.state.loading
    },
    experiences() {
      return this.$store.state.user.experience
    }
  },
  methods:{
    append() {
        this.$store.dispatch('appendExperienceAction', {user_id: this.$route.query.user_id, experience: {tags: "", description: ""}})
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
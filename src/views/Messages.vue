<template>
  <div class="container">
    <h2>{{ title }}</h2>
    <span>Escribe un mensaje:</span>
    <textarea class="textarea-message" v-model="message" rows="5"></textarea>
    <b-button :disabled="message === ''" @click="append" :variant="'primary'">
      añadir mensaje
    </b-button>
    <span v-bind:key="item.id" v-for="item in messages">
      <MessageCard :item="item" />
    </span> 
  </div>
</template>

<script>
// @ is an alias to /src
import MessageCard from '@/components/MessageCard.vue'
import { method } from 'bluebird';

export default {
  name: 'message',
  data: function(){
      return {
          message: ''
      }
  },
  created: function(){
    this.$store.dispatch('getMessagesAction', {candidature: this.$route.query.candidature})
  },
  components: {
    MessageCard
  },
  computed: {
    title() {
      return this.$store.state.candidatureSelected.title
    },
    messages() {
      return this.$store.state.messages.slice().reverse()
    }
  },
  methods:{
    append() {
        this.$store.dispatch('appendMessageAction', {candidature: this.$route.query.candidature, 
                                               msg: this.message})
        this.message = ''
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .textarea-message{
    width: 350px;
  }
</style>
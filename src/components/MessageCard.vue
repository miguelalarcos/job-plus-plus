<template>
    <div class="message">
        <div class="message-heading">
            <span class="author">{{owner}}</span><span class="date"> el día {{date()}}</span>
        </div>
        <p class="message-body">
            {{ msg }}
        </p>
    </div>
</template>

<script>
import moment from 'moment'
export default {
  name: 'MessageCard',
  props: {
      item: Object
  },
  computed: {
      owner() { return this.item.owner},
      msg() { return this.item.msg},
  },
  methods: {
      date() { return moment.unix(this.item.date).format('DD-MM-YYYY')}
  }
}
</script>

<style scoped>
.author {
    font-weight: bold;
}

.message-heading {
    text-decoration: underline;
}

.message-body {
    width: 350px;
    border-bottom: 2px solid gray;
}

.date {
    font-style: italic;
}

</style>
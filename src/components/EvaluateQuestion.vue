<template>
<div>
    <div class="question">{{ item.question }}</div>
    <div v-if="ishttp()" class="answer"><a :href=item.answer>enlace</a></div>
    <div class="answer">{{ item.answer }}</div>
    <table>
        <tr>
            <td>Puntuación:</td><td><input @input="changeMark(index)" v-model="mark"></td>
        </tr>
    </table>
</div>
</template>

<script>
export default {
  name: 'EvaluateQuestion',
  data: function(){
      return {
          mark: this.item.mark 
      }
  },
  props: {
      item: Object,
      index: Number
  },
  computed: {
      
  },
  methods: {
    ishttp() {
        if(this.item.answer.startsWith('http')) return true;
        return false;
    },
    changeMark(index) {
        console.log('cambiar el mark de la question', index, 'por', this.mark)
        let mark = this.mark
        this.$store.commit('setMark', {index, mark})
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
.question {
  font-weight: bold;
}
</style>

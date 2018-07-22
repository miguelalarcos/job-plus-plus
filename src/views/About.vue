<template>
  <div class="about">
    <h1>This is an about page...</h1>
    <AutoComplete v-on:added-tag="pinta($event)"></AutoComplete>
    <div>
        Lorem Ipsum es simplemente el texto de relleno de las imprentas y archivos de texto. Lorem Ipsum ha sido el texto de relleno estándar de las industrias desde el año 1500, cuando un impresor (N. del T. persona que se dedica a la imprenta) desconocido usó una galería de textos y los mezcló de tal manera que logró hacer un libro de textos especimen. No sólo sobrevivió 500 años, sino que tambien ingresó como texto de relleno en documentos electrónicos, quedando esencialmente igual al original. Fue popularizado en los 60s con la creación de las hojas "Letraset", las cuales contenian pasajes de Lorem Ipsum, y más recientemente con software de autoedición, como por ejemplo Aldus PageMaker, el cual incluye versiones de Lorem Ipsum.
    </div>  
  </div>
</template>

<script>
import AutoComplete from '@/components/AutoCompleteTagsInput'

export default {
  name: 'about',
  data: function(){
      return {
          
      }
  },
  created: function(){
    
  },
  components: {
    AutoComplete
  },
  computed: {
    
  },
  methods:{
    pinta(/*value*/){

    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .container {
    display: flex;
    flex-direction: column;
  }
  .body{
      border-bottom: 2px solid gray;
  }
</style>
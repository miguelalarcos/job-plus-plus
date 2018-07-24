<template>
<span>
    <div class="autocomplete">
        <input :placeholder="placeholder" v-model="value" v-on:keyup="keyup($event)" v-on:keyup.up="up()" v-on:keyup.down="down()" v-on:keyup.enter="enter()"/>
        <div class="autocomplete-items">
            <div v-bind:class="classObject(index)" @click="clickItem(item)" v-bind:key="index" v-for="(item, index) in items()">{{item.tag}}</div>
        </div>
    </div>
</span>
</template>

<script>
export default {
  name: 'AutoCompleteTagsInput',
  props: {
      placeholder: String,
      action: String
  },
  data: function(){
      return {
          value: "",
          index: null
      }
  },
  computed: {
  },
  methods: {
    shortNumber(value){
        if(Math.trunc(value/1000000))
            return Math.trunc(value/1000000) + 'M'
        if(Math.trunc(value/1000))
            return Math.trunc(value/1000) + 'K'
        return value
    },  
    classObject(index) {
        return {
            "autocomplete-active": index === this.index
        }
    },
    down(){
        this.index += 1
        if(this.index === this.$store.state.listOfTags.length)
            this.index = 0
        
    },  
    up(){
        this.index -= 1
        if(this.index === -1)
            this.index = this.$store.state.listOfTags.length -1
        
    },
    keyup(event){
        if(this.value !== '' && !['Enter', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight'].includes(event.code)){
            this.index = null
            this.$store.dispatch(this.action, {value: this.value})
        }
    },  
    clickItem(item){
        this.value=""
        this.$emit('added-tag', item.tag)
    },
    enter(){
        let value = ""
        if(this.index !== null)
            value = this.$store.state.listOfTags[this.index].tag
        else
            value = this.value
        if(value !== "")
            this.$emit('added-tag', value)
            this.value = ""
            this.index = null
    },
    items(){
        if(this.value === "")
            return []
        //return this.$store.state.listOfTags.filter(x => x.startsWith(this.value))
        return this.$store.state.listOfTags.slice().sort((a, b) => b-a)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">

.autocomplete {
  /*the container must be positioned relative:*/
  position: relative;
  display: inline-block;
}

.autocomplete-items {
  position: absolute;
  border: 1px solid #d4d4d4;
  border-bottom: none;
  border-top: none;
  z-index: 99;
  /*position the autocomplete items to be the same width as the container:*/
  top: 100%;
  left: 0;
  right: 0;
}

.autocomplete-items div {
  padding: 10px;
  cursor: pointer;
  background-color: #fff; 
  border-bottom: 1px solid #d4d4d4; 
}

.autocomplete-items div:hover {
  /*when hovering an item:*/
  background-color: #e9e9e9; 
}

.autocomplete-active {
  /*when navigating through the items using the arrow keys:*/
  background-color: DodgerBlue !important; 
  color: #ffffff; 
}

</style>

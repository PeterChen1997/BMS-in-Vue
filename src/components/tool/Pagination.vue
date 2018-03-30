<template>
  <nav class="pagination is-rounded is-centered" role="navigation" aria-label="pagination">
    <a class="pagination-previous" data-type="pre" @click="handleClick">上一页</a>
    <a class="pagination-next" data-type="next" @click="handleClick">下一页</a>
    <ul class="pagination-list" @click="handleClick">
      <li v-for="index in $store.state.articlesPaginationCount" :key="index">
        <a class="pagination-link" data-type="index" :data-id="index" :class="$store.state.articlesListIndex == index ? 'is-current' : ''">{{ index }}</a>
      </li>
    </ul>
  </nav>
</template>

<script>
  export default {
    methods: {
      handleClick(e) {
        let type = e.target.dataset.type
        let index = this.$store.state.articlesListIndex
        let count = this.$store.state.articlesPaginationCount
        switch(type) {
          case 'pre':
            if(index > 1) {
              this.$store.dispatch('setPaginationIndex', index - 1)
            }
            break
          case 'next':
            if(index < count) {
              this.$store.dispatch('setPaginationIndex', index + 1)
            }
            break
          case 'index':
            let id = e.target.dataset.id
            if(id) {
              this.$store.dispatch('setPaginationIndex', parseInt(id))
            }
            break
        }
        
      }
    }
  }
</script>

<style scoped>

</style>
<template>
  <div class="modal" :class="$store.state.editModalShow ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">文章详情</p>
        <button class="delete" aria-label="close" @click="$store.commit('CLOSE_EDIT_MODAL')"></button>
      </header>
      <section class="modal-card-body">
        <pre>{{ $store.state.isEditingArticle.content }}</pre>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="$store.dispatch('editConfirm', '')">保存更改</button>
        <button class="button" @click="$store.commit('CLOSE_EDIT_MODAL')">取消</button>
      </footer>
    </div>
  </div>
</template>

<script>
  export default {
    
  }
</script>

<style scoped>

</style>
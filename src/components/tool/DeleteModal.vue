<template>
  <div class="modal" :class="$store.state.deleteModalShow ? 'is-active' : ''">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">你确定要删除吗?</p>
        <button class="delete" aria-label="close" @click="$store.commit('CLOSE_DELETE_MODAL')"></button>
      </header>
      <section class="modal-card-body">
        <p>{{ $store.state.isDeletingType == 'Article' ? '文章' : '评论' }}ID: {{ $store.state.isDeletingId }}</p>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-danger" @click="$store.dispatch('deleteConfirm')">确认删除</button>
        <button class="button" @click="$store.commit('CLOSE_DELETE_MODAL')">取消</button>
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
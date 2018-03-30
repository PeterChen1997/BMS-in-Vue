<template>
<div>
  <my-header></my-header>

  <my-delete-modal v-if="$store.state.deleteModalShow"></my-delete-modal>
  <my-edit-modal v-if="$store.state.editModalShow"></my-edit-modal>

  <section class="hero is-medium is-primary is-bold">
    <div class="hero-body">
      <div class="container">
        <h1 class="title">
          博客后台管理系统
        </h1>
        <h2 class="subtitle">
          Powered By Vue and Bulma
        </h2>
      </div>
    </div>
  </section>

  <div class="container main">
    <main class="columns">
      <my-sidebar class="column is-one-fifth"></my-sidebar>
      <my-content class="column"></my-content>
    </main>
  </div>

  <my-footer></my-footer>
  
</div>
  
</template>

<script>
import MyHeader from "./Header";
import MyFooter from "./Footer";
import MySidebar from "./SideBar";
import MyContent from "./Content";
import MyDeleteModal from '../tool/DeleteModal'
import MyEditModal from '../tool/EditModal'

export default {
  components: {
    MyHeader,
    MyFooter,
    MySidebar,
    MyContent,
    MyDeleteModal,
    MyEditModal
  }
};
</script>

<style scoped>
.main {
  margin-top: 50px;
  margin-bottom: 50px;
  min-height: 50vh;
}
</style>

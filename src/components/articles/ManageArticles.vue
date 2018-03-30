<template>
  <div>
    <my-breadcrumb></my-breadcrumb>

    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>文章标题</th>
          <th>类别</th>
          <th>浏览量</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in $store.state.articlesList.rows" :key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.title  }}</td>
          <td>{{ item.topic  }}</td>
          <td>{{ item.view  }}</td>
          <td>
            <button :data-id="item.id" class="button is-link is-rounded">修改</button>
            <button :data-id="item.id" class="button is-danger is-rounded">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

  <my-pagination></my-pagination>
</div>
</template>

<script>
import MyPagination from '../tool/Pagination'
import MyBreadcrumb from '../tool/Breadcrumb'

export default {
  created() {
    this.$store.dispatch('getArticles', 1)
  },
  components: {
    MyPagination,
    MyBreadcrumb
  }
}
</script>

<style scoped>

</style>
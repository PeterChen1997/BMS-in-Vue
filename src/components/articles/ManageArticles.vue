<template>
  <div>
    <div class="level">
      <div class="level-left">
        <button class="button is-primary" @click="$store.dispatch('addNewArticle')">新增文章</button>
      </div>

      <div class="field level-right">
        <form @submit.prevent @keyUp.enter="handleSearch">
          <p class="control has-icons-right">
            <input class="input" type="text" placeholder="请输入要搜索的文章" v-model="searchText" @input="debounce(handleSearch, 500)">
            <span class="icon is-small is-right">
              <i class="fa fa-search"></i>
            </span>
          </p>
        </form>
      </div>
    </div>

    <table class="table is-striped is-hoverable is-fullwidth">
      <thead>
        <tr>
          <th>ID</th>
          <th>文章标题</th>
          <th>类别</th>
          <th>浏览量</th>
          <th>发布日期</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in $store.state.articlesList.rows" :key="item.id">
          <th>{{ item.id }}</th>
          <td>{{ item.title  }}</td>
          <td>{{ item.topic  }}</td>
          <td>{{ item.view  }}</td>
          <td>{{ item.createdAt.slice(0, 10)  }}</td>
          <td>
            <button :data-id="item.id" class="button is-link is-rounded" @click="handleEdit">修改</button>
            <button :data-id="item.id" class="button is-danger is-rounded" @click="handleDelete">删除</button>
          </td>
        </tr>
      </tbody>
    </table>

  <my-pagination></my-pagination>
</div>
</template>

<script>
import MyPagination from '../tool/Pagination'

export default {
  data() {
    return {
      debounceId: '',
      searchText: ''
    }
  },
  created() {
    this.$store.dispatch('getArticles', 1)
  },
  components: {
    MyPagination,
  },
  methods: {
    handleDelete(e) {
      let id = e.target.dataset.id
      this.$store.commit('SET_DELETE_TYPE', {
         id,
         type:'Article'
      })
    },
    handleEdit(e) {
      let id = e.target.dataset.id
      console.log(id)
      this.$store.commit('EDIT_ARTICLE', id)
    },
    debounce(func, delay) {
      clearTimeout(this.debounceId)
      this.debounceId = setTimeout(function(){
          func()
      }, delay)
    },
    handleSearch() {
      let info = this.searchText
      if(info) {
        this.$store.commit('SET_SEARCHING_STATE', true)
        this.$store.commit('SET_ARTICLES_PAGINATION_INDEX', 1)
        this.$store.commit('SET_SEARCH_INFO', info)
        this.$store.dispatch('searchArticles')
      } else {
        this.$store.commit('SET_SEARCHING_STATE', false)
        this.$store.commit('SET_SEARCH_INFO', '')
        this.$store.dispatch('reloadArticlesList')
      }
    }
  }
}
</script>

<style scoped>

</style>
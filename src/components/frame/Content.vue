<template>
  <div>
    <edit-article v-if="false"></edit-article>
    <manage-articles v-if="false"></manage-articles>
    <div v-if="true">
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">总浏览量</p>
            <p class="title">3,456</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">订阅数量</p>
            <p class="title">1</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">留言数</p>
            <p class="title">100</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">点赞数</p>
            <p class="title">789</p>
          </div>
        </div>
      </div>

      <div class="level level2">
        <div class="level-item has-text-centered ">
          <div>
            <p class="heading is-size-4">新增留言</p>
            <p class="title is-size-4">20</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-4">新增订阅</p>
            <p class="title is-size-4">13</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EditArticle from '../articles/EditArticle'
import ManageArticles from '../articles/ManageArticles'

export default {
  components: {
    EditArticle,
    ManageArticles
  }
}
</script>

<style scoped>
.level2 {
  margin-top: 150px;
}
</style>
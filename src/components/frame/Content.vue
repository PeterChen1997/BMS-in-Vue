<template>
  <div>
    <manage-articles v-show='$store.state.menuIndex == "articlesList"'></manage-articles>
    <comments-list v-show='$store.state.menuIndex == "commentsList"'></comments-list>
    <subscribe-list v-show='$store.state.menuIndex == "subscribeList"'></subscribe-list>

    <div v-show='$store.state.menuIndex == "dashboard"'>
      <div class="level">
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">总浏览量</p>
            <p class="title">{{ $store.state.totalViewCount }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">订阅数量</p>
            <p class="title">{{ $store.state.totalSubscribeCount }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">留言数</p>
            <p class="title">{{ $store.state.totalCommentsCount }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading">点赞数</p>
            <p class="title">{{ $store.state.totalLikesCount }}</p>
          </div>
        </div>
      </div>

      <div class="level level2">
        <div class="level-item has-text-centered ">
          <div>
            <p class="heading is-size-4">新增留言</p>
            <p class="title is-size-4">{{ $store.state.newCommentsCount }}</p>
          </div>
        </div>
        <div class="level-item has-text-centered">
          <div>
            <p class="heading is-size-4">新增订阅</p>
            <p class="title is-size-4">{{ $store.state.newSubscribeCount }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ManageArticles from '../articles/ManageArticles'
import CommentsList from '../comments/CommentsList'
import SubscribeList from '../subscribe/SubscribeList'

export default {
  components: {
    ManageArticles,
    CommentsList,
    SubscribeList
  }
}
</script>

<style scoped>
.level2 {
  margin-top: 150px;
}
</style>
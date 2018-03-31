<template>
  <aside class="menu" @click="handleClick">
    <p class="menu-label">
      博客数据统计
    </p>
    <ul class="menu-list">
      <li><a :class="$store.state.menuIndex == 'dashboard' ? 'is-active' : ''" data-index="dashboard">Dashboard</a></li>
    </ul>
    <p class="menu-label">
      文章管理
    </p>
    <ul class="menu-list">
      <li><a :class="$store.state.menuIndex == 'articlesList' ? 'is-active' : ''" data-index="articlesList">文章列表</a></li>
    </ul>
    <p class="menu-label">
      留言管理
    </p>
    <ul class="menu-list">
      <li><a :class="$store.state.menuIndex == 'commentsList' ? 'is-active' : ''" data-index="commentsList">留言列表</a></li>
    </ul>
    <p class="menu-label">
      订阅管理
    </p>
    <ul class="menu-list">
      <li><a :class="$store.state.menuIndex == 'subscribeList' ? 'is-active' : ''" data-index="subscribeList">订阅列表</a></li>
    </ul>
  </aside>
</template>

<script>
export default {
  methods: {
    handleClick(e) {
      let target = e.target.dataset.index
      if(target) {
        this.$store.commit('SET_MENU', target)
      }
    }
  }
};
</script>

<style scoped>

</style>
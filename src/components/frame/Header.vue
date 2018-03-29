<template>
  <nav class="navbar is-transparent ">
  <div class="navbar-brand">
    <div class="navbar-item">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
    </div>
  </div>

  <div class="navbar-menu">
    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">
          <p class="control">
            <button class="button is-info is-rounded" @click="logOut">
              <span class="icon">
                <i class="fa fa-sign-out"></i>
              </span>
              <span>Log Out</span>
            </button>
          </p>
        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
import { mapMutations } from 'vuex'

export default {
  methods: {
    ...mapMutations({
      logOut: 'SIGN_OUT' // 将 `this.add()` 映射为 `this.$store.commit('increment')`
    })
  }
}
</script>

<style scoped>

</style>

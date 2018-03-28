<template>
  <div class="login-form">
    <h1 class="title">
      Blog后台管理系统
    </h1>
    <form @submit.prevent="submit" >
      <div class="control">
        <input class="input" autocomplete="true" v-model="id" type="text" placeholder="请输入账号">
      </div>
      <div class="control">
        <input class="input" autocomplete="true" v-model="password" type="password" placeholder="请输入密码" @keyUp.enter="submit">
      </div>
      <div class="control">
        <button class="button is-primary is-rounded" type="submit">Submit</button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      id: '',
      password: ''
    }
  },
  computed: {
    getLoginState () {
      return this.$store.state.authUser.status
    }
  },
  watch: {
    getLoginState: function (newState) {
      console.log('nice')
      if (newState === true) {
        this.$router.push({ path: '/home' })
      }
    }
  },
  methods: {
    async submit () {
      let { id, password } = this
      try {
        await this.$store.dispatch('login', {
          id: id,
          password: password
        })
      } catch (e) {
        console.log(e)
      }
    }
  }
}
</script>

<style>
.login-form {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}

.title {
  display: block;
  font-weight: 300;
  font-size: 40px;
  color: #35495e;
  letter-spacing: 1px;
}

.control {
  margin: 10px;
  text-align:center;
}
</style>

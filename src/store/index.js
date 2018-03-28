import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authUser: { state: false }
  },
  mutations: {
    SET_USER: function (state, user) {
      localStorage.setItem('authUser', JSON.stringify(user))
      state.authUser = user
    },
    SIGN_OUT: function (state) {
      localStorage.setItem('authUser', JSON.stringify({ status: false }))
      state.authUser.status = false
    }
  },
  actions: {
    async login ({ commit }, { id, password }) {
      try {
        const { data } = await axios.post(`${config.url}/users`, { id, password })
        commit('SET_USER', data)
      } catch (error) {
        if (error.response && error.response.status === 401) {
          throw new Error('Bad credentials')
        }
        throw error
      }
    },

    async logout ({ commit }) {
      await axios.post('/api/logout')
      commit('SET_USER', null)
    }
  }
})

export default store

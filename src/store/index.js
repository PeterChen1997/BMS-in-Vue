import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import config from '../config'
import router from '../router'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    authUser: { status: false },
    menuIndex: 'dashboard',
    articlesList: []
  },
  mutations: {
    SET_MENU: function (state, menuIndex) {
      state.menuIndex = menuIndex
    },
    SET_USER: function (state, user) {
      localStorage.setItem('authUser', JSON.stringify(user))
      state.authUser = user
    },
    SET_ARTICLES: function (state, articlesList) {
      state.articlesList = articlesList
    },
    SIGN_OUT: function (state) {
      localStorage.setItem('authUser', JSON.stringify({ status: false }))
      state.authUser.status = false
      router.push({ path: '/' })
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

    logout ({ commit }) {
      commit('SET_USER', null)
    },

    async getArticles ({ commit }, index) {
      const articlesList = await axios.get(`${config.url}/articles/${index}`)
      commit('SET_ARTICLES', articlesList.data)
    }
  }
})

export default store

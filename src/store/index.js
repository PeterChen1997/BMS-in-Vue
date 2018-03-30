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
    articlesListIndex: 1,
    articlesList: [],
    deleteModalShow: false,
    isDeletingType: '',
    isDeletingId: '',
    editModalShow: false,
    isEditingId: '',
    articlesPaginationCount: 1
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
      state.articlesPaginationCount = Math.ceil(articlesList.count / 5)
    },
    SIGN_OUT: function (state) {
      localStorage.setItem('authUser', JSON.stringify({ status: false }))
      state.authUser.status = false
      router.push({ path: '/' })
    },
    SET_DELETE_TYPE: function (state, payload) {
      state.isDeletingType = payload.type
      state.isDeletingId = payload.id
      state.deleteModalShow = true
    },
    CLOSE_DELETE_MODAL: function (state) {
      state.deleteModalShow = false
      state.isDeletingType = ''
      state.isDeletingId = ''
    },
    EDIT_ARTICLE: function (state, id) {
      state.editModalShow = true
      state.isEditingId = id
      let resultArray = state.articlesList.rows.filter(item => item.id === id)
      state.isEditingArticle = resultArray[0]
    },
    CLOSE_EDIT_MODAL: function (state) {
      state.editModalShow = false
      state.isEditingArticle = {}
      state.isEditingId = ''
    },
    SET_ARTICLES_PAGINATION_INDEX: function (state, id) {
      state.articlesListIndex = id
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

    async getArticles ({ commit, state }) {
      const articlesList = await axios.get(`${config.url}/articles/${state.articlesListIndex}`)
      commit('SET_ARTICLES', articlesList.data)
    },

    async deleteArticle ({ commit, state, dispatch }) {
      let articleId = state.isDeletingId
      let result = await axios.delete(`${config.url}/articles/${articleId}`)
      let status = result.data
      if (status === 'success') {
        commit('CLOSE_DELETE_MODAL')
        if (state.articlesList.count - 1 === (state.articlesPaginationCount - 1) * 5) {
          state.articlesListIndex--
        }
        dispatch('getArticles')
      } else {
        // TODO:加上删除失败的提示
        commit('CLOSE_DELETE_MODAL')
      }
    },

    async deleteConfirm ({ dispatch, state }) {
      let type = state.isDeletingType
      let id = state.isDeletingId
      await dispatch(`delete${type}`, id)
    },

    async editConfirm ({ dispatch, state }, content) {
    },

    async setPaginationIndex ({ dispatch, commit }, id) {
      commit('SET_ARTICLES_PAGINATION_INDEX', id)

      await dispatch('getArticles')
    }
  }
})

export default store

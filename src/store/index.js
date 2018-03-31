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
    articlesPaginationCount: 1,
    isSearching: false
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
      state.articlesPaginationCount = Math.ceil(articlesList.count / 5) || 1
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
      if (id !== '') {
        let resultArray = state.articlesList.rows.filter(item => item.id === id)
        state.isEditingArticle = resultArray[0]
      } else {
        state.isEditingArticle = {
          title: '',
          content: '',
          topic: ''
        }
      }
    },
    CLOSE_EDIT_MODAL: function (state) {
      state.editModalShow = false
      state.isEditingArticle = {}
      state.isEditingId = ''
    },
    SET_ARTICLES_PAGINATION_INDEX: function (state, id) {
      state.articlesListIndex = id
    },
    SET_SEARCHING_STATE: function (state, status) {
      state.isSearching = status
    },
    SET_SEARCH_INFO: function (state, info) {
      state.searchInfo = info
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
        dispatch('reloadArticlesList')
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

    async editConfirm ({ dispatch, state, commit }, data) {
      if (state.isEditingId !== '') {
        let result = await axios.patch(`${config.url}/articles/${state.isEditingId}`, data)
        if (result.data === 'success') {
          commit('CLOSE_EDIT_MODAL')
          await dispatch('reloadArticlesList')
        } else {
          // TODO:完成失败提示
        }
      } else {
        // 新增文章
        let result = await axios.post(`${config.url}/articles`, data)
        if (result.status === 200) {
          commit('CLOSE_EDIT_MODAL')
          await dispatch('reloadArticlesList')
        } else {
          // TODO:完成失败提示
        }
      }
    },

    async addNewArticle ({ commit }) {
      commit('EDIT_ARTICLE', '')
    },

    async setPaginationIndex ({ dispatch, commit, state }, id) {
      commit('SET_ARTICLES_PAGINATION_INDEX', id)
      await dispatch('reloadArticlesList')
    },

    async reloadArticlesList ({ dispatch, state }) {
      if (state.isSearching) {
        await dispatch('searchArticles')
      } else {
        await dispatch('getArticles')
      }
    },

    async searchArticles ({ commit, state }) {
      let articles = await axios.get(`${config.url}/articles/search/${state.searchInfo}/${state.articlesListIndex}`)
      if (state.articlesListIndex) {
        commit('SET_ARTICLES', articles.data)
      } else {
        commit('SET_ARTICLES', {})
        commit('SET_ARTICLES_PAGINATION_INDEX', 1)
      }
    }
  }
})

export default store
